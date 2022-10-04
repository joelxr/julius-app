<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import VueFeather from 'vue-feather'
import { useTagStore } from '../stores/tag'
import BaseButton from '../components/BaseButton.vue'
import ListView from '../components/ListView.vue'
import { money } from '../formatters'

const router = useRouter()
const store = useTagStore()
const orderBy: Ref<any> = ref({
  name: 'asc',
  total: '',
})

await store.find({ orderBy: orderBy.value })

function handleNew() {
  router.push({ name: 'tag-detail' })
}

function handleSelected(item: any) {
  router.push({ name: 'tag-detail', params: { id: item.id } })
}

function handleSearch(name: string) {
  if (name) {
    store.find({ name, orderBy: orderBy.value })
  } else {
    store.find({ orderBy: orderBy.value })
  }
}

function handleOrderUpdated(event: any) {
  orderBy.value[event.column] = event.order
  store.find({ orderBy: orderBy.value })
}
</script>

<template>
  <div :class="$style.content">
    <section :class="$style.left">
      <ListView
        :items="store.tags"
        :order-by="orderBy"
        @search="handleSearch"
        @new="handleNew"
        @selected="handleSelected"
        @order-updated="handleOrderUpdated"
      >
        <template #item="itemProps">
          <div>
            <div>
              {{ itemProps.name }}
            </div>
            <div>
              {{ money.format(itemProps.total) }}
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
    width: $side-menu-width;
  }

  .right {
    width: 100%;
    padding: 1rem;
  }
}
</style>
