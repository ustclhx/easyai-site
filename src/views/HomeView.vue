<script setup lang="ts">
import GrowthLoopChart from "@/components/charts/GrowthLoopChart.vue";
import EaBadge from "@/components/ui/EaBadge.vue";
import EaButton from "@/components/ui/EaButton.vue";
import EaCard from "@/components/ui/EaCard.vue";
import EaContainer from "@/components/ui/EaContainer.vue";
import EaSection from "@/components/ui/EaSection.vue";
import { cooperationSteps, services } from "@/data/site";
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();

const workflow = [
  { label: "理解业务", text: "读取产品、客群与历史素材" },
  { label: "生成动作", text: "给出选题、内容、回复与跟进建议" },
  { label: "人工把关", text: "保留关键决策和品牌审核" },
  { label: "反馈优化", text: "用真实结果持续校准流程" },
];
</script>

<template>
  <div>
    <EaSection class="min-h-[calc(100vh-74px)] !pt-12 sm:!pt-16 lg:!pt-20">
      <div class="pointer-events-none absolute inset-0 grid-surface opacity-45 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <EaContainer>
        <div class="relative grid items-end gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
          <div class="pt-7 lg:pt-14">
            <EaBadge tone="accent">AI operations for small teams</EaBadge>
            <h1 class="display-title mt-8 max-w-5xl">
              让小团队，<br />拥有一支<span class="relative inline-block px-[0.06em]"><span class="absolute inset-x-0 bottom-[0.02em] -z-10 h-[0.36em] -rotate-1 bg-brand-lime" />AI 运营队</span>
            </h1>
            <p class="mt-8 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
              easyai 聚焦自媒体运营与电商营销，把内容生产、线索识别、私域承接和营销复盘接进真实工作流。
            </p>
            <div class="mt-9 flex flex-wrap gap-3">
              <EaButton size="lg" @click="ui.openConsult">聊聊你的场景</EaButton>
              <EaButton to="/services" size="lg" variant="secondary">查看服务方向</EaButton>
            </div>
          </div>

          <div class="relative lg:pb-3">
            <div class="absolute -top-7 -right-3 size-28 rounded-full bg-brand-lime blur-3xl" />
            <div class="relative overflow-hidden rounded-[2rem] border border-line bg-brand-ink p-5 text-white shadow-[var(--ea-shadow-lg)] sm:p-7">
              <div class="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p class="text-xs font-bold tracking-[0.12em] text-brand-lime uppercase">AI 员工 · 工作中</p>
                  <p class="mt-2 text-xl font-semibold">今日运营流</p>
                </div>
                <span class="flex items-center gap-2 rounded-full bg-white/8 px-3 py-2 text-xs text-white/65"><i class="size-2 rounded-full bg-brand-lime shadow-[0_0_0_5px_rgba(184,243,72,.12)]" />在线</span>
              </div>
              <ol class="mt-4 grid gap-2">
                <li v-for="(item, index) in workflow" :key="item.label" class="grid grid-cols-[2.2rem_1fr_auto] items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.045] p-3.5">
                  <span class="grid size-8 place-items-center rounded-full bg-white/7 text-xs text-white/55">0{{ index + 1 }}</span>
                  <span><strong class="block text-sm">{{ item.label }}</strong><small class="mt-1 block text-xs text-white/50">{{ item.text }}</small></span>
                  <span class="text-brand-lime">✓</span>
                </li>
              </ol>
              <div class="mt-4 flex items-center justify-between rounded-2xl bg-brand-lime p-4 text-brand-ink">
                <span class="text-sm font-bold">下一步：审核高意向私信</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>
          </div>
        </div>

        <div class="relative mt-20 grid gap-px overflow-hidden rounded-[var(--ea-radius-md)] border border-line bg-line sm:grid-cols-3 lg:mt-28">
          <div v-for="item in ['服务 1—5 人小团队', '覆盖内容与电商两条链路', '从一个可衡量场景开始']" :key="item" class="bg-canvas px-5 py-4 text-sm font-semibold text-muted sm:px-7">{{ item }}</div>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection tone="dark">
      <EaContainer>
        <div class="grid gap-9 border-b border-white/12 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p class="eyebrow !text-white/55">What we do</p>
            <p class="mt-5 max-w-sm leading-7 text-white/58">不卖一个孤立的生成工具，而是把 AI 放进从获客到成交的连续动作里。</p>
          </div>
          <h2 class="section-title">两条主线，<br /><span class="text-brand-lime">一个增长闭环。</span></h2>
        </div>

        <div class="mt-10 grid gap-5 lg:grid-cols-2">
          <RouterLink v-for="service in services" :key="service.id" :to="service.to" class="group block">
            <EaCard dark interactive class="h-full !p-7 sm:!p-9">
              <div class="flex items-start justify-between gap-6">
                <div>
                  <p class="text-xs font-bold tracking-[0.14em] text-brand-lime uppercase">{{ service.number }} / {{ service.eyebrow }}</p>
                  <h3 class="mt-5 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">{{ service.title }}</h3>
                </div>
                <span class="grid size-12 shrink-0 place-items-center rounded-full border border-white/15 text-lg transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-brand-lime group-hover:text-brand-ink">↗</span>
              </div>
              <p class="mt-8 max-w-xl text-base leading-7 text-white/60">{{ service.summary }}</p>
              <div class="mt-9 flex flex-wrap gap-2">
                <EaBadge v-for="capability in service.capabilities" :key="capability" tone="dark">{{ capability }}</EaBadge>
              </div>
            </EaCard>
          </RouterLink>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection>
      <EaContainer>
        <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p class="eyebrow">Designed for lean teams</p>
            <h2 class="section-title mt-6">少做重复劳动，<br />多做关键判断。</h2>
            <p class="mt-7 max-w-xl text-lg leading-8 text-muted">AI 负责高频、琐碎、需要快速响应的工作；人保留品牌判断、客户关系和成交决策。</p>
            <EaButton to="/cooperation" variant="secondary" class="mt-8">看看怎么合作</EaButton>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <EaCard v-for="(item, index) in cooperationSteps" :key="item.number" class="min-h-52">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black tracking-[0.12em] text-muted">{{ item.number }}</span>
                <span class="grid size-8 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent-ink">{{ index + 1 }}</span>
              </div>
              <h3 class="mt-10 text-2xl font-semibold tracking-[-0.035em]">{{ item.title }}</h3>
              <p class="mt-3 text-sm leading-6 text-muted">{{ item.text }}</p>
            </EaCard>
          </div>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection tone="soft">
      <EaContainer>
        <div class="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <EaBadge tone="accent">示意数据 · 非效果承诺</EaBadge>
            <h2 class="mt-6 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">让流程逐周变稳，<br />增长才有复利。</h2>
            <p class="mt-5 max-w-lg leading-7 text-muted">用 ECharts 构建的可复用运营看板组件，把团队真正关心的内容触达、有效线索和跟进效率放到同一视图。</p>
          </div>
          <EaCard class="!p-4 sm:!p-7">
            <div class="flex items-center justify-between px-2 pt-2">
              <div><p class="text-sm font-bold">稳定触达趋势</p><p class="mt-1 text-xs text-muted">六周工作流示意</p></div>
              <span class="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent-ink">+285%</span>
            </div>
            <GrowthLoopChart />
          </EaCard>
        </div>
      </EaContainer>
    </EaSection>
  </div>
</template>
