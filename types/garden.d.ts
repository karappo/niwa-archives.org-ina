interface HistoryContent {
  image: string
  title: string
  body: string
}

interface Tour {
  positions: number[][]
  targets: number[][]
}

interface Sound {
  label: string
  src: string
  place: {
    label: string
    annotation: string
  }
  creatures: string[]
  movieId: string | null
  ambisonicsUrl: string | null
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
  sounds?: Sound[]
}

declare module '~/data/gardens/*.js' {
  const gardenData: GardenData
  export default gardenData
}
