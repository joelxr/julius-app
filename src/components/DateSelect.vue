<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { Ref } from 'vue'
import SelectInput from './SelectInput.vue'

const data = reactive({
  year: '2022',
  month: '9',
  day: '',
})
const years = [{ value: '' }, { value: '2022' }]
const months = [
  { value: '' },
  ...[...Array(12).keys()].map((month) => ({ value: month + 1 })),
]

const days: Ref<string[]> = ref([])
days.value = daysInMonth(data.month, data.year)

watch(
  () => data,
  (data) => {
    days.value = daysInMonth(data.month, data.year)
  },
  { deep: true }
)

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
