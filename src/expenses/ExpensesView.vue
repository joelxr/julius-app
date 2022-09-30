<script setup lang="ts">
import { useRouter, ref } from 'vue-router'
import { useExpenseStore } from '../stores/expense'
import { useProductStore } from '../stores/product'
import BaseButton from '../components/BaseButton.vue'
import ListView from '../components/ListView.vue'
import VueFeather from 'vue-feather'
import { parseISO, format } from 'date-fns'

const router = useRouter()
const expenseStore = useExpenseStore()
const productStore = useProductStore()

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

const formatDate = format
</script>

<template>
  <div :class="$style.content">
    <section :class="$style.left">
      <ListView
        :items="expenseStore.expenses"
        style="width: 300px"
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
              <vue-feather type="dollar-sign" size="12px" />
              {{
                (
                  itemProps.count * itemProps.unitPrice -
                  itemProps.discount
                ).toFixed(2)
              }}
            </div>
            <div>
              <vue-feather type="calendar" size="12px" />
              {{ formatDate(parseISO(itemProps.date), 'dd/MM/yyyy') }}
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
