<template lang="pug">
svg.waveform(viewBox="0 -1 6000 2" preserveAspectRatio="none")
  path#waveformPath
</template>

<style lang="sass" scoped>
.waveform
  width: 100%
  height: 60px
#waveformPath
  stroke: #07f
</style>

<script>
import AudioSVGWaveform from 'audio-waveform-svg-path'
export default {
  mounted() {
    const trackWaveform = new AudioSVGWaveform({
      url: '/audio/joei_ji.mp3'
      // url: '/audio/chikatetsu_train.mp3'
    })
    trackWaveform.loadFromUrl().then(() => {
      const path = trackWaveform.getPath()
      console.log('path', path)
      document.getElementById('waveformPath').setAttribute('d', path)
    })
  }
}
</script>
