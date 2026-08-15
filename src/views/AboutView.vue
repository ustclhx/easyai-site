<script setup lang="ts">
import EaBadge from "@/components/ui/EaBadge.vue";
import EaButton from "@/components/ui/EaButton.vue";
import EaCard from "@/components/ui/EaCard.vue";
import EaContainer from "@/components/ui/EaContainer.vue";
import EaSection from "@/components/ui/EaSection.vue";
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();
const principles = [
  { number: "01", title: "先业务，后 AI", text: "先确认流程、角色和目标，再决定模型与工具，避免为了使用 AI 而创造额外工作。" },
  { number: "02", title: "人始终在环", text: "关键内容、客户沟通和业务承诺由人做最终判断，AI 提供速度，不替代责任。" },
  { number: "03", title: "从小处验证", text: "优先选择高频、可衡量、风险清晰的场景，在真实使用中逐步扩展。" },
];
</script>

<template>
  <div>
    <EaSection class="!pt-20 sm:!pt-28">
      <EaContainer>
        <EaBadge tone="accent">About easyai</EaBadge>
        <div class="mt-8 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <h1 class="section-title max-w-5xl">AI 的价值，<br />发生在<span class="text-[var(--ea-accent-hover)]">工作现场。</span></h1>
          <p class="text-lg leading-8 text-muted">easyai 面向个人与 1—5 人团队，提供自媒体运营和电商营销 AI 行业解决方案。</p>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection tone="dark" tight>
      <EaContainer>
        <div class="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div><p class="eyebrow !text-white/55">Why we exist</p><p class="mt-5 max-w-sm leading-7 text-white/58">大公司能用团队和系统解决的问题，小团队更需要简单、连贯、马上可用的工作方式。</p></div>
          <blockquote class="text-3xl font-medium leading-[1.18] tracking-[-0.03em] sm:text-5xl lg:text-6xl">“不是再给小团队一堆工具，<br />而是给他们一套<span class="text-brand-lime">能完成工作的能力。</span>”</blockquote>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection>
      <EaContainer>
        <div class="grid gap-5 lg:grid-cols-3">
          <EaCard v-for="principle in principles" :key="principle.number" class="min-h-[330px]">
            <span class="text-xs font-black text-muted">{{ principle.number }}</span>
            <h2 class="mt-16 text-3xl font-semibold tracking-[-0.04em]">{{ principle.title }}</h2>
            <p class="mt-5 leading-7 text-muted">{{ principle.text }}</p>
          </EaCard>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection tone="soft" tight>
      <EaContainer>
        <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p class="eyebrow">Keep it practical</p><h2 class="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">有具体问题，比有完整方案更重要。</h2><p class="mt-4 max-w-2xl leading-7 text-muted">如果你正在经营内容或电商业务，欢迎从一个真实卡点开始聊。</p></div>
          <EaButton size="lg" @click="ui.openConsult">和 easyai 聊聊</EaButton>
        </div>
      </EaContainer>
    </EaSection>
  </div>
</template>
