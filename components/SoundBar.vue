<template lang="pug">
.soundBar(
  v-if="list"
  :class="{visible, border: !$store.getters.tourName}"
  :data-sp-visibility="spVisibility"
)
  audio(ref='player')
  .toggleBtn(@click="visible = !visible")
    span.text Sounds
    TriangleArrow.icon
  .spHeader
    span.text Sounds
    .closeBtn(@click="$emit('spClose')")
      SpClose
  .content
    SelectBox.selectBox(:options="list" :value.sync="index")
    .controlsAndMovies
      .controls
        .playPauseBtn(@click="togglePlay()")
          Play(v-if="paused")
          Pause(v-else)
        .seekBarHitArea(ref='seekBarHitArea' @click.stop="seekBarClick")
          .return(ref='return')
          .seekBar
            .progress(:style="progressStyle()")
        .time {{ currentTime }} / {{ totalTime }}
      .movieAndAmbisonics(v-if="data.movieId || data.ambisonicsUrl")
        nuxt-link(v-if="data.movieId" to='TODO' :class="{disabled: $store.getters.tourName}").link.movie
          | Movie
          span.icon 
        ExternalLink.link.ambisonics(v-if="data.ambisonicsUrl" :href="data.ambisonicsUrl" :class="{disabled: $store.getters.tourName}")
          | Ambisonics
          span.icon 
    dl.place
      dt Place
      dd
        template(v-if="data.place" )
          a(@click="placeClick(data.place.annotation)" :class="{disabled: $store.getters.tourName}") {{ data.place.label }}
    dl.creatures(:class="{empty: !(data.creatures && data.creatures.length)}")
      dt Creatures
      dd
        template(v-if="data.creatures && data.creatures.length")
          template(v-for="creature in data.creatures")
            a.creature(v-if="tags.includes(creature)" @click="tagClick(creature)" :class="{disabled: $store.getters.tourName}") {{ tag }}
            span.creature(v-else) {{ creature }}
</template>

<style lang="sass" scoped>
@import ~/assets/style/const
@import ~/assets/style/mixins
.soundBar
  --background-color: black
  background-color: var(--background-color)
  color: white
  font-size: 12px
  position: relative
  width: 100%
  font-family: 'K2-v1-Bold'
  margin-bottom: -100%
  transition: margin 0.8s
  +sp($sp_menu_threshold)
    font-size: 15px
    .selectBox
      order: 1
    .controlsAndMovies
      order: 3
      margin-top: 15px
      display: block
      .movieAndAmbisonics
        margin-top: 30px
        margin-left: 0 // 中のボタンのマージンを打ち消す
        display: grid
        grid-template-columns: 1fr 1fr
        gap: 11px
        .link
          margin-left: 0
          width: auto
          font-size: 15px
    .place
      order: 2
    .creatures
      order: 4
      &.empty
        display: none
  // border-rightだと表示領域外になってしまうため、疑似要素で…
  &.border:after
    position: absolute
    top: 0
    right: 0
    content: ''
    display: block
    width: 1px
    height: 100%
    background-color: #3C3C3C
  +sp($sp_menu_threshold)
    display: none
  &[data-sp-visibility='true']
    +sp($sp_menu_threshold)
      display: block
  &.visible
    margin-bottom: -44px
    &:hover
      margin-bottom: 0
      transition: margin 0.08s
    +sp($sp_menu_threshold)
      margin-bottom: 0
    .toggleBtn
      .icon
        transform: rotate(0deg)
.spHeader
  display: none
  position: relative
  +sp($sp_menu_threshold)
    display: flex
    align-items: center
    justify-content: space-between
    padding: 28px 20px
    color: #898989
    font-size: 15px
    font-weight: bold
    letter-spacing: 0
.closeBtn
  position: absolute
  top: 0
  right: 0
  height: 100%
  padding: 0 26px
  display: flex
  justify-content: center
  align-items: center
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
  +sp($sp_menu_threshold)
    display: none
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
  display: grid
  padding: 15px 18px 15px 24px
  grid-template-columns: 188px 1fr
  grid-template-rows: repeat(2, 1fr)
  row-gap: 15px
  column-gap: 20px
  +sp($sp_menu_threshold)
    display: flex
    flex-direction: column
    padding: 0 20px 20px
.controlsAndMovies
  display: flex
  align-items: center
  width: 100%
  height: 100%
.controls
  display: flex
  align-items: center
  width: 100%
  height: 100%
.movieAndAmbisonics
  display: flex
  align-items: center
.playPauseBtn
  margin-left: -20px
  width: 77px
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  cursor: pointer
  flex-shrink: 0
  &:hover
    svg
      rect,
      path
        fill: white
.seekBarHitArea
  cursor: pointer
  width: 100%
  height: 100%
  margin-right: 12px
  display: flex
  align-items: center
  position: relative
  .return
    position: absolute
    top: 0
    left: 0
    height: 100%
    width: 4px
    z-index: 2
  .seekBar
    width: 100%
    height: 4px
    background-color: #272727
    z-index: 1
    .progress
      height: 100%
      max-width: 100%
      background-color: #3e3e3e
      background-color: white

.time
  min-width: 100px
  text-align: right
  white-space: nowrap
  color: #898989
  flex-shrink: 0
  +sp($sp_menu_threshold)
    letter-spacing: 0
.link
  @extend %button
  margin-left: 8px
  border-radius: 5px
  white-space: nowrap
  width: 90px
  flex-shrink: 0
  padding: 4px 10px
  font-size: 12px
  display: flex
  .icon
    margin-left: auto
    margin-right: 0
    font-family: 'Font Awesome 5 Pro-Solid-900'
.time + .link
  margin-left: 12px
dl
  color: #898989
  background-color: var(--textbox-bg-color)
  border-radius: 5px
  display: flex
  align-items: center
  &:first-child
    width: 188px
    flex-shrink: 0
  &:nth-child(2)
    width: 100%
  dt,dd
    padding-top: 6px
    padding-bottom: 6px
  dt
    padding-left: 12px
    padding-right: 12px
    font-family: 'K2-v1-Bold'
    font-size: 12px
    border-right: 1px solid var(--background-color)
    +sp($sp_menu_threshold)
      font-size: 15px
  dd
    padding-left: 12px
    padding-right: 12px
    font-size: 11px
    width: 100%
    margin-left: 0
    margin-right: 0
    +sp($sp_menu_threshold)
      font-size: 14px
      font-weight: bold
    a.disabled
      opacity: 1
    a
      cursor: pointer
      &:hover
        color: white
    .creature + .creature
      margin-left: 1.5em
.creatures
  +sp($sp_menu_threshold)
    display: block
    background-color: transparent
    width: auto
    letter-spacing: 0
    dt
      padding-left: 0
    dd
      background-color: var(--textbox-bg-color)
      border-radius: 5px
      font-size: 12px
      width: auto
      line-height: 20px
audio
  width: 100%
</style>

<script>
// import dayjs from 'dayjs'
import { ExternalLink } from '@karappo-inc/vue-components'
import AllSoundData from '~/data/sounds.js'
import TriangleArrow from '~/assets/image/SoundBar/triangle-arrow-down.svg?inline'
import Play from '~/assets/image/SoundBar/play.svg?inline'
import Pause from '~/assets/image/SoundBar/pause.svg?inline'
import SpClose from '~/assets/image/SoundBar/sp-close.svg?inline'
export default {
  components: {
    ExternalLink,
    TriangleArrow,
    Play,
    Pause,
    SpClose
  },
  props: {
    annotations: {
      type: Array,
      require: true,
      default: null
    },
    spVisibility: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  data() {
    return {
      visible: true,
      index: '0', // SelectBoxに渡す関係でStringにしておく必要がある
      list: AllSoundData[this.$garden(this.$route)] || null,
      currentTime: '00:00',
      totalTime: '00:00',
      paused: true,
      duration: 0,
      percent: 0 // Number: 0 ~ 100
    }
  },
  computed: {
    data() {
      return this.list[parseInt(this.index, 10)]
    },
    file() {
      return this.data.src
    },
    player() {
      return this.$refs.player
    },
    tags() {
      return this.$getTags(this.annotations)
    }
  },
  watch: {
    index() {
      if (!this.paused) {
        this.pause()
      }
      this.player.src = this.data.src
      this.player.load()
    }
  },
  mounted() {
    if (this.list) {
      this.player.addEventListener('playing', this.playing)
      this.player.addEventListener('pause', this.pause)
      this.player.addEventListener('timeupdate', this.timeupdate)
      this.player.addEventListener('loadedmetadata', this.loadedmetadata)
      this.player.src = this.data.src
      this.player.load()
    }
  },
  beforeDestroy() {
    if (this.list) {
      this.player.removeEventListener('playing', this.playing)
      this.player.removeEventListener('pause', this.pause)
      this.player.removeEventListener('timeupdate', this.timeupdate)
      this.player.removeEventListener('loadedmetadata', this.loadedmetadata)
    }
  },
  methods: {
    playing() {
      this.paused = false
    },
    pause() {
      this.paused = true
    },
    togglePlay() {
      if (this.player.paused) {
        this.player.play()
      } else {
        this.player.pause()
      }
    },
    timeupdate() {
      const current = Math.floor(this.player.currentTime)
      const duration = Math.floor(this.player.duration)
      this.percent = (current / duration) * 100
      this.currentTime = current ? this.playTime(current) : '00:00'
    },
    loadedmetadata() {
      const current = Math.floor(this.player.currentTime)
      const duration = Math.floor(this.player.duration)
      this.percent = 0
      this.currentTime = current ? this.playTime(current) : '00:00'
      this.totalTime = duration ? this.playTime(duration) : '00:00'
    },
    playTime(t) {
      let hms = ''
      const h = (t / 3600) | 0
      const m = ((t % 3600) / 60) | 0
      const s = t % 60
      const z2 = (v) => {
        const s = '00' + v
        return s.substr(s.length - 2, 2)
      }
      if (h !== 0) {
        hms = h + ':' + z2(m) + ':' + z2(s)
      } else if (m !== 0) {
        hms = z2(m) + ':' + z2(s)
      } else {
        hms = '00:' + z2(s)
      }
      return hms
    },
    progressStyle() {
      return {
        width: `${this.percent}%`
      }
    },
    seekBarClick(e) {
      if (e.target === this.$refs.return) {
        this.player.currentTime = 0
      } else {
        // eslint-disable-next-line
        this.player.currentTime = this.player.duration * (e.offsetX / this.$refs.seekBarHitArea.offsetWidth)
      }
    },
    placeClick(annotationId) {
      this.$nuxt.$emit('clickAnnotationLink', annotationId)
    },
    tagClick(tag) {
      this.$nuxt.$emit('selectList', 'Annotations')
      this.$nextTick(function () {
        this.$nuxt.$emit('setTagIndexStr', tag)
      })
    }
  }
}
</script>
