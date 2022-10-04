<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useExpenseStore } from '../stores/expense'
import BaseButton from '../components/BaseButton.vue'
import ListView from '../components/ListView.vue'
import ExpensesList from '../components/ExpensesList.vue'
import VueFeather from 'vue-feather'
import { money } from '../formatters'

const router = useRouter()
const expenseStore = useExpenseStore()
const orderBy: Ref<any> = ref({
  date: 'desc',
  total: '',
})

await expenseStore.find({ orderBy: orderBy.value })

function handleNew() {
  router.push({ name: 'expense-detail' })
}

function handleSelected(item: any) {
  router.push({ name: 'expense-detail', params: { id: item.id } })
}

function handleSearch(name: string) {
  if (name) {
    expenseStore.find({ name, orderBy: orderBy.value })
  } else {
    expenseStore.find({ orderBy: orderBy.value })
  }
}

function handleOrderUpdated(event: any) {
  orderBy.value[event.column] = event.order
  expenseStore.find({ orderBy: orderBy.value })
}
</script>

<template>
  <div :class="$style.content">
    <section :class="$style.left">
      <ListView
        aggregate-by-date
        :items="expenseStore.expenses"
        :order-by="orderBy"
        @order-updated="handleOrderUpdated"
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
              {{ money.format(itemProps.total) }}
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
