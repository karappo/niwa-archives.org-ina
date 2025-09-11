export const state = () => ({
  lastUpdateDateTime: {}, // 各スプレッドシートの最終更新日時を保持
  cameraPosition: null,
  cameraTarget: null,
  pageName: '', // nullにするとエラーになる箇所があるので、必ずStringにしておく
  tourName: null,
  autoplay: false,
  annotationVisibilities: {
    Annotations: true,
    Viewpoints: true,
    'Viewpoints/Still Images': true,
    'Viewpoints/Movies': true,
    Elements: true,
    'Elements/Stones': true,
    'Elements/Plants': true,
    'Elements/Creatures': true,
    'Elements/Artifacts': true,
    'Elements/DNA Data': true,
    'Oral Archives': true
  }
})

export const mutations = {
  lastUpdateDateTime(state, { key, value }) {
    state.lastUpdateDateTime[key] = value
  },
  cameraPosition(state, value) {
    state.cameraPosition = value
  },
  cameraTarget(state, value) {
    state.cameraTarget = value
  },
  pageName(state, value) {
    state.pageName = value
  },
  tourName(state, value) {
    state.tourName = value
  },
  autoplay(state, value) {
    state.autoplay = value
  },
  annotationVisibilities(state, { key, value }) {
    switch (key) {
      case 'Annotations':
        // 全部変更
        for (const k in state.annotationVisibilities) {
          state.annotationVisibilities[k] = value
        }
        break
      case 'Viewpoints':
      case 'Elements':
        // Viewpoints/... や Elements/... を全部変更
        for (const k in state.annotationVisibilities) {
          if (k.includes(`${key}/`)) {
            state.annotationVisibilities[k] = value
          }
        }
        break
    }
    state.annotationVisibilities[key] = value
  }
}

export const getters = {
  lastUpdateDateTime(state) {
    return state.lastUpdateDateTime
  },
  cameraPosition(state) {
    return state.cameraPosition
  },
  cameraTarget(state) {
    return state.cameraTarget
  },
  pageName(state) {
    return state.pageName
  },
  tourName(state) {
    return state.tourName
  },
  autoplay(state) {
    return state.autoplay
  },
  annotationVisibilities(state) {
    return state.annotationVisibilities
  }
}
