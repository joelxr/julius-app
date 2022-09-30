<script setup lang="ts">
import { ref, onMounted, onDeactivated, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { computePosition, autoUpdate } from '@floating-ui/dom'

interface BaseTypeaheadProps {
  modelValue: any
  modelDisplayProp?: string
  fetch: (text: string) => Promise<string[]>
}

const props = withDefaults(defineProps<BaseTypeaheadProps>(), {
  modelDisplayProp: 'name',
})
const emit = defineEmits(['update:modelValue'])
const input = ref()
const dropdown = ref()
const text = ref('')

let cleanUp: any

watchEffect(() => {
  if (props.modelValue[props.modelDisplayProp]) {
    text.value = props.modelValue[props.modelDisplayProp]
  }
})

onMounted(() => {
  function applyStyles({ x = 0, y = 0, strategy = 'absolute' } = {}) {
    Object.assign(dropdown.value.style, {
      position: strategy,
      left: `${x}px`,
      top: `${y}px`,
    })
  }

  applyStyles()

  cleanUp = autoUpdate(input.value, dropdown.value, () => {
    computePosition(input.value, dropdown.value, {
      placement: 'bottom-start',
    }).then(applyStyles)
  })
})

onDeactivated(() => {
  cleanUp()
})

const items: Ref<string[]> = ref([])
const searching: Ref<boolean> = ref(false)

window.onclick = (e: any) => {
  if (
    !(
      dropdown.value.contains(e.target) ||
      input.value.contains(e.target) ||
      input.value === e.target
    )
  ) {
    searching.value = false
  }
}

async function handleInput(event: any) {
  text.value = event.target.value

  if (text.value) {
    items.value = await props.fetch(text.value)
    searching.value = !!items.value.length
  } else {
    items.value = []
    searching.value = false
  }
}

function handleClickItem(item: any) {
  emit('update:modelValue', item)
  text.value = item[props.modelDisplayProp]
  items.value = []
  searching.value = false
}
</script>

<template>
  <input
    ref="input"
    type="text"
    :class="$style.input"
    :value="text"
    v-bind="$attrs"
    @input="handleInput"
  />
  <div
    ref="dropdown"
    :class="[$style.dropdown, searching ? $style.active : '']"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="$style.dropdownItem"
      @click="handleClickItem(item)"
    >
      {{ item[props.modelDisplayProp] }}
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
      background-color: $blue;
    }
  }
}
</style>
