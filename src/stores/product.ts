import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useCrud } from '../api'
import { useFilterStore } from '../stores/filter'
import getOrderByParamFromQuery from '../getOrderByParamFromQuery'

const filterStore = useFilterStore()
const productsService = useCrud('products')
const productTagsService = useCrud('product-tags')

export const useProductStore = defineStore('product', () => {
  const products: Ref<any> = ref([])
  const selectedProductTags: Ref<any> = ref([])

  filterStore.$subscribe((mutation, state) => {
    find()
  })

  async function find(query?: any) {
    const { data } = await productsService.find({
      ...query,
      start: filterStore.startDate,
      end: filterStore.endDate,
      orderBy: getOrderByParamFromQuery(query.orderBy || {}),
    })

    products.value = data
  }

  function findOne(id: number) {
    return productsService.findOne(id)
  }

  function upsert(data: any) {
    return productsService.upsert(data)
  }

  function remove(data: any) {
    return productsService.remove(data.id)
  }

  async function getTagsByProduct(productId: number) {
    const result = await productTagsService.find({ productId })
    if (result) selectedProductTags.value = result.data
    return result
  }

  async function addTag(data: any) {
    const result = await productTagsService.upsert(data)
    await getTagsByProduct(data.productId)
    return result
  }

  async function removeTag(data: any) {
    const result = await productTagsService.remove(data.id)
    await getTagsByProduct(data.productId)
    return result
  }

  return {
    products,
    selectedProductTags,
    find,
    findOne,
    upsert,
    remove,
    addTag,
    removeTag,
    getTagsByProduct,
  }
})
