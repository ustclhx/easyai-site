<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: "default" | "soft" | "dark" | "accent";
    tight?: boolean;
  }>(),
  { tone: "default", tight: false },
);
</script>

<template>
  <section
    :class="[
      'relative overflow-hidden',
      tight ? 'py-14 sm:py-20' : 'py-20 sm:py-28 lg:py-36',
      {
        'bg-canvas text-ink': tone === 'default',
        'bg-surface text-ink': tone === 'soft',
        'bg-brand-ink text-white': tone === 'dark',
        'bg-brand-lime text-brand-ink': tone === 'accent',
      },
    ]"
  >
    <slot />
  </section>
</template>
