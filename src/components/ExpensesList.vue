<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { differenceInDays, format, parseISO } from 'date-fns'
import { money } from '../formatters'

interface ExpesesListProps {
  expenses: any[]
}

const props = defineProps<ExpesesListProps>()
const expensesByDate = ref({})

watchEffect(() => {
  expensesByDate.value = getItemsByDate(props.expenses)
})

function getItemsByDate(items: any[]) {
  if (items && items.length) {
    const result = items.reduce((a: any, c: any) => {
      if (a[c.date]) {
        a[c.date].items.push(c)
      } else {
        a[c.date] = { items: [c] }
      }
      return a
    }, {})
    return result
  }
  return []
}

function customFormatDate(date: string) {
  const d = parseISO(date)
  const now = new Date()
  const diff = differenceInDays(now, d)
  if (diff > 7) return format(d, 'dd MMM')
  return format(d, 'EEE')
}
</script>

<template>
  <h3>Histórico</h3>
  <div :class="$style.expenses">
    <div v-for="date in Object.keys(expensesByDate)" :key="date">
      <div :class="$style.date">{{ customFormatDate(date) }}</div>
      <div
        v-for="expense in expensesByDate[date].items"
        :key="expense.id"
        :class="$style.item"
      >
        <div>{{ expense.productName }}</div>
        <div :class="$style.values">
          <div
            v-if="expense.count !== 1 && expense.discount"
            :class="$style.count"
          >
            {{
              `${money.format(expense.count)} x ${money.format(
                expense.unitPrice
              )} - ${money.format(expense.discount)}`
            }}
          </div>
          <div v-else-if="expense.discount" :class="$style.unitPrice">
            {{
              `${money.format(expense.unitPrice)} - ${money.format(
                expense.discount
              )}`
            }}
          </div>
          <div :class="$style.total">
            {{
              money.format(expense.count * expense.unitPrice - expense.discount)
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@import '../design';

.expenses {
  padding-right: 1rem;
  overflow: auto;

  .date {
    margin: $gap;
    color: #888;
    text-transform: uppercase;
  }

  .item {
    display: flex;
    justify-content: space-between;
    padding-left: $gap;

    .values {
      display: flex;
      gap: $gap;
      color: #888;

      .count,
      .unitPrice,
      .discount,
      .total {
        min-width: 40px;
        text-align: right;
      }

      .total {
        font-weight: 600;
        color: white;
      }
    }
  }
}
</style>
