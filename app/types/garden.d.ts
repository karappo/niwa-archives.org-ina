// Type definitions for garden data

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

export interface Tour {
  positions: number[][]
  targets: number[][]
}

export interface HistoryContent {
  image: string
  title: string
  body: string
}

export interface GardenData {
  title: string
  pointcloud: string
  variations?: string[]
  initCamera: () => void
  guidedTour: string[]
  tours: Tour[]
  historyContent?: HistoryContent
  threeDDataContent?: string
  sounds?: Sound[]
}
