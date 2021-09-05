<template lang="pug">
.audioBar(v-if="audioList" :class="{visible}")
  .toggleBtn(@click="toggle")
    span.text Sounds
    TriangleArrow.icon
  .content
    .wrap
      .selectBox
        select(v-model="selectedAudioIndex")
          option(
            v-for="(item, index) in audioList"
            :key="index"
            :label="item.title"
            :value="index"
          )
            span(style="float: left") {{ item.title }}
            span(style="float: right; color: #8492a6; font-size: 13px") {{ item.file }}
        .icon
          TriangleArrow
      //- audio(controls)
      //-   source(src="/audio/joei_ji.mp3" type="audio/mpeg")
      .link TODO: Ambisonicで聞く？
      //- WaveformDynamic
      //- img(src="/waveform-joei_ji.svg")
</template>

<style lang="sass" scoped>
.audioBar
  --background-color: black
  background-color: var(--background-color)
  color: white
  font-size: 12px
  margin-bottom: 0
  position: relative
  width: 100%
  font-family: 'K2-v1-Bold'
  .toggleBtn
    --height: 24px
    position: absolute
    display: flex
    justify-content: center
    align-items: center
    width: 188px
    height: var(--height)
    background-color: var(--background-color)
    top: calc(var(--height) * -1)
    left: 24px
    border-radius: 5px 5px 0 0
    font-size: 12px
    color: #898989
    cursor: pointer
    z-index: 10
    justify-content: space-between
    span.text
      margin-left: 10px
      margin-right: auto
    .icon
      margin-left: auto
      margin-right: 10px
      transform: rotate(180deg)
    &:hover
      color: white
  .content
    transition: height 0.5s
    .wrap
      height: 30px
      padding: 15px 24px
  &.visible
    .toggleBtn
      .icon
        transform: rotate(0deg)
  &:not(.visible)
    .content
      height: 0
      display: none
  audio
    width: 100%
  .link
    margin-top: 10px
    text-align: right

.selectBox
  width: 188px
  height: 30px
  background: #242424
  position: relative
  border-radius: 5px
  select
    cursor: pointer
    -webkit-appearance: none
    appearance: none
    padding: 0
    outline: 0
    background: transparent
    border: 0
    width: 100%
    height: 100%
    color: #ADADAD
    font-size: 12px
    padding: 7px 10px 8px
  .icon
    pointer-events: none
    position: absolute
    top: 0
    right: 0
    height: 100%
    width: 28px
    border-left: 1px solid black
    display: flex
    justify-content: center
    align-items: center
  &:hover
    select
      color: white
    .icon
      svg
        path
          fill: white
</style>

<script>
import _data from '~/data/audio.js'
import TriangleArrow from '~/assets/image/triangle-arrow-down.svg?inline'
export default {
  components: {
    TriangleArrow
  },
  data() {
    const audioList = _data[this.$garden(this.$route)] || null
    return {
      visible: true,
      width: null,
      selectedAudioIndex: 0,
      audioList
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
