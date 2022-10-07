import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useCrud, useSummary } from '../api'
import { useFilterStore } from '../stores/filter'
import getOrderByParamFromQuery from '../getOrderByParamFromQuery'

const filterStore = useFilterStore()
const expenseService = useCrud('expenses')

export const useExpenseStore = defineStore('expense', () => {
  const expenses: Ref<any> = ref([])

  filterStore.$subscribe((mutation, state) => {
    find()
  })

  async function find(query?: any, updateStore = true) {
    const { data } = await expenseService.find({
      ...query,
      start: filterStore.startDate,
      end: filterStore.endDate,
      orderBy: getOrderByParamFromQuery(query?.orderBy || {}),
    })

    if (updateStore) expenses.value = data
    else return data
  }

  function findOne(id: number) {
    return expenseService.findOne(id)
  }

  function upsert(data: any) {
    return expenseService.upsert(data)
  }

  function remove(data: any) {
    return expenseService.remove(data.id)
  }

  function summary() {
 //   return expenseService.summary()
  }

  return { expenses, find, findOne, upsert, remove, summary }
})
