export const state = () => ({
  EDLEnabled: true,
  EDLRadius: 0.9,
  EDLStrength: 0.1,
  shape: 1,
  size: 0.8
})

export const mutations = {
  EDLEnabled(state, value) {
    state.EDLEnabled = value
  },
  EDLRadius(state, value) {
    state.EDLRadius = value * 1
  },
  EDLStrength(state, value) {
    state.EDLStrength = value * 1
  },
  shape(state, value) {
    state.shape = value * 1
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
