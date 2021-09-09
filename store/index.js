export const state = () => ({
  cameraPosition: null,
  cameraTarget: null,
  selectedCategory: '', // nullにするとエラーになる箇所があるので、必ずStringにしておく
  autoPlayNextVideo: false,
  //
  EDLEnabled: true,
  EDLRadius: 0, // default: 1.4
  EDLStrength: 0, // default: 0.4
  EDLOpacity: 0.85, // default: 1.0
  shape: 1,
  size: 0.66,
  pointBudget: 2000000,
  cameraAnimationCount: 0,
  controlMode: 0 // 3つのcontrolsModeのうち、どれにするかを切り替える0,1,2のいずれか
})

export const mutations = {
  cameraPosition(state, value) {
    state.cameraPosition = value
  },
  cameraTarget(state, value) {
    state.cameraTarget = value
  },
  selectedCategory(state, value) {
    state.selectedCategory = value
  },
  autoPlayNextVideo(state, value) {
    state.autoPlayNextVideo = value
  },
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
  },
  controlMode(state, value) {
    // validation
    if (0 <= value && value <= 2) {
      state.controlMode = value
    } else {
      console.error('Invalid value : ' + value)
    }
  }
}

export const getters = {
  cameraPosition(state) {
    return state.cameraPosition
  },
  cameraTarget(state) {
    return state.cameraTarget
  },
  selectedCategory(state) {
    return state.selectedCategory
  },
  autoPlayNextVideo(state) {
    return state.autoPlayNextVideo
  },
  EDLEnabled(state) {
    return state.EDLEnabled
  },
  EDLRadius(state) {
    return state.EDLRadius
  },
  EDLStrength(state) {
    return state.EDLStrength
  },
  EDLOpacity(state) {
    return state.EDLOpacity
  },
  shape(state) {
    return state.shape
  },
  size(state) {
    return state.size
  },
  pointBudget(state) {
    return state.pointBudget
  },
  cameraAnimationCount(state) {
    return state.cameraAnimationCount
  },
  controlMode(state) {
    return state.controlMode
  }
}
