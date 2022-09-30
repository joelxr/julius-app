import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCrud } from '../api'

const expenseService = useCrud('expenses')

export const useExpenseStore = defineStore('expense', () => {
  const expenses = ref([])

  async function find(query = {}) {
    const { data } = await expenseService.find({
      ...query,
      orderBy: [{ column: 'date', order: 'desc' }, { column: 'product_id' }],
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
