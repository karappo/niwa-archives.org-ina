<template lang="pug">
main
  #potree_container
    #potree_render_area(ref="potree_render_area")
    #potree_sidebar_container
  Footer
</template>

<style lang="sass" scoped>
main
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  flex-basis: auto
  background: #000
#potree_container
  width: 100%
  height: 100%
  position: relative
#potree_render_area
  width: 100%
  height: 100%
  /deep/
    canvas
      outline: none
</style>

<script>
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
    return {
      garden:
        this.$route.params.pointcloud === 'joei-ji' ? JoeijiData : MurinanData,
      animations: null
    }
  },
  async mounted() {
    const viewer = new Potree.Viewer(this.$refs.potree_render_area)
    window.viewer = viewer
    viewer.setFOV(60)
    viewer.setPointBudget(this.$store.state.pointBudget)
    viewer.loadSettingsFromURL()

    viewer.loadGUI(() => {
      viewer.setLanguage('en')
      $('#menu_tools').next().show()
      $('#menu_scene').next().show()
      // viewer.toggleSidebar() // Open sidebar
    })

    const file = `/pointclouds/${this.$route.params.pointcloud}/metadata.json`
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
    const animations = []
    this.garden.animations.forEach((data) => {
      const animation = new Potree.CameraAnimation(window.viewer)
      for (let i = 0; i < data.positions.length; i++) {
        const cp = animation.createControlPoint()
        cp.position.set(...data.positions[i])
        cp.target.set(...data.targets[i])
      }
      window.viewer.scene.addCameraAnimation(animation)
      animation.setDuration(20)
      animation.setVisible(false)
      animations.push(animation)
    })
    this.animations = animations
    this.$store.commit('cameraAnimationCount', animations.length)

    if (this.garden.annotations) {
      this.garden.annotations.forEach((data, index) => {
        data.index = index
        data.cameraTarget = data.position // cameraTargetを省略していたので、positionを複製しておく
        window.viewer.scene.annotations.add(new Potree.Annotation(data))
      })
    }

    // Set Events
    this.$nuxt.$on('settingUpdated', config)
    this.$nuxt.$on('startCameraAnimation', this.startCameraAnimation)
    $('.annotation-prev').on('click', this.prev)
    $('.annotation-next').on('click', this.next)
    window.viewer.addEventListener('camera_changed', this.update)

    config()

    // Cancel Potree default behavior
    if (window.viewer.scene.annotations) {
      window.viewer.scene.annotations.children.forEach((a) => {
        a.domElement.off('mouseenter')
        a.domElement.off('mouseleave')
      })
    }
  },
  beforeDestroy() {
    this.$nuxt.$off('settingUpdated')
    this.$nuxt.$off('startCameraAnimation')
    $('.annotation-prev').off('click', this.prev)
    $('.annotation-next').off('click', this.next)
    window.viewer.removeEventListener('camera_changed', this.update)
  },
  methods: {
    startCameraAnimation(index) {
      this.animations[index].play()
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
    getIndex(target) {
      const anno = target.closest('.annotation')
      return parseInt(anno.getAttribute('data-index'), 10)
    },
    prev(e) {
      const a = this.getAnnotationByIndex(this.getIndex(e.target) - 1)
      a.clickTitle()
    },
    next(e) {
      const a = this.getAnnotationByIndex(this.getIndex(e.target) + 1)
      a.clickTitle()
    },
    update() {
      const camera = window.viewer.scene.getActiveCamera()
      const pos = camera.position.toArray()
      if (this.garden.annotations) {
        // ここでカメラポジションとの比較
        this.garden.annotations.forEach((a) => {
          const annotationPos = new THREE.Vector3(...a.position)
          const distance = annotationPos.distanceTo(new THREE.Vector3(...pos)) // カメラとAnnotationとの距離
          const children = window.viewer.scene.annotations.children
          for (let i = 0; i < children.length; i++) {
            const _a = children[i]
            if (_a._title === a.title) {
              let val = 1
              if (9 < distance) {
                val = 0
              } else if (distance <= 6) {
                val = 2
              }
              $(_a.domElement[0]).attr('data-camera-dist', val)
              break
            }
          }
        })
      }
    }
  }
}
</script>
