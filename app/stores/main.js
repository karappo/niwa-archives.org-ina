import { defineStore } from 'pinia'
import _uniq from 'lodash/uniq'
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

  getters: {
    getLastUpdateDateTime: (state) => state.lastUpdateDateTime,
    getCameraPosition: (state) => state.cameraPosition,
    getCameraTarget: (state) => state.cameraTarget,
    getPageName: (state) => state.pageName,
    getTourName: (state) => state.tourName,
    getAutoplay: (state) => state.autoplay,
    getAnnotationVisibilities: (state) => state.annotationVisibilities
  },

  actions: {
    setLastUpdateDateTime(key, value) {
      this.lastUpdateDateTime[key] = value
    },
    
    setCameraPosition(value) {
      this.cameraPosition = value
    },
    
    setCameraTarget(value) {
      this.cameraTarget = value
    },
    
    setPageName(value) {
      this.pageName = value
    },
    
    setTourName(value) {
      this.tourName = value
    },
    
    setAutoplay(value) {
      this.autoplay = value
    },
    
    setAnnotationVisibilities(key, value) {
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

      // 'Viewpoints/'を含むものが全て同じ値なら、 Viewpointsの値もそれと同じにする
      const vKeys = Object.keys(this.annotationVisibilities).filter((key) => key.includes('Viewpoints/'))
      const vValues = vKeys.map((key) => this.annotationVisibilities[key])
      if (_uniq(vValues).length === 1) {
        this.annotationVisibilities.Viewpoints = vValues[0]
      }
      // 'Elements/'を含むものが全て同じ値なら、 Elementsの値もそれと同じにする
      const eKeys = Object.keys(this.annotationVisibilities).filter((key) => key.includes('Elements/'))
      const eValues = eKeys.map((key) => this.annotationVisibilities[key])
      if (_uniq(eValues).length === 1) {
        this.annotationVisibilities.Elements = eValues[0]
      }
      // Annotations以外の値が全て同じなら、Annotationの値もそれと同じにする
      const aKeys = Object.keys(this.annotationVisibilities).filter((key) => key !== 'Annotations')
      const aValues = aKeys.map((key) => this.annotationVisibilities[key])
      if (_uniq(aValues).length === 1) {
        this.annotationVisibilities.Annotations = aValues[0]
      }
    }
  }
})