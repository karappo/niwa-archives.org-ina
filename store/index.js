export const state = () => ({
  EDLEnabled: true,
  EDLRadius: 0.9, // default: 1.4
  EDLStrength: 0.1, // default: 0.4
  EDLOpacity: 1.0, // default: 1.0
  shape: 1,
  size: 0.8,
  pointBudget: 2000000,
  cameraAnimationCount: 0
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
  EDLOpacity(state, value) {
    state.EDLOpacity = value * 1
  },
  shape(state, value) {
    state.shape = value * 1
  },
  size(state, value) {
    state.size = value
  },
  pointBudget(state, value) {
    state.pointBudget = value
  },
  cameraAnimationCount(state, value) {
    state.cameraAnimationCount = value
  }
}

// export const getters = {
//   foo(state) {
//     return state.bar
//   }
// }
