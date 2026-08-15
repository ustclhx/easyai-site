# easyai Portal

easyai 公司门户的 Vue 3 单页应用，介绍自媒体运营、电商营销两类 AI 行业解决方案，并提供合作咨询弹窗。

## 技术栈

- Vue 3 + TypeScript + Vite
- Tailwind CSS 4
- Pinia
- Vue Router
- ECharts
- lodash-es
- Radix Colors（easyai 语义色与组件 token）

## 本地开发

```bash
npm install
npm run dev
```

开发地址为 `http://localhost:3000`。

## 质量检查

```bash
npm run typecheck
npm run lint
npm run build
npx playwright install chromium   # 首次
npm run test:e2e
```

## 项目结构

- `src/components/ui/`：easyai 基础组件库
- `src/components/layout/`：站点级布局与咨询弹窗
- `src/components/charts/`：ECharts 可视化组件
- `src/views/`：各独立内页
- `src/router/`：SPA 路由
- `src/stores/`：Pinia 状态
- `src/styles/tokens.css`：基于 Radix Colors 的语义设计 token

## 咨询邮箱

复制 `.env.example` 为 `.env.local`，配置：

```bash
VITE_CONTACT_EMAIL=hello@your-company.com
```

未配置邮箱时，表单会明确显示为私密预览状态，不会发送用户信息。

## 阿里云 ESA Pages

仓库根目录的 `esa.jsonc` 是 ESA Pages 的部署配置。通过 GitHub 仓库导入时，ESA 应使用以下设置：

| 配置项 | 值 |
| --- | --- |
| 根目录 | `/` |
| 安装命令 | `npm ci` |
| 构建命令 | `npm run build` |
| 静态资源目录 | `./dist/client` |
| 函数文件路径 | 留空 |
| Node.js | 22（由 `package.json#engines` 指定） |

这是一个纯前端 Vue SPA，不需要配置 ESA 函数入口。`assets.notFoundStrategy` 已设为 `singlePageApplication`，直接访问 `/services` 等客户端路由时会返回 `index.html` 和 `200 OK`。

本地检查构建产物：

```bash
npm ci
npm run build
test -f dist/client/index.html
```

如果项目已经在 ESA 控制台中创建，推送 `esa.jsonc` 后重新触发部署即可。配置文件的优先级高于控制台中的构建信息。
