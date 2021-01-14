export const state = () => ({
  shape: 0
})

export const mutations = {
  shape(state, value) {
    state.shape = value
  }
}

// export const getters = {
//   foo(state) {
//     return state.bar
//   }
// }
