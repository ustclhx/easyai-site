<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export interface DropdownItem {
  label: string;
  description: string;
  to: string;
}

defineProps<{ label: string; items: DropdownItem[] }>();
const open = ref(false);
const root = ref<HTMLElement>();
const trigger = ref<HTMLButtonElement>();
const menu = ref<HTMLElement>();
const router = useRouter();

function close() {
  open.value = false;
}

function closeAndRestore() {
  close();
  nextTick(() => trigger.value?.focus());
}

function focusItem(index: number) {
  const items = menu.value?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]');
  if (!items?.length) return;
  const nextIndex = (index + items.length) % items.length;
  items[nextIndex]?.focus();
}

function openMenu() {
  open.value = true;
  nextTick(() => focusItem(0));
}

function onDocumentClick(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) close();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") closeAndRestore();
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openMenu();
  }
}

function onMenuKeydown(event: KeyboardEvent) {
  const items = menu.value?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]');
  const currentIndex = Array.from(items ?? []).indexOf(document.activeElement as HTMLButtonElement);
  if (event.key === "Escape") {
    event.preventDefault();
    closeAndRestore();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    focusItem(currentIndex + 1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    focusItem(currentIndex - 1);
  } else if (event.key === "Home") {
    event.preventDefault();
    focusItem(0);
  } else if (event.key === "End") {
    event.preventDefault();
    focusItem((items?.length ?? 1) - 1);
  }
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
  <div ref="root" class="relative">
    <button
      ref="trigger"
      type="button"
      class="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted transition hover:bg-panel-strong hover:text-ink"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click.stop="open = !open"
      @keydown="onTriggerKeydown"
    >
      {{ label }}
      <span aria-hidden="true" :class="['transition', open ? 'rotate-180' : '']"><EaIcon name="chevron-down" :size="14" /></span>
    </button>
    <Transition name="dropdown">
      <div
        v-if="open"
        ref="menu"
        role="menu"
        tabindex="-1"
        class="absolute top-[calc(100%+0.8rem)] left-1/2 w-80 -translate-x-1/2 rounded-[var(--ea-radius-md)] border border-line bg-surface p-2 shadow-[var(--ea-shadow-lg)]"
        @keydown="onMenuKeydown"
      >
        <button
          v-for="item in items"
          :key="item.to"
          type="button"
          role="menuitem"
          class="grid w-full gap-1 rounded-xl px-4 py-3 text-left transition hover:bg-panel-strong"
          @click="router.push(item.to); close()"
        >
          <span class="text-sm font-bold text-ink">{{ item.label }}</span>
          <span class="text-xs leading-5 text-muted">{{ item.description }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active { transition: opacity 140ms ease, transform 140ms ease; }
.dropdown-enter-from,
.dropdown-leave-to { opacity: 0; transform: translate(-50%, -6px); }
</style>
