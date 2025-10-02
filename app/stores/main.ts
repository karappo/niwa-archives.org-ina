import { defineStore } from 'pinia'
import _uniq from 'lodash/uniq'

export interface LastUpdateDateTime {
  [key: string]: string
}

export interface CameraPosition {
  x: number
  y: number
  z: number
}

export interface CameraTarget {
  x: number
  y: number
  z: number
}

export type AnnotationKey =
  | 'Annotations'
  | 'Viewpoints'
  | 'Viewpoints/Still Images'
  | 'Viewpoints/Movies'
  | 'Elements'
  | 'Elements/Stones'
  | 'Elements/Plants'
  | 'Elements/Creatures'
  | 'Elements/Artifacts'
  | 'Elements/DNA Data'
  | 'Oral Archives'

export type AnnotationVisibilities = Record<AnnotationKey, boolean>

export interface MainState {
  lastUpdateDateTime: LastUpdateDateTime
  cameraPosition: CameraPosition | null
  cameraTarget: CameraTarget | null
  pageName: string
  tourName: string | null
  autoplay: boolean
  annotationVisibilities: AnnotationVisibilities
}

export const useMainStore = defineStore('main', {
  state: (): MainState => ({
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
    getLastUpdateDateTime: (state): LastUpdateDateTime => state.lastUpdateDateTime,
    getCameraPosition: (state): CameraPosition | null => state.cameraPosition,
    getCameraTarget: (state): CameraTarget | null => state.cameraTarget,
    getPageName: (state): string => state.pageName,
    getTourName: (state): string | null => state.tourName,
    getAutoplay: (state): boolean => state.autoplay,
    getAnnotationVisibilities: (state): AnnotationVisibilities => state.annotationVisibilities
  },

  actions: {
    setLastUpdateDateTime(key: string, value: string): void {
      this.lastUpdateDateTime[key] = value
    },

    setCameraPosition(value: CameraPosition | null): void {
      this.cameraPosition = value
    },

    setCameraTarget(value: CameraTarget | null): void {
      this.cameraTarget = value
    },

    setPageName(value: string): void {
      this.pageName = value
    },

    setTourName(value: string | null): void {
      this.tourName = value
    },

    setAutoplay(value: boolean): void {
      this.autoplay = value
    },

    setAnnotationVisibilities(key: AnnotationKey, value: boolean): void {
      switch (key) {
        case 'Annotations':
          // 全部変更
          for (const k in this.annotationVisibilities) {
            this.annotationVisibilities[k as AnnotationKey] = value
          }
          break
        case 'Viewpoints':
        case 'Elements':
          // Viewpoints/... や Elements/... を全部変更
          for (const k in this.annotationVisibilities) {
            if (k.includes(`${key}/`)) {
              this.annotationVisibilities[k as AnnotationKey] = value
            }
          }
          break
      }
      this.annotationVisibilities[key] = value

      // 'Viewpoints/'を含むものが全て同じ値なら、 Viewpointsの値もそれと同じにする
      const vKeys = Object.keys(this.annotationVisibilities).filter((key) => key.includes('Viewpoints/'))
      const vValues = vKeys.map((key) => this.annotationVisibilities[key as AnnotationKey])
      if (_uniq(vValues).length === 1) {
        this.annotationVisibilities.Viewpoints = vValues[0]
      }
      // 'Elements/'を含むものが全て同じ値なら、 Elementsの値もそれと同じにする
      const eKeys = Object.keys(this.annotationVisibilities).filter((key) => key.includes('Elements/'))
      const eValues = eKeys.map((key) => this.annotationVisibilities[key as AnnotationKey])
      if (_uniq(eValues).length === 1) {
        this.annotationVisibilities.Elements = eValues[0]
      }
      // Annotations以外の値が全て同じなら、Annotationの値もそれと同じにする
      const aKeys = Object.keys(this.annotationVisibilities).filter((key) => key !== 'Annotations')
      const aValues = aKeys.map((key) => this.annotationVisibilities[key as AnnotationKey])
      if (_uniq(aValues).length === 1) {
        this.annotationVisibilities.Annotations = aValues[0]
      }
    }
  }
})
