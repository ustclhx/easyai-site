---
score: 23
max_score: 40
p0: 0
p1: 3
p2: 2
mode: persuade
target: src/views/HomeView.vue
timestamp: 2026-08-15T08-29-34Z
slug: src-views-homeview-vue
---
# easyai frontend critique

## Scope and mode

Target: `src/views/HomeView.vue` plus the shared shell and public routes. Mode: Persuade. Review date: 2026-08-15. Evidence combines source inspection, a 1440x1000 desktop render, a 390x844 mobile render, the Impeccable detector, and `npm run test`.

## Executive assessment

The site has a coherent sage/lime and ink system, clear Chinese copy, a good page sequence, and a stronger accessibility baseline than most marketing sites. Desktop rendering is polished. The main gap is credibility and mobile resilience: the first viewport sells a visual concept and a static workflow rather than a verifiable deliverable, while intrinsic grid sizing visibly clips the hero and service copy at 390px. The contact flow also presents a non-sending preview in the default build, which makes the primary conversion action unreliable.

## Heuristic score

Scores are 0 (poor) to 4 (strong), total 23/40.

| Heuristic | Score | Evidence |
| --- | ---: | --- |
| Visibility of system status | 2 | Form feedback exists, but the "AI 员工 · 工作中" workflow is static and gives no live/demo state. |
| Match to real world | 3 | Channels and actions are concrete; terms such as 私域承接 and 营销复盘 still need a first-timer explanation. |
| User control and freedom | 2 | Dialog and mobile menu can close, but dropdown focus return and mobile keyboard behavior are incomplete. |
| Consistency and standards | 3 | Visual tokens are consistent, but CTA labels and raw glyph arrows/checkmarks vary. |
| Error prevention | 2 | Required fields exist, but contact input is free-form, privacy has no link, and default submit cannot send. |
| Recognition over recall | 3 | Two service lines and capabilities are easy to scan; no concrete output sample is shown. |
| Flexibility and efficiency | 2 | Deep service links exist, but keyboard menu controls and skip-to-service paths are limited. |
| Aesthetic and minimalist design | 3 | Strong desktop hierarchy; mobile clipping, giant type, repeated rounded cards, gradients and glow reduce refinement. |
| Error recovery | 2 | Generic retry copy exists, but there is no field-level validation or recovery guidance. |
| Help and documentation | 1 | No FAQ, implementation boundary, response-time promise, pricing signal, or linked privacy policy. |

## Priority findings

### S3 — Mobile content is visibly clipped

At 390x844 the home H1 (`让小团队，拥有一支AI 运营队`) runs past the right edge; the first paragraph line is also cropped. The service page shows the same right-edge crop in its intro paragraph. `EaSection` uses `overflow-hidden`, so the overflow is hidden rather than discoverable as horizontal scrolling. The likely root is the hard `<br>` plus `.display-title { font-size: clamp(3rem, 8vw, 7.5rem) }` and grid children retaining intrinsic min-content width.

Evidence: `src/views/HomeView.vue:23-63`, `src/views/ServicesView.vue:12-24`, `src/components/ui/EaSection.vue:11-27`, `src/styles/main.css:101-106`.

Fix direction: add `min-w-0` to responsive grid children, remove or soften forced line breaks on narrow viewports, and define a mobile title size/line-height that keeps the longest line inside the container. Re-test at 320, 360, 390 and 430px.

### S3 — The primary conversion can be a dead end

With no `VITE_CONTACT_EMAIL`, submit resolves to `preview` and explicitly says the information was not sent. That is an acceptable development fallback but not an acceptable shipped conversion experience. The form also promises no response time, has no privacy-policy link, and accepts an arbitrary contact string without a format hint.

Evidence: `src/stores/contact.ts:26-55`, `src/components/layout/ConsultDialog.vue:27-57`.

Fix direction: configure a real endpoint before release, show the expected next step and response window, link the privacy policy, and use appropriate `autocomplete`/input semantics or separate contact methods.

### S3 — The only quantitative proof looks arbitrary

The chart advertises `+285%` and a `28 → 108` series while only labeling it “示意数据 · 非效果承诺.” There is no unit, baseline, denominator, visible y-axis, or real anonymized case artifact. A decision maker can read the badge as a performance claim and has no way to validate it without booking a call.

Evidence: `src/views/HomeView.vue:125-139`, `src/components/charts/GrowthLoopChart.vue:6-49`.

Fix direction: replace the hero chart with a real anonymized workflow artifact or label the chart as an interaction demo; if metrics remain, define the metric and baseline next to the value and provide a case/source link.

### S2 — Navigation state and keyboard semantics are under-specified

The mobile trigger keeps `aria-label="打开导航"` when expanded and renders the same hamburger glyph. The dropdown closes on Escape but does not move focus into the menu, support Arrow/Home/End navigation, or return focus to its trigger. Router links do not expose `aria-current` explicitly.

Evidence: `src/components/layout/SiteHeader.vue:45-77`, `src/components/ui/EaDropdown.vue:41-67`.

Fix direction: switch label/icon to “关闭导航”/close icon while open, add focus management and roving keyboard behavior, and expose current route state.

### S2 — Desktop polish is not yet a distinctive product proof

The palette and rhythm are coherent, but the visual world relies on common AI-site signals: oversized display type, grid texture, radial page gradients, a lime blur orb, and a sequence of rounded cards. The first viewport lacks a product UI, sample output, case proof, pricing signal, or scope boundary. The result is attractive but generic and hard to evaluate.

Evidence: `src/styles/main.css:29-37`, `src/views/HomeView.vue:23-68`, repeated card treatments in `src/views/HomeView.vue` and `src/views/ServicesView.vue`.

Fix direction: make one concrete deliverable the first-viewport signal (an anonymized content brief, lead triage result, or before/after workflow), then reduce decorative glow/card repetition around it.

## Secondary technical backlog

- Production build passes, but `HomeView` is a 521.23 KB minified chunk (175.84 KB gzip) because ECharts is pulled into the homepage; lazy-load the chart or split chart code.
- `src/router/index.ts` has no route-level titles/meta, so every route inherits the static `index.html` title; set titles and canonical/social metadata per route.
- Form fields lack `autocomplete` hints and the contact field is `type="text"`; this increases mobile completion friction.
- Raw Unicode arrows/checkmarks/bullets are used in controls and content (`HomeView.vue`, `ServicesView.vue`, `EaButton.vue`) instead of the project icon language.

## Persona red flags

- First-timer: jargon is understandable only after context, and there is no sample deliverable or effort/price boundary.
- Power user: no integration/model/privacy/workflow implementation detail and no interactive demo beyond a static chart.
- Decision maker: no customer evidence, ROI denominator, SLA, or reliable handoff expectation; the default form explicitly does not send.

## Strengths to preserve

- Clear narrative progression: hero → two service lines → human/AI boundary → workflow trend → CTA.
- Specific domain copy names Xiaohongshu, Douyin, WeChat Work, comments, DMs, and follow-up.
- Skip link, visible focus styles, reduced-motion handling, native modal semantics, required labels, and chart screen-reader summary are solid foundations.

## Provocative questions

1. Why show `+285%` if it cannot be tied to a unit and baseline?
2. What is the one decision the visitor should make after the hero, and can they make it without a call?
3. Is “AI 员工” framed clearly enough to avoid autonomous-execution expectations?
4. Why is the only proof a synthetic chart instead of an anonymized real workflow artifact?

## Verification

- `node .../detect.mjs --json src/views/HomeView.vue` → `[]`.
- `node .../detect.mjs --json src/components` → `[]`.
- `npm run test` → typecheck passed, ESLint passed, Vite build passed; Vite warned that the `HomeView` chunk exceeds 500 KB.
- Chrome renders: desktop 1440x1000 is visually stable; mobile 390x844 visibly clips the home hero and services intro at the right edge.
