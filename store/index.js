export const state = () => ({
  eyeDomeLighting: true,
  shape: 1,
  size: 0.8
})

export const mutations = {
  eyeDomeLighting(state, value) {
    state.eyeDomeLighting = value
  },
  shape(state, value) {
    state.shape = parseInt(value, 10)
  },
  size(state, value) {
    state.size = value
  }
}

// export const getters = {
//   foo(state) {
//     return state.bar
//   }
// }
