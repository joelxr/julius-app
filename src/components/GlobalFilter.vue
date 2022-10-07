<script setup lang="ts">
import { ref, onMounted, onDeactivated } from 'vue'
import type { Ref } from 'vue'
import { computePosition, autoUpdate } from '@floating-ui/dom'
import VueFeather from 'vue-feather'
import { formatISO, subDays } from 'date-fns'
import { useFilterStore } from '../stores/filter'
import { useExpenseStore } from '../stores/expense'

const filterStore = useFilterStore()
const expenseStore = useExpenseStore()
const input = ref()
const dropdown = ref()
const dateOptions: Ref<any[]> = ref([])

let cleanUp: any

onMounted(async () => {
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
      placement: 'bottom-end',
    }).then(applyStyles)
  })

  const summary = await expenseStore.summary()
  console.log(summary)

  dateOptions.value = [
    {
      month: 'Última semana',
      start: formatISO(subDays(new Date(), 15), { representation: 'date' }),
      end: formatISO(new Date(), { representation: 'date' }),
    },
    {
      month: 'Últimos 15 dias',
      start: formatISO(subDays(new Date(), 15), { representation: 'date' }),
      end: formatISO(new Date(), { representation: 'date' }),
    },
    { month: 'Setembro', start: '2022-09-01', end: '2022-09-30' },
    { month: 'Outubro', start: '2022-10-01', end: '2022-10-31' },
  ]
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
  <button ref="input" :class="$style.btn" @click="selecting = !selecting">
    <vue-feather type="filter" size="20px"></vue-feather>
  </button>
  <div
    ref="dropdown"
    :class="[$style.dropdown, selecting ? $style.active : '']"
  >
    <div :class="$style.dateOptions">
      <button
        v-for="(option, index) in dateOptions"
        :key="index"
        :class="$style.option"
        type="button"
      >
        {{ option.month }}
        {{ new Date().getFullYear() == option.year ? '' : option.year }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '../design';

.btn {
  font-weight: 600;
  color: $text-color;
  cursor: pointer;
  background-color: $color-bg-base;
  border: none;
  transition: background-color 200ms;

  &.exactActiveLink,
  &:hover {
    background-color: $color-bg-primary;
    border-radius: $border-radius;
    box-shadow: $default-shadow;
  }
}

.dropdown {
  z-index: 5;
  display: none;
  max-width: 400px;
  padding: 0 1rem;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  color: white;
  background-color: $color-bg-base;
  border: 1px solid $color-bg-primary;
  border-radius: $border-radius;
  box-shadow: $default-shadow;

  &.active {
    display: inherit;
  }

  .dateOptions {
    display: flex;
    flex-flow: row wrap;
    gap: $gap;
    padding: 1rem;

    .option {
      padding: $gap;
      font-weight: 600;
      color: $text-color;
      cursor: pointer;
      background-color: $color-bg-primary;
      border: none;
      border-radius: 4px;
      transition: background-color 200ms;

      &.exactActiveLink,
      &:hover {
        background-color: $blue;
        border-radius: $border-radius;
        box-shadow: $default-shadow;
      }
    }
  }
}
</style>
