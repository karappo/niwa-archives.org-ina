<template lang="pug">
div
</template>

<style lang="sass" scoped>
div
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
    const viewer = new Potree.Viewer(this.$el)

    viewer.setFOV(60)
    viewer.setPointBudget(2_000_000)
    viewer.loadSettingsFromURL()
    const file = `/pointclouds/${this.$route.params.pointcloud}/metadata.json`
    const { pointcloud } = await Potree.loadPointCloud(file)

    const material = pointcloud.material
    material.activeAttributeName = 'rgba'
    material.pointSizeType = Potree.PointSizeType.ADAPTIVE

    const config = () => {
      viewer.setEDLEnabled(this.$store.state.EDLEnabled)
      viewer.setEDLRadius(this.$store.state.EDLRadius)
      viewer.setEDLStrength(this.$store.state.EDLStrength)
      material.shape = this.$store.state.shape
      material.size = this.$store.state.size
    }

    viewer.scene.addPointCloud(pointcloud)
    viewer.fitToScreen()

    if (/sessyu-tei-.*/.test(this.$route.params.pointcloud)) {
      const images = await Potree.OrientedImageLoader.load(
        '/orientedImage/cameraParams.xml',
        '/orientedImage/imageParams.txt',
        viewer
      )
      console.log(images)
      viewer.scene.addOrientedImages(images)
    }

    this.$nuxt.$on('setting-updated', config)
    config()
  }
}
</script>
