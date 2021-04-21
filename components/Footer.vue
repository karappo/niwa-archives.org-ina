<template lang="pug">
footer
  label(for='shape') Point Shape:
  ShapeSelect#shape
  label(for='size') Size:
  input#size(type="number" @change="updateSize" :value="$store.state.size" step="0.01")
  input#edl(type="checkbox" @change="updateEDL" :checked="$store.state.EDLEnabled")
  label(for='edl' title="Eye-Dome Lighting") EDL
  label(for='radius') 太さ:
  input#radius(type="number" @change="updateEDLRadius" :value="$store.state.EDLRadius" step="0.1" :disabled="!$store.state.EDLEnabled")
  label(for='strength') 強さ:
  input#strength(type="number" @change="updateEDLStrength" :value="$store.state.EDLStrength" step="0.1" :disabled="!$store.state.EDLEnabled")
  label(for='opacity') 透明度:
  input#opacity(type="number" @change="updateEDLOpacity" :value="$store.state.EDLOpacity" step="0.1" :disabled="!$store.state.EDLEnabled")
  button.animation(@click="$nuxt.$emit('startCameraAnimation')") Start Tour
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
  label
    margin-left: 20px
    margin-right: 10px
    &:first-child
      margin-left: 0
    &[for="edl"]
      margin-left: 5px
      margin-right: 0
  input
    &[type="number"]
      width: 4em
    &#edl
      margin-left: 40px
  button.animation
    margin-left: auto
    margin-right: 0
</style>

<script>
export default {
  methods: {
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
    }
  }
}
</script>
