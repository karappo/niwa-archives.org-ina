export const state = () => ({
  joeiJi: null,
  murinAnSnow: null,
  murinAnSummer: null,
  murinAnWinter: null,
  ryogenIn: null,
  fugetsuRoFebruary: null,
  fugetsuRoJuly: null
})

export const mutations = {
  joeiJi(state, value) {
    state.joeiJi = value
  },
  murinAnSnow(state, value) {
    state.murinAnSnow = value
  },
  murinAnSummer(state, value) {
    state.murinAnSummer = value
  },
  murinAnWinter(state, value) {
    state.murinAnWinter = value
  },
  ryogenIn(state, value) {
    state.ryogenIn = value
  },
  fugetsuRoFebruary(state, value) {
    state.fugetsuRoFebruary = value
  },
  fugetsuRoJuly(state, value) {
    state.fugetsuRoJuly = value
  }
}

export const getters = {
  joeiJi(state) {
    return state.joeiJi
  },
  murinAnSnow(state) {
    return state.murinAnSnow
  },
  murinAnSummer(state) {
    return state.murinAnSummer
  },
  murinAnWinter(state) {
    return state.murinAnWinter
  },
  ryogenIn(state) {
    return state.ryogenIn
  },
  fugetsuRoFebruary(state) {
    return state.fugetsuRoFebruary
  },
  fugetsuRoJuly(state) {
    return state.fugetsuRoJuly
  }
}
