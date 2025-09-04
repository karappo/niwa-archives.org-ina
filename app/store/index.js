export const useMainStore = defineStore('main', {
  state: () => ({
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
  }),

  actions: {
    lastUpdateDateTime({ key, value }) {
      this.lastUpdateDateTime[key] = value
    },
    cameraPosition(value) {
      this.cameraPosition = value
    },
    cameraTarget(value) {
      this.cameraTarget = value
    },
    pageName(value) {
      this.pageName = value
    },
    tourName(value) {
      this.tourName = value
    },
    autoplay(value) {
      this.autoplay = value
    },
    annotationVisibilities({ key, value }) {
      switch (key) {
        case 'Annotations':
          // 全部変更
          for (const k in this.annotationVisibilities) {
            this.annotationVisibilities[k] = value
          }
          break
        case 'Viewpoints':
        case 'Elements':
          // Viewpoints/... や Elements/... を全部変更
          for (const k in this.annotationVisibilities) {
            if (k.includes(`${key}/`)) {
              this.annotationVisibilities[k] = value
            }
          }
          break
      }
      this.annotationVisibilities[key] = value
    }
  },

  getters: {
    lastUpdateDateTime: (state) => state.lastUpdateDateTime,
    cameraPosition: (state) => state.cameraPosition,
    cameraTarget: (state) => state.cameraTarget,
    pageName: (state) => state.pageName,
    tourName: (state) => state.tourName,
    autoplay: (state) => state.autoplay,
    annotationVisibilities: (state) => state.annotationVisibilities
  }
})
