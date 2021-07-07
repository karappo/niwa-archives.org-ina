<template lang="pug">
.root
  splitpanes.main.default-theme
    pane.potree_container
      #potree_render_area(ref="potree_render_area")
        .controls
          nuxt-link.logo(to="/")
            small Incomplete Niwa Archives
            span(v-if="this.$route.params.pointcloud === 'joei-ji'") Joei-ji Garden
            span(v-else) Murin-an Garden
          KeyMap
          AudioBar(v-if="this.$route.params.pointcloud === 'joei-ji'")
      #potree_sidebar_container
    pane(
      v-if="listData && !annotationData"
      min-size="25"
      max-size="75"
    )
      ListDrawer(
        :data="listData"
        @close="closeList"
        @showAnnotation="showAnnotation"
      )
    pane(
      v-if="annotationData"
      min-size="25"
      max-size="75"
    )
      AnnotationDrawer(
        :data="annotationData"
        :annotations="annotations"
        @close="clearSelectedAnnotation"
        @showAnnotation="showAnnotation"
        @prev="prev"
        @next="next"
      )
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
  display: grid
  grid-template-columns: auto 160px
  grid-template-rows: auto 50px
  grid-template-areas: "main sidebar" "main sidebar"
  /deep/ .splitpanes__splitter
    background-color: #111
    border-right: 1px solid #222
.main
  grid-area: main
.logo
  margin-top: 20px
  margin-left: 20px
  color: white
  small
    display: block
    font-size: 10px
  span
    display: block
    font-size: 25px
.potree_container
  width: 100%
  height: 100%
  position: relative
#potree_render_area
  width: 100%
  height: 100%
  /deep/
    canvas
      outline: none
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
.splitpanes
  overflow: hidden
.splitpanes__pane
  overflow-y: auto
.sideBar
  grid-area: sidebar
.footer
  grid-area: footer
</style>

<script>
import dayjs from 'dayjs'
import { camelCase } from 'change-case'
import JoeijiData from '~/gardens/joei-ji.js'
import MurinanData from '~/gardens/murin-an.js'
export default {
  props: {
    file: {
      type: String,
      require: true,
      default: null
    }
  },
  data() {
    const gardenName = camelCase(this.$route.params.pointcloud)

    // Annotationを季節でフィルタリング
    let annotations = this.$store.state.annotations[gardenName]
    const isSummer = (date) => {
      const m = dayjs(date).month()
      return 4 <= m && m <= 9
    }
    if (this.$route.params.season === 'summer') {
      annotations = annotations.filter((a) => {
        return !a.dateTime || isSummer(a.dateTime) // dateTimeが未定義なら表示
      })
    } else if (this.$route.params.season === 'winter') {
      annotations = annotations.filter((a) => {
        return !a.dateTime || !isSummer(a.dateTime) // dateTimeが未定義なら表示
      })
    }

    return {
      annotations,
      garden:
        this.$route.params.pointcloud === 'joei-ji' ? JoeijiData : MurinanData,
      tours: null,
      listData: '',
      annotationData: '',
      drawerAlreadyOpened: false
    }
  },
  async mounted() {
    const viewer = new Potree.Viewer(this.$refs.potree_render_area)
    window.viewer = viewer
    viewer.setFOV(75)
    viewer.setPointBudget(this.$store.state.pointBudget)
    viewer.loadSettingsFromURL()
    viewer.setBackground('originalColor')

    // Controls
    this.setControlMode(this.$store.state.controlMode)

    viewer.loadGUI(() => {
      viewer.setLanguage('en')
      $('#menu_tools').next().show()
      $('#menu_scene').next().show()
      // viewer.toggleSidebar() // Open sidebar
    })
    let file = null
    if (this.$route.params.pointcloud === 'joei-ji') {
      file = '/pointclouds/Sesshutei.las_converted/metadata.json'
    } else if (this.$route.params.season === 'summer') {
      file = '/pointclouds/MurinanS_0.01.las_converted/metadata.json'
    } else if (this.$route.params.season === 'winter') {
      file = '/pointclouds/MurinanW_0.01.las_converted/metadata.json'
    } else if (this.$route.params.season === 'winter-snow') {
      file = '/pointclouds/MurinanWS_0.01.las_converted/metadata.json'
    } else {
      console.error('Not Found Point cloud file...')
    }
    const { pointcloud } = await Potree.loadPointCloud(file)
    const material = pointcloud.material
    material.activeAttributeName = 'rgba'
    material.pointSizeType = Potree.PointSizeType.ADAPTIVE

    const config = () => {
      viewer.setEDLEnabled(this.$store.state.EDLEnabled)
      viewer.setEDLRadius(this.$store.state.EDLRadius)
      viewer.setEDLStrength(this.$store.state.EDLStrength)
      viewer.setEDLOpacity(this.$store.state.EDLOpacity)
      viewer.setPointBudget(this.$store.state.pointBudget)
      material.shape = this.$store.state.shape
      material.size = this.$store.state.size
    }

    viewer.scene.addPointCloud(pointcloud)

    await this.garden.addImages()

    if (this.$store.state.cameraPosition && this.$store.state.cameraTarget) {
      window.viewer.scene.view.position.set(...this.$store.state.cameraPosition)
      window.viewer.scene.view.lookAt(
        new THREE.Vector3(...this.$store.state.cameraTarget)
      )
    } else {
      this.garden.initCamera()
    }

    // Set Camera Animation
    const tours = []
    this.garden.tours.forEach((data) => {
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
        data.cameraTarget = data.position // cameraTargetを省略していたので、positionを複製しておく
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
    window.viewer.addEventListener('camera_changed', this.update)

    config()
  },
  beforeDestroy() {
    this.$nuxt.$off('settingUpdated')
    this.$nuxt.$off('setControlMode')
    this.$nuxt.$off('startCameraAnimation')
    this.$nuxt.$off('selectList')
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
    getAnnotationByIndex(index, annotations) {
      if (index < 0) {
        index = annotations.length - 1
      } else if (annotations.length <= index) {
        index = 0
      }
      return annotations[index]
    },
    getFilteredAnnotationsAndIndex(globalIndex) {
      let annotations = window.viewer.scene.annotations.children
      let index = globalIndex
      // カテゴリーが絞り込まれていたら
      // eslint-disable-next-line
      if (this.$store.state.selectedCategory) {
        // eslint-disable-next-line
        annotations = window.viewer.scene.annotations.children.filter((a) => a.data.category === this.$store.state.selectedCategory)
        index = annotations.findIndex((a) => a._index === globalIndex)
      }
      return {
        annotations,
        index
      }
    },
    prev(globalIndex) {
      const res = this.getFilteredAnnotationsAndIndex(globalIndex)
      const annotations = res.annotations
      const index = res.index
      this.getAnnotationByIndex(index - 1, annotations).click()
    },
    next(globalIndex) {
      const res = this.getFilteredAnnotationsAndIndex(globalIndex)
      const annotations = res.annotations
      const index = res.index
      this.getAnnotationByIndex(index + 1, annotations).click()
    },
    showAnnotation(globalIndex) {
      const annotations = window.viewer.scene.annotations.children
      this.getAnnotationByIndex(globalIndex, annotations).click()
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
    selectList(category) {
      this.clearSelectedAnnotation()
      this.$store.commit('selectedCategory', category)
      this.listData = {
        category,
        list: this.annotations.filter((a) => {
          return a.category.includes(category)
        })
      }
    },
    clearSelectedAnnotation() {
      this.annotationData = null
      // eslint-disable-next-line
      document.querySelectorAll('.annotation').forEach((m) => m.classList.remove('highlighted'))
    },
    closeList() {
      this.$store.commit('selectedCategory', '')
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
