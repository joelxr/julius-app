<script setup lang="ts">
import { ref, onMounted, onDeactivated } from 'vue'
import type { Ref } from 'vue'
import { computePosition, autoUpdate } from '@floating-ui/dom'
import VueFeather from 'vue-feather'
import { parse, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useFilterStore } from '../stores/filter'
import { useExpenseStore } from '../stores/expense'
import { money } from '../formatters'

const filterStore = useFilterStore()
const expenseStore = useExpenseStore()
const input = ref()
const dropdown = ref()
const dateOptions: Ref<any> = ref()

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

  const { data } = await expenseStore.summary()
  dateOptions.value = data
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

function handleOptionClicked(ref: any) {
  filterStore.startDate = ref.start
  filterStore.endDate = ref.end
}

function updateSortingOptions(change: any) {
  filterStore.orderBy[change.column] = change.order
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
        @click="handleOptionClicked(option)"
      >
        <div :class="$style.ref">
          {{
            /\d{4}-\d{2}/g.test(option.ref)
              ? format(parse(option.ref, 'yyyy-MM', Date.now()), 'MMMM', {
                  locale: ptBR,
                })
              : option.ref
          }}
        </div>
        <div :class="$style.total">
          {{ money.format(option.total) }}
        </div>
      </button>
    </div>

    <div :class="$style.sortingOptions">
      <div :class="$style.title"> Ordenar por </div>
      <div
        v-for="column in Object.keys(filterStore.orderBy)"
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
              filterStore.orderBy[column] === 'asc' ? $style.selected : '',
            ]"
            @click="
              updateSortingOptions(
                filterStore.orderBy[column] === 'asc'
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
              filterStore.orderBy[column] === 'desc' ? $style.selected : '',
            ]"
            @click="
              updateSortingOptions(
                filterStore.orderBy[column] === 'desc'
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
  max-width: 300px;
  padding: 0;
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
    justify-content: center;
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

      .ref {
        font-size: 0.7rem;
        text-transform: uppercase;
      }

      &.exactActiveLink,
      &:hover {
        background-color: $blue;
        border-radius: $border-radius;
        box-shadow: $default-shadow;
      }
    }
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
