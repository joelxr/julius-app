<script setup lang="ts">
interface BaseTextInputProps {
  modelValue: string | number | Date
  type?: string
  readonly?: boolean
}

withDefaults(defineProps<BaseTextInputProps>(), {
  type: 'text',
  readonly: false
})

const emit = defineEmits(['update:modelValue'])

async function handleInput(event: any) {
  const text = event.target.value
  emit('update:modelValue', text)
}
</script>

<template>
  <input
    :type="type"
    :class="$style.input"
    :value="modelValue"
    :readonly="readonly"
    @input="handleInput"
  />
</template>

<style module lang="scss">
@import '../design';

.input {
  padding: 0.6rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-align: right;
  background-color: $color-bg-primary;
  border: none;
  border-radius: 6px;
  box-shadow: $default-shadow;
}
</style>
