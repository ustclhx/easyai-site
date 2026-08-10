<script setup lang="ts">
import { useId } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    label: string;
    name: string;
    type?: "text" | "email" | "tel";
    placeholder?: string;
    required?: boolean;
    multiline?: boolean;
    rows?: number;
  }>(),
  { type: "text", placeholder: "", required: false, multiline: false, rows: 4 },
);

const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const fieldId = `ea-field-${useId()}`;
</script>

<template>
  <label :for="fieldId" class="grid gap-2 text-sm font-semibold text-ink">
    <span>{{ label }} <span v-if="required" aria-hidden="true" class="text-[var(--ea-danger)]">*</span></span>
    <textarea
      v-if="multiline"
      :id="fieldId"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :value="modelValue"
      class="min-h-28 resize-y rounded-[var(--ea-radius-sm)] border border-line bg-canvas px-4 py-3 font-normal text-ink placeholder:text-muted/60 transition focus:border-line-strong"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <input
      v-else
      :id="fieldId"
      :name="name"
      :type="props.type"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      class="h-12 rounded-[var(--ea-radius-sm)] border border-line bg-canvas px-4 font-normal text-ink placeholder:text-muted/60 transition focus:border-line-strong"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>
