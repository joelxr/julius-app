<script setup lang="ts">
import { ref, onMounted, onDeactivated } from 'vue'
import type { Ref } from 'vue'
import { computePosition, autoUpdate } from '@floating-ui/dom'
import VueFeather from 'vue-feather'

interface SortingSelectProps {
  options: any
}

defineProps<SortingSelectProps>()
defineEmits(['orderUpdated'])

const input = ref()
const dropdown = ref()

let cleanUp: any

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

const selecting: Ref<boolean> = ref(false)

window.onclick = (e: any) => {
  if (dropdown.value && input.value) {
    if (
      !(
        dropdown.value.contains(e.target) ||
        input.value.contains(e.target) ||
        input.value === e.target
      )
    ) {
      selecting.value = false
    }
  }
}
</script>

<template>
  <button
    ref="input"
    :class="$style.orderByBtn"
    @click="selecting = !selecting"
  >
    <vue-feather type="settings" size="20px"></vue-feather>
  </button>
  <div
    ref="dropdown"
    :class="[$style.dropdown, selecting ? $style.active : '']"
  >
    <div :class="$style.sortingOptions">
      <div :class="$style.title"> Ordenar por </div>
      <div
        v-for="column in Object.keys(options)"
        :key="column"
        :class="$style.sortItem"
      >
        <div :class="$style.column">
          {{ column }}
        </div>
        <div :class="$style.order">
          <button
            :class="[
              $style.btn,
              options[column] === 'asc' ? $style.selected : '',
            ]"
            @click="
              $emit(
                'orderUpdated',
                options[column] === 'asc'
                  ? { column, order: null }
                  : { column, order: 'asc' }
              )
            "
          >
            <vue-feather type="chevron-up" />
          </button>
          <button
            :class="[
              $style.btn,
              options[column] === 'desc' ? $style.selected : '',
            ]"
            @click="
              $emit(
                'orderUpdated',
                options[column] === 'desc'
                  ? { column, order: null }
                  : { column, order: 'desc' }
              )
            "
          >
            <vue-feather type="chevron-down" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@import '../design';

.orderByBtn {
  padding: $gap;
  color: white;
  cursor: pointer;
  background-color: $color-bg-primary;
  border: none;
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

  .sortingOptions {
    margin: $gap;

    .title {
      margin: $gap;
    }

    .sortItem {
      display: flex;
      gap: $gap;
      align-items: center;
      margin-left: 2rem;

      .column {
        min-width: 80px;
        font-size: 0.7rem;
        font-weight: 800;
        text-transform: uppercase;
      }

      .order {
        display: flex;
        justify-content: center;

        .btn {
          color: white;
          cursor: pointer;
          background-color: transparent;
          border: none;

          &.selected {
            color: $blue;
          }
        }
      }
    }
  }
}
</style>
