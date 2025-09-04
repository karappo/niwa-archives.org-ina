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
              ref="potree_render_area"
              :class="potreeRenderAreaClass"
            >
              <div
                v-if="debugMode"
                class="debugMenuButton"
                @click="viewer.toggleSidebar()"
              ></div>
              <div class="controls">
                <h1 class="title" @dblclick="data.initCamera()">
                  <span class="global">Incomplete Niwa Archives</span>
                  <span class="scene">{{ data.title }}</span>
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
            <DrawerHistory v-if="mainStore.pageName === 'History'" />
            <Drawer3DData v-else-if="mainStore.pageName === '3D Data'" />
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
              :guided-tour-exists="0 < data.guidedTour.length"
              :variations="data.variations"
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
      :guided-tour-exists="0 < data.guidedTour.length"
      :variations="data.variations"
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
  /deep/ .stopTourButton {
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
// このファイル全体でprettierを無効化する
/* eslint-disable prettier/prettier */
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import _groupBy from 'lodash/groupBy'
import _shuffle from 'lodash/shuffle'
import { camelCase } from 'change-case'
import AllSoundData from '~/data/sounds.js'
import IconClose from '~/assets/image/icon-close.svg?inline'
import SpMenuList from '~/assets/image/spMenu/list.svg?inline'
import SpMenuNavigate from '~/assets/image/spMenu/navigate.svg?inline'
import SpMenuSound from '~/assets/image/spMenu/sound.svg?inline'
import { useMainStore } from '~/store/index.js'
import { useAnnotationsStore } from '~/store/annotations.js'

const props = defineProps({
  file: {
    type: String,
    require: true,
    default: null
  }
})

// Piniaストアのインスタンスを作成
const mainStore = useMainStore()
const annotationsStore = useAnnotationsStore()

const route = useRoute()

const { data: asyncData, pending: loading } = useAsyncData('alias-data', async () => {
  let data = await import(`~/data/gardens/${route.params.alias}.js`)
  data = data.default

  return {
    data
  }
})

const data = computed(() => asyncData.value?.data || {})

const annotations = computed(() => {
  if (process.client) {
    return annotationsStore[camelCase(route.params.alias)] || []
  }
  return []
})

const annotationGroups = computed(() => {
  if (process.client) {
    const annotations = annotationsStore[camelCase(route.params.alias)] || []
    return Object.values(
      _groupBy(annotations, 'position')
    ).filter((a) => 1 < a.length)
  }
  return []
})

const debugMode = ref(false)
const infoMode = ref(false)
const benchmarkTime = ref(null)
const isLowPerformance = ref(false)
const isSP = ref(false)
const tours = ref(null)
const annotationData = ref('')
const listData = ref(null)
const tourData = ref(null)
const noticeVisibility = ref(true)
const rambleTourTimer = ref(null)
const sideBarSpVisibility = ref(false)
const keyMapSpVisibility = ref(true)
const soundSpVisibility = ref(false)

const viewer = computed(() => window.viewer)
const prevNextVisibility = computed(() => listData.value !== null || tourData.value !== null)
const listDataIdArray = computed(() => listData.value ? listData.value.list.map((a) => a.id) : [])
const listCurrentIndex = computed(() => {
  if (!annotationData.value) {
    return null
  }
  return listDataIdArray.value.indexOf(annotationData.value.id)
})
const tourDataIdArray = computed(() => tourData.value ? tourData.value.list.map((a) => a.id) : [])
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
  const visibilities = JSON.parse(JSON.stringify(mainStore.annotationVisibilities || {}))
  Object.keys(visibilities).forEach(function(key) {
    visibilities[camelCase(key)] = visibilities[key]
    delete visibilities[key]
  })
  const res = visibilities
  res.loading = loading.value
  res.rambleTourWithoutAnnotations = tourName.value === 'Ramble Tour without Annotations'
  res.disabled = tourName.value !== null
  return res
})
const tourName = computed(() => mainStore.tourName)
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
const soundDataExists = computed(() => AllSoundData[useNuxtApp().$garden(route)] || false)

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
    const annotation = window.viewer.scene.annotations.children.find(
      (a) => a.data.id === val.id
    )
    if (annotation) {
      highlightAnnotation(annotation.domElement[0])
    } else {
      const firstAnnotationInSameGroup = getFirstAnnotationInSameGroup(val)
      highlightAnnotation(firstAnnotationInSameGroup.domElement[0])
    }
  } else {
    clearAnnotationHighlight()
  }
})
watch(listData, (val) => {
  if (val) {
    if (val.name === 'Group') {
      const firstAnnotationInSameGroup = getFirstAnnotationInSameGroup(val.list[0])
      highlightAnnotation(firstAnnotationInSameGroup.domElement[0])
    }
  } else {
    clearAnnotationHighlight()
  }
})

onMounted(async () => {
  if (FONTPLUS) {
    FONTPLUS.start()
  }

  debugMode.value = new URLSearchParams(window.location.search).has('debug')
  infoMode.value = new URLSearchParams(window.location.search).has('info')

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

  isLowPerformance.value = useNuxtApp().$isMobileOrTablet() ? 1.5 < benchmarkTime.value : false

  calcIsSp()

  const viewerInstance = new Potree.Viewer(useNuxtApp().$refs.potree_render_area)
  window.viewer = viewerInstance
  viewerInstance.setFOV(75)
  viewerInstance.loadSettingsFromURL()
  viewerInstance.setBackground('originalColor')
  viewerInstance.setEDLEnabled(true)
  viewerInstance.setEDLRadius(0)
  viewerInstance.setEDLStrength(0)
  viewerInstance.setEDLOpacity(isLowPerformance.value ? 0.75 : 0.85)
  viewerInstance.setPointBudget(isLowPerformance.value ? 200000 : 2000000)

  setControlMode(0)

  if (debugMode.value) {
    viewerInstance.loadGUI(() => {
      viewerInstance.setLanguage('en')
      $('#menu_tools').next().show()
      $('#menu_scene').next().show()
    })
  }
  const { pointcloud } = await Potree.loadPointCloud(`/ina/assets/pointclouds/${data.pointcloud}`)
  pointcloud.material.activeAttributeName = 'rgba'
  pointcloud.material.pointSizeType = Potree.PointSizeType.ADAPTIVE
  pointcloud.material.shape = Potree.PointShape.CIRCLE
  pointcloud.material.size = 0.66

  viewerInstance.scene.addPointCloud(pointcloud)

  if (
    mainStore.cameraPosition &&
    mainStore.cameraTarget
  ) {
    window.viewer.scene.view.position.set(
      ...mainStore.cameraPosition
    )
    window.viewer.scene.view.lookAt(
      new THREE.Vector3(...mainStore.cameraTarget)
    )
  } else {
    data.initCamera()
  }

  const toursArray = []
  data.tours.forEach((data) => {
    const animation = new Potree.CameraAnimation(window.viewer)
    for (let i = 0; i < data.positions.length; i++) {
      const cp = animation.createControlPoint()
      cp.position.set(...data.positions[i])
      cp.target.set(...data.targets[i])
    }
    window.viewer.scene.addCameraAnimation(animation)
    animation.setDuration(20)
    animation.setVisible(false)
    toursArray.push(animation)
  })
  tours.value = toursArray

  if (annotations) {
    annotations
      .filter((a) => !a.grouped)
      .forEach((data) => {
        const a = new Potree.Annotation(data)
        a.domElement.off('mouseenter')
        a.domElement.off('mouseleave')
        a.addEventListener('click', onClickAnnotation)
        window.viewer.scene.annotations.add(a)
      })
  }
  if (annotationGroups) {
    annotationGroups.forEach((data) => {
      const a = new Potree.Annotation(data[0], data.length - 1)
      a.domElement.off('mouseenter')
      a.domElement.off('mouseleave')
      a.addEventListener('click', onClickAnnotation)
      window.viewer.scene.annotations.add(a)
    })
  }

  useNuxtApp().$nuxt.$on('closeDrawer', closeDrawer)
  useNuxtApp().$nuxt.$on('startCameraAnimation', startCameraAnimation)
  useNuxtApp().$nuxt.$on('selectList', selectList)
  useNuxtApp().$nuxt.$on('clickAnnotationLink', onClickAnnotationLink)
  useNuxtApp().$nuxt.$on('startRambleTourWithoutAnnotations', startRambleTourWithoutAnnotations)
  window.viewer.addEventListener('camera_changed', update)
  window.addEventListener('resize', calcIsSp)
  document.addEventListener('keydown', keydown)
  document.addEventListener('keyup', keyup)

  setTimeout(() => {
    loading.value = false
  }, 1000)
})

onBeforeUnmount(() => {
  useNuxtApp().$nuxt.$off('closeDrawer', closeDrawer)
  useNuxtApp().$nuxt.$off('startCameraAnimation', startCameraAnimation)
  useNuxtApp().$nuxt.$off('selectList', selectList)
  useNuxtApp().$nuxt.$off('clickAnnotationLink', onClickAnnotationLink)
  useNuxtApp().$nuxt.$off('startRambleTourWithoutAnnotations', startRambleTourWithoutAnnotations)
  window.viewer.removeEventListener('camera_changed', update)
  window.removeEventListener('resize', calcIsSp)
  document.removeEventListener('keydown', keydown)
  document.removeEventListener('keyup', keyup)
  if (window.viewer.scene.annotations) {
    window.viewer.scene.annotations.children.forEach((a) => {
      a.removeEventListener('click', onClickAnnotation)
    })
  }
  document.querySelectorAll('#profile_window,.sp-container').forEach((e) => e.remove())
})

function keydown(e) {
  const canvas = document.querySelector('canvas')
  if (document.activeElement !== canvas) {
    canvas.focus()
  }
}

function keyup(e) {
  const canvas = document.querySelector('canvas')
  if (document.activeElement !== canvas) {
    canvas.focus()
  }
}

function calcIsSp() {
  const pcSpThreshold = 749
  isSP.value = window.innerWidth <= pcSpThreshold
}

function setControlMode(mode) {
  switch (mode) {
    case 0:
      window.viewer.setControls(window.viewer.fpControls)
      window.viewer.fpControls.lockElevation = true
      break
    case 1:
      window.viewer.setControls(window.viewer.earthControls)
      break
    case 2:
      window.viewer.setControls(window.viewer.orbitControls)
      break
  }
}

function startCameraAnimation(index) {
  tours.value[index].play()
}

function prev(id) {
  let idArray = null
  if (tourData.value) {
    idArray = tourDataIdArray.value
  } else if (listData.value) {
    idArray = listDataIdArray.value
  } else {
    console.error('prev: tourData, listData どちらも存在しません')
    return
  }

  let index = idArray.indexOf(id) - 1
  if (index < 0) {
    index = idArray.length - 1
  }
  openAnnotationById(idArray[index])
}

function next(id) {
  let idArray = null
  if (tourData.value) {
    idArray = tourDataIdArray.value
  } else if (listData.value) {
    idArray = listDataIdArray.value
  } else {
    console.error('prev: tourData, listData どちらも存在しません')
    return
  }
  let index = idArray.indexOf(id) + 1
  if (idArray.length <= index) {
    index = 0
  }
  openAnnotationById(idArray[index])
}

function getFirstAnnotationInSameGroup(annotation) {
  return window.viewer.scene.annotations.children.find(
    (a) => JSON.stringify(a.data.position) === JSON.stringify(annotation.position)
  )
}

function isOpenSameGroup(annotation) {
  if (
    annotation &&
    annotation.data &&
    annotation.data.grouped &&
    listData.value
  ) {
    const firstAnnotationInSameGroup = getFirstAnnotationInSameGroup(annotation)
    if (firstAnnotationInSameGroup) {
      return listData.value.list[0].id === firstAnnotationInSameGroup.data.id
    }
  }
  return false
}

function openAnnotationById(id) {
  const stackTrace = new Error().stack
  if (stackTrace.includes('Annotation.click')) {
    console.error("openAnnotationByIdは、Annotation.clickを起点とした処理中で呼び出されていますが、これは意図した動作ではありません。コードを見直して、呼び出されないようにしてください")
    return
  }

  const annotation = window.viewer.scene.annotations.children.find(
    (a) => a.data.id === id
  )
  if (annotation) {
    annotation.moveHere(mainStore.pageName?.includes('Tour') ? 10000 : null)
    nextTick(() => {
      annotationData.value = annotation.data
    })
    return
  }

  const annotationDataItem = annotations.find((a) => a.id === id)
  if (annotationDataItem) {
    const firstAnnotationInSameGroup = getFirstAnnotationInSameGroup(annotationDataItem)
    firstAnnotationInSameGroup.moveHere(mainStore.pageName?.includes('Tour') ? 10000 : null)
    nextTick(() => {
      annotationData.value = annotationDataItem
    })
    return
  }

  console.error(`id=${id} のアノテーションが見つかりませんでした`)
}

function getAnnotationGroupByPosition(position) {
  return annotationGroups.find(
    (g) => JSON.stringify(g[0].position) === JSON.stringify(position)
  )
}

function highlightAnnotation(annotationElement) {
  clearAnnotationHighlight()
  annotationElement.classList.add('highlighted')
}

function clearAnnotationHighlight() {
  document.querySelectorAll('.annotation').forEach((m) => m.classList.remove('highlighted'))
}

function onClickAnnotation(e) {
  const setAnnotationData = (data) => {
    nextTick(() => {
      if (data.grouped && !mainStore.pageName?.includes('Tour')) {
        listData.value = {
          name: 'Group',
          list: getAnnotationGroupByPosition(data.position)
        }
      } else {
        annotationData.value = data
      }
    })
  }
  if (annotationData.value || listData.value || tourData.value) {
    if (listData.value) {
      listData.value = null
      mainStore.pageName('')
    }
    setAnnotationData(e.target.data)
  } else {
    const onCameraAnimationComplete = (e) => {
      setAnnotationData(e.target.data)
      e.target.removeEventListener('onCameraAnimationComplete', onCameraAnimationComplete)
    }
    e.target.addEventListener('onCameraAnimationComplete', onCameraAnimationComplete)
  }
}

function onClickAnnotationLink(id) {
  openAnnotationById(id)
}

function update() {
  const camera = window.viewer.scene.getActiveCamera()
  const pos = camera.position.toArray()
  if (annotations) {
    annotations.forEach((a) => {
      if (a.category === 'Plans') {
        return
      }
      const annotationPos = new THREE.Vector3(...a.position)
      const distance = annotationPos.distanceTo(new THREE.Vector3(...pos))
      const children = window.viewer.scene.annotations.children
      for (let i = 0; i < children.length; i++) {
        const _a = children[i]
        if (_a._title === a.title) {
          let val = 'middle'
          if (20 < distance) {
            val = 'far'
          } else if (distance <= 5) {
            val = 'nearer'
          } else if (distance <= 10) {
            val = 'near'
          }
          $(_a.domElement[0]).attr('data-camera-dist', val)
          break
        }
      }
    })
  }
}

function selectList(name) {
  tourData.value = null
  clearAnnotationData()
  mainStore.pageName(name)

  if (name.includes('Tour')) {
    let list = []
    if (name === 'Guided Tour') {
      data.guidedTour.forEach((id) => {
        for (const a of annotations) {
          if (a.id === id) {
            list.push(a)
            return
          }
        }
      })
    } else if (name === 'Ramble Tour') {
      list = _shuffle(annotations)
    }
    tourData.value = {
      name,
      list
    }
  } else {
    let list = []
    if (name === 'Annotations') {
      list = annotations
    } else {
      list = annotations.filter((a) => a.category.includes(name))
    }
    listData.value = {
      name,
      list,
      tagIndexStr: ''
    }
  }
}

function clearAnnotationData() {
  annotationData.value = null
}

function closeDrawer() {
  mainStore.tourName(null)
  mainStore.pageName('')
  clearAnnotationData()
  listData.value = null
  tourData.value = null
}

function saveCameraInfo() {
  // const camera = window.viewer.scene.getActiveCamera()
  // store.commit('cameraPosition', camera.position.toArray())
  // store.commit('cameraTarget', ??) // TODO targetの取得方法
}

function startRambleTourWithoutAnnotations() {
  tourData.value.list = _shuffle(annotations.filter((a) => !a.grouped || a.firstInGroup))
  openAnnotationById(tourData.value.list[0].id)
  if (rambleTourTimer.value) {
    clearInterval(rambleTourTimer.value)
  }
  rambleTourTimer.value = setInterval(() => {
    next(annotationData.value.id)
  }, 15000)
}

function stopRambleTourWithoutAnnotations() {
  if (rambleTourTimer.value) {
    mainStore.pageName('')
    clearAnnotationData()
    clearInterval(rambleTourTimer.value)
    rambleTourTimer.value = null
  }
}

useHead({
  bodyAttrs: {
    class: 'detail'
  }
})
</script>
