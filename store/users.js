import { getOrder } from '../service/user'

export const state = () => ({
  userinfo: {}
})

export const mutations = {
  add(state, name) {
    state.userinfo = name
  },
  changOrder(state, action) {
    console.log(action)
  }
}

export const actions = {
  async addOrder({ commit }, payload) {
    const data = await getOrder(payload)
    commit({ type: 'changOrder', payload })
  }
}
