export const state = () => ({
  eyeDomeLighting: true,
  shape: 1
})

export const mutations = {
  eyeDomeLighting(state, value) {
    state.eyeDomeLighting = value
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
