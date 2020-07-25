import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  // state是vuex的唯一数据源，是所有组件的公共data
  state: {
    // 所登陆用户信息
    userInfo:{}
  },
  // 更改vuex的store中的状态的唯一方法是提交mutation
  mutations,
  actions,
  // 可以将getters理解为计算属性computed
  getters,
  modules: {
  }
})