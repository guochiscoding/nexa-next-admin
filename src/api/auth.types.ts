export type UserStatus = 'normal' | 'disabled';

export interface UserResponse {
  /** 用户创建时间，来自接口 data.user.created_at。 */
  created_at: string;
  /** 用户邮箱，来自接口 data.user.email，可为空字符串。 */
  email: string;
  /** 用户 ID，来自接口 data.user.id。 */
  id: number;
  /** 最近登录时间，来自接口 data.user.last_login_at，可为空。 */
  last_login_at?: string;
  /** 用户手机号，来自接口 data.user.mobile，可为空。 */
  mobile?: string;
  /** 用户昵称，页面头像和导航展示优先使用。 */
  nickname: string;
  /** 用户真实姓名，账号信息展示使用。 */
  real_name: string;
  /** 用户状态，接口仅允许 normal / disabled。 */
  status: UserStatus;
  /** 登录账号，接口原始字段。 */
  username: string;
  /** 用户更新时间，来自接口 data.user.updated_at。 */
  updated_at: string;
  /** 权限版本预留字段，用于后续缓存失效。 */
  version?: string;
}

export interface LoginRequest {
  /** 登录账号，由登录表单提交。 */
  username: string;
  /** 登录密码，由登录表单提交。 */
  password: string;
}

export interface LoginResponse {
  /** 访问令牌，后续请求会写入 Authorization。 */
  access_token: string;
  /** 令牌有效期秒数，按接口原始字段保存。 */
  expires_in: number;
  /** 令牌类型，缺省时请求层按 Bearer 发送。 */
  token_type?: string;
  /** 登录接口返回的用户信息。 */
  user: UserResponse;
}

export type PermissionResourceType = 'module' | 'page' | 'button' | 'control';

export interface PermissionResourceNode {
  /** 权限资源名称，后端未提供 titleKey 时作为菜单展示兜底。 */
  name: string;
  /** 权限资源类型，菜单只消费 module/page。 */
  type: PermissionResourceType;
  /** 完整权限码，运行时权限判断按精确匹配判断。 */
  permission_code: string;
  /** 后端鉴权路径字段，前端仅透传保存。 */
  path: string;
  /** 后端组件标识，前端静态路由不依赖该字段。 */
  component: string;
  /** 后端图标标识，当前模板使用本地映射。 */
  icon: string;
  /** 同级排序字段。 */
  sort: number;
  /** 扩展元信息，可为空。 */
  meta: Record<string, unknown> | null;
  /** 当前用户是否拥有该资源。 */
  has_permission: boolean;
  /** 子权限资源。 */
  children: PermissionResourceNode[];
}

export interface PermissionResourcesResponse {
  /** 权限资源树，状态层会过滤无权限节点后用于导航。 */
  list: PermissionResourceNode[];
  /** 扁平权限码列表，运行时权限判断只消费这里。 */
  permissions: string[];
  /** 权限统计信息，当前模板暂不消费。 */
  stats: Record<string, unknown>;
}

export interface CurrentUserDetailResponse {
  /** 当前登录用户信息，来自 /api/auth/current-user/detail 的 data.user。 */
  user: UserResponse;
  /** 当前用户权限资源，来自 /api/auth/current-user/detail 的 data.permission_resources。 */
  permission_resources: PermissionResourcesResponse;
}
