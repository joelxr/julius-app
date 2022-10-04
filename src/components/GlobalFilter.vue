<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import SelectInput from './SelectInput.vue'
import { useFilterStore } from '../stores/filter'

const store = useFilterStore()

const data: Ref<any> = ref({
  year: '2022',
  month: '9',
  day: '',
})

const years = [{ value: '' }, { value: '2022' }]
const months = [
  { value: '' },
  ...[...Array(12).keys()].map((month) => ({ value: month + 1 })),
]

const days: Ref<any[]> = ref([])
days.value = daysInMonth(data.value.month, data.value.year)

watchEffect(() => {
  const { year, month, day } = data.value

  if (year && month) {
    days.value = daysInMonth(month, year)
  } else {
    days.value = [{ value: '' }]
  }

  if (year) {
    if (month) {
      if (day) {
        const date = new Date(Number(year), Number(month) - 1, Number(day))
        store.startDate = date
        store.endDate = date
      } else {
        store.startDate = new Date(Number(year), Number(month) - 1, 1)
        const lastDay = days.value[days.value.length - 1]
        store.endDate = new Date(
          Number(year),
          Number(month) - 1,
          Number(lastDay.value)
        )
      }
    } else {
      store.startDate = new Date(Number(year), 0, 1)
      store.endDate = new Date(Number(year), 11, 31)
    }
  } else {
    store.startDate = null
    store.endDate = null
  }
})

function daysInMonth(month: string, year: string): any[] {
  const daysCount = new Date(Number(year), Number(month), 0).getDate()
  return [
    { value: '' },
    ...[...Array(daysCount).keys()].map((month) => ({ value: month + 1 })),
  ]
}
</script>

<template>
  <div :class="$style.btns">
    <SelectInput
      id="year"
      v-model="data.year"
      option-key="value"
      :values="years"
    />
    <SelectInput
      id="month"
      v-model="data.month"
      option-key="value"
      :values="months"
    />
    <SelectInput
      id="day"
      v-model="data.day"
      option-key="value"
      :values="days"
    />
  </div>
</template>

<style lang="scss" module>
.btns {
  display: flex;
  gap: 0.5rem;
}
</style>
