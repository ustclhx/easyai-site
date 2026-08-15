<script setup lang="ts">
import EaBadge from "@/components/ui/EaBadge.vue";
import EaButton from "@/components/ui/EaButton.vue";
import EaCard from "@/components/ui/EaCard.vue";
import EaContainer from "@/components/ui/EaContainer.vue";
import EaIcon from "@/components/ui/EaIcon.vue";
import EaSection from "@/components/ui/EaSection.vue";
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();
const capabilities = [
  { number: "01", title: "商品理解", text: "整理商品资料、竞品与评价，提炼可验证的核心卖点和适用人群。" },
  { number: "02", title: "素材生产", text: "批量生成标题、详情页结构、广告文案和短视频脚本，并按渠道适配。" },
  { number: "03", title: "活动协同", text: "围绕上新、大促和日销节奏，拆解预热、爆发与返场动作。" },
  { number: "04", title: "数据复盘", text: "聚合内容与销售反馈，定位素材和转化环节中的下一步优化点。" },
];
</script>

<template>
  <div>
    <EaSection class="!pb-18 !pt-20 sm:!pt-28">
      <EaContainer>
        <div class="grid min-w-0 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <EaBadge tone="accent">02 / 增长转化</EaBadge>
            <h1 class="section-title mt-8 max-w-5xl">每一次营销，<br />都为下一次<span class="text-[var(--ea-accent-hover)]">积累经验。</span></h1>
          </div>
          <div>
            <p class="text-lg leading-8 text-muted">围绕商品卖点、营销素材、活动节奏与复盘洞察，帮助小团队更快启动，也更快知道哪里需要调整。</p>
            <div class="mt-6 flex flex-wrap gap-2"><EaBadge v-for="tag in ['商品卖点', '营销内容', '渠道协同', '复盘洞察']" :key="tag">{{ tag }}</EaBadge></div>
          </div>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection tone="accent" tight>
      <EaContainer>
        <div class="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p class="text-xs font-black tracking-[0.14em] uppercase">One source of truth</p>
            <h2 class="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">先把商品讲清楚。</h2>
          </div>
          <div class="grid gap-px overflow-hidden rounded-[var(--ea-radius-lg)] bg-brand-ink/15 sm:grid-cols-3">
            <div v-for="item in [{label:'输入',text:'商品资料 / 评价 / 竞品'}, {label:'判断',text:'客群 / 场景 / 核心卖点'}, {label:'输出',text:'素材 / 活动 / 渠道表达'}]" :key="item.label" class="bg-brand-lime-bright/70 p-6">
              <p class="text-xs font-black tracking-[0.12em] uppercase">{{ item.label }}</p><p class="mt-6 text-xl font-semibold tracking-[-0.03em]">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection tone="dark">
      <EaContainer>
        <div class="grid gap-5 lg:grid-cols-2">
          <EaCard v-for="item in capabilities" :key="item.number" dark class="!p-7 sm:!p-9">
            <div class="flex items-center justify-between"><span class="text-sm font-bold text-brand-lime">{{ item.number }}</span><EaIcon name="arrow-up-right" :size="16" class="text-white/25" /></div>
            <h3 class="mt-10 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">{{ item.title }}</h3>
            <p class="mt-4 max-w-xl leading-7 text-white/58">{{ item.text }}</p>
          </EaCard>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection>
      <EaContainer>
        <div class="grid min-w-0 gap-9 rounded-[var(--ea-radius-lg)] border border-line bg-panel p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p class="eyebrow">Marketing system</p><h2 class="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">把“这次做完”变成“下次更快”。</h2><p class="mt-4 max-w-2xl leading-7 text-muted">从一个商品或一场活动开始，把有效素材、客户反馈和转化数据沉淀为可复用资产。</p></div>
          <EaButton size="lg" @click="ui.openConsult">咨询电商营销方案</EaButton>
        </div>
      </EaContainer>
    </EaSection>
  </div>
</template>
