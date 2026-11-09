'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { fetchCurrentUserDetail, loginWithPassword, logoutSession } from '@/api/auth';
import type { CurrentUserDetailResponse, LoginRequest, PermissionResourceNode, UserResponse } from '@/api/auth';
import { appConfig, type LayoutMode, type LocaleCode, type ThemeMode } from '@/config/app';
import { getColorTokens, type ResolvedThemeMode } from '@/config/theme';
import { templatePermissionCodes, templatePermissionSignature } from '@/config/navigation';
import { LocaleContext } from '@/locales';
import { getRouteKeyFromPath, isPublicRoute } from '@/routes/definitions';

interface StoredToken {
  access_token: string;
  expires_in: number;
  token_type?: string;
}

interface StoredSession {
  token: StoredToken;
  user: UserResponse;
}

interface PreferencesState {
  layout: LayoutMode;
  locale: LocaleCode;
  theme: ThemeMode;
}

interface AuthState {
  initialized: boolean;
  token: StoredToken | null;
  user: UserResponse | null;
}

interface PermissionState {
  isLoaded: boolean;
  permissionTree: PermissionResourceNode[];
  permissions: Set<string>;
  userInfo: UserResponse | null;
  version: string;
}

interface AppContextValue {
  auth: AuthState;
  clearSession: () => void;
  fetchUserDetail: () => Promise<CurrentUserDetailResponse>;
  hasPermission: (code: string) => boolean;
  login: (credentials: LoginRequest & { rememberMe: boolean }) => Promise<void>;
  logout: () => Promise<void>;
  permission: PermissionState;
  preferences: PreferencesState & { resolvedTheme: ResolvedThemeMode };
  setLayout: (layout: LayoutMode) => void;
  setLocale: (locale: LocaleCode) => void;
  setTheme: (theme: ThemeMode) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const authStorageKey = `${appConfig.storageNamespace}:auth`;
const permissionStorageKey = `${appConfig.storageNamespace}:permission`;
const preferencesStorageKey = `${appConfig.storageNamespace}:preferences`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function loadJson<T>(storage: Storage, key: string): T | null {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function loadStoredSession() {
  return loadJson<StoredSession>(localStorage, authStorageKey) ?? loadJson<StoredSession>(sessionStorage, authStorageKey);
}

function persistSession(session: StoredSession, rememberMe: boolean) {
  const target = rememberMe ? localStorage : sessionStorage;
  const stale = rememberMe ? sessionStorage : localStorage;
  target.setItem(authStorageKey, JSON.stringify(session));
  stale.removeItem(authStorageKey);
}

function removeStoredSession() {
  localStorage.removeItem(authStorageKey);
  sessionStorage.removeItem(authStorageKey);
  localStorage.removeItem(permissionStorageKey);
}

function defaultPreferences(): PreferencesState {
  return {
    layout: appConfig.defaultLayout,
    locale: appConfig.defaultLocale,
    theme: appConfig.defaultTheme,
  };
}

function normalizePreferences(value: unknown): PreferencesState {
  const defaults = defaultPreferences();
  if (!isRecord(value)) return defaults;
  return {
    layout: value.layout === 'top' || value.layout === 'side' ? value.layout : defaults.layout,
    locale: value.locale === 'en-US' || value.locale === 'zh-CN' ? value.locale : defaults.locale,
    theme: value.theme === 'dark' || value.theme === 'light' || value.theme === 'system' ? value.theme : defaults.theme,
  };
}

function filterGrantedPermissionTree(nodes: PermissionResourceNode[]): PermissionResourceNode[] {
  return [...nodes]
    .sort((current, next) => current.sort - next.sort)
    .filter((node) => node.has_permission)
    .map((node) => ({ ...node, children: filterGrantedPermissionTree(node.children) }));
}

function createPermissionState(detail: CurrentUserDetailResponse): PermissionState {
  return {
    isLoaded: true,
    permissionTree: filterGrantedPermissionTree(detail.permission_resources.list),
    permissions: new Set(detail.permission_resources.permissions.filter((code) => code.trim())),
    userInfo: detail.user,
    version: detail.user.version ?? '',
  };
}

function serializePermission(permission: PermissionState) {
  return JSON.stringify({ ...permission, permissions: Array.from(permission.permissions) });
}

function parsePermission(value: unknown): PermissionState | null {
  if (!isRecord(value)) return null;
  const permissions = Array.isArray(value.permissions)
    ? new Set(value.permissions.filter((code): code is string => typeof code === 'string'))
    : new Set<string>();

  const state: PermissionState = {
    isLoaded: value.isLoaded === true,
    permissionTree: Array.isArray(value.permissionTree) ? value.permissionTree as PermissionResourceNode[] : [],
    permissions,
    userInfo: isRecord(value.userInfo) ? value.userInfo as unknown as UserResponse : null,
    version: typeof value.version === 'string' ? value.version : '',
  };

  if (Array.from(state.permissions).some((code) => code.startsWith('demo.')) && state.version !== templatePermissionSignature) {
    state.permissions = new Set(templatePermissionCodes);
    state.version = templatePermissionSignature;
  }
  return state;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [auth, setAuth] = useState<AuthState>({ initialized: false, token: null, user: null });
  const [permission, setPermission] = useState<PermissionState>({ isLoaded: false, permissionTree: [], permissions: new Set(), userInfo: null, version: '' });
  const [preferences, setPreferences] = useState<PreferencesState>(defaultPreferences);
  const [systemDark, setSystemDark] = useState(false);

  const resolvedTheme: ResolvedThemeMode = preferences.theme === 'system' ? (systemDark ? 'dark' : 'light') : preferences.theme;

  useEffect(() => {
    const storedSession = loadStoredSession();
    const storedPermission = parsePermission(loadJson(localStorage, permissionStorageKey));
    const storedPreferences = normalizePreferences(loadJson(localStorage, preferencesStorageKey));
    setAuth({ initialized: true, token: storedSession?.token ?? null, user: storedSession?.user ?? null });
    if (storedPermission) setPermission(storedPermission);
    setPreferences(storedPreferences);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(media.matches);
    const handleChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    localStorage.setItem(preferencesStorageKey, JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;
    Object.entries(getColorTokens(resolvedTheme)).forEach(([name, value]) => root.style.setProperty(`--${name}`, value));
  }, [resolvedTheme]);

  useEffect(() => {
    if (!auth.initialized) return;
    const isGuestPage = pathname === '/login';
    const isPublicPage = isPublicRoute(getRouteKeyFromPath(pathname));
    if (!auth.token?.access_token && !isGuestPage && !isPublicPage) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
    if (auth.token?.access_token && isGuestPage) {
      router.replace(searchParams.get('redirect') || '/');
    }
  }, [auth.initialized, auth.token?.access_token, pathname, router, searchParams]);

  const clearSession = useCallback(() => {
    setAuth({ initialized: true, token: null, user: null });
    setPermission({ isLoaded: false, permissionTree: [], permissions: new Set(), userInfo: null, version: '' });
    removeStoredSession();
  }, []);

  const fetchUserDetail = useCallback(async () => {
    // 刷新后恢复当前用户权限，保证菜单与页面权限共享同一份来源。
    const detail = await fetchCurrentUserDetail();
    const nextPermission = createPermissionState(detail);
    setPermission(nextPermission);
    localStorage.setItem(permissionStorageKey, serializePermission(nextPermission));
    return detail;
  }, []);

  const login = useCallback(async (credentials: LoginRequest & { rememberMe: boolean }) => {
    const loginResponse = await loginWithPassword(credentials);
    const token: StoredToken = {
      access_token: loginResponse.access_token,
      expires_in: loginResponse.expires_in,
      token_type: loginResponse.token_type,
    };
    const detail = await fetchCurrentUserDetail();
    const session = { token, user: detail.user };
    const nextPermission = createPermissionState(detail);
    persistSession(session, credentials.rememberMe);
    localStorage.setItem(permissionStorageKey, serializePermission(nextPermission));
    setAuth({ initialized: true, token, user: detail.user });
    setPermission(nextPermission);
  }, []);

  const logout = useCallback(async () => {
    try {
      if (auth.token?.access_token) await logoutSession();
    } finally {
      clearSession();
      router.replace('/login');
    }
  }, [auth.token?.access_token, clearSession, router]);

  const value = useMemo<AppContextValue>(() => ({
    auth,
    clearSession,
    fetchUserDetail,
    hasPermission: (code) => permission.permissions.has(code),
    login,
    logout,
    permission,
    preferences: { ...preferences, resolvedTheme },
    setLayout: (layout) => setPreferences((current) => ({ ...current, layout })),
    setLocale: (locale) => setPreferences((current) => ({ ...current, locale })),
    setTheme: (theme) => setPreferences((current) => ({ ...current, theme })),
  }), [auth, clearSession, fetchUserDetail, login, logout, permission, preferences, resolvedTheme]);

  return (
    <AppContext.Provider value={value}>
      <LocaleContext.Provider value={{ locale: preferences.locale }}>
        {children}
      </LocaleContext.Provider>
    </AppContext.Provider>
  );
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}
