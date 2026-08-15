<script setup lang="ts">
import GrowthLoopChart from "@/components/charts/GrowthLoopChart.vue";
import EaBadge from "@/components/ui/EaBadge.vue";
import EaButton from "@/components/ui/EaButton.vue";
import EaCard from "@/components/ui/EaCard.vue";
import EaContainer from "@/components/ui/EaContainer.vue";
import EaIcon from "@/components/ui/EaIcon.vue";
import EaSection from "@/components/ui/EaSection.vue";
import { cooperationSteps, services } from "@/data/site";
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();

const workflow = [
  { label: "理解业务", text: "产品、客群、历史素材" },
  { label: "生成动作", text: "选题、内容、回复、跟进" },
  { label: "人工把关", text: "品牌风险与客户承诺" },
  { label: "反馈优化", text: "用真实结果校准流程" },
];

const deliverySignals = [
  { value: "01", label: "先选一个高频场景" },
  { value: "1—5", label: "适合精干团队" },
  { value: "人 + AI", label: "关键判断始终在环" },
];
</script>

<template>
  <div>
    <EaSection class="home-hero !pt-12 sm:!pt-16 lg:!pt-20">
      <EaContainer>
        <div class="relative grid min-w-0 items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div class="min-w-0 pt-4 lg:pt-8">
            <EaBadge tone="accent">AI operations for small teams</EaBadge>
            <h1 class="display-title mt-7 max-w-5xl">
              让小团队，<br />拥有一支<br class="hero-mobile-break" /><span class="relative inline-block px-[0.04em]"><span class="absolute inset-x-0 bottom-[0.08em] -z-10 h-[0.34em] -rotate-1 bg-brand-lime" />AI 运营队</span>
            </h1>
            <p class="prose-measure mt-7 max-w-2xl text-base leading-7 text-muted sm:mt-8 sm:text-lg sm:leading-8">
              easyai 聚焦自媒体运营与电商营销，把内容生产、线索识别、私域承接和营销复盘接进真实工作流。
            </p>
            <div class="mt-8 flex flex-wrap gap-3 sm:mt-9">
              <EaButton size="lg" @click="ui.openConsult">聊聊你的场景</EaButton>
              <EaButton to="/services" size="lg" variant="secondary">查看服务方向</EaButton>
            </div>
            <dl class="mt-10 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-[var(--ea-radius-md)] border border-line bg-line">
              <div v-for="signal in deliverySignals" :key="signal.value" class="min-w-0 bg-canvas px-3 py-4 sm:px-5">
                <dt class="text-sm font-semibold tracking-[-0.02em] text-ink sm:text-base">{{ signal.value }}</dt>
                <dd class="mt-1 text-[0.68rem] leading-5 text-muted sm:text-xs">{{ signal.label }}</dd>
              </div>
            </dl>
          </div>

          <div class="min-w-0 lg:pb-2">
            <div class="relative overflow-hidden rounded-[var(--ea-radius-lg)] border border-line bg-brand-ink p-5 text-white shadow-[var(--ea-shadow-lg)] sm:p-7">
              <div class="flex items-start justify-between gap-4 border-b border-white/12 pb-5">
                <div class="min-w-0">
                  <p class="text-xs font-bold tracking-[0.12em] text-brand-lime uppercase">交付样例 · 内容获客</p>
                  <p class="mt-2 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">一条可审核的运营流</p>
                </div>
                <span class="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/65">示意数据</span>
              </div>
              <div class="mt-5 rounded-[var(--ea-radius-md)] border border-white/10 bg-white/[0.045] p-4 sm:p-5">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="text-xs text-white/50">输入</p>
                    <p class="mt-1 text-sm font-semibold">本周评论与私信</p>
                  </div>
                  <span class="text-xs text-brand-lime">待审核</span>
                </div>
                <ol class="mt-4 grid gap-2">
                  <li v-for="(item, index) in workflow" :key="item.label" class="grid min-w-0 grid-cols-[1.8rem_minmax(0,1fr)_auto] items-center gap-3 border-t border-white/8 py-3">
                    <span class="grid size-7 place-items-center rounded-full bg-white/10 text-[0.68rem] text-white/55">0{{ index + 1 }}</span>
                    <span class="min-w-0"><strong class="block truncate text-sm">{{ item.label }}</strong><small class="mt-1 block truncate text-xs text-white/50">{{ item.text }}</small></span>
                    <EaIcon name="check" :size="16" class="text-brand-lime" />
                  </li>
                </ol>
              </div>
              <div class="mt-4 flex items-center justify-between gap-4 rounded-[var(--ea-radius-md)] bg-brand-lime px-4 py-3 text-brand-ink sm:px-5 sm:py-4">
                <span class="text-sm font-bold">下一步：人工审核高意向私信</span>
                <EaIcon name="arrow-right" :size="17" />
              </div>
            </div>
          </div>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection tone="dark">
      <EaContainer>
        <div class="grid min-w-0 gap-8 border-b border-white/12 pb-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <p class="max-w-sm leading-7 text-white/60">不卖一个孤立的生成工具，而是把 AI 放进从获客到成交的连续动作里。</p>
          <h2 class="section-title">两条主线，<br /><span class="text-brand-lime">一个增长闭环。</span></h2>
        </div>

        <div class="mt-10 grid min-w-0 gap-5 lg:grid-cols-2">
          <RouterLink v-for="service in services" :key="service.id" :to="service.to" class="group block min-w-0">
            <EaCard dark interactive class="h-full !p-6 sm:!p-9">
              <div class="flex min-w-0 items-start justify-between gap-5">
                <div class="min-w-0">
                  <p class="text-xs font-bold tracking-[0.12em] text-brand-lime uppercase">{{ service.number }} / {{ service.eyebrow }}</p>
                  <h3 class="mt-4 text-3xl font-medium tracking-[-0.03em] sm:text-5xl">{{ service.title }}</h3>
                </div>
                <span class="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-brand-lime group-hover:text-brand-ink"><EaIcon name="arrow-up-right" :size="17" /></span>
              </div>
              <p class="mt-7 max-w-xl text-base leading-7 text-white/60">{{ service.summary }}</p>
              <div class="mt-8 flex flex-wrap gap-2">
                <EaBadge v-for="capability in service.capabilities" :key="capability" tone="dark">{{ capability }}</EaBadge>
              </div>
            </EaCard>
          </RouterLink>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection>
      <EaContainer>
        <div class="grid min-w-0 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div class="min-w-0">
            <h2 class="section-title mt-0">少做重复劳动，<br />多做关键判断。</h2>
            <p class="mt-6 max-w-xl text-lg leading-8 text-muted">AI 负责高频、琐碎、需要快速响应的工作；人保留品牌判断、客户关系和成交决策。</p>
            <EaButton to="/cooperation" variant="secondary" class="mt-8">看看怎么合作</EaButton>
          </div>
          <div class="grid min-w-0 gap-4 sm:grid-cols-2">
            <EaCard v-for="(item, index) in cooperationSteps" :key="item.number" class="min-h-48">
              <div class="flex items-center justify-between"><span class="text-xs font-black tracking-[0.12em] text-muted">{{ item.number }}</span><span class="grid size-7 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent-ink">{{ index + 1 }}</span></div>
              <h3 class="mt-9 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{{ item.title }}</h3>
              <p class="mt-3 text-sm leading-6 text-muted">{{ item.text }}</p>
            </EaCard>
          </div>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection tone="soft">
      <EaContainer>
        <div class="grid min-w-0 gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div class="min-w-0">
            <EaBadge tone="accent">流程看板示意</EaBadge>
            <h2 class="section-title mt-6">让流程逐周变稳，<br />增长才有复利。</h2>
            <p class="mt-5 max-w-lg leading-7 text-muted">把内容触达、有效线索和跟进效率放到同一视图。图表仅用于展示组件形态，不代表客户结果。</p>
          </div>
          <EaCard class="min-w-0 !p-4 sm:!p-7">
            <div class="flex items-start justify-between gap-4 px-1 pt-1">
              <div><p class="text-sm font-bold">相对效率指数</p><p class="mt-1 text-xs text-muted">近六周工作流示意</p></div>
              <span class="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent-ink">演示</span>
            </div>
            <GrowthLoopChart />
          </EaCard>
        </div>
      </EaContainer>
    </EaSection>
  </div>
</template>
