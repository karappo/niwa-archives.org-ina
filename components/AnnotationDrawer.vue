<template lang="pug">
article
  header
    h1
      Icon(:category="data.category")
      | {{ data.title }}
    a.autoplay(
      v-if="autoplayAvailable"
      @click="$store.commit('autoPlayNextVideo', !$store.getters.autoPlayNextVideo)"
      :class="{enabled: $store.getters.autoPlayNextVideo}"
      title="オートプレイ：自動的に次の動画を再生します"
    ) Autoplay
    a.prev(
      v-if="prevNextVisibility"
      @click="$emit('prev', data.index)"
      :title="`Previus ${$getTitle(data.category)}`"
    ) &lt;
    a.next(
      v-if="prevNextVisibility"
      @click="$emit('next', data.index)"
      :title="`Next ${$getTitle(data.category)}`"
    ) &gt;
    a.backTolist(
      v-if="prevNextVisibility"
      @click="$emit('backToList')"
      :title="`Back to ${$getTitle(data.category)} list`"
    )
      | &lt;
      Icon(:category="data.category")
    a.close(@click="$emit('close')" title="Close") X
  img.image(v-if="data.image" :src="data.image")
  a.download(v-if="data.pdf" :href="data.pdf" target='_blank') PDFをみる
  .youtube(v-if="data.youtube")
    youtube(ref="youtube" :video-id="data.youtube.id()" :player-vars="playerVars" @ended="youtubeEnded")
    .cover(
      ref="cover"
      :class="{hidden: !cover}"
      @click="replayVideo()"
    )
      .icon 
  .movie(v-if="data.movie")
    //- GoogleDrive上のビデオ
    iframe(
      :src="data.movie"
      frameborder="0"
      allow="autoplay"
      allowfullscreen
    )
  .person(v-if="data.person") Speaker: {{ data.person }}
  .description(v-if="data.description" v-html="data.description")
  .tags(v-if="data.tags")
    label Tags
    .tag(v-for="tag in data.tags")
      span \#{{ tag }}
      ul
        // TODO: data.index != _a.index のところ、Annotation.id が導入されたらidで比較する方が良さそう
        li(
          v-for="a in annotations.filter((_a) => _a.tags && _a.tags.includes(tag) && data.index != _a.index )"
          @click="$emit('showAnnotation', a.index)"
        ) {{ a.title }}
  .dateTime(v-if="data.dateTime") {{ showDateTime(data.dateTime) }}
</template>

<style lang="sass" scoped>
@import ~/assets/style/const
article
  background-color: #111
  color: white
  width: calc(100% - 30px)
  min-height: calc(100% - 30px)
  padding: 15px
header
  display: flex
  height: 65px
  align-items: center
  margin-bottom: 15px
.close
  @extend %button
  height: 26px
  width: 26px
  font-size: 12px
  color: #898989
  transition: color 0.2s
  margin-left: 10px
  margin-right: 0
  &:hover
    color: white
a
  @extend %button
  font-size: 12px
  height: 26px
.autoplay
  padding: 0 10px
  margin-right: 10px
  &.enabled
    border-color: white !important
.backTolist
  margin-left: 10px
  padding-left: 5px
  /deep/ .icon
    background-color: transparent
    color: #898989
    margin: 0
  &:hover
    /deep/ .icon
      color: white
.prev,
.next
  width: 26px
.next
  margin-left: 5px
h1
  margin: 0
  margin-right: auto
  display: flex
  align-items: center
  text-overflow: ellipsis
  white-space: nowrap
  font-size: 18px
  .icon
    font-size: 25px
    flex-shrink: 0
.description
  font-size: 12px
  line-height: 2
  margin-bottom: 15px
  white-space: pre-wrap // nl2br
  /deep/ a
    color: #A452E0
.image
  width: 100%
  height: auto
.download
  @extend %button
  padding: 20px
.youtube,
.movie
  position: relative
  padding-top: calc(225 / 400 * 100%) // ここでアスペクト比（height / width）を設定
  overflow: hidden
  max-width: 100%
  height: auto
  margin-bottom: 20px
  .cover,
  /deep/ iframe
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1
  .cover
    font-family: 'Font Awesome 5 Pro-Light-300'
    font-size: 50px
    color: white
    background: black
    z-index: 2
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    .icon
      opacity: 0.5
      transition: opacity 0.2s
    &:hover
      .icon
        opacity: 1
    &.hidden
      display: none
.tags
  font-size: 12px
  line-height: 2
  ul
    margin: 0
  li
    text-decoration: underline
    cursor: pointer
    &:hover
      opacity: 0.5
.dateTime
  font-size: 12px
  margin-top: 50px
</style>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    data: {
      type: Object,
      require: true,
      default: null
    },
    annotations: {
      type: Array,
      require: true,
      default: null
    },
    prevNextVisibility: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  data() {
    if (this.data.youtube) {
      const playerVars = this.data.youtube.getParams()
      playerVars.autoplay = 1
      return {
        playerVars,
        cover: false
      }
    }
    return {}
  },
  computed: {
    icon() {
      return this.$getIcon(this.data.category)
    },
    belongingList() {
      // eslint-disable-next-line
      return window.viewer.scene.annotations.children.filter((a) => a.data.category === this.data.category)
    },
    player() {
      return this.$refs.youtube.player
    },
    autoplayAvailable() {
      return this.data.category === 'Oral Archives'
    }
  },
  methods: {
    showDateTime(dateTime) {
      const d = dayjs(dateTime)
      let format = 'YYYY/MM/DD'
      if (!(d.hour() === 0 && d.minute() === 0 && d.second() === 0)) {
        format += ' HH:mm'
      }
      return d.format(format)
    },
    youtubeEnded() {
      if (this.autoplayAvailable && this.$store.getters.autoPlayNextVideo) {
        this.$emit('next', this.data.index)
      } else {
        this.cover = true
        this.player.seekTo(this.playerVars.start || 0)
        this.player.pauseVideo()
      }
    },
    replayVideo() {
      this.cover = false
      this.player.playVideo()
    }
  }
}
</script>
