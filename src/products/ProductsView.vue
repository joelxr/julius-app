<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/product'
import { money } from '../formatters'
import BaseButton from '../components/BaseButton.vue'
import ListView from '../components/ListView.vue'
import VueFeather from 'vue-feather'

const router = useRouter()
const store = useProductStore()

await store.find()

function handleNew() {
  router.push({ name: 'product-detail' })
}

function handleSelected(item: any) {
  router.push({ name: 'product-detail', params: { id: item.id } })
}

function handleSearch(name: string) {
  if (name) {
    store.find({ name })
  } else {
    store.find()
  }
}
</script>

<template>
  <div :class="$style.content">
    <section :class="$style.left">
      <ListView
        :items="store.products"
        @search="handleSearch"
        @new="handleNew"
        @selected="handleSelected"
      >
        <template #item="itemProps">
          <div>
            <div>
              {{ itemProps.name }}
            </div>
            <div>
              {{ money.format(itemProps.subtotal - itemProps.discount) }}
            </div>
          </div>
        </template>
      </ListView>
    </section>
    <section :class="$style.right">
      <Suspense timeout="0">
        <router-view :key="$route.fullPath"></router-view>
        <template #fallback>
          <vue-feather type="loader" size="4rem" animation="spin" />
        </template>
      </Suspense>
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
    min-width: $side-menu-width;
  }

  .right {
    padding: 1rem;
    margin: 0 auto;
  }
}
</style>
