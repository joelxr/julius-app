<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseTextInput from '../components/BaseTextInput.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseOverview from '../components/BaseOverview.vue'
import ExpensesList from '../components/ExpensesList.vue'
import { useTagStore } from '../stores/tag'
import { differenceInDays, parseISO } from 'date-fns'
import getFrequency from '../getFrequency'

const tag = ref({
  name: '',
})

const store = useTagStore()
const router = useRouter()
const route = useRoute()
const tagId = Number(route.params.id)

if (tagId) {
  const result = await store.findOne(tagId)
  tag.value = result.data
  tag.value.total = tag.value.subtotal - tag.value.discount
}

async function save() {
  const { data } = await store.upsert(
    tag.value.id
      ? { id: tag.value.id, name: tag.value.name }
      : { name: tag.value.name }
  )
  await store.find()
  tag.value = {
    ...tag.value,
    id: data[0].id,
  }
  router.push({ name: 'tag-detail', params: { id: data[0].id } })
}

async function remove() {
  await store.remove(tag.value)
  await store.find()
  router.push({ name: 'tags' })
}
</script>

<template>
  <form :class="$style.form">
    <BaseTextInput
      v-model="tag.name"
      :class="$style.titleInput"
      placeholder="Nome"
      theme="inline"
      @blur="save"
    />
    <BaseOverview
      :total="tag.total"
      :count="tag.count"
      :min="tag.min"
      :max="tag.max"
      :avg="tag.avg"
      :frequency="getFrequency(tag.expenses)"
    />
    <ExpensesList :expenses="tag.expenses" />
    <div :class="$style.btns">
      <BaseButton v-if="tagId" :class="$style.deleteBtn" @click="remove">
        Remover
      </BaseButton>
    </div>
  </form>
</template>

<style module lang="scss">
@import '../design';

.form {
  width: 100%;
  height: 100%;
  overflow: auto;

  .titleInput {
    width: 100%;
    padding: $gap 0;
    font-size: 1.75rem;
    background-color: $color-bg-base;
    border-radius: 0;
    box-shadow: none;
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
