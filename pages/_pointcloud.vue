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
    const viewer = new Potree.Viewer(this.$refs.potree_render_area)
    window.viewer = viewer
    viewer.setFOV(60)
    viewer.setPointBudget(2_000_000)
    viewer.loadSettingsFromURL()

    viewer.loadGUI(() => {
      viewer.setLanguage('en')
      $('#menu_tools').next().show()
      $('#menu_scene').next().show()
      viewer.toggleSidebar()
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
      material.shape = this.$store.state.shape
      material.size = this.$store.state.size
    }

    viewer.scene.addPointCloud(pointcloud)

    if (/sessyu-tei-.*/.test(this.$route.params.pointcloud)) {
      const images = await Potree.OrientedImageLoader.load(
        '/orientedImage/cameraParams.xml',
        '/orientedImage/imageParams.txt',
        viewer
      )
      viewer.scene.addOrientedImages(images)

      // viewer.fitToScreen()
      viewer.scene.view.position.set(-45.509, 48.096, 26.978)
      viewer.scene.view.lookAt(new THREE.Vector3(-34.27, 25.369, -2.105))

      const animation = new Potree.CameraAnimation(viewer)
      const positions = [
        [-45.509, 48.096, 26.978],
        [-45.705, 13.655, -1.111],
        [-43.002, 7.955, -1.188],
        [5.121, -6.388, 10.691]
      ]
      const targets = [
        [-34.27, 25.369, -2.105],
        [-44.209, 10.512, -2.616],
        [-41.335, 7.212, -1.703],
        [-23.185, 22.343, -13.972]
      ]
      for (let i = 0; i < positions.length; i++) {
        const cp = animation.createControlPoint()
        cp.position.set(...positions[i])
        cp.target.set(...targets[i])
      }
      viewer.scene.addCameraAnimation(animation)
    } else {
      // viewer.fitToScreen()
      viewer.scene.view.position.set(-13.397, 8.883, 27.045)
      viewer.scene.view.lookAt(new THREE.Vector3(-10.916, 6.771, -2.138))
    }

    this.$nuxt.$on('settingUpdated', config)
    config()
  }
}
</script>
