<template lang="pug">
.soundBar(v-if="list" :class="{visible}")
  .toggleBtn(@click="visible = !visible")
    span.text Sounds
    TriangleArrow.icon
  .content
    .wrap
      .row
        .selectBox
          select(v-model="selectedIndex")
            option(
              v-for="(item, index) in list"
              :key="index"
              :label="item.title"
              :value="index"
            )
              span(style="float: left") {{ item.title }}
              span(style="float: right; color: #8492a6; font-size: 13px") {{ item.file }}
          .icon
            TriangleArrow
        //- audio(controls)
        //-   source(src="/sound/joei_ji.mp3" type="sound/mpeg")
        .playPauseBtn
          Pause
        .seekBar
        .time 21:34 / 62:03
        nux-link(to='TODO').link.movie
          | Movie
          span.icon 
        ExternalLink.link.ambisonics
          | Ambisonics
          span.icon 
      .row
        dl
          dt Place
          dd
            nuxt-link(to='TODO') 聴松軒
        dl
          dt Tags
          dd
            nuxt-link(to='TODO') カエル
            nuxt-link(to='TODO') イノシシ
            nuxt-link(to='TODO') 猿
</template>

<style lang="sass" scoped>
.soundBar
  --background-color: black
  --button-bg-color: #242424
  --textbox-bg-color: #151515
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
      .row
        height: 30px
        margin: 15px 18px 15px 24px
        display: flex
        align-items: center
        .playPauseBtn
          width: 110px
          height: 100%
          display: flex
          justify-content: center
          align-items: center
          cursor: pointer
          &:hover
            svg
              rect
                fill: white
        .seekBar
          width: 100%
          height: 4px
          background-color: #272727
          margin-right: 12px
        .time
          white-space: nowrap
          margin-left: 12px
          margin-right: 12px
          color: #898989
        .link
          margin-left: 8px
          color: #ADADAD
          background: var(--button-bg-color)
          border-radius: 5px
          white-space: nowrap
          width: 96px
          flex-shrink: 0
          padding: 7px 10px
          display: flex
          .icon
            margin-left: auto
            margin-right: 0
            font-family: 'Font Awesome 5 Pro-Solid-900'
        dl + dl
          margin-left: 20px
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
          dd
            padding-left: 12px
            padding-right: 12px
            font-size: 11px
            width: 100%
            margin-left: 0
            margin-right: 0
            a + a
              margin-left: 1.5em
            a:hover
              color: white

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

.selectBox
  width: 188px
  height: 30px
  background: var(--button-bg-color)
  position: relative
  border-radius: 5px
  flex-shrink: 0
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
import { ExternalLink } from '@karappo-inc/vue-components'
import _data from '~/data/sound.js'
import TriangleArrow from '~/assets/image/SoundBar/triangle-arrow-down.svg?inline'
import Pause from '~/assets/image/SoundBar/pause.svg?inline'
export default {
  components: {
    ExternalLink,
    TriangleArrow,
    Pause
  },
  data() {
    return {
      visible: false,
      selectedIndex: 0,
      list: _data[this.$garden(this.$route)] || null
    }
  }
}
</script>
