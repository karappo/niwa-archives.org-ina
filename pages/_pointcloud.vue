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
      garden: /joei-ji/.test(this.$route.params.pointcloud)
        ? JoeijiData
        : MurinanData
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

      for (let i = 0; i < this.garden.positions.length; i++) {
        const cp = animation.createControlPoint()
        cp.position.set(...this.garden.positions[i])
        cp.target.set(...this.garden.targets[i])
      }
      // viewer.scene.addCameraAnimation(animation)
      animation.play()
    }
  }
}
</script>
