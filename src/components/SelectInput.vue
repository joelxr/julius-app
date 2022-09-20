<script setup lang="ts">
interface SelectInputProps {
  id: string
  readonly?: boolean
  modelValue: string
  values: any[]
  optionKey?: string
  optionData?: string
}

const props = withDefaults(defineProps<SelectInputProps>(), {
  readonly: false,
  optionKey: 'key',
  optionData: 'value',
})

const emit = defineEmits(['update:modelValue'])

function update(event: any) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <select
    :id="props.id"
    :name="props.id"
    :disabled="props.readonly"
    :value="props.modelValue"
    :class="$style.select"
    @input="update"
  >
    <option v-for="prop in props.values" :key="prop[props.optionKey]">
      {{ prop[props.optionData] }}
    </option>
  </select>
</template>

<style module lang="scss">
@import '../design';

.select {
  padding: 0.6rem 0.4rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: $color-bg-primary;
  border: none;
  border-radius: 6px;
  box-shadow: $default-shadow;
}
</style>
