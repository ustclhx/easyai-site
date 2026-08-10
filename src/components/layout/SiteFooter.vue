<script setup lang="ts">
import EaButton from "@/components/ui/EaButton.vue";
import EaContainer from "@/components/ui/EaContainer.vue";
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="bg-brand-ink text-white">
    <EaContainer>
      <div class="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:py-24">
        <div>
          <p class="text-sm font-semibold text-brand-lime">一起把 AI 放进真实业务</p>
          <h2 class="mt-5 max-w-4xl text-4xl font-medium tracking-[-0.055em] sm:text-6xl lg:text-7xl">从一个高频场景开始，<br />让团队立刻轻一点。</h2>
        </div>
        <div class="lg:text-right">
          <EaButton variant="primary" size="lg" @click="ui.openConsult">发起合作咨询</EaButton>
        </div>
      </div>
      <div class="flex flex-col gap-5 py-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <span class="grid size-8 place-items-center rounded-full bg-brand-lime font-black text-brand-ink">e</span>
          <span class="text-lg font-semibold tracking-[-0.04em] text-white">easyai</span>
        </div>
        <nav class="flex flex-wrap gap-x-6 gap-y-2" aria-label="页脚导航">
          <RouterLink to="/services">服务方向</RouterLink>
          <RouterLink to="/cooperation">合作方式</RouterLink>
          <RouterLink to="/about">关于我们</RouterLink>
        </nav>
        <p>© {{ year }} easyai</p>
      </div>
    </EaContainer>
  </footer>
</template>
