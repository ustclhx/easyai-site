<script setup lang="ts">
withDefaults(
  defineProps<{
    name: "arrow-up-right" | "arrow-right" | "check" | "chevron-down" | "menu" | "close";
    size?: number;
  }>(),
  { size: 18 },
);
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-if="name === 'arrow-up-right'" d="M5 19 19 5M9 5h10v10" />
    <path v-else-if="name === 'arrow-right'" d="M4 12h15M13 6l6 6-6 6" />
    <path v-else-if="name === 'check'" d="m5 12 4 4L19 6" />
    <path v-else-if="name === 'chevron-down'" d="m6 9 6 6 6-6" />
    <path v-else-if="name === 'menu'" d="M4 8h16M4 16h16" />
    <path v-else d="m6 6 12 12M18 6 6 18" />
  </svg>
</template>
