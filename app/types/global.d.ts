// Global type definitions for external libraries and window extensions

declare global {
  interface Window {
    viewer: any // Potree viewer instance
    FONTPLUS: {
      start: () => void
    }
    THREE: any
  }

  const Potree: any
  const THREE: any
  const $: any // jQuery
  const FONTPLUS: {
    start: () => void
  } | undefined
}

export {}
