import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCrud, useInsights, api } from '../api'

const productsService = { ...useCrud('products'), ...useInsights('products') }
const productTagsService = useCrud('product-tags')

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const selectedProductTags = ref([])

  async function find(query = {}) {
    const { data } = await productsService.find({
      ...query,
      orderBy: [{ column: 'name' }, { column: 'id' }],
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

  function insights(id: number) {
    return productsService.insights(id)
  }

  function expenses(id: number) {
    return api.get(`products/${id}/expenses`)
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
    insights,
    expenses,
    addTag,
    removeTag,
    getTagsByProduct,
  }
})
