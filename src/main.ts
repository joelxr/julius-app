import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'

const routes = [
  {
    path: '/expenses',
    name: 'expenses',
    component: () => import('./expenses/ExpensesView.vue'),
    children: [
      {
        path: 'detail/:id?',
        name: 'expense-detail',
        component: () => import('./expenses/ExpenseForm.vue'),
      },
    ],
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import('./tags/TagView.vue'),
    children: [
      {
        path: 'detail/:id?',
        name: 'tag-detail',
        component: () => import('./tags/TagForm.vue'),
      },
    ],
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('./products/ProductsView.vue'),
    children: [
      {
        path: 'detail/:id?',
        name: 'product-detail',
        component: () => import('./products/ProductForm.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
