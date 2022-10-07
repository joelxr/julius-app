<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { parseISO, formatISO9075 } from 'date-fns'
import { useProductStore } from '../stores/product'
import { useExpenseStore } from '../stores/expense'
import BaseTextInput from '../components/BaseTextInput.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseTypeahead from '../components/BaseTypeahead.vue'
import { money } from '../formatters'
import VueFeather from 'vue-feather'

const expense: Ref<any> = ref({
  date: null,
  productId: null,
  count: null,
  unitPrice: null,
  discount: null,
  place: null,
  receipt: null,
  paymentMethod: null,
  partCount: null,
  partTotal: null,
})

const selectedProduct: Ref<any> = ref({})
const lastExpenseWithProduct: Ref<any> = ref({})
const variation: Ref<number> = ref()
const total: Ref<string> = ref('')

const productStore = useProductStore()
const expenseStore = useExpenseStore()
const router = useRouter()
const route = useRoute()
const expenseId = route.params.id

loadExpense(Number(expenseId))

watchEffect(() => {
  if (expense.value.count && expense.value.unitPrice) {
    total.value = money.format(
      expense.value.count * expense.value.unitPrice -
        (expense.value.discount || 0)
    )

    if (lastExpenseWithProduct.value.unitPrice) {
      variation.value =
        (expense.value.unitPrice - lastExpenseWithProduct.value.unitPrice) /
        expense.value.unitPrice
    }
  }

  if (!expense.value.unitPrice) {
    variation.value = 0
  }
})

async function loadExpense(expenseId: number) {
  if (expenseId) {
    const { data }: any = await expenseStore.findOne(expenseId)
    expense.value = {
      ...data,
      date: formatISO9075(parseISO(data.date)),
    }
    selectedProduct.value = data.product[0]
  }
}

async function save() {
  expense.value.productId = selectedProduct.value.id
  const data: any = { ...expense.value, productId: selectedProduct.value.id }
  delete data.product
  await expenseStore.upsert(data)
  await expenseStore.find()
  router.push({ name: 'expense-detail' })
}

async function remove() {
  await expenseStore.remove(expense.value)
  await expenseStore.find()
  router.push({ name: 'expenses' })
}

async function fetchProducts(text: string): Promise<string[]> {
  if (text) {
    await productStore.find({ name: text })
  } else {
    await productStore.find()
  }

  return Promise.resolve(productStore.products)
}

async function handleSelectedProduct(item) {
  if (item) {
    const expensesWithThisProduct: any = await expenseStore.find(
      { productId: item.id },
      false
    )
    lastExpenseWithProduct.value = expensesWithThisProduct.pop()
  }
}
</script>

<template>
  <BaseTypeahead
    v-model="selectedProduct"
    :class="$style.titleInput"
    :fetch="fetchProducts"
    placeholder="Produto"
    @update:model-value="handleSelectedProduct"
  />
  <div :class="$style.subtitle">
    <BaseTextInput
      v-model="expense.date"
      type="datetime-local"
      theme="inline"
      icon="calendar"
      onfocus="this.showPicker()"
    />
    <BaseTextInput v-model="expense.place" theme="inline" icon="map-pin" />
  </div>
  <div :class="$style.form">
    <label>Quantidade</label>
    <BaseTextInput v-model="expense.count" type="number" />
    <label>Valor unitário</label>
    <div>
      <BaseTextInput v-model="expense.unitPrice" type="number" />
      <div
        v-if="variation"
        :class="[
          $style.variation,
          variation > 0 ? $style.positive : $style.negative,
        ]"
      >
        <vue-feather
          :type="variation > 0 ? 'trending-up' : 'trending-down'"
          size="1rem"
        >
        </vue-feather>
        {{ money.format(variation * 100) }}%
      </div>
    </div>
    <label>Desconto</label>
    <BaseTextInput v-model="expense.discount" type="number" />
    <label>Total</label>
    <BaseTextInput v-model="total" :readonly="true" />
    <label>Recibo</label>
    <BaseTextInput v-model="expense.receipt" />
    <label>Forma de pagamento</label>
    <BaseTextInput v-model="expense.paymentMethod" />
    <label>Parcela</label>
    <div :class="$style.part">
      <BaseTextInput
        v-model="expense.partCount"
        type="number"
        style="width: 80px"
      />
      <BaseTextInput
        v-model="expense.partTotal"
        type="number"
        style="width: 80px"
      />
    </div>
  </div>
  <div :class="$style.btns">
    <BaseButton v-if="expenseId" :class="$style.deleteBtn" @click="remove">
      Remover
    </BaseButton>
    <BaseButton :class="$style.saveBtn" @click="save">
      {{ expenseId ? 'Atualizar' : 'Salvar' }}
    </BaseButton>
  </div>
</template>

<style module lang="scss">
@import '../design';

.titleInput {
  width: 100%;
  padding-left: 0;
  font-size: 1.75rem;
  background-color: $color-bg-base;
  border-radius: 0;
  box-shadow: none;

  &:focus {
    border-bottom: 1px solid $color-bg-primary;
  }
}

.subtitle {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin-top: 0.2rem;

  input {
    padding-left: 0;
    background-color: $color-bg-base;
    border-radius: 0;
    box-shadow: none;
  }
}

.form {
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 1rem;
  column-gap: 2rem;
  align-items: center;
  margin-top: 2rem;

  .part {
    display: flex;
    gap: $gap;
  }

  .variation {
    display: flex;
    gap: $gap;
    padding: $gap;

    &.positive {
      color: #f33b41;
    }

    &.negative {
      color: #00ca75;
    }
  }
}

.btns {
  display: flex;
  gap: $gap;
  justify-content: flex-end;
  width: 100%;
  margin-top: 2rem;

  .deleteBtn,
  .saveBtn {
    padding: 0.6rem 1rem;
  }

  .deleteBtn:hover {
    background-color: tomato;
  }
}
</style>
