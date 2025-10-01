declare module '~/data/gardens/*.js' {
  const gardenData: GardenData
  export default gardenData
}

interface HistoryContent {
  image: string
  title: string
  body: string
}

interface Tour {
  positions: number[][]
  targets: number[][]
}

interface GardenData {
  title: string
  pointcloud: string
  initCamera: () => void
  guidedTour: string[]
  tours: Tour[]
  variations?: string[]
  historyContent?: HistoryContent
  threeDDataContent?: string
}
