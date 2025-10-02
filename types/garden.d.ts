export interface HistoryContent {
  image: string
  title: string
  body: string
}

export interface Tour {
  positions: number[][]
  targets: number[][]
}

export interface Sound {
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

export interface GardenData {
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
