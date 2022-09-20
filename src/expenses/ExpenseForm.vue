<script setup lang="ts">
import { reactive, watch, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import BaseTextInput from '../components/BaseTextInput.vue'
import BaseTypeahead from '../components/BaseTypeahead.vue'

const route = useRoute()
const expenseId = route.params.id

const data = reactive({
  expense: {
    _id: '',
    date: new Date(),
    product: '',
    count: 0,
    unitPrice: 0,
    discount: 0,
    total: 0,
  },
})

watch(
  () => data,
  (data: any) => {
    if (data.expense.count && data.expense.unitPrice) {
      data.expense.total =
        data.expense.count * data.expense.unitPrice - data.expense.discount
    }
  },
  { deep: true }
)

function fetchExpenses(text: string): Promise<string[]> {
  return Promise.resolve(['a', 'b'])
}
</script>

<template>
  <form :class="$style.form">
    <label>Data</label>
    <BaseTextInput v-model="data.expense.date" type="date" />
    <label>Produto</label>
    <BaseTypeahead v-model="data.expense.product" :fetch="fetchExpenses" />
    <label>Quantidade</label>
    <BaseTextInput v-model="data.expense.count" type="number" />
    <label>Valor unitário</label>
    <BaseTextInput v-model="data.expense.unitPrice" type="number" />
    <label>Discount</label>
    <BaseTextInput v-model="data.expense.discount" type="number" />
    <label>Total</label>
    <BaseTextInput v-model="data.expense.total" :readonly="true" type="number" />
  </form>
</template>

<style module lang="scss">
.form {
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 1rem;
  column-gap: 2rem;
  align-items: center;
  justify-items: end;
}
</style>
