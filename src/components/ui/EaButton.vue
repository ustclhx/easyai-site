<script setup lang="ts">
import { computed } from "vue";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
type ButtonSize = "sm" | "md" | "lg";

const props = withDefaults(
  defineProps<{
    to?: string;
    type?: "button" | "submit";
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
  }>(),
  { type: "button", variant: "primary", size: "md", disabled: false },
);

const classes = computed(() => [
  "ea-button",
  `ea-button--${props.variant}`,
  `ea-button--${props.size}`,
]);
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="classes">
    <slot />
    <span aria-hidden="true" class="ea-button__arrow">↗</span>
  </RouterLink>
  <button v-else :type="type" :disabled="disabled" :class="classes">
    <slot />
    <span v-if="$slots.trailing" aria-hidden="true" class="ea-button__arrow">
      <slot name="trailing" />
    </span>
  </button>
</template>

<style scoped>
.ea-button {
  display: inline-flex;
  min-height: 2.8rem;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 720;
  line-height: 1;
  text-decoration: none;
  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
}

.ea-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.ea-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.ea-button--sm { min-height: 2.4rem; padding: 0.65rem 1rem; font-size: 0.78rem; }
.ea-button--md { padding: 0.8rem 1.25rem; }
.ea-button--lg { min-height: 3.35rem; padding: 1rem 1.55rem; }

.ea-button--primary {
  color: var(--ea-brand-ink);
  background: var(--ea-brand-lime);
  border-color: var(--ea-brand-lime);
}
.ea-button--primary:hover { background: var(--ea-brand-lime-bright); }

.ea-button--secondary {
  color: var(--ea-ink);
  background: var(--ea-surface);
  border-color: var(--ea-border);
}
.ea-button--secondary:hover { border-color: var(--ea-border-strong); }

.ea-button--ghost {
  color: var(--ea-ink);
  background: transparent;
}
.ea-button--ghost:hover { background: var(--ea-panel-strong); }

.ea-button--inverse {
  color: white;
  background: var(--ea-brand-ink);
  border-color: var(--sage-11);
}

.ea-button__arrow {
  display: inline-grid;
  width: 1.25rem;
  height: 1.25rem;
  place-items: center;
  font-size: 0.82rem;
  transition: transform 160ms ease;
}

.ea-button:hover .ea-button__arrow { transform: translate(2px, -2px); }
</style>
