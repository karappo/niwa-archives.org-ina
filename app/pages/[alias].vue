<template>
  <!-- ストア初期化中のローディング -->
  <div v-if="!isStoreReady" class="store-loading">
    <div class="spinner"></div>
  </div>

  <!-- メインコンテンツ（ストア初期化後） -->
  <div v-else class="root">
    <main>
      <splitpanes class="default-theme" :horizontal="isSP">
        <pane class="potree_container" :size="isSP && (drawerVisibility || spSideBarVisibility) ? 40 : 60">
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
            <!-- Loading overlay (最前面、フェードアウトで消える) -->
            <div class="loading-overlay" :class="{ 'fade-out': loadingState === 'loaded' }">
              <div class="spinner"></div>
            </div>

            <!-- Potreeのコンテンツ（常時レンダリング） -->
            <div
              id="potree_render_area"
              ref="potreeRenderArea"
              :class="potreeRenderAreaClass"
            >
              <div
                v-if="loadingState === 'error'"
                class="loading-error-overlay"
              >
                <div class="error-content">
                  <div class="error-message">Annotation data not found</div>
                  <a href="/archives/" class="back-link">[ Back to top ]</a>
                </div>
              </div>
              <div
                v-if="debugMode"
                class="debugMenuButton"
                @click="viewer.toggleSidebar()"
              ></div>
              <div class="controls">
                <h1 class="title" @dblclick="data && data.initCamera()">
                  <a class="global" href="/archives/">Incomplete Niwa Archives</a>
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
            <div id="potree_sidebar_container"></div>
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
/* ストア初期化中のローディング */
.store-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  z-index: 10000;
}

.store-loading .spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #0D1F1F;
  border-top-color: #666;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.root {
  width: 100%;
  height: var(--vh);
  background: #000;
  display: flex;
  @media (max-width: 428px) {
    flex-direction: column;
  }
}
main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  @media (max-width: 428px) {
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
  @media (max-width: 749px) {
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
.root > .sideBar {
  flex-shrink: 0;
  width: 165px;
  height: 100%;
  margin: 0;
  border-left: 0;
  @media (max-width: 749px) {
    display: none;
  }
}
.title {
  margin: 24px;
  font-family: 'K2-v1-Light';
  font-weight: normal;
  font-size: 17px;
  color: white;
  @media (max-width: 749px) {
    margin-right: calc(24px + var(--sp-menu-width));
  }
  @media (max-width: 428px) {
    margin: 10px 16px;
    letter-spacing: 0;
  }
  .scene {
    margin-left: 26px;
    @media (max-width: 428px) {
      margin-top: -2px;
      margin-left: 0;
    }
  }
  span {
    @media (max-width: 428px) {
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
        @media (max-width: 749px) {
          font-size: 10px;
        }
        &:not(.full) {
          @media (max-width: 749px) {
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

        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #111;
          z-index: 99999999;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 1;
          transition: opacity 2s ease-in-out;
          pointer-events: none; /* 常にポインターイベントを無効化してレンダリングに影響させない */

          .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid #0D1F1F;
            border-top-color: #666;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            opacity: 1;
            transition: opacity 0s;
          }

          &.fade-out {
            opacity: 0; /* 背景が2秒かけて消える */

            .spinner {
              opacity: 0; /* スピナーは即座に消える */
            }
          }
        }
      }
    }
    &.drawer {
      overflow-y: auto;
      background-color: black;
      @media (min-width: 429px) {
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
  position: relative;

  &.disabled {
    pointer-events: none;
  }

  .loading-overlay,
  .loading-error-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #111;
    z-index: 99999990;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  .loading-error-overlay {
    .error-content {
      text-align: center;
      .back-link {
        display: inline-block;
        color: #898989;
        transition: color 0.2s;
        &:hover {
          color: white;
        }
      }
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
  &:deep(.stopTourButton) {
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
      background-color: #2a2a2a;
    }
    @media (max-width: 749px) {
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
      @media (max-width: 428px) {
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

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useMainStore } from '~/stores/main'
import { useAnnotationsStore, isPublishedPage } from '~/stores/annotations'
import { useEventBus } from '~/composables/useEventBus'
import { loadSpreadsheetData } from '~/utils/spreadsheet'
// Import device composable differently for Nuxt 4
import _groupBy from 'lodash/groupBy'
import _shuffle from 'lodash/shuffle'
import { camelCase } from 'change-case'
import IconClose from '~/assets/image/icon-close.svg'
import SpMenuList from '~/assets/image/spMenu/list.svg'
import SpMenuNavigate from '~/assets/image/spMenu/navigate.svg'
import SpMenuSound from '~/assets/image/spMenu/sound.svg'

// Types
type LoadingState = 'loading' | 'loaded' | 'error'

// Permalink helpers
// view= や hide= に出すスラグと、ストアで使うページ名・visibilityキーを相互変換する。
const PERMALINK_PAGE_NAMES: string[] = [
  'History', 'Plans', '3D Data',
  'Annotations',
  'Viewpoints', 'Viewpoints/Still Images', 'Viewpoints/Movies',
  'Elements', 'Elements/Stones', 'Elements/Plants', 'Elements/Creatures',
  'Elements/Artifacts', 'Elements/DNA Data',
  'Oral Archives',
  'Guided Tour', 'Ramble Tour'
]
const PERMALINK_VISIBILITY_KEYS: string[] = [
  'Annotations',
  'Viewpoints', 'Viewpoints/Still Images', 'Viewpoints/Movies',
  'Elements', 'Elements/Stones', 'Elements/Plants', 'Elements/Creatures',
  'Elements/Artifacts', 'Elements/DNA Data',
  'Oral Archives'
]
// 実際の表示に影響するのは葉キーのみ。書き出し時の圧縮判定に使う。
const PERMALINK_LEAF_KEYS: string[] = [
  'Viewpoints/Still Images', 'Viewpoints/Movies',
  'Elements/Stones', 'Elements/Plants', 'Elements/Creatures',
  'Elements/Artifacts', 'Elements/DNA Data',
  'Oral Archives'
]
// 親 → 子の対応。親キーがhideに入ると、復元時に setAnnotationVisibilities() のカスケードで全子が hide される
const PERMALINK_GROUPS: Record<string, string[]> = {
  Viewpoints: ['Viewpoints/Still Images', 'Viewpoints/Movies'],
  Elements: ['Elements/Stones', 'Elements/Plants', 'Elements/Creatures', 'Elements/Artifacts', 'Elements/DNA Data']
}
const pageNameToSlug = (name: string) => name.toLowerCase().replace(/ /g, '-')
const slugToPageName = (slug: string): string | null =>
  PERMALINK_PAGE_NAMES.find((n) => pageNameToSlug(n) === slug) || null

// hide= の表記:
// - 親キーや独立キーは basename slug（例: 'elements', 'oral-archives'）
// - 子キーは 'parent/leaf' 形式（例: 'elements/plants'）
// - 連続して同じ親グループの子が続く場合は、2つめ以降は 'parent/' を省略する。
//   例: ['Elements/Plants', 'Elements/Creatures'] → 'elements/plants,creatures'
const basenameSlug = (s: string) => s.toLowerCase().replace(/ /g, '-')
// 親グループの slug → 親キー（例: 'elements' → 'Elements'）
const HIDE_GROUP_SLUG_TO_KEY: Record<string, string> = Object.fromEntries(
  Object.keys(PERMALINK_GROUPS).map((k) => [basenameSlug(k), k])
)
// 独立扱いの slug → キー（'annotations' は全leafの親、'oral-archives' は単独leaf）
const HIDE_TOP_SLUG_TO_KEY: Record<string, string> = {
  ...HIDE_GROUP_SLUG_TO_KEY,
  annotations: 'Annotations',
  'oral-archives': 'Oral Archives'
}
// 親キー → { 子basename slug → 子キー }
const HIDE_GROUP_CHILDREN: Record<string, Record<string, string>> = {}
for (const [group, leaves] of Object.entries(PERMALINK_GROUPS)) {
  const groupSlug = basenameSlug(group)
  HIDE_GROUP_CHILDREN[groupSlug] = {}
  for (const leaf of leaves) {
    const leafBase = leaf.split('/').pop() as string
    HIDE_GROUP_CHILDREN[groupSlug][basenameSlug(leafBase)] = leaf
  }
}

// position= / target= の値が `数値;数値;数値` 形式かチェック。NaN や不正値が入ったまま
// Potree の loadSettingsFromURL() に渡るとシーンが壊れるので、読み込み前に弾く用。
const isValidVec3Slug = (s: string | null): boolean => {
  if (!s) return false
  const parts = s.split(';')
  if (parts.length !== 3) return false
  return parts.every((n) => {
    const t = n.trim()
    return t !== '' && Number.isFinite(Number(t))
  })
}

// 連続する同一グループのプレフィックスを省略しつつ、hide キー列を URL文字列にエンコードする。
const encodeHide = (keys: string[]): string => {
  const parts: string[] = []
  let currentGroupSlug: string | null = null
  for (const key of keys) {
    if (key.includes('/')) {
      const [group, leaf] = key.split('/')
      const groupSlug = basenameSlug(group)
      const leafSlug = basenameSlug(leaf)
      if (groupSlug === currentGroupSlug) {
        parts.push(leafSlug)
      } else {
        parts.push(`${groupSlug}/${leafSlug}`)
        currentGroupSlug = groupSlug
      }
    } else {
      parts.push(basenameSlug(key))
      currentGroupSlug = null
    }
  }
  return parts.join(',')
}

// hide URL文字列をキー列にデコードする。
// '/' なし & 既知の親/単独キー → そのキー（currentGroup をリセット）
// '/' あり → group/leaf として解釈し、currentGroup を更新
// '/' なし & 直前グループ配下にある名前 → 親を補完して子キーに復元
const decodeHide = (str: string): string[] => {
  const keys: string[] = []
  let currentGroupSlug: string | null = null
  for (const part of str.split(',').filter(Boolean)) {
    if (part.includes('/')) {
      const [groupSlug, leafSlug] = part.split('/')
      const childKey = HIDE_GROUP_CHILDREN[groupSlug]?.[leafSlug]
      if (childKey) {
        keys.push(childKey)
        currentGroupSlug = groupSlug
      }
    } else if (HIDE_TOP_SLUG_TO_KEY[part]) {
      keys.push(HIDE_TOP_SLUG_TO_KEY[part])
      currentGroupSlug = null
    } else if (currentGroupSlug && HIDE_GROUP_CHILDREN[currentGroupSlug]?.[part]) {
      keys.push(HIDE_GROUP_CHILDREN[currentGroupSlug][part])
    }
  }
  return keys
}

// Reactive data
const debugMode = ref(false)
const infoMode = ref(false)
const benchmarkTime = ref<number | null>(null)
const isLowPerformance = ref(false)
const isSP = ref(false)
const annotations = ref<any[]>([])
const annotationGroups = ref<any[]>([])
const data = ref<any>(null)
const tours = ref<any>(null)
const annotationData = ref<any>(null)
const listData = ref<any>(null)
const tourData = ref<any>(null)
const loadingState = ref<LoadingState>('loading')
const noticeVisibility = ref(true)
const rambleTourTimer = ref<NodeJS.Timeout | null>(null)
const sideBarSpVisibility = ref(false)
const keyMapSpVisibility = ref(true)
const soundSpVisibility = ref(false)
const cameraPositionWatcher = ref<NodeJS.Timeout | null>(null)

// data.initCamera() で設定される初期カメラ位置のスナップショット。
// URL書き出し時に「初期位置と同じならposition/targetを省略」判定に使う。
const defaultCameraView = ref<{ position: any; target: any } | null>(null)

// パーマリンク復元完了までURL書き込みを抑止するフラグ
const urlSyncEnabled = ref(false)

// サイドバー状態が変わった時に立てる「URL書き込み待ち」フラグ。
// カメラ移動中に書き込むと移動前の位置が記録されるので、
// カメラポーリング側でカメラが止まったタイミングで書き込む。
let urlSyncDirty = false

// Pinia storeの初期化完了フラグ
const isStoreReady = ref(false)

// Template ref
const potreeRenderArea = ref(null)

// Composables
const route = useRoute()
const device = useDevice()

// annotations.tsのpagesリストに含まれないaliasは404
// （非公開化したいページはannotations.tsのpagesからコメントアウトする）
if (!isPublishedPage(route.params.alias as string)) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
}

// Pinia storeの初期化（shallowRefで保持し、onMountedで実際のストアをセット）
const mainStoreRef = shallowRef<ReturnType<typeof useMainStore> | null>(null)

// 後方互換性のためのプロキシオブジェクト
// 注意: メソッドは実ストアに bind して返している。Pinia本番ビルドの
// アクションラッパーは `this.$id === store.$id` の判定で caller の this
// を採用する実装になっており、Proxy 経由で素のまま呼ぶと this が Proxy
// になりミューテーションが Proxy のターゲット（空オブジェクト）に飛ぶ。
// 詳細経緯: dfe9a5f → CLAUDE.md「本番ビルドでのみ発生する不具合に注意」
const mainStore = new Proxy({} as any, {
  get(_, prop) {
    const target = mainStoreRef.value
    if (!target) return undefined
    const value = target[prop as keyof ReturnType<typeof useMainStore>]
    return typeof value === 'function' ? value.bind(target) : value
  }
})

// Functions
const setControlMode = (mode: number) => {
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

const keydown = (e: KeyboardEvent) => {
  const canvas = document.querySelector('canvas') as HTMLCanvasElement | null
  // canvas要素にフォーカスがない場合はフォーカスを設定
  if (canvas && document.activeElement !== canvas) {
    canvas.focus()
  }
}

const keyup = (e: KeyboardEvent) => {
  const canvas = document.querySelector('canvas') as HTMLCanvasElement | null
  // canvas要素にフォーカスがない場合はフォーカスを設定
  if (canvas && document.activeElement !== canvas) {
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

const onClickAnnotation = (e: any) => {
  // console.log('▪️▪️▪️ onClickAnnotation ▪️▪️▪️', e.target.domElement.get(0))
  // この関数内でのみ、groupとannotationの切り替えが必要なので、下記関数を定義して処理をまとめる。
  // annotationData に直接代入する方法と混在すると用途が分かりにくくなるので、methods化したりしないこと
  const setAnnotationData = (data: any) => {
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
    const onCameraAnimationComplete = (e: any) => {
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

const startCameraAnimation = (index: number) => {
  if (tours.value && tours.value[index]) {
    tours.value[index].play()
  }
}

const selectList = (name: string) => {
  tourData.value = null
  clearAnnotationData()
  mainStore.setPageName(name)

  if (name.includes('Tour')) {
    let list = []
    if (name === 'Guided Tour') {
      // guidedTourの順でannotationをリスト化する
      data.value.guidedTour.forEach((id: string) => {
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

const onClickAnnotationLink = (id: string) => {
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
  return listData.value ? listData.value.list.map((a: any) => a.id) : []
})

const listCurrentIndex = computed(() => {
  if (!annotationData.value) {
    return null
  }
  return listDataIdArray.value.indexOf(annotationData.value.id)
})

const tourDataIdArray = computed(() => {
  return tourData.value ? tourData.value.list.map((a: any) => a.id) : []
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
  // mainStoreRef.valueを直接参照してリアクティビティを確保
  const storeVisibilities = mainStoreRef.value?.getAnnotationVisibilities || {}
  const visibilities = JSON.parse(JSON.stringify(storeVisibilities))
  Object.keys(visibilities).forEach(function (key) {
    visibilities[camelCase(key)] = visibilities[key]
    delete visibilities[key]
  })
  const res = visibilities
  res.rambleTourWithoutAnnotations = tourName.value === 'Ramble Tour without Annotations'
  res.disabled = tourName.value !== null
  return res
})

const tourName = computed(() => {
  // mainStoreRef.valueを直接参照してリアクティビティを確保
  return mainStoreRef.value?.getTourName
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
  return !!(data.value && data.value.sounds && data.value.sounds.length > 0)
})

// Helper functions
const getGardenFromRoute = (route: any) => {
  const arr = route.params.alias.split('-')
  if (arr.length >= 2) {
    return arr[0]
  } else {
    return route.params.alias
  }
}

const getFirstAnnotationInSameGroup = (annotation: any) => {
  return window.viewer.scene.annotations.children.find(
    (a: any) => JSON.stringify(a.data.position) === JSON.stringify(annotation.position)
  )
}

// Method implementations
const highlightAnnotation = (domElement: any) => {
  clearAnnotationHighlight()
  domElement.classList.add('highlighted')
}

const clearAnnotationHighlight = () => {
  document.querySelectorAll('.annotation').forEach((m) => m.classList.remove('highlighted'))
}

const openAnnotationById = (id: string) => {
  // console.log('⭐️ openAnnotationById', id)

  // 【重要】点群上のAnnotation.click以外のアクションを起点として、annotationを表示する
  // スタックトレースを取得して、Annotation.clickを起点とした処理中で呼び出された場合はエラーを出力する
  const stackTrace = new Error().stack
  if (stackTrace && stackTrace.includes('Annotation.click')) {
    console.error("openAnnotationByIdは、Annotation.clickを起点とした処理中で呼び出されていますが、これは意図した動作ではありません。コードを見直して、呼び出されないようにしてください")
    return
  }
  // ここからは必ず、Annotation.clickを起点とした処理ではない

  // 画面上に表示されているアノテーションを探す
  const annotation = window.viewer?.scene?.annotations?.children?.find(
    (a: any) => a.data.id === id
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

// 現在の状態（カメラ + サイドバー）を URL にシリアライズして history.replaceState する。
// 既存パラメータ（debug, info 等）は保持。デフォルト状態のキーは出力しない。
const writeUrl = () => {
  if (!window.viewer?.scene?.view) return
  const view = window.viewer.scene.view
  const pos = view.position
  const target = view.getPivot()
  const fmt = (n: number) => n.toFixed(3)

  const params = new URLSearchParams(window.location.search)

  const pageName = mainStore.getPageName
  if (pageName) {
    params.set('open', pageNameToSlug(pageName))
  } else {
    params.delete('open')
  }

  if (annotationData.value?.id) {
    params.set('annotation', annotationData.value.id)
  } else {
    params.delete('annotation')
  }

  // 以下のいずれかと一致するならposition/targetを省略してURLを短くする。
  // 復元時に同じ位置に戻せるので状態は等価:
  //   (a) アノテーションのデフォルト視点（moveHereの到達点） → openAnnotationById が再現
  //   (b) initCamera() の初期位置 → URLに無い場合は initCamera() の値が使われるので再現される
  const eq = (a: number, b: number) => a.toFixed(3) === b.toFixed(3)
  const ann = annotationData.value
  const cameraEqualsAnnotation =
    ann?.cameraPosition && ann?.cameraTarget &&
    eq(pos.x, ann.cameraPosition[0]) && eq(pos.y, ann.cameraPosition[1]) && eq(pos.z, ann.cameraPosition[2]) &&
    eq(target.x, ann.cameraTarget[0]) && eq(target.y, ann.cameraTarget[1]) && eq(target.z, ann.cameraTarget[2])
  const def = defaultCameraView.value
  const cameraEqualsDefault =
    def &&
    eq(pos.x, def.position.x) && eq(pos.y, def.position.y) && eq(pos.z, def.position.z) &&
    eq(target.x, def.target.x) && eq(target.y, def.target.y) && eq(target.z, def.target.z)
  if (cameraEqualsAnnotation || cameraEqualsDefault) {
    params.delete('position')
    params.delete('target')
  } else {
    params.set('position', `${fmt(pos.x)};${fmt(pos.y)};${fmt(pos.z)}`)
    params.set('target', `${fmt(target.x)};${fmt(target.y)};${fmt(target.z)}`)
  }

  const vis = mainStore.getAnnotationVisibilities || {}
  // 隠れているleaf集合を計算し、グループ単位でまとめられるものは親キーに圧縮する。
  // 例: Viewpoints/Still Images と Viewpoints/Movies が両方 hidden なら `viewpoints` だけに圧縮。
  // 全leafが hidden なら `annotations` 一つに圧縮（無効化されているleafは vis に出てこないので無視される）。
  const hiddenLeaves = PERMALINK_LEAF_KEYS.filter((k) => vis[k] === false)
  const availableLeaves = PERMALINK_LEAF_KEYS.filter((k) => k in vis)
  let hiddenSlugs: string[] = []
  if (
    availableLeaves.length > 0 &&
    hiddenLeaves.length === availableLeaves.length
  ) {
    hiddenSlugs = ['Annotations']
  } else {
    const consumed = new Set<string>()
    for (const [group, leaves] of Object.entries(PERMALINK_GROUPS)) {
      const groupLeavesAvailable = leaves.filter((l) => l in vis)
      if (
        groupLeavesAvailable.length > 0 &&
        groupLeavesAvailable.every((l) => vis[l] === false)
      ) {
        hiddenSlugs.push(group)
        groupLeavesAvailable.forEach((l) => consumed.add(l))
      }
    }
    for (const leaf of hiddenLeaves) {
      if (!consumed.has(leaf)) hiddenSlugs.push(leaf)
    }
  }
  if (hiddenSlugs.length > 0) {
    params.set('hide', encodeHide(hiddenSlugs))
  } else {
    params.delete('hide')
  }

  if (listData.value?.tagIndexStr) {
    params.set('filter', listData.value.tagIndexStr)
  } else {
    params.delete('filter')
  }

  // クエリ文字列で有効な文字（; / ,）は読みやすさのためエスケープを戻す
  const queryString = params.toString()
    .replace(/%3B/g, ';')
    .replace(/%2F/g, '/')
    .replace(/%2C/g, ',')
  const newUrl = `${window.location.pathname}?${queryString}${window.location.hash}`
  window.history.replaceState(null, '', newUrl)
}

// URL のパラメータから状態を復元。Potree 初期化後、アノテーション登録後に呼ぶ。
const restoreFromUrl = () => {
  const params = new URLSearchParams(window.location.search)

  // hide → visibility を false に（hybrid 形式をパース。親キーは setAnnotationVisibilities の
  // カスケードで子に伝播するので、デコード結果のキーをそのまま渡す）
  const hide = params.get('hide')
  if (hide) {
    for (const key of decodeHide(hide)) {
      mainStore.setAnnotationVisibilities(key, false)
    }
  }

  // open → ドロワーを開く
  const openSlug = params.get('open')
  if (openSlug) {
    const pageName = slugToPageName(openSlug)
    if (pageName) {
      selectList(pageName)
      // filter → リスト内タグフィルタ。tagIndex は数値なので数字以外は弾く
      const filter = params.get('filter')
      if (filter && listData.value && /^\d+$/.test(filter)) {
        listData.value.tagIndexStr = filter
      }
    }
  }

  // annotation → DrawerAnnotation を開く。
  // URL にカメラ位置が指定されていれば、そのカメラを尊重して annotationData だけセットする
  // （moveHere で上書きされないように）。指定がなければ openAnnotationById でアノテーション
  // 位置までカメラを移動させる（クリックと同等の挙動）。
  const annotationId = params.get('annotation')
  if (annotationId) {
    const hasUrlCamera = params.has('position') && params.has('target')
    nextTick(() => {
      const found = annotations.value?.find((a) => a.id === annotationId)
      if (!found) {
        console.error(`URLで指定されたid=${annotationId}のアノテーションが見つかりませんでした`)
        return
      }
      if (hasUrlCamera) {
        annotationData.value = found
      } else {
        openAnnotationById(annotationId)
      }
    })
  }
}

const getAnnotationGroupByPosition = (position: any) => {
  return annotationGroups.value?.find(
    (g: any) => JSON.stringify(g[0].position) === JSON.stringify(position)
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

const prev = (id: string) => {
  let idArray: string[] = []
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
  const targetId = idArray[index]
  if (targetId) {
    openAnnotationById(targetId)
  }
}

const next = (id: string) => {
  let idArray: string[] = []
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
  const targetId = idArray[index]
  if (targetId) {
    openAnnotationById(targetId)
  }
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
      (a: any) => a.data.id === val.id
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
  // クライアント側でのみ実行
  if (!process.client) {
    return
  }

  try {
    // 既に読み込み済みの場合はスキップ
    if (isDataLoaded.value) {
      return
    }

    // 並行実行を防ぐため、関数開始時点でフラグを設定
    isDataLoaded.value = true

    const alias = route.params.alias as string
    const nuxtApp = useNuxtApp()
    const annotationsStore = useAnnotationsStore(nuxtApp.$pinia)

    // annotationsストアから直接ページデータを取得
    const pageKey = camelCase(alias)
    const annotationsData = annotationsStore[pageKey]

    if (!annotationsData) {
      loadingState.value = 'error'
      // データがない場合はフラグをリセット
      isDataLoaded.value = false
      return
    }

    // データが正常にある場合は状態をリセット
    loadingState.value = 'loading'

    // 同位置のアノテーションはgroupにする
    const annotationGroupsData = Object.values(
      _groupBy(annotationsData, 'position')
    ).filter((a) => a.length > 1)

    annotationsData.forEach((a: any) => {
      // groupに属するかどうかをBooleanで持たせる
      a.grouped = annotationGroupsData.some(
        (g: any) => JSON.stringify(g[0].position) === JSON.stringify(a.position)
      )
      // groupの最初のアノテーションかどうかをBooleanで持たせる
      a.firstInGroup = annotationGroupsData.some(
        (g: any) => g[0].id === a.id
      )
    })

    // Load garden data
    let importedData = await import(`~/data/gardens/${alias}.ts`)
    const gardenData = importedData.default

    // Apply loaded data
    annotations.value = annotationsData
    annotationGroups.value = annotationGroupsData
    data.value = gardenData

    // Initialize Potree after data is loaded
    await initializePotree()
  } catch (error) {
    console.error('Failed to load page data:', error)
    loadingState.value = 'error'
    // エラー時はフラグをリセット
    isDataLoaded.value = false
  }
}

// アノテーションストアの変化を監視（クライアント側でのみ）
// TODO: watcherはonMounted内で設定する必要がある
// if (process.client) {
//   const annotationsStore = useAnnotationsStore()
//   watch(
//     () => annotationsStore[camelCase(route.params.alias as string)],
//     (newData) => {
//       console.log('Watcher triggered, newData:', !!newData, 'isDataLoaded:', isDataLoaded.value)
//       if (newData && Array.isArray(newData) && newData.length > 0 && !isDataLoaded.value) {
//         console.log('Annotations data detected, calling loadPageData')
//         loadPageData()
//       }
//     },
//     { deep: true, immediate: true }
//   )
// }

// ルート変更時にフラグをリセット
// TODO: watcherはonMounted内で設定する必要がある
// watch(
//   () => route.params.alias,
//   () => {
//     console.log('Route changed, resetting data loaded flag')
//     isDataLoaded.value = false
//     loadingState.value = 'loading'
//     // ページ遷移時に状態をクリア
//     mainStore.setPageName('')
//     mainStore.setTourName(null)
//   }
// )

// Potree initialization function
const initializePotree = async () => {
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

  // 不正な position/target がそのまま loadSettingsFromURL に渡ると NaN が camera に
  // 入って画面が真っ黒になるので、ここで弾いて URL からも消す。
  {
    const sanitizeParams = new URLSearchParams(window.location.search)
    let dirty = false
    if (sanitizeParams.has('position') && !isValidVec3Slug(sanitizeParams.get('position'))) {
      sanitizeParams.delete('position')
      dirty = true
    }
    if (sanitizeParams.has('target') && !isValidVec3Slug(sanitizeParams.get('target'))) {
      sanitizeParams.delete('target')
      dirty = true
    }
    if (dirty) {
      const qs = sanitizeParams.toString()
        .replace(/%3B/g, ';')
        .replace(/%2F/g, '/')
        .replace(/%2C/g, ',')
      const newUrl = `${window.location.pathname}${qs ? '?' + qs : ''}${window.location.hash}`
      window.history.replaceState(null, '', newUrl)
    }
  }

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
      viewer.toggleSidebar() // Open sidebar
    })
  }

  // アセットパスを取得
  const assetsPath = useAssetsPath()

  try {
    const { pointcloud } = await Potree.loadPointCloud(assetsPath(`pointclouds/${data.value.pointcloud}`))
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

    // 点群の可視ポイント数を監視して、十分な点が描画されたらLoadingを消す
    let checkCount = 0
    let stableCount = 0 // 安定してポイントが表示されているカウント
    const maxChecks = 3000 // 最大3000フレーム（約50秒 @ 60fps）チェック
    const minPoints = 50000 // 最低限表示されるべきポイント数

    const checkPointsLoaded = () => {
      checkCount++
      const numVisiblePoints = pointcloud.numVisiblePoints || 0
      const loading = pointcloud.loading || false
      const loaded = pointcloud.pcoGeometry?.root?.loaded || false

      // ポイント数が十分で、かつルートノードがロードされ、安定している（3フレーム連続）
      if (numVisiblePoints >= minPoints && loaded && !loading) {
        stableCount++
        if (stableCount >= 3) {
          loadingState.value = 'loaded'
          return
        }
      } else {
        stableCount = 0 // リセット
      }

      // タイムアウト
      if (checkCount >= maxChecks) {
        console.warn('⚠️ Point cloud loading timeout reached, hiding loading screen anyway.')
        loadingState.value = 'loaded'
        return
      }

      // まだ点が十分に描画されていない場合は次のフレームで再チェック
      requestAnimationFrame(checkPointsLoaded)
    }

    // レンダリングループが開始されるまで少し待ってからチェック開始
    setTimeout(() => {
      requestAnimationFrame(checkPointsLoaded)
    }, 100)

    // Camera initialization
    // パーマリンク用に「初期カメラ位置」を必ずスナップショットしてから、
    // URL/store の値があればその上に上書きする。
    // - initCamera() を先に呼んで defaultCameraView に保存
    // - URL に position/target があればそれを適用（loadSettingsFromURL は initCamera で
    //   上書きされたので再適用が必要）
    // - URL に無く store に保存値があればそれを適用
    data.value.initCamera()
    defaultCameraView.value = {
      position: window.viewer.scene.view.position.clone(),
      target: window.viewer.scene.view.getPivot().clone()
    }
    const urlParams = new URLSearchParams(window.location.search)
    const hasUrlCamera = urlParams.has('position') && urlParams.has('target')
    if (hasUrlCamera) {
      const [px, py, pz] = urlParams.get('position')!.split(';').map(parseFloat)
      const [tx, ty, tz] = urlParams.get('target')!.split(';').map(parseFloat)
      window.viewer.scene.view.position.set(px, py, pz)
      window.viewer.scene.view.lookAt(new THREE.Vector3(tx, ty, tz))
    } else if (mainStore.getCameraPosition && mainStore.getCameraTarget) {
      window.viewer.scene.view.position.set(...mainStore.getCameraPosition)
      window.viewer.scene.view.lookAt(new THREE.Vector3(...mainStore.getCameraTarget))
    }

    // カメラの位置・注視点をURLに同期。カメラが止まったタイミングで writeUrl() を呼ぶ。
    // writeUrl() はサイドバー状態も合わせてシリアライズするので、サイドバー側の watch
    // で urlSyncDirty を立てた場合も、カメラ移動完了を待ってから書き込まれる。
    let lastPos: any = null
    let lastTarget: any = null
    cameraPositionWatcher.value = setInterval(() => {
      if (!urlSyncEnabled.value) return
      if (!window.viewer?.scene?.view) return
      const view = window.viewer.scene.view
      const pos = view.position
      const target = view.getPivot()

      const moved =
        !lastPos || !lastTarget || !lastPos.equals(pos) || !lastTarget.equals(target)

      if (moved) {
        lastPos = pos.clone()
        lastTarget = target.clone()
        urlSyncDirty = true
        return
      }

      if (urlSyncDirty) {
        writeUrl()
        urlSyncDirty = false
      }
    }, 500)

    // Set Camera Animation
    const toursArray: any[] = []
    data.value.tours.forEach((tourData: any) => {
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

    // パーマリンク: アノテーション登録後に URL から状態を復元し、以降は同期を有効化する
    restoreFromUrl()
    urlSyncEnabled.value = true
  } catch (error) {
    console.error('Potree initialization failed:', error)
    loadingState.value = 'error'
  }
}

// パーマリンク: サイドバー側の状態が変わったら dirty フラグを立てる。
// 実際の書き込みはカメラポーリングが「カメラが止まった」と判断したタイミングで行う
// （アノテーションクリック等で moveHere が走るケースに備えて）。
watch(
  () => {
    const store = mainStoreRef.value
    return [
      store?.getPageName,
      annotationData.value?.id,
      JSON.stringify(store?.getAnnotationVisibilities || {}),
      listData.value?.tagIndexStr
    ]
  },
  () => {
    if (urlSyncEnabled.value) urlSyncDirty = true
  }
)

// Lifecycle
onMounted(async () => {
  try {
    // useNuxtApp()からPiniaを取得
    const nuxtApp = useNuxtApp()

    if (!nuxtApp.$pinia) {
      throw new Error('Pinia is not available in NuxtApp')
    }

    // 実際のPinia storeを取得してrefにセット
    // Piniaインスタンスを明示的に渡す
    mainStoreRef.value = useMainStore(nuxtApp.$pinia)

    // ストアの初期化が完了したのでテンプレートをレンダリング可能にする
    isStoreReady.value = true

    // GET変数にdebugがtrueだったらdebugModeをtrueにする（loadPageData()より前に設定する必要がある）
    debugMode.value = new URLSearchParams(window.location.search).has('debug')
    infoMode.value = new URLSearchParams(window.location.search).has('info')

    // スプレッドシートデータを読み込む（このページのシートのみ）
    const annotationsStore = useAnnotationsStore(nuxtApp.$pinia)
    const alias = route.params.alias as string

    try {
      // このページに必要なシートのみを読み込む
      const spreadsheetData = await loadSpreadsheetData(alias)

      // 更新日時をmainストアに保存
      for (const [key, value] of Object.entries(spreadsheetData.lastUpdateDateTime)) {
        mainStore.setLastUpdateDateTime(key, value)
      }

      // アノテーションデータをannotationsストアに保存
      for (const [key, value] of Object.entries(spreadsheetData.annotations)) {
        annotationsStore.setPageAnnotations(key, value)
      }
    } catch (error) {
      console.error('Failed to load spreadsheet data:', error)
      // エラーはこのページのみに影響し、他のページは正常に閲覧可能
    }

  if (typeof window !== 'undefined' && window.FONTPLUS) {
    window.FONTPLUS.start()
  }

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

  // デバイスのパフォーマンスチェック
  isLowPerformance.value = device.isMobileOrTablet ? 1.5 < benchmarkTime.value : false

  calcIsSp()

  // Set up EventBus listeners
  const eventBus = useEventBus()
  eventBus.on('closeDrawer', closeDrawer)
  eventBus.on('startCameraAnimation', startCameraAnimation)
  eventBus.on('selectList', selectList)
  eventBus.on('clickAnnotationLink', onClickAnnotationLink)
  eventBus.on('startRambleTourWithoutAnnotations', startRambleTourWithoutAnnotations)

  // ページデータをロード
  await loadPageData()
  } catch (error) {
    console.error('Error in onMounted:', error)
    throw error
  }
})

onBeforeUnmount(() => {
  // Clean up EventBus listeners
  const eventBus = useEventBus()
  eventBus.off('closeDrawer', closeDrawer)
  eventBus.off('startCameraAnimation', startCameraAnimation)
  eventBus.off('selectList', selectList)
  eventBus.off('clickAnnotationLink', onClickAnnotationLink)
  eventBus.off('startRambleTourWithoutAnnotations', startRambleTourWithoutAnnotations)

  if (cameraPositionWatcher.value) {
    clearInterval(cameraPositionWatcher.value)
  }
  document.querySelectorAll('#profile_window,.sp-container').forEach((e) => e.remove())
})

// Head configuration for Nuxt
useHead({
  bodyAttrs: {
    class: 'detail'
  }
})
</script>