import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

router.beforeEach((to, from, next) => {
  console.log(to.path, '切換路遊')
  if (to.path === '/login') {
    next()
    return
  }
  if (localStorage.getItem('test-token')) {
    const token = 'Bearer' + ' ' + localStorage.getItem('test-token')
    axios.defaults.headers.common.Authorization = token
    axios.get('http://127.0.0.1:3005/users/profile')
      .then((response) => {
        // console.log(response, 'router')
        store.commit('setUserInfo', response.data.data.user)
        next()
      })
      .catch((error) => {
        alert('token過期，請先登入')
        next('/login')
        console.log(error, 'error')
      })
  } else {
    alert('請先登入')
    next('/login')
  }
})

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  // .use(bootstrap)
  .mount('#app')
