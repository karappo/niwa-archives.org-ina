import { defineStore } from 'pinia'
import _uniq from 'lodash/uniq'

export interface LastUpdateDateTime {
  [key: string]: string
}

export type CameraPosition = [number, number, number]

export type CameraTarget = [number, number, number]

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
  disabledAnnotations: Set<AnnotationKey>
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
    },
    disabledAnnotations: new Set()
  }),

  getters: {
    getLastUpdateDateTime: (state: MainState): LastUpdateDateTime => state.lastUpdateDateTime,
    getCameraPosition: (state: MainState): CameraPosition | null => state.cameraPosition,
    getCameraTarget: (state: MainState): CameraTarget | null => state.cameraTarget,
    getPageName: (state: MainState): string => state.pageName,
    getTourName: (state: MainState): string | null => state.tourName,
    getAutoplay: (state: MainState): boolean => state.autoplay,
    getAnnotationVisibilities: (state: MainState): AnnotationVisibilities => {
      // disabledなものを除外したannotationVisibilitiesを返す
      const result: Partial<AnnotationVisibilities> = {}
      for (const key in state.annotationVisibilities) {
        const annotationKey = key as AnnotationKey
        if (!state.disabledAnnotations.has(annotationKey)) {
          result[annotationKey] = state.annotationVisibilities[annotationKey]
        }
      }
      return result as AnnotationVisibilities
    }
  },

  actions: {
    setLastUpdateDateTime(key: string, value: string) {
      (this as unknown as MainState).lastUpdateDateTime[key] = value
    },

    setCameraPosition(value: CameraPosition | null) {
      (this as unknown as MainState).cameraPosition = value
    },

    setCameraTarget(value: CameraTarget | null) {
      (this as unknown as MainState).cameraTarget = value
    },

    setPageName(value: string) {
      (this as unknown as MainState).pageName = value
    },

    setTourName(value: string | null) {
      // pageNameと違い''は入れられないようにする
      (this as unknown as MainState).tourName = value === '' ? null : value
    },

    setAutoplay(value: boolean) {
      (this as unknown as MainState).autoplay = value
    },

    setAnnotationVisibilities(key: AnnotationKey, value: boolean) {
      const state = this as unknown as MainState
      switch (key) {
        case 'Annotations':
          // 全部変更
          for (const k in state.annotationVisibilities) {
            state.annotationVisibilities[k as AnnotationKey] = value
          }
          break
        case 'Viewpoints':
        case 'Elements':
          // Viewpoints/... や Elements/... を全部変更
          for (const k in state.annotationVisibilities) {
            if (k.includes(`${key}/`)) {
              state.annotationVisibilities[k as AnnotationKey] = value
            }
          }
          break
      }
      state.annotationVisibilities[key] = value

      const visibilities = (this as any).getAnnotationVisibilities
      // 'Viewpoints/'を含むものが全て同じ値なら、 Viewpointsの値もそれと同じにする
      const vKeys = Object.keys(visibilities).filter((key) => key.includes('Viewpoints/'))
      const vValues = vKeys.map((key) => visibilities[key as AnnotationKey])
      if (_uniq(vValues).length === 1) {
        state.annotationVisibilities.Viewpoints = vValues[0]
      }
      // 'Elements/'を含むものが全て同じ値なら、 Elementsの値もそれと同じにする
      const eKeys = Object.keys(visibilities).filter((key) => key.includes('Elements/'))
      const eValues = eKeys.map((key) => visibilities[key as AnnotationKey])
      if (_uniq(eValues).length === 1) {
        state.annotationVisibilities.Elements = eValues[0]
      }
      // Annotations,Viewpoints,Elements以外の値が全て同じなら、Annotationの値もそれと同じにする
      const aKeys = Object.keys(visibilities).filter((key) => !['Annotations', 'Viewpoints', 'Elements'].includes(key))
      const aValues = aKeys.map((key) => visibilities[key as AnnotationKey])
      if (_uniq(aValues).length === 1) {
        state.annotationVisibilities.Annotations = aValues[0]
      }
    },

    setDisabledAnnotation(key: AnnotationKey, disabled: boolean) {
      const state = this as unknown as MainState
      if (disabled) {
        state.disabledAnnotations.add(key)
      } else {
        state.disabledAnnotations.delete(key)
      }
    }
  }
})
