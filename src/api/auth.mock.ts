import { templateNavigationConfig, templatePermissionCodes, templatePermissionSignature } from '@/config/navigation';
import type { CurrentUserDetailResponse, LoginRequest, LoginResponse, PermissionResourceNode, UserResponse } from './auth.types';

function createMockUser(username: string): UserResponse {
  return {
    created_at: '2026-10-10 09:00:00',
    email: `${username || 'admin'}@nexa.dev`,
    id: 1,
    last_login_at: '2026-11-05 10:00:00',
    mobile: '',
    nickname: username || 'admin',
    real_name: 'Nexa Admin',
    status: 'normal',
    updated_at: '2026-11-05 10:00:00',
    username: username || 'admin',
    version: templatePermissionSignature,
  };
}

function createResourceNode(item: (typeof templateNavigationConfig)[number]): PermissionResourceNode {
  return {
    children: (item.children ?? []).map(createResourceNode),
    component: '',
    has_permission: true,
    icon: item.iconName ?? '',
    meta: { titleKey: item.titleKey },
    name: item.title,
    path: item.path,
    permission_code: item.permission,
    sort: item.sort,
    type: item.type ?? 'page',
  };
}

export async function loginWithMock(credentials: LoginRequest): Promise<LoginResponse> {
  return {
    access_token: `mock-${credentials.username || 'admin'}-${Date.now()}`,
    expires_in: 7200,
    token_type: 'Bearer',
    user: createMockUser(credentials.username),
  };
}

export async function fetchMockCurrentUserDetail(username = 'admin'): Promise<CurrentUserDetailResponse> {
  return {
    user: createMockUser(username),
    permission_resources: {
      list: templateNavigationConfig.map(createResourceNode),
      permissions: templatePermissionCodes,
      stats: {},
    },
  };
}
