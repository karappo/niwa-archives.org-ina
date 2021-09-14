<template lang="pug">
.root
  main
    splitpanes.default-theme
      pane.potree_container
        #potree_render_area(ref="potree_render_area" :class="{loading, annotationVisibility}")
          .controls
            .title
              small Incomplete Niwa Archives
              span {{ data.title }}
            .toggleAnnotationVisibility(
              @click="annotationVisibility = !annotationVisibility"
              :class="{active: !annotationVisibility}"
            )
            KeyMap
        #potree_sidebar_container
      pane(
        v-if="listData || annotationData"
        min-size="25"
        max-size="75"
      )
        ListDrawer(
          v-if="listData && !annotationData"
          :data="listData"
          @close="closeDrawer"
          @showAnnotation="showAnnotation"
        )
        AnnotationDrawer(
          v-if="annotationData"
          :data="annotationData"
          :annotations="annotations"
          :prevNextVisibility="prevNextVisibility"
          :prevDisabled="prevDisabled"
          :nextDisabled="nextDisabled"
          @backToList="clearSelectedAnnotation"
          @close="closeDrawer"
          @showAnnotation="showAnnotation"
          @prev="prev"
          @next="next"
        )
    SoundBar
  SideBar.sideBar(
    @saveCameraInfo="saveCameraInfo"
  )
  //- Footer.footer
</template>

<style lang="sass" scoped>
.root
  width: 100%
  height: 100%
  background: #000
  display: flex
main
  display: flex
  flex-direction: column
  width: calc(100% - 160px)
.sideBar
  width: 160px
  height: 100%
  margin: 0
.title
  margin-top: 20px
  margin-left: 20px
  color: white
  small
    display: block
    font-size: 10px
  span
    display: block
    font-size: 25px
.splitpanes.default-theme
  .potree_container
    width: 100%
    height: 100%
    position: relative
  /deep/ .splitpanes__splitter
    background-color: #111
    border-right: 1px solid #222
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
    background: black
    position: absolute
    z-index: 99999999
    opacity: 0
    pointer-events: none
    transition: opacity 3s
  &.loading
    &::before
      content: 'Loading...'
      opacity: 1
      pointer-events: auto
  /deep/
    canvas
      outline: none
  &:not(.annotationVisibility)
    /deep/
      #potree_annotation_container
        display: none

.controls
  position: absolute
  z-index: 999999
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  pointer-events: none
  > *
    pointer-events: auto
.toggleAnnotationVisibility
  margin: auto 20px 0 auto
  justify-self: flex-end
  background-color: black
  border-radius: 3px
  height: 20px
  width: 120px
  display: flex
  justify-content: center
  align-items: center
  font-size: 10px
  line-height: 1
  color: #898989
  cursor: pointer
  &:before
    content: 'Hide Annotations'
  &.active
    &:before
      content: 'Show Annotations'
  &:hover
    color: rgba(255, 255, 255, 0.8)

.splitpanes
  overflow: hidden
.splitpanes__pane
  overflow-y: auto
.sideBar
  grid-area: sidebar
</style>

<script>
import { camelCase } from 'change-case'
export default {
  props: {
    file: {
      type: String,
      require: true,
      default: null
    }
  },
  async asyncData({ route, store }) {
    // Annotationを季節でフィルタリング
    const annotations = store.state.annotations[camelCase(route.params.alias)]
    let data = await import(`~/data/gardens/${route.params.alias}.js`)
    data = data.default

    return {
      annotations,
      data,
      tours: null,
      annotationData: '',
      listData: null,
      drawerAlreadyOpened: false,
      loading: true,
      annotationVisibility: true
    }
  },
  computed: {
    prevNextVisibility() {
      return this.listData !== null
    },
    listDataIndexArray() {
      // eslint-disable-next-line
      const arr = this.listData.list.map((a) => a.index)
      console.log('listDataIndexArray', arr)
      return this.listData.list.map((a) => a.index)
    },
    currentIndex() {
      return this.listDataIndexArray.indexOf(this.annotationData.index)
    },
    prevDisabled() {
      return this.currentIndex <= 0
    },
    nextDisabled() {
      return this.listDataIndexArray.length - 1 <= this.currentIndex
    }
  },
  async mounted() {
    const viewer = new Potree.Viewer(this.$refs.potree_render_area)
    window.viewer = viewer
    viewer.setFOV(75)
    viewer.setPointBudget(this.$store.getters.pointBudget)
    viewer.loadSettingsFromURL()
    viewer.setBackground('originalColor')

    // Controls
    this.setControlMode(this.$store.getters.controlMode)

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

    const config = () => {
      viewer.setEDLEnabled(this.$store.getters.EDLEnabled)
      viewer.setEDLRadius(this.$store.getters.EDLRadius)
      viewer.setEDLStrength(this.$store.getters.EDLStrength)
      viewer.setEDLOpacity(this.$store.getters.EDLOpacity)
      viewer.setPointBudget(this.$store.getters.pointBudget)
      material.shape = this.$store.getters.shape
      material.size = this.$store.getters.size
    }

    viewer.scene.addPointCloud(pointcloud)

    // TODO Viewpointsに変更する
    await this.data.addImages()

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
    this.$store.commit('cameraAnimationCount', tours.length)

    if (this.annotations) {
      this.annotations.forEach((data, index) => {
        data.index = index
        data.cameraTarget = data.cameraTarget || data.position // cameraTargetがない場合はpositionで代替
        const a = new Potree.Annotation(data)
        // Cancel Potree default behavior
        a.domElement.off('mouseenter')
        a.domElement.off('mouseleave')
        // クリックした時の処理
        a.addEventListener('click', this.clickAnnotation)
        a.addEventListener('onCameraAnimationComplete', this.onCameraAnimationComplete) // eslint-disable-line
        window.viewer.scene.annotations.add(a)
      })
    }

    // Set Events
    this.$nuxt.$on('settingUpdated', config)
    this.$nuxt.$on('setControlMode', this.setControlMode)
    this.$nuxt.$on('startCameraAnimation', this.startCameraAnimation)
    this.$nuxt.$on('selectList', this.selectList)
    this.$nuxt.$on('showAnnotationById', this.showAnnotationById)
    window.viewer.addEventListener('camera_changed', this.update)

    config()

    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  beforeDestroy() {
    this.$nuxt.$off('settingUpdated')
    this.$nuxt.$off('setControlMode', this.setControlMode)
    this.$nuxt.$off('startCameraAnimation', this.startCameraAnimation)
    this.$nuxt.$off('selectList', this.selectList)
    this.$nuxt.$off('showAnnotationById', this.showAnnotationById)
    window.viewer.removeEventListener('camera_changed', this.update)
    if (window.viewer.scene.annotations) {
      window.viewer.scene.annotations.children.forEach((a) => {
        a.removeEventListener('click', this.clickAnnotation)
        a.removeEventListener('onCameraAnimationComplete', this.onCameraAnimationComplete) // eslint-disable-line
      })
    }
  },
  methods: {
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
      // モードを保存
      this.$store.commit('controlMode', mode)
    },
    startCameraAnimation(index) {
      this.tours[index].play()
    },
    getAnnotationById(id, annotations) {
      const list = annotations.filter((a) => a.data.id === id)
      if (list.length) {
        return list[0]
      }
      console.error(`id=${id} のアノテーションが見つかりませんでした`)
    },
    prev(globalIndex) {
      const currentIndex = this.listDataIndexArray.indexOf(globalIndex)
      this.showAnnotation(this.listDataIndexArray[currentIndex - 1])
    },
    next(globalIndex) {
      const currentIndex = this.listDataIndexArray.indexOf(globalIndex)
      this.showAnnotation(this.listDataIndexArray[currentIndex + 1])
    },
    showAnnotation(globalIndex) {
      window.viewer.scene.annotations.children[globalIndex].click()
    },
    showAnnotationById(id) {
      const annotations = window.viewer.scene.annotations.children
      this.getAnnotationById(id, annotations).click()
    },
    clickAnnotation(e) {
      if (this.annotationData || this.listData) {
        this.drawerAlreadyOpened = true // あとで開く処理はスキップ
        this.clearSelectedAnnotation()
        // nextTickを使わないと、vue-youtubeがリロードされないので注意（next/prevなどで遷移した時にそのまま動画が再生されてしまう）
        this.$nextTick(() => {
          this.annotationData = e.target.data
          e.target.domElement.get(0).classList.add('highlighted')
        })
      } else {
        this.drawerAlreadyOpened = false // あとで開くのでここでは何もしない
      }
    },
    onCameraAnimationComplete(e) {
      if (this.drawerAlreadyOpened) {
        // 既にdrawerが開いているのでなにもしない
        return
      }
      this.clearSelectedAnnotation()
      // nextTickを使わないと、vue-youtubeがリロードされないので注意（next/prevなどで遷移した時にそのまま動画が再生されてしまう）
      this.$nextTick(() => {
        this.annotationData = e.target.data
        e.target.domElement.get(0).classList.add('highlighted')
      })
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
                val = 'further'
              } else if (15 < distance) {
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
      this.clearSelectedAnnotation()
      this.$store.commit('listName', name)
      let list = []
      switch (name) {
        case 'Guided Tour':
          // guidedTourの順でannotationをリスト化する
          this.data.guidedTour.forEach((id) => {
            for (const a of this.annotations) {
              if (a.id === id) {
                list.push(a)
                return
              }
            }
          })
          break
        default:
          list = this.annotations.filter((a) => a.category.includes(name))
          break
      }
      this.listData = {
        name,
        list
      }
    },
    clearSelectedAnnotation() {
      this.annotationData = null
      // eslint-disable-next-line
      document.querySelectorAll('.annotation').forEach((m) => m.classList.remove('highlighted'))
    },
    closeDrawer() {
      // clear List
      this.$store.commit('listName', '')
      this.clearSelectedAnnotation()
      this.listData = null
    },
    saveCameraInfo() {
      // const camera = window.viewer.scene.getActiveCamera()
      // this.$store.commit('cameraPosition', camera.position.toArray())
      // this.$store.commit('cameraTarget', ??) // TODO targetの取得方法
    }
  }
}
</script>
