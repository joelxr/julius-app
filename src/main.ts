import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import AboutView from './about/AboutView.vue'
import ExpensesView from './expenses/ExpensesView.vue'

const routes = [
  { path: '/', component: ExpensesView },
  { path: '/about', component: AboutView },
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
