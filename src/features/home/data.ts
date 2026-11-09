export const trendDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
export const statKeys = ['routes', 'components', 'themes', 'coverage'] as const;
export const systemHealthKeys = ['request', 'permission', 'theme', 'locale'] as const;
export const capabilityKeys = ['layout', 'table', 'docs', 'auth'] as const;
export const activityKeys = ['theme', 'i18n', 'permission'] as const;
export const layoutPreferenceKeyByMode = { side: 'layoutSide', top: 'layoutTop' } as const;
export const themePreferenceKeyByMode = { dark: 'modeDark', light: 'modeLight', system: 'modeSystem' } as const;

export const dashboardStats = {
  components: 16,
  coverage: 100,
  routes: 11,
  themes: 3,
} as const;

export const buildTrendData = [96, 98, 97, 99, 99.5, 99.8] as const;
export const responseTrendData = [150, 136, 141, 128, 122, 126] as const;
