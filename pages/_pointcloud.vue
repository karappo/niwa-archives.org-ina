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
  /deep/ canvas
    outline: none
</style>

<script>
export default {
  props: {
    file: {
      type: String,
      require: true,
      default: null
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

    if (/joei-ji/.test(this.$route.params.pointcloud)) {
      const images = await Potree.OrientedImageLoader.load(
        '/orientedImage/cameraParams.xml',
        '/orientedImage/imageParams.txt',
        viewer
      )
      viewer.scene.addOrientedImages(images)

      // viewer.fitToScreen()
      viewer.scene.view.position.set(-45.509, 48.096, 26.978)
      viewer.scene.view.lookAt(new THREE.Vector3(-34.27, 25.369, -2.105))
    } else {
      // viewer.fitToScreen()
      viewer.scene.view.position.set(-13.397, 8.883, 27.045)
      viewer.scene.view.lookAt(new THREE.Vector3(-10.916, 6.771, -2.138))
    }

    this.$nuxt.$on('settingUpdated', config)
    this.$nuxt.$on('startCameraAnimation', this.startCameraAnimation)
    config()
  },
  beforeDestroy() {
    this.$nuxt.$off('startCameraAnimation')
  },
  methods: {
    startCameraAnimation() {
      const animation = new Potree.CameraAnimation(window.viewer)
      let positions = null
      let targets = null
      if (/joei-ji/.test(this.$route.params.pointcloud)) {
        positions = [
          [-45.509, 48.096, 26.978],
          [-45.705, 13.655, -1.111],
          [-43.002, 7.955, -1.188],
          [5.121, -6.388, 10.691]
        ]
        targets = [
          [-34.27, 25.369, -2.105],
          [-44.209, 10.512, -2.616],
          [-41.335, 7.212, -1.703],
          [-23.185, 22.343, -13.972]
        ]
      } else {
        positions = [
          [-17.371, 14.113, 6.617],
          [-21.396, 6.723, 7.492],
          [-16.811, -0.786, 7.492],
          [-8.041, -1.491, 7.492],
          [-2.316, 5.19, 7.492]
        ]
        targets = [
          [-11.611, 7.547, -0.679],
          [-12.019, 6.813, -0.533],
          [-11.56, 6.062, -0.533],
          [-10.683, 5.991, -0.533],
          [-10.111, 6.659, -0.533]
        ]
      }

      for (let i = 0; i < positions.length; i++) {
        const cp = animation.createControlPoint()
        cp.position.set(...positions[i])
        cp.target.set(...targets[i])
      }
      // viewer.scene.addCameraAnimation(animation)
      animation.play()
    }
  }
}
</script>
