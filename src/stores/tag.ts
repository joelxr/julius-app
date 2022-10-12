import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useCrud } from '../api'
import { useFilterStore } from '../stores/filter'
import getOrderByParamFromQuery from '../getOrderByParamFromQuery'

interface Tag {
  id: number
  name: string
}

const tagsService = useCrud<Tag>('tags')
const filterStore = useFilterStore()

export const useTagStore = defineStore('tag', () => {
  const tags: Ref<Tag[]> = ref([])

  filterStore.$subscribe((mutation, state) => {
    find()
  })

  async function find(query?: any) {
    const result = await tagsService.find({
      ...query,
      start: filterStore.startDate,
      end: filterStore.endDate,
      orderBy: getOrderByParamFromQuery({
        name: filterStore.orderBy.name,
        total: filterStore.orderBy.total,
      }),
    })
    tags.value = result.data
  }

  function findOne(id: number, params?: any) {
    return tagsService.findOne(id, {
      ...params,
      start: filterStore.startDate,
      end: filterStore.endDate,
    })
  }

  function upsert(data: any) {
    return tagsService.upsert(data)
  }

  function remove(data: any) {
    return tagsService.remove(data.id)
  }

  return { tags, find, findOne, upsert, remove }
})
