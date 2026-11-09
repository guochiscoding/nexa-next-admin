# Nexa Next Admin

> A polished React 19 + Next.js admin starter that brings the `nexa-admin` product experience to the Next App Router ecosystem.

[中文](#中文说明) | [English](#english)

## 中文说明

Nexa Next Admin 是一套面向真实中后台项目的 React + Next.js 管理系统模板。它不是一个只摆几张卡片的 dashboard demo，而是把后台系统最容易返工的部分提前打磨好：布局、导航、权限、国际化、表格、表单、组件规范、页面模板和请求层。

如果你想快速启动一个业务后台、运营工作台、SaaS 管理端或内部系统，又不想从零拼路由、菜单、表格选择、筛选区、二级页和异常页，这个项目就是给你的起点。

### 为什么值得 Star

- **更像产品，而不是玩具 demo**：内置登录、权限资源、导航折叠、顶部栏、悬浮客服、首页看板、组件库和页面模板。
- **对齐成熟 Vue 版本体验**：以同级 `nexa-admin` 为参照，在 React + Next.js 技术栈下复刻布局、组件和交互，而不是重新随意设计一套。
- **页面结构可维护**：页面内容放在 `features`，应用外壳放在 `layouts`，路由定义和组件注册分离，避免所有内容堆进一个 `AppView`。
- **组件不是占位符**：按钮、表单、选择器、日期选择、标签页、表格选择、状态和完整度展示都按后台高频场景整理过。
- **开箱即用的双语基础**：中英文文案通过本地字典管理，组件内统一使用 `useI18n()`，适合继续扩展多语言产品。
- **提交前可验证**：`pnpm check` 串联 lint、TypeScript 和生产构建，减少模板项目常见的“看着能跑，构建就炸”。

### 适合这些场景

- 新后台系统的第一版工程脚手架
- 运营平台、CRM、SaaS 控制台、数据管理系统
- 从 Vue 版 `nexa-admin` 迁移到 React / Next.js 的团队
- 想学习 Next App Router 下后台项目分层方式的开发者
- 需要一套可继续扩展的组件库和页面模板的产品团队

### 功能亮点

- 登录、演示鉴权、本地 token 存储和 mock 当前用户信息
- 侧边导航、顶部导航、折叠菜单、悬浮客服入口和应用外壳
- 首页仪表盘、项目介绍、表格示例、组件库文档和页面模板
- 高级列表、基础表单、详情页、结果页、异常页、个人中心、账户设置
- 按钮、表单控件、选择器、模糊搜索、日期选择、标签页、单选、多选表格
- 状态标签、完整度展示、详情信息表格和常见操作区
- 中英文国际化，所有可见业务文案通过 `useI18n()` 读取

### 技术栈

- Next.js 16 App Router
- React 19 + TypeScript strict mode
- Tailwind CSS v4
- Radix primitives + 本地 shadcn/ui 风格组件
- lucide-react 图标
- Axios 请求层，入口在 `src/api/request.ts`
- 本地双语字典，入口在 `src/locales/lang/**`
- pnpm 10

### 快速开始

```bash
pnpm install
pnpm dev
```

开发服务默认运行在 `http://localhost:5174`。演示模式可使用任意账号和密码登录，例如 `admin / admin123`。

### 常用脚本

```bash
pnpm dev        # 启动 Next.js 开发服务，端口 5174
pnpm lint       # 运行 ESLint
pnpm typecheck  # 运行 TypeScript 类型检查
pnpm build      # 生产构建
pnpm check      # 依次运行 lint、typecheck、build
```

提交前请运行 `pnpm check`。如果失败，需要先修复 lint、类型或构建错误。

### 目录结构

```text
src/
  app/                    Next App Router 页面入口
  api/                    Axios 实例、接口类型和 mock API
  components/             可复用 UI、展示组件和数据表格组件
  config/                 应用默认配置、主题和导航配置
  context/                全局应用状态 Provider
  features/               页面级业务模块，每个页面独立维护视图和数据
  layouts/                应用外壳、导航、悬浮客服和二级页面布局
  locales/                i18n 上下文和中英文文案字典
  routes/                 路由定义、路由组件注册和受保护页面渲染
  styles/                 全局样式、组件样式和模板样式
```

### 开发约定

- 页面级内容放在 `src/features/**`，不要写进 `AppShell`、`AppHeader`、`SideNavigation` 或其他布局壳组件。
- 新增路由时，先维护 `src/routes/definitions.ts`，再在 `src/routes/registry.tsx` 注册对应页面组件。
- 导航数据从路由定义派生，配置入口在 `src/config/navigation.ts`。
- 所有可见文案必须写入 `src/locales/lang/zh-CN.ts` 和 `src/locales/lang/en-US.ts`，组件内通过 `useI18n().t()` 获取。
- 请求统一使用 `src/api/request.ts` 暴露的 Axios 实例，避免在页面里创建临时请求客户端。
- 组件样式优先复用现有 `src/styles/**` 文件和本地 UI 组件，保持与 `nexa-admin` 的结构和交互一致。
- 组件、页面、路由和样式修改后，需要用 `pnpm check` 做完整验收。

### 环境变量

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

不配置 `NEXT_PUBLIC_API_BASE_URL` 时，请求基地址为空。当前演示登录和权限资源可通过本地 mock 数据运行。

### 与 nexa-admin 对齐

本项目是 `nexa-admin` 的 Next.js 版本。导航、按钮、表单、选择器、日期选择、标签页、表格、异常页、结果页、二级页面布局和人工客服交互，都应以同级目录 `../nexa-admin` 中的实现为准。修复 UI 差异时，应优先定位根组件、根样式或路由结构问题，而不是在单个页面内打补丁。

### 部署

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm exec next start --hostname 0.0.0.0 --port 5174
```

如部署平台托管 Next.js 运行时，请按平台要求运行生产输出。

## English

Nexa Next Admin is a React + Next.js admin template built for real back-office products. It is not a dashboard demo with a few decorative cards; it gives you the parts that usually take the most time to polish: layout, navigation, permissions, i18n, tables, forms, component rules, page templates, and the request layer.

If you are starting an admin system, operations workspace, SaaS console, or internal platform, and you do not want to rebuild routing, menus, table selection, filters, secondary pages, and exception pages from scratch, this project is designed to be your starting point.

### Why Star This Project

- **Product-like, not toy-like**: login, permission resources, collapsed navigation, top bar, floating support, dashboard, component docs, and page templates are included.
- **Aligned with a mature Vue version**: the project follows the sibling `nexa-admin` implementation and brings its layout, components, and interactions into React + Next.js instead of inventing a separate visual system.
- **Maintainable page structure**: page content lives in `features`, shell code lives in `layouts`, and route definitions are separated from component registration.
- **Components are not placeholders**: buttons, forms, selects, date pickers, tabs, table selection, status, and completeness components are built around common admin workflows.
- **Bilingual from the start**: Chinese and English copy are managed through local dictionaries and read with `useI18n()`.
- **Verifiable before delivery**: `pnpm check` runs lint, TypeScript, and production build in one command.

### Good Fit For

- The first engineering baseline for a new admin product
- Operations platforms, CRM, SaaS consoles, and data management systems
- Teams migrating from the Vue `nexa-admin` stack to React / Next.js
- Developers learning how to structure admin apps with Next App Router
- Product teams that need an extensible component library and page-template set

### Highlights

- Login, demo authorization, local token storage, and mocked current-user data
- Side navigation, top navigation, collapsed menus, floating support entry, and application shell
- Dashboard, project introduction, table demo, component documentation, and page templates
- Advanced list, basic form, detail, result, exception, account center, and account settings pages
- Buttons, form controls, selects, fuzzy input, date pickers, tabs, radio controls, and selectable tables
- Status chips, completeness display, detail information table, and common action areas
- Chinese and English i18n; visible business copy is read through `useI18n()`

### Tech Stack

- Next.js 16 App Router
- React 19 + TypeScript strict mode
- Tailwind CSS v4
- Radix primitives + local shadcn/ui-style components
- lucide-react icons
- Axios request layer from `src/api/request.ts`
- Local bilingual dictionaries in `src/locales/lang/**`
- pnpm 10

### Quick Start

```bash
pnpm install
pnpm dev
```

The development server runs at `http://localhost:5174` by default. Demo mode accepts any account and password, for example `admin / admin123`.

### Scripts

```bash
pnpm dev        # Start the Next.js dev server on port 5174
pnpm lint       # Run ESLint
pnpm typecheck  # Run TypeScript type checking
pnpm build      # Build for production
pnpm check      # Run lint, typecheck, and build in sequence
```

Run `pnpm check` before delivery. Fix lint, type, or build errors before committing changes.

### Project Structure

```text
src/
  app/                    Next App Router entry points
  api/                    Axios instance, API types, and mock API
  components/             Reusable UI, display, and data-table components
  config/                 App defaults, theme, and navigation config
  context/                Global application state provider
  features/               Page-level feature modules with isolated views and data
  layouts/                App shell, navigation, floating support, and secondary layouts
  locales/                i18n context plus Chinese and English dictionaries
  routes/                 Route definitions, component registry, and protected rendering
  styles/                 Global, component, and template styles
```

### Development Rules

- Keep page-level content inside `src/features/**`; do not place it in `AppShell`, `AppHeader`, `SideNavigation`, or other layout shell components.
- Add new routes in `src/routes/definitions.ts`, then register their page components in `src/routes/registry.tsx`.
- Navigation data is derived from route definitions through `src/config/navigation.ts`.
- Add every visible label to both `src/locales/lang/zh-CN.ts` and `src/locales/lang/en-US.ts`; read copy in components with `useI18n().t()`.
- Use the shared Axios instance from `src/api/request.ts`; avoid creating ad hoc request clients inside pages.
- Prefer existing `src/styles/**` files and local UI components, keeping structure and interactions aligned with `nexa-admin`.
- After component, page, route, or style changes, validate the project with `pnpm check`.

### Environment Variables

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

When `NEXT_PUBLIC_API_BASE_URL` is not set, the request base URL is empty. The current demo login and permission resources can run from local mock data.

### Alignment With nexa-admin

This project is the Next.js version of `nexa-admin`. Navigation, buttons, forms, selects, date pickers, tabs, tables, exception pages, result pages, secondary layouts, and the floating support interaction should follow the sibling `../nexa-admin` implementation. When fixing UI differences, locate the root component, root style, or route-structure issue first instead of patching one page at a time.

### Deployment

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm exec next start --hostname 0.0.0.0 --port 5174
```

If your hosting platform manages the Next.js runtime, run the production output according to that platform's requirements.
