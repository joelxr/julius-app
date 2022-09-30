import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useCrud, useInsights, api } from '../api'

interface Tag {
  id: number
  name: number
}

interface TagInsights {
  tagId: number
  tagName: string
  count: number
  subtotal: number
  discount: number
}

const tagsService = {
  ...useCrud<Tag>('tags'),
  ...useInsights<TagInsights>('tags'),
}

export const useTagStore = defineStore('tag', () => {
  const tags: Ref<Tag[]> = ref([])

  async function find(query = {}) {
    const result = await tagsService.find({
      orderBy: [{ column: 'name' }],
      ...query,
    })
    tags.value = result.data
  }

  function findOne(id: number) {
    return tagsService.findOne(id)
  }

  function insights(id: number) {
    return tagsService.insights(id)
  }

  function upsert(data: any) {
    return tagsService.upsert(data)
  }

  function remove(data: any) {
    return tagsService.remove(data.id)
  }

  function expenses(id: number) {
    return api.get(`tags/${id}/expenses`)
  }

  return { tags, find, findOne, upsert, remove, insights, expenses }
})
