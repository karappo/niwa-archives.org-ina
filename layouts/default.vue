<template lang="pug">
#pageTop
  header
    nuxt-link(v-for="(c, i) in clouds" :key="i" :to="`/${c.alias}/`" :class="_class(c.alias)")
      | {{ c.label }}<br>{{ c.size }}
  main
    nuxt/
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
#pageTop
  height: 100vh
  display: flex
  flex-direction: column
header
  width: 100%
  height: 50px
  flex-basis: 50px
  display: flex
  align-items: center
  a
    height: 100%
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    background: gray
    color: white
    font-size: 11px
    text-align: center
    &.sessyu-tei
      background-color: #a5c6de
      &.current
        background-color: #73b0dc
    &.murin-an
      background-color: #a5ded6
      &.current
        background-color: #78d4c7
main
  flex-basis: auto
  background: black
  flex-grow: 2
  position: relative
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
  data() {
    return {
      clouds: [
        {
          alias: 'sessyu-tei-0.1',
          label: '雪舟庭(0.1)',
          size: '169MB'
        },
        {
          alias: 'sessyu-tei-0.05',
          label: '雪舟庭(0.05)',
          size: '605.1MB'
        },
        {
          alias: 'sessyu-tei-0.02',
          label: '雪舟庭(0.02)',
          size: '2.95GB'
        },
        {
          alias: 'murin-an-0.1',
          label: '無鄰菴(0.1)',
          size: '61.8MB'
        },
        {
          alias: 'murin-an-0.05',
          label: '無鄰菴(0.05)',
          size: '195.5MB'
        },
        {
          alias: 'murin-an-0.02',
          label: '無鄰菴(0.02)',
          size: '750.3MB'
        }
      ]
    }
  },
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
    },
    _class(alias) {
      const __class = {
        current: this.$route.path === `/${alias}/`
      }
      const aliasWithoutNum = alias.match(/(.*)-[0-9.]+$/)[1]
      __class[aliasWithoutNum] = true
      return __class
    }
  }
}
</script>
