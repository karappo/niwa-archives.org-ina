<template lang="pug">
main
  #potree_container
    #potree_render_area(ref="potree_render_area")
    #potree_sidebar_container
    .layer
      ListDrawer(
        v-if="listData && !contentData"
        :data="listData"
        @close="listData = null"
        @showAnnotation="showAnnotation"
      )
      ContentDrawer(
        v-if="contentData"
        :data="contentData"
        @close="contentData = null"
        @prev="prev"
        @next="next"
      )
      KeyMap.keyMap
  SideBar.sideBar(
    @select="selectList"
  )
  Footer.footer
</template>

<style lang="sass" scoped>
main
  width: 100%
  height: 100%
  background: #000
  display: grid
  grid-template-columns: auto 160px
  grid-template-rows: auto 50px
  grid-template-areas: 'potree_container sidebar' 'footer sidebar'
#potree_container
  grid-area: potree_container
  width: 100%
  height: 100%
  position: relative
#potree_render_area
  width: 100%
  height: 100%
  /deep/
    canvas
      outline: none
.sideBar
  grid-area: sidebar
.footer
  grid-area: footer
.layer
  width: 100%
  height: 100%
  position: absolute
  z-index: 2
  display: flex
  flex-direction: row-reverse
  align-items: flex-end
  pointer-events: none
  *
    pointer-events: auto
  .keyMap
    margin: 0 20px 20px auto
</style>

<script>
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
    return {
      annotations: this.$store.state.annotations[gardenName],
      garden:
        this.$route.params.pointcloud === 'joei-ji' ? JoeijiData : MurinanData,
      tours: null,
      listData: '',
      contentData: ''
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
    const file = this.$route.params.season
      ? `/pointclouds/${this.$route.params.pointcloud}/${this.$route.params.season}/metadata.json`
      : `/pointclouds/${this.$route.params.pointcloud}/metadata.json`
    console.log(file)
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

    this.garden.initCamera()

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
        window.viewer.scene.annotations.add(a)
      })
    }

    // Set Events
    this.$nuxt.$on('settingUpdated', config)
    this.$nuxt.$on('startCameraAnimation', this.startCameraAnimation)
    window.viewer.addEventListener('camera_changed', this.update)
    document.addEventListener('keyup', this.keyup)
    document.addEventListener('keydown', this.keydown)

    config()
  },
  beforeDestroy() {
    this.$nuxt.$off('settingUpdated')
    this.$nuxt.$off('startCameraAnimation')
    window.viewer.removeEventListener('camera_changed', this.update)
    document.removeEventListener('keyup', this.keyup)
    document.removeEventListener('keydown', this.keydown)
    if (window.viewer.scene.annotations) {
      window.viewer.scene.annotations.children.forEach((a) => {
        a.removeEventListener('click', this.clickAnnotation)
      })
    }
  },
  methods: {
    keyup(e) {
      switch (this.$key(e)) {
        case '1':
          this.setControlMode(0)
          break
        case '2':
          this.setControlMode(1)
          break
        case '3':
          this.setControlMode(2)
          break
      }
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
      // モードを保存
      this.$store.commit('controlMode', mode)
    },
    startCameraAnimation(index) {
      this.tours[index].play()
    },
    getAnnotationByIndex(index) {
      const annotations = window.viewer.scene.annotations.children
      if (index < 0) {
        index = annotations.length - 1
      } else if (annotations.length <= index) {
        index = 0
      }
      for (let i = 0; i < annotations.length; i++) {
        const _a = annotations[i]
        if (_a._index === index) {
          return _a
        }
      }
    },
    prev(index) {
      this.getAnnotationByIndex(index - 1).click()
    },
    next(index) {
      this.getAnnotationByIndex(index + 1).click()
    },
    showAnnotation(index) {
      this.getAnnotationByIndex(index).click()
    },
    clickAnnotation(e) {
      this.contentData = e.target.data
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
              if (30 < distance) {
                val = 'far'
              } else if (distance <= 6) {
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
      this.listData = {
        title: category.split('/').pop(),
        list: this.annotations.filter((a) => a.category === category)
      }
    }
  }
}
</script>
