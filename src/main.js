import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.css'
import $ from 'jquery'

// 引入事件总线，用于非父子组件间通信
Vue.prototype.$bus = new Vue()

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
