<template lang="pug">
.audioBar
  .toggleBtn(@click="toggle") {{ toggleButtonText }}
  av-waveform.waveform(
    v-if="width"
    :class="{visible}"
    audio-src="/audio/joei-ji.mp3"
    range="100"
    :canv-height="60"
    :canv-width="width"
    played-line-color="white"
    :noplayed-line-width='1'
    noplayed-line-color="gray"
    playtime-font-color="white"
    playtime-slider-color="yellow"
  )
</template>

<style lang="sass" scoped>
$bgColor: rgba(0,0,0,0.75)
.audioBar
  background-color: $bgColor
  color: white
  font-size: 12px
  margin-bottom: 0
  position: relative
  .toggleBtn
    position: absolute
    display: flex
    justify-content: center
    align-items: center
    width: 50px
    height: 20px
    background-color: $bgColor
    top: -20px
    left: 0
    border-radius: 6px 6px 0 0
    font-size: 10px
    color: rgba(255,255,255,0.5)
    cursor: pointer
    &:hover
      color: white
  .waveform
    padding: 20px
    &:not(.visible)
      display: none
</style>

<script>
export default {
  data() {
    console.log('data!', this.$el)
    return {
      padding: 20,
      visible: true,
      width: null,
      toggleButtonText: '▼'
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize)
    this.resize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    toggle() {
      this.visible = !this.visible
      this.toggleButtonText = this.visible ? '▼' : '▲'
    },
    resize() {
      // TODO リサイズ野正しいやり方わからず、再作成している。もっと良い方法ないか…
      this.width = null
      this.$nextTick(() => {
        this.width = this.$el.clientWidth - 40
      })
    }
  }
}
</script>
