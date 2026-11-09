import { fetchMockCurrentUserDetail, loginWithMock } from './auth.mock';
import { request } from './request';
import type { CurrentUserDetailResponse, LoginRequest, LoginResponse } from './auth.types';

function shouldUseMockAuth() {
  return process.env.NEXT_PUBLIC_AUTH_MOCK === 'true' || !process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
}

export async function loginWithPassword(credentials: LoginRequest) {
  if (shouldUseMockAuth()) {
    return loginWithMock(credentials);
  }

  // 登录接口参数完全来自登录表单；React 版保持与 Vue 模板一致的接口路径。
  const response = await request.post<LoginResponse>('/api/auth/login', {
    password: credentials.password,
    username: credentials.username,
  });
  return response.data;
}

export async function fetchCurrentUserDetail() {
  if (shouldUseMockAuth()) {
    return fetchMockCurrentUserDetail();
  }

  // 当前用户详情接口同时返回用户信息和权限资源，状态层统一从这里拆包入库。
  const response = await request.get<CurrentUserDetailResponse>('/api/auth/current-user/detail');
  return response.data;
}

export async function logoutSession() {
  if (shouldUseMockAuth()) return;
  // 退出登录只通知服务端结束当前会话，本地清理由 auth context 负责。
  await request.post('/api/auth/logout');
}

export type { CurrentUserDetailResponse, LoginRequest, LoginResponse, PermissionResourceNode, UserResponse } from './auth.types';
