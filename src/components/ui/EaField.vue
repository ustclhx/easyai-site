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
  <label :for="fieldId" class="ea-field">
    <span>{{ label }} <span v-if="required" aria-hidden="true" class="ea-field__required">*</span></span>
    <textarea
      v-if="multiline"
      :id="fieldId"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :value="modelValue"
      class="ea-field__control ea-field__control--area"
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
      class="ea-field__control ea-field__control--input"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>

<style scoped lang="scss">
.ea-field {
  display: grid;
  gap: 0.5rem;
  color: var(--ea-ink);
  font-size: 0.875rem;
  font-weight: 600;

  &__required {
    color: var(--ea-danger);
  }

  &__control {
    border: 1px solid var(--ea-border);
    border-radius: var(--ea-radius-sm);
    padding-inline: 1rem;
    background: var(--ea-canvas);
    color: var(--ea-ink);
    font-weight: 400;
    transition: border-color 160ms ease;

    &::placeholder {
      color: color-mix(in srgb, var(--ea-ink-muted) 60%, transparent);
    }

    &:focus {
      border-color: var(--ea-border-strong);
    }

    &--area {
      min-height: 7rem;
      padding-block: 0.75rem;
      resize: vertical;
    }

    &--input {
      height: 3rem;
    }
  }
}
</style>
