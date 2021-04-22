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
    .annotation
      transform: translate(-50%, 0)
      opacity: 1 !important
      &.near
        .annotation-titlebar
          display: block
      &:before
        $size: 6px
        content: ''
        display: block
        position: absolute
        width: #{$size}
        height: #{$size}
        top: #{$size / -2}
        left: calc(50% - #{$size / 2})
        background-color: #FF89C0
        border-radius: #{$size / 2}
        border: 1px solid white
      .annotation-titlebar
        display: none
        border: 0
        border-radius: 4px
        padding: 0 12px
        box-shadow: none !important
        .annotation-label
          color: #696969
          font-size: 12px
          line-height: 2.2
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
        this.$route.params.pointcloud === 'joei-ji' ? JoeijiData : MurinanData
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

    this.garden.annotations.forEach((data) => {
      window.viewer.scene.annotations.add(new Potree.Annotation(data))
    })

    // Set Events
    this.$nuxt.$on('settingUpdated', config)
    this.$nuxt.$on('startCameraAnimation', this.startCameraAnimation)
    window.viewer.addEventListener('camera_changed', this.update)

    config()

    // Cancel Potree default behavior
    window.viewer.scene.annotations.children.forEach((a) => {
      a.domElement.off('mouseenter')
      a.domElement.off('mouseleave')
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('settingUpdated')
    this.$nuxt.$off('startCameraAnimation')
    window.viewer.removeEventListener('camera_changed', this.update)
  },
  methods: {
    startCameraAnimation() {
      const animation = new Potree.CameraAnimation(window.viewer)

      for (let i = 0; i < this.garden.positions.length; i++) {
        const cp = animation.createControlPoint()
        cp.position.set(...this.garden.positions[i])
        cp.target.set(...this.garden.targets[i])
      }
      window.viewer.scene.addCameraAnimation(animation)
      animation.play()
    },
    update() {
      const camera = window.viewer.scene.getActiveCamera()
      const pos = camera.position.toArray()
      // ここでカメラポジションとの比較
      this.garden.annotations.forEach((annotation) => {
        const annotationPos = new THREE.Vector3(...annotation.position)
        const distance = annotationPos.distanceTo(new THREE.Vector3(...pos)) // カメラとAnnotationとの距離
        const anno = window.viewer.scene.annotations.children.filter(
          (e) => e._title === annotation.title
        )
        $(anno[0].domElement[0]).toggleClass('near', distance < 8)
      })
    }
  }
}
</script>
