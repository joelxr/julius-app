<script setup lang="ts">
import VueFeather from 'vue-feather'

interface BaseTextInputProps {
  modelValue?: string | number | Date
  type?: string
  theme?: string
  icon?: string
  readonly?: boolean
}

const props = withDefaults(defineProps<BaseTextInputProps>(), {
  modelValue: '',
  type: 'text',
  readonly: false,
  theme: 'default',
  icon: '',
})

const emit = defineEmits(['update:modelValue'])

async function handleInput(event: any) {
  const text = event.target.value
  emit('update:modelValue', text)
}
</script>

<template>
  <div :class="$style.inputGroup">
    <span v-if="props.icon">
      <vue-feather :type="props.icon" size="20px" />
    </span>
    <input
      :type="type"
      :class="[$style.input, props.theme === 'inline' ? $style.inline : '']"
      :value="modelValue"
      :readonly="readonly"
      v-bind="$attrs"
      @input="handleInput"
    />
  </div>
</template>

<style module lang="scss">
@import '../design';

input[type='date']::-webkit-inner-spin-button,
input[type='date']::-webkit-calendar-picker-indicator,
input[type='datetime-local']::-webkit-inner-spin-button,
input[type='datetime-local']::-webkit-calendar-picker-indicator {
  display: none;
}

.inputGroup {
  display: flex;
  flex-flow: row nowrap;
  gap: $gap;
  align-items: center;
  justify-content: center;

  .input {
    max-width: 100%;
    min-height: 40px;
    padding: $gap calc($gap * 2);
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: $color-bg-primary;
    border: none;
    border-radius: $border-radius;
    box-shadow: $default-shadow;

    &.inline {
      padding-left: 0;
      background-color: $color-bg-base;
      border-radius: 0;
      box-shadow: none;

      &:focus {
        border-bottom: 1px solid $color-bg-primary;
      }
    }
  }
}
</style>
