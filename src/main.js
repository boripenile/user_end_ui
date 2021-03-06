import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import Bars from 'vuebars'
import vueEventCalendar from 'vue-event-calendar'
import axios from './axios'
import routes from './routes'
import store from './store'
import VueAnimateNumber from 'vue-animate-number'
import VueGmaps from 'vue-gmaps'
import VueLayers from 'vuelayers'
import VCharts from 'v-charts'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'
// Init plugin
// Resource logic
// Vue.use(Resource)
// Vue.http.options.emulateJSON = true
Vue.use(axios)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Bars)
Vue.use(vueEventCalendar, {locale: 'en'})
Vue.use(VueAnimateNumber)
Vue.use(VueGmaps, {
  key: 'AIzaSyCpr35b_ZSoP8nbz0VnBjVz6ABb7iurRCU',
  libraries: ['places'],
  version: '3'
})
Vue.use(VueLayers)
Vue.use(VCharts)

// Import top level component
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
//  for element 1.9.9 below
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'dripicons/webfont/webfont.css'
import 'vuelayers/lib/style.css'

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  // window.console.log('Transition', transition)
  var token = store.state.token
  if (token === null || token === 'undefined') {
    if (to.name === 'login') {
      next()
    } else if (to.name === 'my-companies') {
      next()
    } else if (to.name === 'verify-email') {
      next()
    } else if (to.name === 'registration') {
      next()
    } else {
      next({
        path: '/app/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    if (to.name === 'login') {
      next({
        path: '/profile',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  }
})
// Check local storage to handle refreshes
if (window.localStorage) {
  if (store.state.token !== window.localStorage.getItem('token')) {
    store.commit('setToken', window.localStorage.getItem('token'))
  }
}

// Some middleware to help us ensure the user is authenticated.

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

require('bootstrap')
// require('admin-lte')
require('../node_modules/admin-lte/dist/js/app.min.js')
require('../node_modules/admin-lte/dist/js/demo.js')
require('../node_modules/admin-lte/plugins/slimScroll/jquery.slimscroll.js')
