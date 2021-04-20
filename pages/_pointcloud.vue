<template lang="pug">
#potree_container
  #potree_render_area(ref="potree_render_area")
  #potree_sidebar_container
</template>

<style lang="sass" scoped>
#potree_container
  width: 100%
  height: 100%
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
    window.viewer = new Potree.Viewer(this.$refs.potree_render_area)
    window.viewer.setFOV(60)
    window.viewer.setPointBudget(2_000_000)
    window.viewer.loadSettingsFromURL()

    window.viewer.loadGUI(() => {
      window.viewer.setLanguage('en')
      $('#menu_tools').next().show()
      $('#menu_scene').next().show()
      window.viewer.toggleSidebar()
    })

    const file = `/pointclouds/${this.$route.params.pointcloud}/metadata.json`
    const { pointcloud } = await Potree.loadPointCloud(file)
    const material = pointcloud.material
    material.activeAttributeName = 'rgba'
    material.pointSizeType = Potree.PointSizeType.ADAPTIVE

    const config = () => {
      window.viewer.setEDLEnabled(this.$store.state.EDLEnabled)
      window.viewer.setEDLRadius(this.$store.state.EDLRadius)
      window.viewer.setEDLStrength(this.$store.state.EDLStrength)
      window.viewer.setEDLOpacity(this.$store.state.EDLOpacity)
      material.shape = this.$store.state.shape
      material.size = this.$store.state.size
    }

    window.viewer.scene.addPointCloud(pointcloud)

    if (/sessyu-tei-.*/.test(this.$route.params.pointcloud)) {
      const images = await Potree.OrientedImageLoader.load(
        '/orientedImage/cameraParams.xml',
        '/orientedImage/imageParams.txt',
        window.viewer
      )
      window.viewer.scene.addOrientedImages(images)

      // window.viewer.fitToScreen()
      window.viewer.scene.view.position.set(-41.287, 31.136, -0.427)
      window.viewer.scene.view.lookAt(new THREE.Vector3(-34.27, 25.369, -2.105))
    } else {
      // window.viewer.fitToScreen()
      window.viewer.scene.view.position.set(-8.967, 18.538, -1.725)
      window.viewer.scene.view.lookAt(new THREE.Vector3(-4.973, 12.468, -1.986))
    }

    this.$nuxt.$on('settingUpdated', config)
    config()
  }
}
</script>
