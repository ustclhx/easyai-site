<script setup lang="ts">
withDefaults(
  defineProps<{ interactive?: boolean; dark?: boolean }>(),
  { interactive: false, dark: false },
);
</script>

<template>
  <article
    :class="[
      'rounded-[var(--ea-radius-lg)] border p-6 sm:p-8',
      dark ? 'border-white/12 bg-white/[0.055] text-white' : 'border-line bg-panel text-ink shadow-[var(--ea-shadow-sm)]',
      interactive ? 'transition duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--ea-shadow-lg)]' : '',
    ]"
  >
    <slot />
  </article>
</template>
