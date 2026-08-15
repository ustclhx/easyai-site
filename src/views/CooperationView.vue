<script setup lang="ts">
import EaBadge from "@/components/ui/EaBadge.vue";
import EaButton from "@/components/ui/EaButton.vue";
import EaCard from "@/components/ui/EaCard.vue";
import EaContainer from "@/components/ui/EaContainer.vue";
import EaSection from "@/components/ui/EaSection.vue";
import { cooperationSteps } from "@/data/site";
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();
</script>

<template>
  <div>
    <EaSection class="!pt-20 sm:!pt-28">
      <EaContainer>
        <EaBadge tone="accent">Cooperation</EaBadge>
        <div class="mt-8 grid min-w-0 gap-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h1 class="section-title">先跑通一个场景，<br />再扩展一套能力。</h1>
          <p class="text-lg leading-8 text-muted">合作从真实业务问题开始。我们共同定义目标、试跑流程、确认边界，再决定下一步投入。</p>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection tone="dark" tight>
      <EaContainer>
        <ol class="grid gap-px overflow-hidden rounded-[var(--ea-radius-lg)] border border-white/10 bg-white/10 lg:grid-cols-4">
          <li v-for="step in cooperationSteps" :key="step.number" class="min-h-80 bg-brand-ink p-7 sm:p-9">
            <span class="text-sm font-black text-brand-lime">{{ step.number }}</span>
            <h2 class="mt-16 text-3xl font-medium tracking-[-0.04em]">{{ step.title }}</h2>
            <p class="mt-4 text-sm leading-6 text-white/56">{{ step.text }}</p>
          </li>
        </ol>
      </EaContainer>
    </EaSection>

    <EaSection>
      <EaContainer>
        <div class="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div><p class="eyebrow">A good starting point</p><h2 class="mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">什么样的需求，适合先聊？</h2><p class="mt-5 leading-7 text-muted">你不需要准备完整需求文档。下面这些信号，通常意味着流程已经值得被重新设计。</p></div>
          <div class="grid gap-4 sm:grid-cols-2">
            <EaCard v-for="(item, index) in ['内容任务挤占核心业务时间','评论私信多，容易漏掉咨询','多人协作靠手工复制粘贴','做过营销，但经验没有沉淀']" :key="item" class="min-h-44">
              <span class="text-xs font-black text-muted">0{{ index + 1 }}</span><h3 class="mt-8 text-xl font-semibold leading-7 tracking-[-0.03em]">{{ item }}</h3>
            </EaCard>
          </div>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection tone="accent" tight>
      <EaContainer>
        <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div><p class="text-sm font-bold">准备好从一个场景开始了吗？</p><h2 class="mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">把最耗时的动作告诉我们。</h2></div>
          <EaButton variant="inverse" size="lg" @click="ui.openConsult">打开咨询表单</EaButton>
        </div>
      </EaContainer>
    </EaSection>
  </div>
</template>
