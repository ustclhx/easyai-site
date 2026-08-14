<script setup lang="ts">
withDefaults(
  defineProps<{ interactive?: boolean; dark?: boolean }>(),
  { interactive: false, dark: false },
);
</script>

<template>
  <article
    class="ea-card"
    :class="{ 'ea-card--dark': dark, 'ea-card--interactive': interactive }"
  >
    <slot />
  </article>
</template>

<style scoped lang="scss">
.ea-card {
  border: 1px solid var(--ea-border);
  border-radius: var(--ea-radius-lg);
  padding: 1.5rem;
  background: var(--ea-panel);
  color: var(--ea-ink);
  box-shadow: var(--ea-shadow-sm);

  @media (min-width: 40rem) {
    padding: 2rem;
  }

  &--dark {
    border-color: rgb(255 255 255 / 0.12);
    background: rgb(255 255 255 / 0.055);
    color: white;
    box-shadow: none;
  }

  &--interactive {
    transition: transform 200ms, border-color 200ms, box-shadow 200ms;

    &:hover {
      transform: translateY(-0.25rem);
      border-color: var(--ea-border-strong);
      box-shadow: var(--ea-shadow-lg);
    }
  }
}
</style>
