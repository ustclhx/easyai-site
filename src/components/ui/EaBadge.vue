<script setup lang="ts">
withDefaults(defineProps<{ tone?: "neutral" | "accent" | "dark" }>(), { tone: "neutral" });
</script>

<template>
  <span class="ea-badge" :class="`ea-badge--${tone}`">
    <slot />
  </span>
</template>

<style scoped lang="scss">
.ea-badge {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--ea-border);
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  background: var(--ea-surface);
  color: var(--ea-ink-muted);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  &--accent {
    border-color: color-mix(in srgb, var(--ea-accent) 30%, transparent);
    background: var(--ea-accent-soft);
    color: var(--ea-accent-ink);
  }

  &--dark {
    border-color: rgb(255 255 255 / 0.15);
    background: rgb(255 255 255 / 0.08);
    color: rgb(255 255 255 / 0.7);
  }
}
</style>
