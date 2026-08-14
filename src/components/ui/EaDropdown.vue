<script setup lang="ts">
import { Icon } from "@iconify/vue";
import arrowDownIcon from "@iconify/icons-eva/arrow-ios-downward-fill";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export interface DropdownItem {
  label: string;
  description: string;
  to: string;
}

defineProps<{ label: string; items: DropdownItem[] }>();
const open = ref(false);
const root = ref<HTMLElement>();
const router = useRouter();

function close() {
  open.value = false;
}

function onDocumentClick(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) close();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") close();
}

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div ref="root" class="ea-dropdown">
    <button
      type="button"
      class="ea-dropdown__trigger"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click.stop="open = !open"
    >
      {{ label }}
      <Icon
        :icon="arrowDownIcon"
        aria-hidden="true"
        class="ea-dropdown__chevron"
        :class="{ 'is-open': open }"
      />
    </button>
    <Transition name="dropdown">
      <div v-if="open" role="menu" class="ea-dropdown__panel">
        <button
          v-for="item in items"
          :key="item.to"
          type="button"
          role="menuitem"
          class="ea-dropdown__item"
          @click="router.push(item.to); close()"
        >
          <span class="ea-dropdown__label">{{ item.label }}</span>
          <span class="ea-dropdown__hint">{{ item.description }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.ea-dropdown {
  position: relative;

  &__trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    border-radius: 999px;
    padding: 0.5rem 0.75rem;
    color: var(--ea-ink-muted);
    font-size: 0.875rem;
    font-weight: 600;
    transition: background 160ms ease, color 160ms ease;

    &:hover {
      background: var(--ea-panel-strong);
      color: var(--ea-ink);
    }
  }

  &__chevron {
    width: 0.875rem;
    height: 0.875rem;
    transition: transform 160ms ease;

    &.is-open {
      transform: rotate(180deg);
    }
  }

  &__panel {
    position: absolute;
    top: calc(100% + 0.8rem);
    left: 50%;
    width: 20rem;
    border: 1px solid var(--ea-border);
    border-radius: var(--ea-radius-md);
    padding: 0.5rem;
    background: var(--ea-surface);
    box-shadow: var(--ea-shadow-lg);
    transform: translateX(-50%);
  }

  &__item {
    display: grid;
    width: 100%;
    gap: 0.25rem;
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    text-align: left;
    transition: background 160ms ease;

    &:hover {
      background: var(--ea-panel-strong);
    }
  }

  &__label {
    color: var(--ea-ink);
    font-size: 0.875rem;
    font-weight: 700;
  }

  &__hint {
    color: var(--ea-ink-muted);
    font-size: 0.75rem;
    line-height: 1.25rem;
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 140ms ease, transform 140ms ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translate(-50%, -6px);
}
</style>
