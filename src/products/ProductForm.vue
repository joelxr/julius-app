<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseTextInput from '../components/BaseTextInput.vue'
import BaseButton from '../components/BaseButton.vue'
import HighlightText from '../components/HighlightText'
import BaseOverview from '../components/BaseOverview.vue'
import ExpensesList from '../components/ExpensesList.vue'
import { useProductStore } from '../stores/product'
import { useTagStore } from '../stores/tag'
import getFrequency from '../getFrequency'

const product: Ref<any> = ref({
  name: '',
})
const searchTag = ref('')

const productStore = useProductStore()
const tagStore = useTagStore()
const router = useRouter()
const route = useRoute()
const productId = route.params.id

loadProduct(Number(productId))

await tagStore.find()

async function loadProduct(id: number) {
  if (id) {
    const { data } = await productStore.findOne(id)
    product.value = data
    const response = await productStore.getTagsByProduct(id)
    productStore.selectedProductTags.value = response.data
  }
}

async function save() {
  console.log(product.value)
  const { data }: any = await productStore.upsert(
    product.value.id
      ? { id: product.value.id, name: product.value.name }
      : { name: product.value.name }
  )
  await productStore.find()
  product.value = {
    ...product.value,
    id: data[0].id,
  }
  router.push({ name: 'product-detail', params: { id: data[0].id } })
}

async function remove() {
  await productStore.remove(product.value)
  await productStore.find()
  router.push({ name: 'products' })
}

async function handleTagClicked(tag: any, target: any) {
  if (target.checked) {
    const data = {
      productId: productId || product.value.id,
      tagId: tag.id,
    }

    await productStore.addTag(data)
  } else {
    const selectedTag = productStore.selectedProductTags.find(
      (pt: any) => pt.tagId === tag.id
    ) || { id: null }
    await productStore.removeTag(selectedTag)
  }
}
</script>

<template>
  <form :class="$style.form">
    <BaseTextInput
      v-model="product.name"
      :class="$style.titleInput"
      placeholder="Nome"
      theme="inline"
      @blur="save"
    />
    <BaseOverview
      :total="product.total"
      :count="product.count"
      :min="product.min"
      :max="product.max"
      :avg="product.avg"
      :frequency="getFrequency(product.expenses)"
    />
    <ExpensesList :expenses="product.expenses" />
    <div :class="$style.tagForm">
      <h3>Tags</h3>
      <BaseTextInput
        v-model="searchTag"
        :class="$style.searchTagInput"
        placeholder="Buscar"
      />
      <div :class="$style.tags">
        <div
          v-for="tag in tagStore.tags"
          :key="tag.name"
          :class="[
            $style.tag,
            !!productStore.selectedProductTags.find((pt: any) => pt.tagId === tag.id)
              ? $style.selected
              : '',
          ]"
        >
          <input
            :id="tag.name"
            type="checkbox"
            :value="tag"
            :checked="
              !!productStore.selectedProductTags.find(
                (pt: any) => pt.tagId === tag.id
              )
            "
            @click="handleTagClicked(tag, $event.target)"
          />
          <label
            v-if="
              searchTag &&
              tag.name.toLowerCase().includes(searchTag.toLowerCase())
            "
            :for="tag.name"
          >
            <HighlightText :query="searchTag" :text="tag.name" />
          </label>
          <label v-else :for="tag.name">
            {{ tag.name }}
          </label>
        </div>
      </div>
    </div>
    <div :class="$style.btns">
      <BaseButton v-if="productId" :class="$style.deleteBtn" @click="remove">
        Remover
      </BaseButton>
    </div>
  </form>
</template>

<style module lang="scss">
@import '../design';

.form {
  height: 100%;
  overflow: auto;

  .titleInput {
    width: 100%;
    padding: $gap;
    font-size: 1.75rem;
    background-color: $color-bg-base;
    border-radius: 0;
    box-shadow: none;
  }

  .searchTagInput {
    width: 100%;
  }

  .tagForm {
    margin-top: 2rem;

    .tags {
      display: flex;
      flex-flow: row wrap;
      gap: 1rem;
      margin-top: 1rem;

      .tag {
        display: flex;
        gap: 0.25rem;
        padding: $gap;
        cursor: pointer;
        background-color: $color-bg-primary;
        border-radius: $border-radius;

        label {
          cursor: pointer;
        }

        &.selected {
          background-color: $blue;
        }
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
}
</style>
