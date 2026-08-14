# AGENTS.md

easyai 公司门户：Vue 3 SPA，介绍自媒体运营与电商营销两类 AI 解决方案，并提供合作咨询弹窗。

面向个人与 1—5 人小团队。文案务实，不承诺效果；图表与增长数字一律标成示意数据。

## 技术栈

- Vue 3 + TypeScript + Vite 7
- Tailwind CSS 4（`@theme inline` 映射语义色）+ Sass（`src/components/ui/` 基础组件）
- Pinia 3、Vue Router 4
- ECharts 6、lodash-es、Radix Colors
- Node `>= 22.13.0`

路径别名：`@` → `src/`。

## 常用命令

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run lint
npm run build        # 输出 dist/client，并生成 dist/server SPA worker
npm test             # typecheck + lint + build
npm run test:e2e     # Playwright 关键路径（导航、咨询弹窗、移动端、404）
```

复制 `.env.example` 为 `.env.local`，设置 `VITE_CONTACT_EMAIL`。未配置或仍是 `.example` 时，咨询表单进入私密预览，不发送用户信息。

## 目录约定

| 路径 | 职责 |
| --- | --- |
| `src/components/ui/` | `Ea*` 基础组件，经 `index.ts` 再导出 |
| `src/components/layout/` | 站点头尾、咨询弹窗 |
| `src/components/charts/` | 业务图表，内部用 `EaChart` |
| `src/views/` | 独立内页，路由懒加载 |
| `src/data/site.ts` | 跨页复用的服务与合作文案 |
| `src/stores/` | Pinia setup store |
| `src/styles/tokens.css` | `--ea-*` 语义 token（Radix Sage / Lime） |
| `src/styles/main.css` | Tailwind、主题色、全局排版类 |
| `e2e/` | Playwright 关键路径：导航、咨询弹窗、移动端、404 |

新增页面：在 `src/views/` 建 `*View.vue`，并在 `src/router/index.ts` 加懒加载路由。跨页文案放 `src/data/site.ts`，不要在多个 view 里复制。

## Vue / TypeScript

- 一律 `<script setup lang="ts">`，双引号。
- 组件名 `Ea*`。新基础组件放 `src/components/ui/`，并补 `index.ts` 导出。
- 页面与布局直接从文件导入，例如 `@/components/ui/EaButton.vue`。
- Props 用 `defineProps` + `withDefaults`；事件用 `defineEmits`。
- Store 用 setup 语法：`defineStore("name", () => { ... })`。弹层开关走 `useUiStore()`，咨询表单走 `useContactStore()`。
- 打开咨询：`useUiStore().openConsult`，不要另起一套弹窗。
- 严格 TypeScript（`noUncheckedIndexedAccess`）。不要为了过类型而写 `any`。

## 页面结构

内页按「全宽 section + 约束容器」组：

```vue
<EaSection>          <!-- tone: default | soft | dark | accent；tight 收紧垂直间距 -->
  <EaContainer>
    <EaBadge tone="accent">English eyebrow</EaBadge>
    <h1 class="section-title">中文主标题</h1>
    <p class="leading-7 text-muted">说明</p>
    <EaButton size="lg" @click="ui.openConsult">咨询</EaButton>
  </EaContainer>
</EaSection>
```

- 首页大标题用 `display-title`，内页主标题用 `section-title`，英文小标用 `eyebrow`。
- 卡片用 `EaCard`（`dark` / `interactive`），标签用 `EaBadge`，按钮用 `EaButton`（`primary` / `secondary` / `ghost` / `inverse`）。
- 不要新造全宽容器或另一套卡片/按钮。先复用现有 `Ea*`。
- 路由切换已有 `page` transition；尊重 `prefers-reduced-motion`。

## 样式

优先用 Tailwind 语义色，不要新写 hex，除非 token 里没有且设计值必须精确：

`canvas` `surface` `panel` `panel-strong` `ink` `muted` `line` `line-strong` `accent` `accent-soft` `accent-ink` `brand-ink` `brand-lime`

对应 CSS 变量在 `src/styles/tokens.css`（`--ea-*`）。圆角/阴影用 `--ea-radius-*`、`--ea-shadow-*`。

品牌色：墨绿 `#14201a`（`brand-ink`）、亮柠 `#b8f348`（`brand-lime`）。选区、主按钮、深色区块强调都走这两色。

### `src/components/ui/` 基础组件

模板只留 `ea-*` BEM 类名（如 `ea-button`、`ea-button--primary`）。少量动态状态或第三方节点（如 Icon 的 `size-5`）可以留在模板。

样式写在 `<style scoped lang="scss">`：

- 用 SCSS 嵌套写 modifier（`&--primary`）、伪类/伪元素（`&:hover`、`&::backdrop`）和断点。
- 颜色、圆角、阴影走 CSS 变量，不要新写 hex：`--ea-*`（见 `tokens.css`）。
- **不要在 SFC 的 SCSS 里用 `@apply`**。Tailwind v4 + Vite 不会展开这些规则，样式会静默丢失（容器 padding、按钮、section 间距都会坏掉）。

页面与 `layout/` 仍可直接在模板写 Tailwind 工具类；不要把 BEM 扩散到 view。

## 文案与产品边界

- 中文正文 + 英文 eyebrow / badge。语气冷静、可执行，避免营销空话。
- 不承诺增长数字、成交量或投放效果。图表旁写「示意数据 · 非效果承诺」。
- 强调「人在环内」：AI 做高频琐碎工作，人保留品牌、客户关系和成交决策。
- 两条主线不要扩成无关行业：自媒体运营（内容获客）、电商营销（增长转化）。
- 本仓库没有 i18n。不要引入 `vue-i18n` 或抽 locale 文件，除非用户明确要求。

## 图表

- 新图包一层 `EaChart`，必须传 `label` 与 `summary`（屏幕阅读器用）。
- 按需注册 ECharts 模块，不要全量引入。
- 动画跟随 `prefers-reduced-motion`。颜色对齐 `brand-ink` / `brand-lime`。

## 无障碍

- 交互控件补 `aria-label` / `aria-expanded`；装饰性箭头用 `aria-hidden`。
- 表单用 `EaField`（label 与控件关联）。弹窗用原生 `<dialog>`（见 `EaDialog`）。
- 保留 `App.vue` 的 skip link（`#main-content`）。
- 可见焦点已有全局 `:focus-visible`，不要去掉。

## 不要做的事

- 不要为了单页再引入 UI 库、CSS 框架或图标包。
- 不要从设计稿下载插画；缺图用明显占位，等正式资产。
- 不要把咨询改成会在未配置邮箱时发出去的实现。
- 不要把 `build/` 插件、`dist/` 产物或 `.env.local` 当业务改动一起提交。
- 不要扩大范围：没要求就不要加后端、账号体系或 CMS。

## 改完自检

1. 新页面已挂路由，跨页文案在 `src/data/site.ts`。
2. 用了现有 `Ea*` 与语义色，没有平行的布局/组件体系。新的 `Ea*` 基础组件用 scoped SCSS（不要 `@apply`），模板不堆长 utility 字符串。
3. 咨询入口走 `openConsult`。
4. 文案没有效果承诺；图表有示意说明和无障碍描述。
5. `npm run typecheck` 与 `npm run lint` 通过。用户可见的布局/流程改动，按 `.agents/skills/e2e-testing-patterns/SKILL.md` 判断是否补浏览器检查。
