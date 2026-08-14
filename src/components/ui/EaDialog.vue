<script setup lang="ts">
import { Icon } from "@iconify/vue";
import closeIcon from "@iconify/icons-material-symbols/close";
import { nextTick, onMounted, ref, watch } from "vue";

const props = defineProps<{
  open: boolean;
  title: string;
  description?: string;
}>();

const emit = defineEmits<{ "update:open": [value: boolean] }>();
const dialog = ref<HTMLDialogElement>();

async function syncDialog(open: boolean) {
  await nextTick();
  const element = dialog.value;
  if (!element) return;
  if (open && !element.open) element.showModal();
  if (!open && element.open) element.close();
}

function close() {
  emit("update:open", false);
}

function onBackdropClick(event: MouseEvent) {
  if (event.target === dialog.value) close();
}

watch(() => props.open, syncDialog);
onMounted(() => syncDialog(props.open));
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="ea-dialog"
      :aria-label="title"
      @cancel.prevent="close"
      @close="close"
      @click="onBackdropClick"
    >
      <div class="ea-dialog__card">
        <div class="ea-dialog__intro">
          <p class="eyebrow">Consultation</p>
          <h2 class="ea-dialog__title">{{ title }}</h2>
          <p v-if="description" class="ea-dialog__description">{{ description }}</p>
        </div>
        <button
          type="button"
          class="ea-dialog__close"
          aria-label="关闭咨询表单"
          @click="close"
        >
          <Icon :icon="closeIcon" class="size-5" aria-hidden="true" />
        </button>
        <div class="ea-dialog__body">
          <slot />
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped lang="scss">
.ea-dialog {
  max-width: none;
  max-height: calc(100dvh - 2rem);
  width: min(94vw, 720px);
  margin: auto;
  overflow: visible;
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--ea-ink);

  &::backdrop {
    background: var(--ea-overlay);
    backdrop-filter: blur(4px);
  }

  &__card {
    position: relative;
    max-height: inherit;
    overflow-y: auto;
    border: 1px solid var(--ea-border);
    border-radius: var(--ea-radius-lg);
    padding: 1.5rem;
    background: var(--ea-surface);
    box-shadow: var(--ea-shadow-lg);

    @media (min-width: 40rem) {
      padding: 2.25rem;
    }
  }

  &__intro {
    padding-right: 3rem;
  }

  &__title {
    margin-top: 1rem;
    font-size: 1.875rem;
    font-weight: 600;
    letter-spacing: -0.045em;

    @media (min-width: 40rem) {
      font-size: 2.25rem;
    }
  }

  &__description {
    max-width: 36rem;
    margin-top: 0.75rem;
    color: var(--ea-ink-muted);
    line-height: 1.75;
  }

  &__close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    display: grid;
    width: 2.5rem;
    height: 2.5rem;
    place-items: center;
    border: 1px solid var(--ea-border);
    border-radius: 999px;
    background: var(--ea-canvas);
    transition: border-color 160ms ease;

    &:hover {
      border-color: var(--ea-border-strong);
    }
  }

  &__body {
    margin-top: 2rem;
  }
}
</style>
