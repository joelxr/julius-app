import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { addMonths } from 'date-fns'

export const useFilterStore = defineStore('filter', () => {
  const now = new Date()
  const startDate: Ref<Date> = ref(now)
  const endDate: Ref<Date> = ref(addMonths(now, 1))

  return { startDate, endDate }
})
