<script setup lang="ts">
import { nextTick, onMounted, ref, useId, watch } from "vue";
import EaIcon from "@/components/ui/EaIcon.vue";

const props = defineProps<{
  open: boolean;
  title: string;
  description?: string;
}>();

const emit = defineEmits<{ "update:open": [value: boolean] }>();
const dialog = ref<HTMLDialogElement>();
const restoreTarget = ref<HTMLElement>();
const titleId = `ea-dialog-title-${useId()}`;
const descriptionId = `ea-dialog-description-${useId()}`;

async function syncDialog(open: boolean) {
  await nextTick();
  const element = dialog.value;
  if (!element) return;
  if (open && !element.open) {
    restoreTarget.value = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
    element.showModal();
  }
  if (!open && element.open) element.close();
}

function close() {
  emit("update:open", false);
}

function onNativeClose() {
  emit("update:open", false);
  nextTick(() => restoreTarget.value?.focus());
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
      class="m-auto max-h-[calc(100dvh-2rem)] w-[min(94vw,720px)] overflow-y-auto rounded-[var(--ea-radius-lg)] border border-line bg-surface p-0 text-ink shadow-[var(--ea-shadow-lg)] backdrop:bg-[var(--ea-overlay)] backdrop:backdrop-blur-sm"
      :aria-labelledby="titleId"
      :aria-describedby="description ? descriptionId : undefined"
      @cancel.prevent="close"
      @close="onNativeClose"
      @click="onBackdropClick"
    >
      <div class="relative p-6 sm:p-9">
        <div class="pr-12">
          <p class="eyebrow">Consultation</p>
          <h2 :id="titleId" class="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{{ title }}</h2>
          <p v-if="description" :id="descriptionId" class="mt-3 max-w-xl leading-7 text-muted">{{ description }}</p>
        </div>
        <button
          type="button"
          class="absolute top-6 right-6 grid size-10 place-items-center rounded-full border border-line bg-canvas transition hover:border-line-strong"
          aria-label="关闭咨询表单"
          @click="close"
        >
          <EaIcon name="close" :size="18" />
        </button>
        <div class="mt-8">
          <slot />
        </div>
      </div>
    </dialog>
  </Teleport>
</template>
