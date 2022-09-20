<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '../components/BaseButton.vue'

const data = reactive({
  expenses: [],
})

const router = useRouter()

function handleNewExpense() {
  router.push({ name: 'expense-detail', params: { id: 123 } })
}
</script>

<template>
  <div :class="$style.content">
    <section :class="$style.left">
      <div :class="$style.btns">
        <BaseButton icon="plus" @click="handleNewExpense" />
      </div>
      <div :class="$style.expensesList">
        <div v-if="!data.expenses.length" :class="$style.noContent">
          Nenhum item
        </div>
      </div>
    </section>
    <section :class="$style.right">
      <router-view></router-view>
    </section>
  </div>
</template>

<style module lang="scss">
@import '../design';

.content {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  .left {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
    height: 100%;
    padding: 0 1rem;
    margin-right: 1rem;

    .expensesList {
      flex: 1 0 auto;

      .noContent {
        text-align: center;
      }
    }

    .btns {
      flex: 0 1 24px;
    }
  }

  .right {
    margin: 0 auto;
  }
}
</style>
