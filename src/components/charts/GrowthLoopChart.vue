<script setup lang="ts">
import { computed } from "vue";

const weeks = ["第 1 周", "第 2 周", "第 3 周", "第 4 周", "第 5 周", "第 6 周"];
const values = [28, 43, 51, 72, 86, 108];
const points = computed(() => values.map((value, index) => `${index * 108 + 30},${218 - value * 1.55}`).join(" "));
const areaPoints = computed(() => `30,218 ${points.value} 570,218`);
</script>

<template>
  <figure class="mt-5" role="img" aria-label="六周相对效率指数示意图">
    <svg viewBox="0 0 600 260" class="h-auto w-full" aria-hidden="true" focusable="false">
      <g stroke="var(--ea-border)" stroke-width="1">
        <line x1="30" y1="52" x2="570" y2="52" />
        <line x1="30" y1="108" x2="570" y2="108" />
        <line x1="30" y1="164" x2="570" y2="164" />
        <line x1="30" y1="218" x2="570" y2="218" />
      </g>
      <polygon :points="areaPoints" fill="var(--ea-accent-soft)" opacity="0.72" />
      <polyline :points="points" fill="none" stroke="var(--ea-brand-ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <circle v-for="(value, index) in values" :key="value" :cx="index * 108 + 30" :cy="218 - value * 1.55" r="6" fill="var(--ea-brand-lime)" stroke="var(--ea-brand-ink)" stroke-width="3" />
    </svg>
    <div class="grid grid-cols-6 gap-1 text-center text-[0.68rem] text-muted">
      <span v-for="week in weeks" :key="week">{{ week }}</span>
    </div>
    <figcaption class="sr-only">示意数据从第 1 周的 28 增长到第 6 周的 108，用于表达流程逐步稳定后的相对趋势，不代表客户承诺。</figcaption>
  </figure>
</template>
