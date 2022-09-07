import actions from './actions'
import mutations from './mutations'
import getters from './getters'
const state ={
  count:4,
  LatestPrice:{}
}

export default{
  namespaced:true,
  state,
  getters,
  actions,
  mutations
}