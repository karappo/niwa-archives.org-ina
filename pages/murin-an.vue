<template lang="pug">
.root
</template>

<style lang="sass" scoped>
.root
  width: 100vw
  height: 100vh
</style>

<script>
export default {
  mounted() {
    const viewer = new Potree.Viewer(this.$el)

    viewer.setEDLEnabled(true)
    viewer.setFOV(60)
    viewer.setPointBudget(2 * 1000 * 1000)
    viewer.loadSettingsFromURL()

    viewer.loadGUI(() => {
      viewer.setLanguage('en')
    })

    Potree.loadPointCloud('/pointclouds/murin-an/metadata.json').then((e) => {
      const pointcloud = e.pointcloud
      const material = pointcloud.material

      material.activeAttributeName = 'rgba'
      material.minSize = 2
      material.pointSizeType = Potree.PointSizeType.ADAPTIVE

      viewer.scene.addPointCloud(pointcloud)
      viewer.fitToScreen()
    })
  }
}
</script>
