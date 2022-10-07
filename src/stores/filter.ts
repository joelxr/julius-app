import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', () => {
  const startDate: Ref<Date | null> = ref(null)
  const endDate: Ref<Date | null> = ref(null)
  return { startDate, endDate }
})
