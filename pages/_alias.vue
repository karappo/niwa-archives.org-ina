<template lang="pug">
.root
  main
    splitpanes.default-theme(:horizontal="isSP")
      pane.potree_container(
        size="60"
      )
        //- TODO 追々対応が確認できたら個々の条件を見直すこと
        .notice(v-if="!$device.isMobile && !$ua.is.chrome && noticeVisibility")
          | このブラウザは閲覧時に不具合の可能性があります。デスクトップ版
          ExternalLink(href="https://www.google.com/chrome/") Chrome
          //- | または
          //- ExternalLink(href="https://www.mozilla.org/ja/firefox/new/") Firefox
          | でご覧ください。
          .closeButton(@click="noticeVisibility = false")
            IconClose
        .potree_wrap
          #potree_render_area(
            ref="potree_render_area"
            :class="potreeRenderAreaClass"
          )
            .debugMenuButton(@click.shift="viewer.toggleSidebar()")
            .controls
              h1.title
                span.global Incomplete Niwa Archives
                span.scene {{ data.title }}
                br
                span.benchmark(style="font-size: 13px;") Benchmark Time: {{ benchmarkTime }}
              template(v-if="tourName")
                TourIndicator(
                  :numerator="tourData.list.length"
                  :denominator="tourCurrentIndex + 1"
                )
                StopTourButton(:class="{hiddenInSP: tourName !== 'Ramble Tour without Annotations'}")
              template(v-else)
                KeyMap(:spVisibility="!drawerVisibility && keyMapSpVisibility")
          #potree_sidebar_container
      //- drawerとSpのSidebarは、同じpaneを使い回す。そうしないと、高さが合わなくなる
      //- https://app.asana.com/0/1186397743907793/1207018579945583/f
      pane.drawer(
        v-if="drawerVisibility || spSideBarVisibility"
        :size="isSP ? 60 : 40"
        min-size="25"
        max-size="75"
        :class="{border: !tourName}"
      )
        template(v-if="drawerVisibility")
          //- TODO Historyを開いた状態で、Annotationをクリックしたら開かない…
          DrawerHistory(
            v-if="$store.getters.pageName === 'History'"
          )
          Drawer3DData(
            v-else-if="$store.getters.pageName === '3D Data'"
          )
          DrawerAnnotation(
            v-else-if="annotationData"
            :data="annotationData"
            :annotations="annotations"
            :prevNextVisibility="prevNextVisibility"
            :prevDisabled="prevDisabled"
            :nextDisabled="nextDisabled"
            @backToList="clearAnnotationData"
            @prev="prev"
            @next="next"
          )
          DrawerList(
            v-else-if="tourData"
            :data="tourData"
          )
          DrawerList(
            v-else-if="listData"
            :data="listData"
          )
        template(v-else-if="spSideBarVisibility")
          SideBar(
            :guidedTourExists="0 < data.guidedTour.length"
            :variations="data.variations"
            :spVisibility="!drawerVisibility && sideBarSpVisibility"
            @spClose="sideBarSpVisibility = false"
            @saveCameraInfo="saveCameraInfo"
          )
    SoundBar(
      :annotations="annotations"
      :spVisibility="!drawerVisibility && soundSpVisibility"
      @spClose="soundSpVisibility = false"
    )
    nav.spMenu(v-if="!drawerVisibility && !sideBarSpVisibility")
      .btn(
        @click="sideBarSpVisibility = !sideBarSpVisibility"
        :class="{active: sideBarSpVisibility}"
      )
        SpMenuList
      .btn(
        @click="keyMapSpVisibility = !keyMapSpVisibility"
        :class="{active: keyMapSpVisibility}"
      )
        SpMenuNavigate
      .btn(
        v-if="soundDataExists"
        @click="soundSpVisibility = !soundSpVisibility"
        :class="{active: soundSpVisibility}"
      )
        SpMenuSound
  SideBar.sideBar(
    v-if="!tourName"
    :guidedTourExists="0 < data.guidedTour.length"
    :variations="data.variations"
    @spClose="sideBarSpVisibility = false"
    @saveCameraInfo="saveCameraInfo"
  )
</template>

<style lang="sass" scoped>
@import ~/assets/style/mixins
$menu_threshold: 768px
.root
  width: 100%
  height: var(--vh)
  background: #000
  display: flex
  +sp
    flex-direction: column
main
  display: flex
  flex-direction: column
  width: 100%
  position: relative
  +sp
    height: 100%
    min-height: var(--main-min-height)
.debugMenuButton
  width: 4px
  height: 4px
  background: transparent
  position: absolute
  top: 0
  left: 0
  cursor: pointer
  z-index: 100
nav.spMenu
  display: none
  +sp($menu_threshold)
    display: flex
    flex-direction: column
    position: absolute
    top: 0
    right: 0
    z-index: 100
  .btn
    width: 68px
    height: 68px
    flex-shrink: 0
    background-color: rgba(0,0,0,0.7)
    display: flex
    justify-content: center
    align-items: center
    -webkit-tap-highlight-color: transparent
    &.active
      > svg
        opacity: 0.5
  .btn + .btn
    border-top: 1px solid #3D3D3D
.sideBar
  flex-shrink: 0
  width: 165px
  height: 100%
  margin: 0
  border-left: 0
  +sp($menu_threshold)
    display: none
.title
  margin: 24px
  font-family: 'K2-v1-Light'
  font-weight: normal
  font-size: 17px
  color: white
  +sp
    margin: 10px 16px
    letter-spacing: 0
  .scene
    margin-left: 26px
    +sp
      margin-top: -2px
      margin-left: 0
  span
    +sp
      display: block
.splitpanes.default-theme
  overflow: hidden
  /deep/ .splitpanes__splitter
    background-color: transparent
    border: 0
    width: 7px
    z-index: 2
    margin-left: 0 // デフォルトのスタイルが-1になっていて変な線が生じてしまうので0にする
    +sp
      width: 100%
      height: 7px
  .splitpanes__pane
    &.potree_container
      width: 100%
      height: 100%
      display: flex
      flex-direction: column
      .notice
        background-color: #C9E2D4
        color: black
        font-size: 13px
        padding: 15px
        display: flex
        align-items: center
        flex-shrink: 0
        a
          margin-left: 0.2em
          margin-right: 0.2em
          text-decoration: underline
        .closeButton
          cursor: pointer
          background-color: #434343
          width: 18px
          height: 18px
          border-radius: 50%
          display: flex
          justify-content: center
          align-items: center
          margin-left: auto
          margin-right: 0
          transition: background-color 0.2s
          svg
            width: 8px
            height: 8px
            line
              stroke: #D3D3D3
              transition: stroke 0.2s
          &:hover
            background-color: black
            svg
              line
                stroke: white
      .potree_wrap
        position: relative
        width: 100%
        height: 100%
    &.drawer
      overflow-y: auto
      background-color: black
      +pc
        margin-left: -6px
        height: calc(100% - 1px)
      &.border
        border-right: 1px solid #3C3C3C
        border-bottom: 1px solid #3C3C3C
#potree_render_area
  width: 100%
  height: 100%
  &::before
    content: ''
    font-size: 30px
    color: white
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    background: #111
    position: absolute
    z-index: 99999990
    opacity: 0
    pointer-events: none
    transition: opacity 3s
  &.disabled
    pointer-events: none
  &.loading
    &::before
      content: 'Loading...'
      opacity: 1
      pointer-events: auto
  /deep/
    canvas
      outline: none

  // アノテーションの表示切り替え
  /deep/ .annotation
    visibility: hidden
  &.rambleTourWithoutAnnotations
    /deep/ .annotation.highlighted
      visibility: visible
  &:not(.rambleTourWithoutAnnotations) // Ramble Tour中はこのクラスがなくなる
    &.viewpointsStillImages
      /deep/ .annotation[data-category="Viewpoints/Still Images"]
        visibility: visible
    &.viewpointsMovies
      /deep/ .annotation[data-category="Viewpoints/Movies"]
        visibility: visible
    &.elementsStones
      /deep/ .annotation[data-category="Elements/Stones"]
        visibility: visible
    &.elementsPlants
      /deep/ .annotation[data-category="Elements/Plants"]
        visibility: visible
    &.elementsCreatures
      /deep/ .annotation[data-category="Elements/Creatures"]
        visibility: visible
    &.elementsArtifacts
      /deep/ .annotation[data-category="Elements/Artifacts"]
        visibility: visible
    &.elementsDnaData
      /deep/ .annotation[data-category="Elements/DNA Data"]
        visibility: visible
    &.oralArchives
      /deep/ .annotation[data-category="Oral Archives"]
        visibility: visible

.controls
  position: absolute
  z-index: 99999999
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  pointer-events: none
  > *
    pointer-events: auto
  /deep/ .stopTourButton
    position: absolute
    width: 160px
    height: 50px
    bottom: 25px
    right: 25px
    font-family: 'K2-v1-Bold'
    font-size: 17px
    color: white
    background-color: #1D1D1D
    border-radius: 5px
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    transition: background-color 0.2s
    &:hover
      background-color: lighten(#1D1D1D, 5%)
    +sp
      font-size: 15px
      width: 110px
      height: 40px
      bottom: 15px
      right: 15px
      // with Annotationの時は非表示にする
      &.hiddenInSP
        display: none
.sideBar
  grid-area: sidebar
</style>

<script>
// このファイル全体でprettierを無効化する
/* eslint-disable prettier/prettier */
import _groupBy from 'lodash/groupBy'
import _shuffle from 'lodash/shuffle'
import { camelCase } from 'change-case'
import { ExternalLink } from '@karappo-inc/vue-components'
import AllSoundData from '~/data/sounds.js'
import IconClose from '~/assets/image/icon-close.svg?inline'
import SpMenuList from '~/assets/image/spMenu/list.svg?inline'
import SpMenuNavigate from '~/assets/image/spMenu/navigate.svg?inline'
import SpMenuSound from '~/assets/image/spMenu/sound.svg?inline'
export default {
  components: {
    ExternalLink,
    IconClose,
    SpMenuList,
    SpMenuNavigate,
    SpMenuSound
  },
  props: {
    file: {
      type: String,
      require: true,
      default: null
    }
  },
  async asyncData({ route, store }) {
    const annotations = store.state.annotations[camelCase(route.params.alias)]
    // 同位置のアノテーションはgroupにする
    const annotationGroups = Object.values(
      _groupBy(annotations, 'position')
    ).filter((a) => 1 < a.length)
    annotations.forEach((a, index) => {
      // 通し番号を振っておく
      // TODO これいる？ idに集約できないか？
      a.index = index
      // groupに属するかどうかをBooleanで持たせる
      a.grouped = annotationGroups.some(
        (g) => JSON.stringify(g[0].position) === JSON.stringify(a.position)
      )
      // groupの最初のアノテーションかどうかをBooleanで持たせる
      a.firstInGroup = annotationGroups.some(
        (g) => g[0].id === a.id
      )
    })
    let data = await import(`~/data/gardens/${route.params.alias}.js`)
    data = data.default

    return {
      benchmarkTime: null,
      isSP: false,
      annotations,
      annotationGroups, // 同位置のアノテーションをまとめたグループ
      data,
      tours: null,
      annotationData: '',
      listData: null,
      tourData: null,
      loading: true,
      noticeVisibility: true,
      rambleTourTimer: null,
      // SPモード中の表示切り替えフラグ
      sideBarSpVisibility: false,
      keyMapSpVisibility: true,
      soundSpVisibility: false
    }
  },
  computed: {
    viewer() {
      return window.viewer
    },
    prevNextVisibility() {
      return this.listData !== null || this.tourData !== null
    },
    listDataIdArray() {
      return this.listData ? this.listData.list.map((a) => a.id) : []
    },
    listCurrentIndex() {
      if (!this.annotationData) {
        return null
      }
      return this.listDataIdArray.indexOf(this.annotationData.id)
    },
    tourDataIdArray() {
      return this.tourData ? this.tourData.list.map((a) => a.id) : []
    },
    tourCurrentIndex() {
      if (!this.annotationData) {
        return null
      }
      return this.tourDataIdArray.indexOf(this.annotationData.id)
    },
    prevDisabled() {
      if (this.tourData && this.tourData.name.includes('Ramble Tour')) {
        return false
      }
      if (this.tourDataIdArray.length) {
        return this.tourCurrentIndex <= 0
      }
      return this.listCurrentIndex <= 0
    },
    nextDisabled() {
      if (this.tourData && this.tourData.name.includes('Ramble Tour')) {
        return false
      }
      if (this.tourDataIdArray.length) {
        return this.tourDataIdArray.length - 1 <= this.tourCurrentIndex
      }
      return this.listDataIdArray.length - 1 <= this.listCurrentIndex
    },
    potreeRenderAreaClass() {
      // eslint-disable-next-line
      const visibilities = JSON.parse(JSON.stringify(this.$store.getters.annotationVisibilities))
      // キーをクラス名で使える値に変更
      Object.keys(visibilities).forEach(function (key) {
        visibilities[camelCase(key)] = visibilities[key]
        delete visibilities[key]
      })
      const res = visibilities
      res.loading = this.loading
      // eslint-disable-next-line
      res.rambleTourWithoutAnnotations = this.tourName === 'Ramble Tour without Annotations'
      res.disabled = this.tourName !== null
      return res
    },
    tourName() {
      return this.$store.getters.tourName
    },
    spSideBarVisibility() {
      return (
        this.isSP &&
        !this.drawerVisibility &&
        this.sideBarSpVisibility &&
        !this.tourName
      )
    },
    drawerVisibility() {
      // eslint-disable-next-line
      return !(this.tourName && this.tourName.includes('without Annotations')) && (this.tourData || this.listData || this.annotationData)
    },
    soundDataExists() {
      return AllSoundData[this.$garden(this.$route)] || false
    }
  },
  watch: {
    tourName(val) {
      if (val === null) {
        this.stopRambleTourWithoutAnnotations()
      }
    },
    // sideBarSpVisibility, keyMapSpVisibility, soundSpVisibility は同時にtrueにならないようにする
    sideBarSpVisibility(val) {
      if (val) {
        this.keyMapSpVisibility = false
        this.soundSpVisibility = false
      }
    },
    keyMapSpVisibility(val) {
      if (val) {
        this.soundSpVisibility = false
        this.sideBarSpVisibility = false
      }
    },
    soundSpVisibility(val) {
      if (val) {
        this.keyMapSpVisibility = false
        this.sideBarSpVisibility = false
      }
    },
    annotationData(val) {
      // 点群上のアノテーションのハイライト処理
      if (val) {
        const annotation = window.viewer.scene.annotations.children.find(
          (a) => a.data.id === val.id
        )
        if (annotation) {
          this.highlightAnnotation(annotation.domElement[0])
        } else {
          const firstAnnotationInSameGroup = this.getFirstAnnotationInSameGroup(val)
          this.highlightAnnotation(firstAnnotationInSameGroup.domElement[0])
        }
      } else {
        this.clearAnnotationHighlight()
      }
    },
    listData(val) {
      // 点群上のアノテーションのハイライト処理
      if (val) {
        if (val.name === 'Group') {
          const firstAnnotationInSameGroup = this.getFirstAnnotationInSameGroup(val.list[0])
          this.highlightAnnotation(firstAnnotationInSameGroup.domElement[0])
        }
      } else {
        this.clearAnnotationHighlight()
      }
    }
  },
  async mounted() {
    if (FONTPLUS) {
      FONTPLUS.start()
    }

    // 処理速度を計測するためのベンチマーク
    function runBenchmark() {
      const iterations = 1000000
      const startTime = performance.now()
      for (let i = 0; i < iterations; i++) {
        // ベンチマークのための単純な計算
        Math.sqrt(i)
      }
      const endTime = performance.now()
      return endTime - startTime
    }
    this.benchmarkTime = runBenchmark()
    console.log('Benchmark Time:', this.benchmarkTime)
    const isLowPerformance = this.benchmarkTime < 500

    this.calcIsSp()

    const viewer = new Potree.Viewer(this.$refs.potree_render_area)
    window.viewer = viewer
    viewer.setFOV(75)
    viewer.loadSettingsFromURL()
    viewer.setBackground('originalColor')
    viewer.setEDLEnabled(true)
    viewer.setEDLRadius(0) // default: 1.4
    viewer.setEDLStrength(0) // default: 0.4
    viewer.setEDLOpacity(0.85) // default: 1.0
    viewer.setPointBudget(isLowPerformance ? 500000 : 2000000)

    // Controls
    this.setControlMode(0) // 3つのcontrolsModeのうち、どれにするかを切り替える0,1,2のいずれか

    viewer.loadGUI(() => {
      viewer.setLanguage('en')
      $('#menu_tools').next().show()
      $('#menu_scene').next().show()
      // viewer.toggleSidebar() // Open sidebar
    })
    const { pointcloud } = await Potree.loadPointCloud(this.data.pointcloud)
    const material = pointcloud.material
    material.activeAttributeName = 'rgba'
    material.pointSizeType = Potree.PointSizeType.ADAPTIVE
    material.shape = 1
    material.size = 0.66

    viewer.scene.addPointCloud(pointcloud)

    if (
      this.$store.getters.cameraPosition &&
      this.$store.getters.cameraTarget
    ) {
      window.viewer.scene.view.position.set(
        ...this.$store.getters.cameraPosition
      )
      window.viewer.scene.view.lookAt(
        new THREE.Vector3(...this.$store.getters.cameraTarget)
      )
    } else {
      this.data.initCamera()
    }

    // Set Camera Animation
    const tours = []
    this.data.tours.forEach((data) => {
      const animation = new Potree.CameraAnimation(window.viewer)
      for (let i = 0; i < data.positions.length; i++) {
        const cp = animation.createControlPoint()
        cp.position.set(...data.positions[i])
        cp.target.set(...data.targets[i])
      }
      window.viewer.scene.addCameraAnimation(animation)
      animation.setDuration(20)

      animation.setVisible(false)
      tours.push(animation)
    })
    this.tours = tours

    if (this.annotations) {
      this.annotations
        .filter((a) => !a.grouped)
        .forEach((data) => {
          const a = new Potree.Annotation(data)
          // Cancel Potree default behavior
          a.domElement.off('mouseenter')
          a.domElement.off('mouseleave')
          // クリックした時の処理
          a.addEventListener('click', this.onClickAnnotation)
          window.viewer.scene.annotations.add(a)
        })
    }
    if (this.annotationGroups) {
      this.annotationGroups.forEach((data) => {
        const a = new Potree.Annotation(data[0], data.length - 1)
        // Cancel Potree default behavior
        a.domElement.off('mouseenter')
        a.domElement.off('mouseleave')
        // クリックした時の処理
        a.addEventListener('click', this.onClickAnnotation)
        window.viewer.scene.annotations.add(a)
      })
    }

    // Set Events
    this.$nuxt.$on('closeDrawer', this.closeDrawer)
    this.$nuxt.$on('startCameraAnimation', this.startCameraAnimation)
    this.$nuxt.$on('selectList', this.selectList)
    this.$nuxt.$on('clickAnnotationLink', this.onClickAnnotationLink)
    this.$nuxt.$on('startRambleTourWithoutAnnotations', this.startRambleTourWithoutAnnotations) // eslint-disable-line
    window.viewer.addEventListener('camera_changed', this.update)
    window.addEventListener('resize', this.calcIsSp)

    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  beforeDestroy() {
    this.$nuxt.$off('closeDrawer', this.closeDrawer)
    this.$nuxt.$off('startCameraAnimation', this.startCameraAnimation)
    this.$nuxt.$off('selectList', this.selectList)
    this.$nuxt.$off('clickAnnotationLink', this.onClickAnnotationLink)
    this.$nuxt.$off('startRambleTourWithoutAnnotations', this.startRambleTourWithoutAnnotations) // eslint-disable-line
    window.viewer.removeEventListener('camera_changed', this.update)
    window.removeEventListener('resize', this.calcIsSp)
    if (window.viewer.scene.annotations) {
      window.viewer.scene.annotations.children.forEach((a) => {
        a.removeEventListener('click', this.onClickAnnotation)
      })
    }
    // potreeのdestroy方法が不明なので、とりあえず残されたDOMを削除する
    document.querySelectorAll('#profile_window,.sp-container').forEach((e) => e.remove()) // eslint-disable-line
  },
  methods: {
    calcIsSp() {
      const pcSpThreshold = 990
      this.isSP = window.innerWidth < pcSpThreshold
    },
    setControlMode(mode) {
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
    },
    startCameraAnimation(index) {
      this.tours[index].play()
    },
    prev(id) {
      let idArray = null
      if (this.tourData) {
        idArray = this.tourDataIdArray
      } else if (this.listData) {
        idArray = this.listDataIdArray
      } else {
        console.error('prev: tourData, listData どちらも存在しません')
        return
      }

      let index = idArray.indexOf(id) - 1
      if (index < 0) {
        index = idArray.length - 1
      }
      this.openAnnotationById(idArray[index])
    },
    next(id) {
      let idArray = null
      if (this.tourData) {
        idArray = this.tourDataIdArray
      } else if (this.listData) {
        idArray = this.listDataIdArray
      } else {
        console.error('prev: tourData, listData どちらも存在しません')
        return
      }
      let index = idArray.indexOf(id) + 1
      if (idArray.length <= index) {
        index = 0
      }
      this.openAnnotationById(idArray[index])
    },
    getFirstAnnotationInSameGroup(annotation) {
      return window.viewer.scene.annotations.children.find(
        (a) => JSON.stringify(a.data.position) ===JSON.stringify(annotation.position)
      )
    },
    // すでにannotationのグループが開いているかどうか
    isOpenSameGroup(annotation) {
      if (
        annotation &&
        annotation.data &&
        annotation.data.grouped &&
        this.listData
      ) {
        const firstAnnotationInSameGroup = this.getFirstAnnotationInSameGroup(annotation)
        if (firstAnnotationInSameGroup) {
          // eslint-disable-next-line
          return this.listData.list[0].id === firstAnnotationInSameGroup.data.id
        }
      }
      return false
    },
    // Annotation表示の呼び出し関係の関数の説明
    // - openAnnotationById
    //   - 外部（AnnotationList、DrawerList、SoundBarなど）から呼び出される
    //   - リスト中のアノテーションがクリックされた時の処理
    //   - annotation.clickを起点とした処理からは呼ばれないはずで、逆にこの関数内でannotation.clickを呼び出す
    // - onClickAnnotation
    //   - 内部呼び出しのみ
    //   - 点群上のアノテーションがクリックされた時に呼び出される
    //   - annotation.clickは、このvueファイルからも決して呼ばないこと
    // - highlightAnnotation
    //   - 内部呼び出しのみ → さらにannotationDataとlistDataのwatch内のみ）呼び出すこと！
    //   - 点群上のアノテーションのハイライト処理
    //
    // onClickAnnotation: 点群中のannotationのクリック
    // openAnnotationById: リスト中のアノテーションリンクのクリック

    // Annotationグループは、リスト内には存在せず、かならず点群上にあるAnnotationをクリックすることで表示される

    // Annotationグループのクリック関係は、下記のように処理が分かれる
    // - 点群上のグループがクリックされたとき
    //   - グループをDrawerで開く
    //     - listDataが存在する場合は上書き
    // - リスト中のリンクがクリックされたとき
    //   - アノテーションをDrawerで開く
    //     - listDataは維持
    //   - openAnnotationById → annotation.click


    openAnnotationById(id) {
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
      const annotation = window.viewer.scene.annotations.children.find(
        (a) => a.data.id === id
      )
      if (annotation) {
        // リストからアノテーショングループに属するアノテーションをクリックした時に、ここを通る
        annotation.moveHere(this.$store.getters.pageName.includes('Tour') ? 10000 : null)
        this.$nextTick(() => {
          this.annotationData = annotation.data
        })
        return
      }

      // 画面上に表示されていないグループに含まれるアノテーションを探す
      const annotationData = this.annotations.find((a) => a.id === id)
      if (annotationData) {
        // 同じグループの先頭アノテーションを探す
        const firstAnnotationInSameGroup = this.getFirstAnnotationInSameGroup(annotationData)
        firstAnnotationInSameGroup.moveHere(this.$store.getters.pageName.includes('Tour') ? 10000 : null)
        // nextTickを使わないと、vue-youtubeがリロードされないので注意（next/prevなどで遷移した時にそのまま動画が再生されてしまう）
        // TODO でも本当だろうか？今もそうなのか要調査。参考コミット: e79a7af14
        this.$nextTick(() => {
          this.annotationData = annotationData
        })
        return
      }

      console.error(`id=${id} のアノテーションが見つかりませんでした`)
    },
    getAnnotationGroupByPosition(position) {
      return this.annotationGroups.find(
        (g) => JSON.stringify(g[0].position) === JSON.stringify(position)
      )
    },
    // 基本的にはannotationData に annotationDataを代入するだけだが、
    // 条件分岐によって、listData にも代入することがある
    // 呼び出し元
    // - openAnnotationById
    // - onClickAnnotation
    // - onCameraAnimationComplete
    highlightAnnotation(annotationElement) {
      this.clearAnnotationHighlight()
      annotationElement.classList.add('highlighted')
    },
    clearAnnotationHighlight() {
      // eslint-disable-next-line
      document.querySelectorAll('.annotation').forEach((m) => m.classList.remove('highlighted'))
    },

    // onClickAnnotation: 点群中のannotationのクリックイベントハンドラ
    onClickAnnotation(e) {
      // console.log('▪️▪️▪️ onClickAnnotation ▪️▪️▪️', e.target.domElement.get(0))
      // この関数内でのみ、groupとannotationの切り替えが必要なので、下記関数を定義して処理をまとめる。
      // annotationData に直接代入する方法と混在すると用途が分かりにくくなるので、methods化したりしないこと
      const setAnnotationData = (data) => {
        // nextTickを使わないと、vue-youtubeがリロードされないので注意（next/prevなどで遷移した時にそのまま動画が再生されてしまう）
        this.$nextTick(() => {
          if (data.grouped && !this.$store.getters.pageName.includes('Tour')) {
            this.listData = {
              name: 'Group',
              list: this.getAnnotationGroupByPosition(data.position)
            }
          } else {
            this.annotationData = data
          }
        })
      }
      if (this.annotationData || this.listData || this.tourData) {
        // 何かのリスト表示中に、アノテーショングループがクリックされた時に、リストはクリアして、グループを表示する処理が必要
        if (this.listData) {
          this.listData = null
          this.$store.commit('pageName', '')
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
    },
    // onClickAnnotationLink: リスト中のアノテーションリンクのクリックイベントハンドラ
    onClickAnnotationLink(id) {
      // console.log('▪️▪️▪️ onClickAnnotationLink ▪️▪️▪️', id)
      this.openAnnotationById(id)
    },
    update() {
      const camera = window.viewer.scene.getActiveCamera()
      const pos = camera.position.toArray()
      if (this.annotations) {
        // ここでカメラポジションとの比較
        this.annotations.forEach((a) => {
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
    },
    selectList(name) {
      // console.log('selectList', name)
      this.tourData = null
      this.clearAnnotationData()
      this.$store.commit('pageName', name)

      if (name.includes('Tour')) {
        let list = []
        if (name === 'Guided Tour') {
          // guidedTourの順でannotationをリスト化する
          this.data.guidedTour.forEach((id) => {
            for (const a of this.annotations) {
              if (a.id === id) {
                list.push(a)
                return
              }
            }
          })
        } else if (name === 'Ramble Tour') {
          // Ramble Tourの場合
          // "Ramble Tour with Annotations"なのか"Ramble Tour without Annotations"なのかによって
          // tourDataが変わってくるので、一旦ここでは全アノテーションをシャッフルしてリスト化しておくが、もし without... の場合はのちに上書きする
          list = _shuffle(this.annotations)
        }
        this.tourData = {
          name,
          list
        }
      } else {
        let list = []
        if (name === 'Annotations') {
          list = this.annotations
        } else {
          list = this.annotations.filter((a) => a.category.includes(name))
        }
        this.listData = {
          name,
          list
        }
      }
    },
    clearAnnotationData() {
      this.annotationData = null
    },
    closeDrawer() {
      // clear List
      this.$store.commit('tourName', null)
      this.$store.commit('pageName', '')
      this.clearAnnotationData()
      this.listData = null
      this.tourData = null
    },
    saveCameraInfo() {
      // const camera = window.viewer.scene.getActiveCamera()
      // this.$store.commit('cameraPosition', camera.position.toArray())
      // this.$store.commit('cameraTarget', ??) // TODO targetの取得方法
    },
    startRambleTourWithoutAnnotations() {
      // 点群上にあるアノテーションのみでリスト化（グループの子要素のアノテーションは同じ位置になるので含めない）
      this.tourData.list = _shuffle(this.annotations.filter((a) => !a.grouped || a.firstInGroup))
      this.openAnnotationById(this.tourData.list[0].id)
      if (this.rambleTourTimer) {
        clearInterval(this.rambleTourTimer)
      }
      this.rambleTourTimer = setInterval(() => {
        this.next(this.annotationData.id)
      }, 15000)
    },
    stopRambleTourWithoutAnnotations() {
      if (this.rambleTourTimer) {
        this.$store.commit('pageName', '')
        this.clearAnnotationData()
        clearInterval(this.rambleTourTimer)
        this.rambleTourTimer = null
      }
    }
  },
  head: {
    bodyAttrs: {
      class: 'detail'
    }
  }
}
</script>
