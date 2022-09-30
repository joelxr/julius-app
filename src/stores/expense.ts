import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCrud } from '../api'
import { useFilterStore } from '../stores/filter'

const filterStore = useFilterStore()
const expenseService = useCrud('expenses')

export const useExpenseStore = defineStore('expense', () => {
  const expenses = ref([])

  filterStore.$subscribe((mutation, state) => {
    find()
  })

  async function find(query = { orderBy: {} }) {
    const { data } = await expenseService.find({
      ...query,
      start: filterStore.startDate,
      end: filterStore.endDate,
      orderBy: [
        ...Object.keys(query.orderBy)
          .filter((column) => !!query.orderBy[column])
          .map((column) => {
            return {
              column,
              order: query.orderBy[column],
            }
          }),
      ],
    })

    expenses.value = data
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

  return { expenses, find, findOne, upsert, remove }
})
