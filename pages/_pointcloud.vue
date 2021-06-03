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
import { camelCase } from 'change-case'
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
    const gardenName = camelCase(this.$route.params.pointcloud)
    return {
      garden:
        this.$route.params.pointcloud === 'joei-ji' ? JoeijiData : MurinanData,
      annotations: this.$store.state.annotations[gardenName],
      tours: null,
      // Controls関係
      fpMode: false,
      orbitMode: false
    }
  },
  async mounted() {
    const viewer = new Potree.Viewer(this.$refs.potree_render_area)
    window.viewer = viewer
    viewer.setFOV(60)
    viewer.setPointBudget(this.$store.state.pointBudget)
    viewer.loadSettingsFromURL()

    // Controls
    this.updateControlMode()

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
    const tours = []
    this.garden.tours.forEach((data) => {
      const animation = new Potree.CameraAnimation(window.viewer)
      for (let i = 0; i < data.positions.length; i++) {
        const cp = animation.createControlPoint()
        cp.position.set(...data.positions[i])
        cp.target.set(...data.targets[i])
      }
      window.viewer.scene.addCameraAnimation(animation)
      animation.setDuration(20)
      animation.setVisible(false)
      tours.push(animation)
    })
    this.tours = tours
    this.$store.commit('cameraAnimationCount', tours.length)

    if (this.annotations) {
      this.annotations.forEach((data, index) => {
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
    document.addEventListener('keyup', this.keyup)
    document.addEventListener('keydown', this.keydown)

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
    document.removeEventListener('keyup', this.keyup)
    document.removeEventListener('keydown', this.keydown)
  },
  methods: {
    keydown(e) {
      const p = window.viewer.scene.view.position
      const unit = e.shiftKey ? 0.1 : 0.01 // Shiftキーの押下状態で移動単位を切り替え
      switch (this.$key(e)) {
        case '1':
          this.fpMode = true
          this.updateControlMode()
          break
        case '2':
          this.orbitMode = true
          this.updateControlMode()
          break
        case 'arrowup':
          // TODO 矢印の動く向きをcameraの方向に対する相対的なベクトルに変換して適用する
          window.viewer.scene.view.position.set(p.x, p.y, p.z + unit)
          break
        case 'arrowdown':
          // TODO 矢印の動く向きをcameraの方向に対する相対的なベクトルに変換して適用する
          window.viewer.scene.view.position.set(p.x, p.y, p.z - unit)
          break
        case 'arrowleft':
          // TODO 矢印の動く向きをcameraの方向に対する相対的なベクトルに変換して適用する
          window.viewer.scene.view.position.set(p.x, p.y + unit, p.z)
          break
        case 'arrowright':
          // TODO 矢印の動く向きをcameraの方向に対する相対的なベクトルに変換して適用する
          window.viewer.scene.view.position.set(p.x, p.y - unit, p.z)
          break
      }
      this.updateControlMode()
    },
    keyup(e) {
      switch (this.$key(e)) {
        case '1':
          this.fpMode = false
          break
        case '2':
          this.orbitMode = false
          break
      }
      this.updateControlMode()
    },
    updateControlMode() {
      // キーの押下状態によるモードの切り替え（優先度もここで決定）
      const mode = this.orbitMode ? 2 : this.fpMode ? 1 : 0
      // モードが変わってなければ終了
      if (mode === this.$store.state.controlMode) {
        return
      }
      switch (mode) {
        case 0:
          // Earth (Default)
          window.viewer.setControls(window.viewer.earthControls)
          break
        case 1:
          // First Person
          window.viewer.setControls(window.viewer.fpControls)
          window.viewer.fpControls.lockElevation = false
          break
        case 2:
          // Orbit
          window.viewer.setControls(window.viewer.orbitControls)
          break
      }

      // モードを保存
      this.$store.commit('controlMode', mode)
    },
    startCameraAnimation(index) {
      this.tours[index].play()
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
      if (this.annotations) {
        // ここでカメラポジションとの比較
        this.annotations.forEach((a) => {
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
