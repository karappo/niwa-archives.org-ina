<template>
  <div class="root">
    <main>
      <splitpanes class="default-theme" :horizontal="isSP">
        <pane class="potree_container" size="60">
          <div
            v-if="isLowPerformance && noticeVisibility"
            class="notice"
            :class="{ full: spSideBarVisibility }"
          >
            <div class="text">
              3Dの点群の解像度を下げて表示しています。高解像度でご覧頂くには、より処理の速い端末かデスクトップ版ブラウザをご利用下さい。
            </div>
            <div class="closeButton" @click="noticeVisibility = false">
              <IconClose />
            </div>
          </div>
          <div class="potree_wrap">
            <div
              id="potree_render_area"
              ref="potreeRenderArea"
              :class="potreeRenderAreaClass"
            >
              <div
                v-if="debugMode"
                class="debugMenuButton"
                @click="viewer.toggleSidebar()"
              ></div>
              <div class="controls">
                <h1 class="title" @dblclick="data && data.initCamera()">
                  <span class="global">Incomplete Niwa Archives</span>
                  <span class="scene">{{ data ? data.title : '' }}</span>
                  <template v-if="infoMode">
                    <br />
                    <span style="font-size: 13px">
                      Benchmark Time: {{ benchmarkTime }}
                    </span>
                    <br />
                    <span style="font-size: 13px">
                      Low Performance Mode: {{ isLowPerformance }}
                    </span>
                  </template>
                </h1>
                <template v-if="tourName">
                  <TourIndicator
                    :numerator="tourData.list.length"
                    :denominator="tourCurrentIndex + 1"
                  />
                  <StopTourButton
                    :class="{
                      hiddenInSP: tourName !== 'Ramble Tour without Annotations'
                    }"
                  />
                </template>
                <template v-else>
                  <KeyMap
                    :sp-visibility="!drawerVisibility && keyMapSpVisibility"
                  />
                </template>
              </div>
            </div>
          </div>
        </pane>
        <pane
          v-if="drawerVisibility || spSideBarVisibility"
          class="drawer"
          :size="isSP ? 60 : 40"
          min-size="25"
          max-size="75"
          :class="{ border: !tourName }"
        >
          <template v-if="drawerVisibility">
            <DrawerHistory v-if="mainStore.getPageName === 'History'" />
            <Drawer3DData v-else-if="mainStore.getPageName === '3D Data'" />
            <DrawerAnnotation
              v-else-if="annotationData"
              :data="annotationData"
              :annotations="annotations"
              :prev-next-visibility="prevNextVisibility"
              :prev-disabled="prevDisabled"
              :next-disabled="nextDisabled"
              :is-sp="isSP"
              @backToList="clearAnnotationData"
              @prev="prev"
              @next="next"
            />
            <DrawerList v-else-if="tourData" :data="tourData" />
            <DrawerList v-else-if="listData" :data="listData" />
          </template>
          <template v-else-if="spSideBarVisibility">
            <SideBar
              :guided-tour-exists="0 < (data?.guidedTour?.length || 0)"
              :variations="data?.variations"
              :sp-visibility="!drawerVisibility && sideBarSpVisibility"
              @spClose="sideBarSpVisibility = false"
              @saveCameraInfo="saveCameraInfo"
            />
          </template>
        </pane>
      </splitpanes>
      <SoundBar
        :annotations="annotations"
        :sp-visibility="!drawerVisibility && soundSpVisibility"
        @spClose="soundSpVisibility = false"
      />
      <nav v-if="!drawerVisibility && !sideBarSpVisibility" class="spMenu">
        <div
          class="btn"
          :class="{ active: sideBarSpVisibility }"
          @click="sideBarSpVisibility = !sideBarSpVisibility"
        >
          <SpMenuList />
        </div>
        <div
          class="btn"
          :class="{ active: keyMapSpVisibility }"
          @click="keyMapSpVisibility = !keyMapSpVisibility"
        >
          <SpMenuNavigate />
        </div>
        <div
          v-if="soundDataExists"
          class="btn"
          :class="{ active: soundSpVisibility }"
          @click="soundSpVisibility = !soundSpVisibility"
        >
          <SpMenuSound />
        </div>
      </nav>
    </main>
    <SideBar
      v-if="!tourName"
      class="sideBar"
      :guided-tour-exists="0 < (data?.guidedTour?.length || 0)"
      :variations="data?.variations"
      @spClose="sideBarSpVisibility = false"
      @saveCameraInfo="saveCameraInfo"
    />
  </div>
</template>

<style scoped>
.root {
  width: 100%;
  height: var(--vh);
  background: #000;
  display: flex;
  @media only screen and (max-width: 428px) {
    flex-direction: column;
  }
}
main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  @media only screen and (max-width: 428px) {
    height: 100%;
    min-height: var(--main-min-height);
  }
}
.debugMenuButton {
  width: 20px;
  height: 20px;
  background: green;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 100;
}
nav.spMenu {
  display: none;
  @media only screen and (max-width: 749px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
  }
  .btn {
    width: var(--sp-menu-width);
    height: var(--sp-menu-width);
    flex-shrink: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-tap-highlight-color: transparent;
    &.active > svg {
      opacity: 0.5;
    }
  }
  .btn + .btn {
    border-top: 1px solid #3d3d3d;
  }
}
.sideBar {
  flex-shrink: 0;
  width: 165px;
  height: 100%;
  margin: 0;
  border-left: 0;
  @media only screen and (max-width: 749px) {
    display: none;
  }
}
.title {
  margin: 24px;
  font-family: 'K2-v1-Light';
  font-weight: normal;
  font-size: 17px;
  color: white;
  @media only screen and (max-width: 749px) {
    margin-right: calc(24px + var(--sp-menu-width));
  }
  @media only screen and (max-width: 428px) {
    margin: 10px 16px;
    letter-spacing: 0;
  }
  .scene {
    margin-left: 26px;
    @media only screen and (max-width: 428px) {
      margin-top: -2px;
      margin-left: 0;
    }
  }
  span {
    @media only screen and (max-width: 428px) {
      display: block;
    }
  }
}
.splitpanes.default-theme {
  overflow: hidden;
  .splitpanes__pane {
    background-color: rgba(0, 0, 0, 0.9);
    &.potree_container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .notice {
        background-color: #c9e2d4;
        color: black;
        font-size: 13px;
        padding: 15px;
        display: flex;
        align-items: center;
        flex-shrink: 0;
        @media only screen and (max-width: 749px) {
          font-size: 10px;
        }
        &:not(.full) {
          @media only screen and (max-width: 749px) {
            margin-right: var(--sp-menu-width);
          }
        }
        .text {
          margin-right: auto;
        }
        .closeButton {
          cursor: pointer;
          background-color: #434343;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 10px;
          margin-right: 0;
          transition: background-color 0.2s;
          flex-shrink: 0;
          svg {
            width: 8px;
            height: 8px;
            line {
              stroke: #d3d3d3;
              transition: stroke 0.2s;
            }
          }
          &:hover {
            background-color: black;
            svg {
              line {
                stroke: white;
              }
            }
          }
        }
      }
      .potree_wrap {
        position: relative;
        width: 100%;
        height: 100%;
      }
    }
    &.drawer {
      overflow-y: auto;
      background-color: black;
      @media only screen and (min-width: 429px) {
        margin-left: -6px;
        height: calc(100% - 1px);
      }
      &.border {
        border-right: 1px solid #3c3c3c;
        border-bottom: 1px solid #3c3c3c;
      }
    }
  }
}
#potree_render_area {
  width: 100%;
  height: 100%;
  &::before {
    content: '';
    font-size: 30px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #111;
    position: absolute;
    z-index: 99999990;
    opacity: 0;
    pointer-events: none;
    transition: opacity 3s;
  }
  &.disabled {
    pointer-events: none;
  }
  &.loading {
    &::before {
      content: 'Loading...';
      opacity: 1;
      pointer-events: auto;
    }
  }
}
.controls {
  position: absolute;
  z-index: 99999999;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  > * {
    pointer-events: auto;
  }
  :deep(.stopTourButton) {
    position: absolute;
    width: 160px;
    height: 50px;
    bottom: 25px;
    right: 25px;
    font-family: 'K2-v1-Bold';
    font-size: 17px;
    color: white;
    background-color: #1d1d1d;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: lighten(#1d1d1d, 5%);
    }
    @media only screen and (max-width: 749px) {
      font-size: 15px;
      width: 110px;
      height: 40px;
      bottom: 15px;
      right: 15px;
      /* with Annotationの時は非表示にする */
      &.hiddenInSP {
        display: none;
      }
    }
  }
}
.sideBar {
  grid-area: sidebar;
}
</style>

<style>
/* 下記のコードは本当はdeepでscopedの方に入れたい */
.root {
  .splitpanes.default-theme {
    .splitpanes__splitter {
      background-color: transparent;
      border: 0;
      width: 7px;
      z-index: 2;
      margin-left: 0; /* デフォルトのスタイルが-1になっていて変な線が生じてしまうので0にする */
      @media only screen and (max-width: 428px) {
        width: 100%;
        height: 7px;
      }
    }
  }
  #potree_render_area {
    &.rambleTourWithoutAnnotations {
      .annotation.highlighted {
        visibility: visible;
      }
    }
    /* Ramble Tour中はこのクラスがなくなる */
    &:not(.rambleTourWithoutAnnotations) {
      &.viewpointsStillImages {
        .annotation[data-category='Viewpoints/Still Images'] {
          visibility: visible;
        }
      }
      &.viewpointsMovies {
        .annotation[data-category='Viewpoints/Movies'] {
          visibility: visible;
        }
      }
      &.elementsStones {
        .annotation[data-category='Elements/Stones'] {
          visibility: visible;
        }
      }
      &.elementsPlants {
        .annotation[data-category='Elements/Plants'] {
          visibility: visible;
        }
      }
      &.elementsCreatures {
        .annotation[data-category='Elements/Creatures'] {
          visibility: visible;
        }
      }
      &.elementsArtifacts {
        .annotation[data-category='Elements/Artifacts'] {
          visibility: visible;
        }
      }
      &.elementsDnaData {
        .annotation[data-category='Elements/DNA Data'] {
          visibility: visible;
        }
      }
      &.oralArchives {
        .annotation[data-category='Oral Archives'] {
          visibility: visible;
        }
      }
    }
    canvas {
      outline: none;
    }
    /* アノテーションの表示切り替え */
    .annotation {
      visibility: hidden;
    }
  }
}
</style>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMainStore } from '~/stores/main'
import { useAnnotationsStore } from '~/stores/annotations'
// Import device composable differently for Nuxt 4
import _groupBy from 'lodash/groupBy'
import _shuffle from 'lodash/shuffle'
import { camelCase } from 'change-case'
import AllSoundData from '~/data/sounds.js'
import IconClose from '~/assets/image/icon-close.svg'
import SpMenuList from '~/assets/image/spMenu/list.svg'
import SpMenuNavigate from '~/assets/image/spMenu/navigate.svg'
import SpMenuSound from '~/assets/image/spMenu/sound.svg'

// Reactive data
const debugMode = ref(false)
const infoMode = ref(false)
const benchmarkTime = ref(null)
const isLowPerformance = ref(false)
const isSP = ref(false)
const annotations = ref([])
const annotationGroups = ref([])
const data = ref(null)
const tours = ref(null)
const annotationData = ref('')
const listData = ref(null)
const tourData = ref(null)
const loading = ref(true)
const noticeVisibility = ref(true)
const rambleTourTimer = ref(null)
const sideBarSpVisibility = ref(false)
const keyMapSpVisibility = ref(true)
const soundSpVisibility = ref(false)
const cameraPositionWatcher = ref(null)

// Template ref
const potreeRenderArea = ref(null)

// Composables
const route = useRoute()
const router = useRouter()
const mainStore = useMainStore()
const annotationsStore = useAnnotationsStore()
// const { $device } = useDevice() // Will be fixed when device module is properly configured

// Computed properties
const viewer = computed(() => {
  return window.viewer
})

const prevNextVisibility = computed(() => {
  return listData.value !== null || tourData.value !== null
})

const listDataIdArray = computed(() => {
  return listData.value ? listData.value.list.map((a) => a.id) : []
})

const listCurrentIndex = computed(() => {
  if (!annotationData.value) {
    return null
  }
  return listDataIdArray.value.indexOf(annotationData.value.id)
})

const tourDataIdArray = computed(() => {
  return tourData.value ? tourData.value.list.map((a) => a.id) : []
})

const tourCurrentIndex = computed(() => {
  if (!annotationData.value) {
    return null
  }
  return tourDataIdArray.value.indexOf(annotationData.value.id)
})

const prevDisabled = computed(() => {
  if (tourData.value && tourData.value.name.includes('Ramble Tour')) {
    return false
  }
  if (tourDataIdArray.value.length) {
    return tourCurrentIndex.value <= 0
  }
  return listCurrentIndex.value <= 0
})

const nextDisabled = computed(() => {
  if (tourData.value && tourData.value.name.includes('Ramble Tour')) {
    return false
  }
  if (tourDataIdArray.value.length) {
    return tourDataIdArray.value.length - 1 <= tourCurrentIndex.value
  }
  return listDataIdArray.value.length - 1 <= listCurrentIndex.value
})

const potreeRenderAreaClass = computed(() => {
  const visibilities = JSON.parse(JSON.stringify(mainStore.getAnnotationVisibilities))
  Object.keys(visibilities).forEach(function (key) {
    visibilities[camelCase(key)] = visibilities[key]
    delete visibilities[key]
  })
  const res = visibilities
  res.loading = loading.value
  res.rambleTourWithoutAnnotations = tourName.value === 'Ramble Tour without Annotations'
  res.disabled = tourName.value !== null
  return res
})

const tourName = computed(() => {
  return mainStore.getTourName
})

const spSideBarVisibility = computed(() => {
  return (
    isSP.value &&
    !drawerVisibility.value &&
    sideBarSpVisibility.value &&
    !tourName.value
  )
})

const drawerVisibility = computed(() => {
  return !(tourName.value && tourName.value.includes('without Annotations')) && (tourData.value || listData.value || annotationData.value)
})

const soundDataExists = computed(() => {
  const garden = getGardenFromRoute(route)
  return AllSoundData[garden] || false
})

// Helper functions
const getGardenFromRoute = (route) => {
  const arr = route.params.alias.split('-')
  if (arr.length >= 2) {
    return arr[0]
  } else {
    return route.params.alias
  }
}

const getFirstAnnotationInSameGroup = (annotation) => {
  return window.viewer.scene.annotations.children.find(
    (a) => JSON.stringify(a.data.position) === JSON.stringify(annotation.position)
  )
}

const calcIsSp = () => {
  const pcSpThreshold = 749
  isSP.value = window.innerWidth <= pcSpThreshold
}

// Method implementations (simplified for initial Composition API conversion)
const highlightAnnotation = (domElement) => {
  console.log('highlightAnnotation called', domElement)
}

const clearAnnotationHighlight = () => {
  console.log('clearAnnotationHighlight called')
}

const stopRambleTourWithoutAnnotations = () => {
  if (rambleTourTimer.value) {
    mainStore.setPageName('')
    clearAnnotationData()
    clearInterval(rambleTourTimer.value)
    rambleTourTimer.value = null
  }
}

const clearAnnotationData = () => {
  annotationData.value = null
}

const prev = (id) => {
  console.log('prev called:', id)
}

const next = (id) => {
  console.log('next called:', id)
}

const saveCameraInfo = () => {
  console.log('saveCameraInfo called')
}

// Watchers
watch(tourName, (val) => {
  if (val === null) {
    stopRambleTourWithoutAnnotations()
  }
})

watch(sideBarSpVisibility, (val) => {
  if (val) {
    keyMapSpVisibility.value = false
    soundSpVisibility.value = false
  }
})

watch(keyMapSpVisibility, (val) => {
  if (val) {
    soundSpVisibility.value = false
    sideBarSpVisibility.value = false
  }
})

watch(soundSpVisibility, (val) => {
  if (val) {
    keyMapSpVisibility.value = false
    sideBarSpVisibility.value = false
  }
})

watch(annotationData, (val) => {
  if (val) {
    const annotation = window.viewer?.scene?.annotations?.children?.find(
      (a) => a.data.id === val.id
    )
    if (annotation) {
      highlightAnnotation(annotation.domElement[0])
    } else {
      const firstAnnotationInSameGroup = getFirstAnnotationInSameGroup(val)
      if (firstAnnotationInSameGroup) {
        highlightAnnotation(firstAnnotationInSameGroup.domElement[0])
      }
    }
  } else {
    clearAnnotationHighlight()
  }
})

watch(listData, (val) => {
  if (val) {
    if (val.name === 'Group') {
      const firstAnnotationInSameGroup = getFirstAnnotationInSameGroup(val.list[0])
      if (firstAnnotationInSameGroup) {
        highlightAnnotation(firstAnnotationInSameGroup.domElement[0])
      }
    }
  } else {
    clearAnnotationHighlight()
  }
})

// Lifecycle
onMounted(async () => {
  try {
    const alias = route.params.alias

    // For now, use empty array for annotations (will be replaced when we integrate stores)
    const annotationsData = []

    // 同位置のアノテーションはgroupにする
    const annotationGroupsData = Object.values(
      _groupBy(annotationsData, 'position')
    ).filter((a) => a.length > 1)

    annotationsData.forEach((a) => {
      // groupに属するかどうかをBooleanで持たせる
      a.grouped = annotationGroupsData.some(
        (g) => JSON.stringify(g[0].position) === JSON.stringify(a.position)
      )
      // groupの最初のアノテーションかどうかをBooleanで持たせる
      a.firstInGroup = annotationGroupsData.some(
        (g) => g[0].id === a.id
      )
    })

    // Load garden data
    let importedData = await import(`~/data/gardens/${alias}.js`)
    const gardenData = importedData.default

    // Apply loaded data
    annotations.value = annotationsData
    annotationGroups.value = annotationGroupsData
    data.value = gardenData
  } catch (error) {
    console.error('Failed to load page data:', error)
  }

  if (typeof window !== 'undefined' && window.FONTPLUS) {
    window.FONTPLUS.start()
  }

  // GET変数にdebugがtrueだったらdebugModeをtrueにする
  debugMode.value = new URLSearchParams(window.location.search).has('debug')
  infoMode.value = new URLSearchParams(window.location.search).has('info')

  // 処理速度を計測するためのベンチマーク
  function runBenchmark() {
    const iterations = 1000000
    const startTime = performance.now()
    for (let i = 0; i < iterations; i++) {
      Math.sqrt(i)
    }
    const endTime = performance.now()
    return endTime - startTime
  }
  benchmarkTime.value = runBenchmark()

  // TODO: Fix device detection for Nuxt 4
  isLowPerformance.value = false // $device.isMobileOrTablet ? 1.5 < benchmarkTime.value : false

  calcIsSp()

  // Simplified Potree initialization for Composition API
  console.log('Potree initialization would happen here')

  setTimeout(() => {
    loading.value = false
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(cameraPositionWatcher.value)
  document.querySelectorAll('#profile_window,.sp-container').forEach((e) => e.remove())
})

// Head configuration for Nuxt
useHead({
  bodyAttrs: {
    class: 'detail'
  }
})
</script>