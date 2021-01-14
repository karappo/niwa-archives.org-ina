<template lang="pug">
div
</template>

<style lang="sass" scoped>
div
  width: 100%
  height: 100%
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

    viewer.setEDLEnabled(true)
    viewer.setFOV(60)
    viewer.setPointBudget(2 * 1000 * 1000)
    viewer.loadSettingsFromURL()
    const file = `/pointclouds/${this.$route.params.pointcloud}/metadata.json`
    const { pointcloud } = await Potree.loadPointCloud(file)

    const material = pointcloud.material
    material.activeAttributeName = 'rgba'
    material.minSize = 2
    material.pointSizeType = Potree.PointSizeType.ADAPTIVE
    material.shape = this.$store.state.shape

    viewer.scene.addPointCloud(pointcloud)
    viewer.fitToScreen()

    this.$nuxt.$on('setting-updated', () => {
      material.shape = this.$store.state.shape
      viewer.setEDLEnabled(this.$store.state.eyeDomeLighting)
    })
  }
}
</script>
