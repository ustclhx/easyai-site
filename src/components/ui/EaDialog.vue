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
      class="m-auto max-h-[calc(100dvh-2rem)] w-[min(94vw,720px)] overflow-y-auto rounded-[var(--ea-radius-lg)] border border-line bg-surface p-0 text-ink shadow-[var(--ea-shadow-lg)] backdrop:bg-[var(--ea-overlay)] backdrop:backdrop-blur-sm"
      :aria-label="title"
      @cancel.prevent="close"
      @close="close"
      @click="onBackdropClick"
    >
      <div class="relative p-6 sm:p-9">
        <div class="pr-12">
          <p class="eyebrow">Consultation</p>
          <h2 class="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{{ title }}</h2>
          <p v-if="description" class="mt-3 max-w-xl leading-7 text-muted">{{ description }}</p>
        </div>
        <button
          type="button"
          class="absolute top-6 right-6 grid size-10 place-items-center rounded-full border border-line bg-canvas transition hover:border-line-strong"
          aria-label="关闭咨询表单"
          @click="close"
        >
          <Icon :icon="closeIcon" class="size-5" aria-hidden="true" />
        </button>
        <div class="mt-8">
          <slot />
        </div>
      </div>
    </dialog>
  </Teleport>
</template>
