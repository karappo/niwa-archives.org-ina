export const state = () => ({
  EDLEnabled: true,
  shape: 0
})

export const mutations = {
  EDLEnabled(state, value) {
    state.EDLEnabled = value
  },
  shape(state, value) {
    state.shape = value
  }
}

// export const getters = {
//   foo(state) {
//     return state.bar
//   }
// }
