// 庭園データの型定義
export interface GardenData {
  title: string
  pointcloud: string
  variations?: string[]
  initCamera: () => void
  guidedTour: string[]
  tours: Tour[]
  sounds?: Sound[]
}

export interface Tour {
  positions: number[][]
  targets: number[][]
}

export interface Sound {
  id: string
  title: string
  file: string
  [key: string]: any
}
