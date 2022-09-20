<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

interface BaseTypeaheadProps {
  modelValue: string
  fetch: (text: string) => Promise<string[]>
}

const props = defineProps<BaseTypeaheadProps>()
const emit = defineEmits(['update:modelValue'])

const items: Ref<string[]> = ref([])
const searching: Ref<boolean> = ref(false)

async function handleInput(event: any) {
  const text = event.target.value
  emit('update:modelValue', text)

  if (text) {
    items.value = await props.fetch(text)
    searching.value = !!items.value.length
  } else {
    items.value = []
    searching.value = false
  }
}

function handleClickItem(item: string) {
  emit('update:modelValue', item)
  items.value = []
  searching.value = false
}
</script>

<template>
  <input
    type="text"
    :class="$style.input"
    :value="modelValue"
    @input="handleInput"
  />
  <div :class="[$style.dropdown, searching ? $style.active : '']">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="$style.dropdownItem"
      @click="handleClickItem(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<style module lang="scss">
@import '../design';

.input {
  padding: 0.6rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: $color-bg-primary;
  border: none;
  border-radius: 6px;
  box-shadow: $default-shadow;
}

.dropdown {
  position: absolute;
  z-index: 5;
  display: none;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  color: white;
  background-color: $color-bg-primary;

  &.active {
    display: inherit;
  }

  .dropdownItem {
    padding: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #3584e4;
    }
  }
}
</style>
