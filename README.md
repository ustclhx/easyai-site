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
