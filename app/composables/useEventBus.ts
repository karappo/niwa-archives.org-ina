import mitt from 'mitt'

type Events = {
  clickAnnotationLink: string
  selectList: string
  setTagIndexStr: string
  closeDrawer: void
  startCameraAnimation: number
  startRambleTourWithoutAnnotations: void
  spClose: void
  backToList: void
  prev: string
  next: string
  saveCameraInfo: void
  // 他のイベントもここに追加できます
}

const emitter = mitt<Events>()

export const useEventBus = () => {
  return emitter
}