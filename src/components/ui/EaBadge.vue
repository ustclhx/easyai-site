<script setup lang="ts">
withDefaults(defineProps<{ tone?: "neutral" | "accent" | "dark" }>(), { tone: "neutral" });
</script>

<template>
  <span
    :class="[
      'inline-flex items-center rounded-full border px-3 py-1 text-[0.68rem] font-bold tracking-[0.1em] uppercase',
      {
        'border-line bg-surface text-muted': tone === 'neutral',
        'border-accent/30 bg-accent-soft text-accent-ink': tone === 'accent',
        'border-white/15 bg-white/8 text-white/70': tone === 'dark',
      },
    ]"
  >
    <slot />
  </span>
</template>
