<template lang="pug">
footer
  nuxt-link.backTop(to="/") Back to Top
  label(for='shape') Point Shape:
  ShapeSelect#shape
  label(for='size') Size:
  input#size(type="number" @change="updateSize" :value="$store.getters.size" step="0.01")
  input#edl(type="checkbox" @change="updateEDL" :checked="$store.getters.EDLEnabled")
  label(for='edl' title="Eye-Dome Lighting") EDL
  label(for='radius') 太さ:
  input#radius(type="number" @change="updateEDLRadius" :value="$store.getters.EDLRadius" step="0.1" :disabled="!$store.getters.EDLEnabled")
  label(for='strength') 強さ:
  input#strength(type="number" @change="updateEDLStrength" :value="$store.getters.EDLStrength" step="0.1" :disabled="!$store.getters.EDLEnabled")
  label(for='opacity') 透明度:
  input#opacity(type="number" @change="updateEDLOpacity" :value="$store.getters.EDLOpacity" step="0.1" :disabled="!$store.getters.EDLEnabled")
  label(for='point_budget') Point Budget:
  input#pointBudget(type="number" @change="updatePointBudget" :value="$store.getters.pointBudget" step=`${100 * 1000}` min=`${100 * 1000}` max="2000000")
  label(for='controls') Controls(Press key 1,2,3): {{ controlNames }}
  label(for='tour') Tour:
  button#tour(v-for="(n, i) in $store.getters.cameraAnimationCount" @click="$nuxt.$emit('startCameraAnimation', i)") {{ n }}
</template>

<style lang="sass" scoped>
footer
  flex-basis: 50px
  background-color: black
  display: flex
  align-items: center
  padding: 0 20px
  color: white
  font-size: 12px
  .backTop
    display: block
    background: white
    color: black
    padding: 1px 5px
    letter-spacing: 0
  label
    margin-left: 20px
    margin-right: 10px
    &:first-child
      margin-left: 0
    &[for="edl"]
      margin-left: 5px
      margin-right: 0
    &[for="tour"]
      margin-left: auto
  input
    &[type="number"]
      width: 4em
    &#edl
      margin-left: 40px
    &#pointBudget
      width: 6em
  button.animation
    margin-left: auto
    margin-right: 0
</style>

<script>
export default {
  computed: {
    controlNames() {
      // eslint-disable-next-line
      return ['First Person', 'Earth', 'Orbit'][this.$store.getters.controlMode]
    }
  },
  mounted() {
    document.addEventListener('keyup', this.keyup)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },
  methods: {
    // TODO "controlMode"関係を削除
    keyup(e) {
      switch (this.$key(e)) {
        case '1':
          this.$nuxt.$emit('setControlMode', 0)
          break
        case '2':
          this.$nuxt.$emit('setControlMode', 1)
          break
        case '3':
          this.$nuxt.$emit('setControlMode', 2)
          break
      }
    },
    updateEDL(e) {
      this.$store.commit('EDLEnabled', e.target.checked)
      this.$nuxt.$emit('settingUpdated')
    },
    updateEDLRadius(e) {
      this.$store.commit('EDLRadius', e.target.value)
      this.$nuxt.$emit('settingUpdated')
    },
    updateEDLStrength(e) {
      this.$store.commit('EDLStrength', e.target.value)
      this.$nuxt.$emit('settingUpdated')
    },
    updateEDLOpacity(e) {
      this.$store.commit('EDLOpacity', e.target.value)
      this.$nuxt.$emit('settingUpdated')
    },
    updateSize(e) {
      this.$store.commit('size', e.target.value)
      this.$nuxt.$emit('settingUpdated')
    },
    updatePointBudget(e) {
      this.$store.commit('pointBudget', e.target.value)
      this.$nuxt.$emit('settingUpdated')
    }
  }
}
</script>
