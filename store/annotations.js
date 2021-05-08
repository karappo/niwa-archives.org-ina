export const state = () => ({
  joeiJi: null,
  murinAn: null
})

export const mutations = {
  joeiJi(state, value) {
    state.joeiJi = value
  },
  murinAn(state, value) {
    state.murinAn = value
  }
}

// export const getters = {
//   foo(state) {
//     return state.bar
//   }
// }
