<template lang="pug">
.audioBar
  .toggleBtn(@click="toggle") {{ toggleButtonText }} Sounds
  .wrap(:class="{visible}")
    audio(controls)
      source(src="/audio/joei-ji.mp3" type="audio/mpeg")
    .link TODO: Ambisonicで聞く？
    svg.waveform(viewBox="0 -1 6000 2" preserveAspectRatio="none")
      path#waveformPath
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
    width: 80px
    height: 20px
    background-color: $bgColor
    top: -20px
    left: 10px
    border-radius: 6px 6px 0 0
    font-size: 10px
    color: rgba(255,255,255,0.5)
    cursor: pointer
    &:hover
      color: white
  .wrap
    padding: 20px
    &:not(.visible)
      display: none
  audio
    width: 100%
  .link
    margin-top: 10px
    text-align: right
  .waveform
    width: 100%
    height: 60px
  #waveformPath
    stroke: #07f
</style>

<script>
import AudioSVGWaveform from 'audio-waveform-svg-path'
export default {
  data() {
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

    const trackWaveform = new AudioSVGWaveform({
      url: '/audio/joei-ji.mp3'
    })
    trackWaveform.loadFromUrl().then(() => {
      const path = trackWaveform.getPath()
      document.getElementById('waveformPath').setAttribute('d', path)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    toggle() {
      this.visible = !this.visible
      this.toggleButtonText = this.visible ? '▼' : '▲'
      console.log(this.visible)
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
