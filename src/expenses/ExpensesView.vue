<script setup lang="ts">
import { useRouter, ref } from 'vue-router'
import { useExpenseStore } from '../stores/expense'
import { useProductStore } from '../stores/product'
import BaseButton from '../components/BaseButton.vue'
import ListView from '../components/ListView.vue'
import ExpensesList from '../components/ExpensesList.vue'
import VueFeather from 'vue-feather'
import { parseISO, format, differenceInDays } from 'date-fns'
import { money } from '../formatters'

const router = useRouter()
const expenseStore = useExpenseStore()

await expenseStore.find()

function handleNew() {
  router.push({ name: 'expense-detail' })
}

function handleSelected(item: any) {
  router.push({ name: 'expense-detail', params: { id: item.id } })
}

function handleSearch(name: string) {
  if (name) {
    expenseStore.find({ name })
  } else {
    expenseStore.find()
  }
}

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
  <div :class="$style.content">
    <section :class="$style.left">
      <ListView
        aggregate-by-date
        :items="expenseStore.expenses"
        @search="handleSearch"
        @new="handleNew"
        @selected="handleSelected"
      >
        <template #item="itemProps">
          <div :class="$style.listItem">
            <div :class="$style.title">
              {{ itemProps.product[0].name }}
            </div>
            <div>
              {{
                money.format(
                  itemProps.count * itemProps.unitPrice - itemProps.discount
                )
              }}
            </div>
          </div>
        </template>
      </ListView>
    </section>
    <section :class="$style.right">
      <div>
        <Suspense timeout="0">
          <router-view :key="$route.fullPath"></router-view>
          <template #fallback>
            <vue-feather type="loader" size="4rem" animation="spin" />
          </template>
        </Suspense>
      </div>
    </section>
  </div>
</template>

<style module lang="scss">
@import '../design';

.content {
  display: flex;
  flex-flow: row nowrap;
  height: 100%;

  .left {
    width: $side-menu-width;

    .listItem {
      .title {
        font-size: 1.1rem;
      }
    }
  }

  .right {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: $gap;
    overflow: auto;
  }
}
</style>
