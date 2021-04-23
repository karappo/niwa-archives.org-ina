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
      display: flex
      flex-direction: column
      adjust-content: center
      .annotation-titlebar
        display: none
        border: 0
        border-radius: 4px
        padding: 0 12px 0 20px
        box-shadow: none !important
        .annotation-label
          color: #696969
          font-size: 12px
          line-height: 2.2
      .annotation-marker
        cursor: pointer
      .annotation-prev,
      .annotation-next
        cursor: pointer
        color: white
        background-color: black
        padding: 0 10px
      &[data-camera-dist="0"],
      &[data-camera-dist="2"]
        .annotation-marker
          $size: 6px
          content: ''
          display: block
          position: absolute
          width: #{$size}
          height: #{$size}
          top: #{$size / -2}
          left: calc(50% - #{$size / 2})
          background-color: #583AFA
          border-radius: #{$size / 2}
          border: 1px solid white
          > div
            display: none
      &[data-camera-dist="1"]
        .annotation-titlebar
          display: block
          position: absolute
          left: 50px
          top: -11px
        .annotation-marker
          $size: 80px
          $borderWidth: 6px
          content: ''
          display: block
          position: absolute
          width: #{$size}
          height: #{$size}
          top: #{$size / -2 - $borderWidth}
          left: calc(50% - #{$size / 2})
          background-color: black
          border-radius: $size
          border: $borderWidth solid #583AFA
          overflow: hidden
          > div
            display: block
            width: 100%
            height: 100%
            background-size: cover
            background-position: center
            opacity: 0.8
            transition: opacity 0.2s
          &:hover
            > div
              opacity: 1
      &[data-camera-dist="2"]
        .annotation-description
          display: block
          background: transparent
          padding: 0
          font-size: 12px
          line-height: 2
          .annotation-description-close
            display: none
          .image
            img
              width: 100%
              height: auto
              border: 6px solid #583AFA
      &[data-type="icon"]
        &[data-camera-dist="1"]
          .annotation-marker
            $size: 32px
            $borderWidth: 2px
            width: #{$size}
            height: #{$size}
            top: #{$size / -2 - $borderWidth}
            left: calc(50% - #{$size / 2})
            border-width: $borderWidth
          .annotation-titlebar
            left: 18px
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
      this.garden.annotations.forEach((data) => {
        window.viewer.scene.annotations.add(new Potree.Annotation(data))
      })
    }

    // Set Events
    this.$nuxt.$on('settingUpdated', config)
    this.$nuxt.$on('startCameraAnimation', this.startCameraAnimation)
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
    window.viewer.removeEventListener('camera_changed', this.update)
  },
  methods: {
    startCameraAnimation(index) {
      this.animations[index].play()
    },
    update() {
      const camera = window.viewer.scene.getActiveCamera()
      const pos = camera.position.toArray()
      if (this.garden.annotations) {
        // ここでカメラポジションとの比較
        this.garden.annotations.forEach((annotation) => {
          const annotationPos = new THREE.Vector3(...annotation.position)
          const distance = annotationPos.distanceTo(new THREE.Vector3(...pos)) // カメラとAnnotationとの距離
          const anno = window.viewer.scene.annotations.children.filter(
            (e) => e._title === annotation.title
          )
          let val = 1
          if (9 < distance) {
            val = 0
          } else if (distance <= 6) {
            val = 2
          }
          $(anno[0].domElement[0]).attr('data-camera-dist', val)
        })
      }
    }
  }
}
</script>
