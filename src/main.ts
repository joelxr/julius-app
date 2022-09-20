import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import TagView from './tags/TagView.vue'
import ProductView from './products/ProductsView.vue'
import ExpensesView from './expenses/ExpensesView.vue'
import ExpenseForm from './expenses/ExpenseForm.vue'

const routes = [
  {
    path: '/expenses',
    name: 'expenses',
    component: ExpensesView,
    children: [
      {
        path: 'detail/:id?',
        name: 'expense-detail',
        component: ExpenseForm,
      },
    ],
  },
  { path: '/tags', name: 'tags', component: TagView },
  { path: '/products', name: 'products', component: ProductView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
