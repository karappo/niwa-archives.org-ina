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
            &:deep(line) {
              stroke: #d3d3d3;
              transition: stroke 0.2s;
            }
          }
          &:hover {
            background-color: black;
            svg:deep(line) {
              stroke: white;
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
import { useEventBus } from '~/composables/useEventBus'
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
// const { $device } = useDevice() // Will be fixed when device module is properly configured

// Functions
const setControlMode = (mode) => {
  switch (mode) {
    case 0:
      // First Person
      window.viewer.setControls(window.viewer.fpControls)
      window.viewer.fpControls.lockElevation = true // 高さを維持するか否か
      break
    case 1:
      // Earth
      window.viewer.setControls(window.viewer.earthControls)
      break
    case 2:
      // Orbit
      window.viewer.setControls(window.viewer.orbitControls)
      break
  }
}

const calcIsSp = () => {
  const pcSpThreshold = 749
  isSP.value = window.innerWidth <= pcSpThreshold
}

const keydown = (e) => {
  const canvas = document.querySelector('canvas')
  // canvas要素にフォーカスがない場合はフォーカスを設定
  if (document.activeElement !== canvas) {
    canvas.focus()
  }
}

const keyup = (e) => {
  const canvas = document.querySelector('canvas')
  // canvas要素にフォーカスがない場合はフォーカスを設定
  if (document.activeElement !== canvas) {
    canvas.focus()
  }
}

const update = () => {
  const camera = window.viewer.scene.getActiveCamera()
  const pos = camera.position.toArray()
  if (annotations.value) {
    // ここでカメラポジションとの比較
    annotations.value.forEach((a) => {
      if (a.category === 'Plans') {
        // Plansのものは描画しない
        return
      }
      const annotationPos = new THREE.Vector3(...a.position)
      const distance = annotationPos.distanceTo(new THREE.Vector3(...pos)) // カメラとAnnotationとの距離
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

const onClickAnnotation = (e) => {
  // console.log('▪️▪️▪️ onClickAnnotation ▪️▪️▪️', e.target.domElement.get(0))
  // この関数内でのみ、groupとannotationの切り替えが必要なので、下記関数を定義して処理をまとめる。
  // annotationData に直接代入する方法と混在すると用途が分かりにくくなるので、methods化したりしないこと
  const setAnnotationData = (data) => {
    // nextTickを使わないと、vue-youtubeがリロードされないので注意（next/prevなどで遷移した時にそのまま動画が再生されてしまう）
    nextTick(() => {
      if (data.grouped && !mainStore.getPageName.includes('Tour')) {
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
    // 何かのリスト表示中に、アノテーショングループがクリックされた時に、リストはクリアして、グループを表示する処理が必要
    if (listData.value) {
      listData.value = null
      mainStore.setPageName('')
    }
    setAnnotationData(e.target.data)
  } else {
    // カメラの移動が終わった時に、アノテーションを表示する
    const onCameraAnimationComplete = (e) => {
      setAnnotationData(e.target.data)
      e.target.removeEventListener('onCameraAnimationComplete', onCameraAnimationComplete)
    }
    e.target.addEventListener('onCameraAnimationComplete', onCameraAnimationComplete)
  }
}

// Event Bus handler functions
const closeDrawer = () => {
  // clear List
  mainStore.setTourName(null)
  mainStore.setPageName('')
  clearAnnotationData()
  listData.value = null
  tourData.value = null
}

const startCameraAnimation = (index) => {
  if (tours.value && tours.value[index]) {
    tours.value[index].play()
  }
}

const selectList = (name) => {
  tourData.value = null
  clearAnnotationData()
  mainStore.setPageName(name)

  if (name.includes('Tour')) {
    let list = []
    if (name === 'Guided Tour') {
      // guidedTourの順でannotationをリスト化する
      data.value.guidedTour.forEach((id) => {
        for (const a of annotations.value) {
          if (a.id === id) {
            list.push(a)
            return
          }
        }
      })
    } else if (name === 'Ramble Tour') {
      // Ramble Tourの場合
      list = _shuffle(annotations.value)
    }
    tourData.value = {
      name,
      list
    }
  } else {
    let list = []
    if (name === 'Annotations') {
      list = annotations.value
    } else {
      list = annotations.value.filter((a) => a.category.includes(name))
    }
    listData.value = {
      name,
      list,
      tagIndexStr: '' // フィルターの状態を保持するためここに保存
    }
  }
}

const onClickAnnotationLink = (id) => {
  // console.log('▪️▪️▪️ onClickAnnotationLink ▪️▪️▪️', id)
  openAnnotationById(id)
}

const clearAnnotationData = () => {
  annotationData.value = null
}

const startRambleTourWithoutAnnotations = () => {
  // 点群上にあるアノテーションのみでリスト化（グループの子要素のアノテーションは同じ位置になるので含めない）
  if (tourData.value) {
    tourData.value.list = _shuffle(annotations.value.filter((a) => !a.grouped || a.firstInGroup))
    onClickAnnotationLink(tourData.value.list[0].id)
    if (rambleTourTimer.value) {
      clearInterval(rambleTourTimer.value)
    }
    rambleTourTimer.value = setInterval(() => {
      next(annotationData.value.id)
    }, 15000)
  }
}

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

// Method implementations
const highlightAnnotation = (domElement) => {
  clearAnnotationHighlight()
  domElement.classList.add('highlighted')
}

const clearAnnotationHighlight = () => {
  document.querySelectorAll('.annotation').forEach((m) => m.classList.remove('highlighted'))
}

const openAnnotationById = (id) => {
  // console.log('⭐️ openAnnotationById', id)

  // 【重要】点群上のAnnotation.click以外のアクションを起点として、annotationを表示する
  // スタックトレースを取得して、Annotation.clickを起点とした処理中で呼び出された場合はエラーを出力する
  const stackTrace = new Error().stack
  if (stackTrace.includes('Annotation.click')) {
    console.error("openAnnotationByIdは、Annotation.clickを起点とした処理中で呼び出されていますが、これは意図した動作ではありません。コードを見直して、呼び出されないようにしてください")
    return
  }
  // ここからは必ず、Annotation.clickを起点とした処理ではない

  // 画面上に表示されているアノテーションを探す
  const annotation = window.viewer?.scene?.annotations?.children?.find(
    (a) => a.data.id === id
  )
  if (annotation) {
    // リストからアノテーショングループに属するアノテーションをクリックした時に、ここを通る
    annotation.moveHere(mainStore.getPageName.includes('Tour') ? 10000 : null)
    nextTick(() => {
      annotationData.value = annotation.data
    })
    return
  }

  // 画面上に表示されていないグループに含まれるアノテーションを探す
  const annotationDataItem = annotations.value?.find((a) => a.id === id)
  if (annotationDataItem) {
    // 同じグループの先頭アノテーションを探す
    const firstAnnotationInSameGroup = getFirstAnnotationInSameGroup(annotationDataItem)
    if (firstAnnotationInSameGroup) {
      firstAnnotationInSameGroup.moveHere(mainStore.getPageName.includes('Tour') ? 10000 : null)
      // nextTickを使わないと、vue-youtubeがリロードされないので注意（next/prevなどで遷移した時にそのまま動画が再生されてしまう）
      nextTick(() => {
        annotationData.value = annotationDataItem
      })
    }
    return
  }

  console.error(`id=${id} のアノテーションが見つかりませんでした`)
}

const getAnnotationGroupByPosition = (position) => {
  return annotationGroups.value?.find(
    (g) => JSON.stringify(g[0].position) === JSON.stringify(position)
  )
}

const stopRambleTourWithoutAnnotations = () => {
  if (rambleTourTimer.value) {
    mainStore.setPageName('')
    clearAnnotationData()
    clearInterval(rambleTourTimer.value)
    rambleTourTimer.value = null
  }
}

const prev = (id) => {
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

const next = (id) => {
  let idArray = null
  if (tourData.value) {
    idArray = tourDataIdArray.value
  } else if (listData.value) {
    idArray = listDataIdArray.value
  } else {
    console.error('next: tourData, listData どちらも存在しません')
    return
  }
  let index = idArray.indexOf(id) + 1
  if (idArray.length <= index) {
    index = 0
  }
  openAnnotationById(idArray[index])
}

const saveCameraInfo = () => {
  if (window.viewer && window.viewer.scene) {
    const camera = window.viewer.scene.getActiveCamera()
    mainStore.setCameraPosition(camera.position.toArray())
    mainStore.setCameraTarget(window.viewer.scene.view.getPivot().toArray())
  }
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

// データ読み込み完了フラグ
const isDataLoaded = ref(false)

// データ読み込み処理を関数として分離
const loadPageData = async () => {
  try {
    // 既に読み込み済みの場合はスキップ
    if (isDataLoaded.value) {
      return
    }

    // 並行実行を防ぐため、関数開始時点でフラグを設定
    isDataLoaded.value = true

    const alias = route.params.alias
    const annotationsStore = useAnnotationsStore()

    // annotationsストアから直接ページデータを取得
    const pageKey = camelCase(alias)
    const annotationsData = annotationsStore[pageKey]

    if (!annotationsData) {
      console.log('Annotation data not yet available for this alias')
      // データがない場合はフラグをリセット
      isDataLoaded.value = false
      return
    }

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

    console.log('Page data loaded successfully')

    // Initialize Potree after data is loaded
    if (process.client) {
      await initializePotree()
    }
  } catch (error) {
    console.error('Failed to load page data:', error)
    // エラー時はフラグをリセット
    isDataLoaded.value = false
  }
}

// アノテーションストアの変化を監視
const annotationsStore = useAnnotationsStore()
watch(
  () => annotationsStore[camelCase(route.params.alias)],
  (newData) => {
    console.log('Watcher triggered, newData:', !!newData, 'isDataLoaded:', isDataLoaded.value)
    if (newData && Array.isArray(newData) && newData.length > 0 && !isDataLoaded.value) {
      console.log('Annotations data detected, calling loadPageData')
      loadPageData()
    }
  },
  { deep: true, immediate: true }
)

// ルート変更時にフラグをリセット
watch(
  () => route.params.alias,
  () => {
    console.log('Route changed, resetting data loaded flag')
    isDataLoaded.value = false
  }
)

// Potree initialization function
const initializePotree = async () => {
  console.log('Starting Potree initialization...')

  // Wait for DOM to be ready
  await nextTick()

  if (!potreeRenderArea.value) {
    console.error('Potree render area element not found')
    return
  }

  if (!data.value || !data.value.pointcloud) {
    console.error('Garden data not loaded yet')
    return
  }

  const viewer = new Potree.Viewer(potreeRenderArea.value)
  window.viewer = viewer
  viewer.setFOV(75)
  viewer.loadSettingsFromURL()
  viewer.setBackground('originalColor')
  viewer.setEDLEnabled(true)
  viewer.setEDLRadius(0) // default: 1.4
  viewer.setEDLStrength(0) // default: 0.4

  // EDLの不透明度とパフォーマンス
  // - EDLの不透明度が高い（値が大きい、例: 0.8〜1.0）場合:
  //   - EDL効果が強く、視覚的な深さやエッジの強調が顕著になります。
  //   - 視覚的な詳細が増えるため、GPUの負荷が増加し、パフォーマンスが低下する可能性があります。
  // - EDLの不透明度が低い（値が小さい、例: 0.0〜0.2）場合:
  //   - EDL効果が弱く、視覚的な深さやエッジの強調が控えめになります。
  //   - 視覚的な詳細が減少し、GPUの負荷が軽減され、パフォーマンスが向上する可能性があります。
  // viewer.setEDLOpacity(0.85) // default: 1.0
  viewer.setEDLOpacity(isLowPerformance.value ? 0.75 : 0.85) // default: 1.0

  // ポイントバジェット
  // 同時に表示するポイント（点）の最大数を制限するための設定
  viewer.setPointBudget(isLowPerformance.value ? 200000 : 2000000)

  // Controls
  setControlMode(0) // 3つのcontrolsModeのうち、どれにするかを切り替える0,1,2のいずれか

  if (debugMode.value) {
    viewer.loadGUI(() => {
      viewer.setLanguage('en')
      $('#menu_tools').next().show()
      $('#menu_scene').next().show()
      // viewer.toggleSidebar() // Open sidebar
    })
  }

  try {
    const { pointcloud } = await Potree.loadPointCloud(`/ina/assets/pointclouds/${data.value.pointcloud}`)
    pointcloud.material.activeAttributeName = 'rgba'
    pointcloud.material.pointSizeType = Potree.PointSizeType.ADAPTIVE

    // Potree.PointShape.SQUARE が一番低負荷
    // ただし、見た目の印象に大きな影響を与える
    // pointcloud.material.shape = isLowPerformance.value ? Potree.PointShape.SQUARE : Potree.PointShape.CIRCLE
    pointcloud.material.shape = Potree.PointShape.CIRCLE

    // pointcloud.material.size = isLowPerformance.value ? 1 : 0.66
    pointcloud.material.size = 0.66

    // 色の詳細を減らすことで、レンダリング負荷を軽減可能。点群データが非常にカラフルである場合に特に有効。
    // ただし、見た目の印象に大きな影響を与える
    // pointcloud.material.rgbGamma = isLowPerformance.value ? 2.2 : 1 // default: 1

    viewer.scene.addPointCloud(pointcloud)

    // Camera initialization
    if (mainStore.getCameraPosition && mainStore.getCameraTarget) {
      window.viewer.scene.view.position.set(...mainStore.getCameraPosition)
      window.viewer.scene.view.lookAt(new THREE.Vector3(...mainStore.getCameraTarget))
    } else {
      data.value.initCamera()
    }

    // Set Camera Animation
    const toursArray = []
    data.value.tours.forEach((tourData) => {
      const animation = new Potree.CameraAnimation(window.viewer)
      for (let i = 0; i < tourData.positions.length; i++) {
        const cp = animation.createControlPoint()
        cp.position.set(...tourData.positions[i])
        cp.target.set(...tourData.targets[i])
      }
      window.viewer.scene.addCameraAnimation(animation)
      animation.setDuration(20)
      animation.setVisible(false)
      toursArray.push(animation)
    })
    tours.value = toursArray

    // Add annotations
    if (annotations.value) {
      annotations.value
        .filter((a) => !a.grouped)
        .forEach((annotationData) => {
          const a = new Potree.Annotation(annotationData)
          // Cancel Potree default behavior
          a.domElement.off('mouseenter')
          a.domElement.off('mouseleave')
          // クリックした時の処理
          a.addEventListener('click', onClickAnnotation)
          window.viewer.scene.annotations.add(a)
        })
    }

    if (annotationGroups.value) {
      annotationGroups.value.forEach((groupData) => {
        const a = new Potree.Annotation(groupData[0], groupData.length - 1)
        // Cancel Potree default behavior
        a.domElement.off('mouseenter')
        a.domElement.off('mouseleave')
        // クリックした時の処理
        a.addEventListener('click', onClickAnnotation)
        window.viewer.scene.annotations.add(a)
      })
    }

    // Set Events
    window.viewer.addEventListener('camera_changed', update)
    window.addEventListener('resize', calcIsSp)
    document.addEventListener('keydown', keydown)
    document.addEventListener('keyup', keyup)

  } catch (error) {
    console.error('Potree initialization failed:', error)
  }

  setTimeout(() => {
    loading.value = false
  }, 1000)
}

// Lifecycle
onMounted(async () => {
  // 初期読み込み試行
  await loadPageData()

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

  // Set up EventBus listeners
  const eventBus = useEventBus()
  eventBus.on('closeDrawer', closeDrawer)
  eventBus.on('startCameraAnimation', startCameraAnimation)
  eventBus.on('selectList', selectList)
  eventBus.on('clickAnnotationLink', onClickAnnotationLink)
  eventBus.on('startRambleTourWithoutAnnotations', startRambleTourWithoutAnnotations)
})

onBeforeUnmount(() => {
  // Clean up EventBus listeners
  const eventBus = useEventBus()
  eventBus.off('closeDrawer', closeDrawer)
  eventBus.off('startCameraAnimation', startCameraAnimation)
  eventBus.off('selectList', selectList)
  eventBus.off('clickAnnotationLink', onClickAnnotationLink)
  eventBus.off('startRambleTourWithoutAnnotations', startRambleTourWithoutAnnotations)

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