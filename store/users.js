export const state = () => ({
  userinfo: {}
})

export const mutations = {
  add(state, name) {
    state.userinfo = name
  }
}
