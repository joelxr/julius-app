import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useCrud } from '../api'
import { useFilterStore } from '../stores/filter'

interface Tag {
  id: number
  name: number
}

const tagsService = useCrud<Tag>('tags')
const filterStore = useFilterStore()

export const useTagStore = defineStore('tag', () => {
  const tags: Ref<Tag[]> = ref([])

  filterStore.$subscribe((mutation, state) => {
    find()
  })

  async function find(query = { orderBy: {} }) {
    const result = await tagsService.find({
      ...query,
      start: filterStore.startDate,
      end: filterStore.endDate,
      orderBy: [
        ...Object.keys(query.orderBy)
          .filter((column) => !!query.orderBy[column])
          .map((column) => {
            return {
              column,
              order: query.orderBy[column],
            }
          }),
      ],
    })
    tags.value = result.data
  }

  function findOne(id: number) {
    return tagsService.findOne(id)
  }

  function upsert(data: any) {
    return tagsService.upsert(data)
  }

  function remove(data: any) {
    return tagsService.remove(data.id)
  }

  return { tags, find, findOne, upsert, remove }
})
