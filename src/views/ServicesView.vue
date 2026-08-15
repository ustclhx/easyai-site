<script setup lang="ts">
import EaBadge from "@/components/ui/EaBadge.vue";
import EaButton from "@/components/ui/EaButton.vue";
import EaCard from "@/components/ui/EaCard.vue";
import EaContainer from "@/components/ui/EaContainer.vue";
import EaIcon from "@/components/ui/EaIcon.vue";
import EaSection from "@/components/ui/EaSection.vue";
import { services } from "@/data/site";
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();
</script>

<template>
  <div>
    <EaSection class="!pt-20 sm:!pt-28">
      <EaContainer>
        <EaBadge tone="accent">Services</EaBadge>
        <div class="mt-8 grid min-w-0 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h1 class="section-title max-w-4xl">AI 不该多一个入口，<br />而该少一段人工搬运。</h1>
          <p class="max-w-xl text-lg leading-8 text-muted">我们从你每天都在重复的运营动作开始，设计能被团队真正采用的 AI 工作流。</p>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection tone="dark" tight>
      <EaContainer>
        <div class="grid gap-5 lg:grid-cols-2">
          <EaCard v-for="service in services" :key="service.id" dark class="flex min-h-[400px] min-w-0 flex-col !p-6 sm:!p-10">
            <div class="flex items-start justify-between">
              <p class="text-sm font-bold text-brand-lime">{{ service.number }} / {{ service.eyebrow }}</p>
              <span class="text-5xl font-medium text-white/15">{{ service.number }}</span>
            </div>
            <h2 class="mt-8 text-4xl font-medium tracking-[-0.03em] sm:text-5xl">{{ service.title }}</h2>
            <p class="mt-5 max-w-xl leading-7 text-white/60">{{ service.summary }}</p>
            <ul class="mt-8 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
              <li v-for="capability in service.capabilities" :key="capability" class="flex items-center gap-2"><EaIcon name="check" :size="15" class="shrink-0 text-brand-lime" />{{ capability }}</li>
            </ul>
            <div class="mt-auto pt-10">
              <EaButton :to="service.to" variant="primary">查看方案</EaButton>
            </div>
          </EaCard>
        </div>
      </EaContainer>
    </EaSection>

    <EaSection>
      <EaContainer>
        <div class="grid min-w-0 rounded-[var(--ea-radius-lg)] border border-line bg-panel p-6 shadow-[var(--ea-shadow-sm)] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div>
            <p class="eyebrow">Start small</p>
            <h2 class="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">不确定从哪里开始？</h2>
            <p class="mt-4 max-w-2xl leading-7 text-muted">把团队最近一周最耗时、最容易漏掉的运营动作告诉我们，我们会一起判断它是否适合交给 AI。</p>
          </div>
          <EaButton size="lg" class="mt-7 lg:mt-0" @click="ui.openConsult">描述你的场景</EaButton>
        </div>
      </EaContainer>
    </EaSection>
  </div>
</template>
