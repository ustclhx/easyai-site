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
    class="ea-section"
    :class="[`ea-section--${tone}`, { 'ea-section--tight': tight }]"
  >
    <slot />
  </section>
</template>

<style scoped lang="scss">
.ea-section {
  position: relative;
  overflow: hidden;
  padding-block: 5rem;
  background: var(--ea-canvas);
  color: var(--ea-ink);

  @media (min-width: 40rem) {
    padding-block: 7rem;
  }

  @media (min-width: 64rem) {
    padding-block: 9rem;
  }

  &--tight {
    padding-block: 3.5rem;

    @media (min-width: 40rem) {
      padding-block: 5rem;
    }

    @media (min-width: 64rem) {
      padding-block: 5rem;
    }
  }

  &--soft {
    background: var(--ea-surface);
  }

  &--dark {
    background: var(--ea-brand-ink);
    color: white;
  }

  &--accent {
    background: var(--ea-brand-lime);
    color: var(--ea-brand-ink);
  }
}
</style>
