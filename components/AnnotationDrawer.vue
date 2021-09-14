<template lang="pug">
article
  header
    h2.category {{ category }}
    a.autoplay(
      v-if="autoplayAvailable"
      @click="clickAutoplay"
      :class="{enabled: $store.getters.autoplay}"
      title="オートプレイ：自動的に次のアノテーションを表示・再生します"
    ) Autoplay
    template(v-if="prevNextVisibility")
      a.prev(
        @click="$emit('prev', data.index)"
        :title="`Previus`"
        :class="{disabled: prevDisabled}"
      ) &lt;
      a.next(
        @click="$emit('next', data.index)"
        :title="`Next`"
        :class="{disabled: nextDisabled}"
      ) &gt;
      a.backTolist(
        @click="$emit('backToList')"
        :title="`Back to list`"
      ) 
    a.close(@click="$emit('close')" title="Close") X
  .content
    .commentForGuidedTour(v-if="isGuidedTour && data.commentForGuidedTour" v-html="data.commentForGuidedTour")
    img.image(v-if="data.image" :src="data.image")
    a.download(v-if="data.pdf" :href="data.pdf" target='_blank') PDFをみる
    .youtube(v-if="data.youtube")
      youtube(ref="youtube" :video-id="data.youtube.id()" :player-vars="playerVars" @ended="goToNextAnnotation")
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
    h1 {{ data.title }}
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
  color: white
  padding: 0
header
  display: flex
  height: 40px
  align-items: center
  margin-bottom: 15px
  padding: 28px 25px
.content
  padding: 0 25px
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
  font-family: 'Font Awesome 5 Pro-Light-300'
  width: 26px
  margin-left: 10px
.prev,
.next
  width: 26px
  &.disabled
    opacity: 0.5
    pointer-events: none
.next
  margin-left: 5px
h2.category
  margin: 0
  margin-right: auto
  display: flex
  align-items: center
  text-overflow: ellipsis
  white-space: nowrap
  font-size: 18px
  position: relative
h1
  margin: 0
  margin-right: auto
  display: flex
  align-items: center
  text-overflow: ellipsis
  white-space: nowrap
  font-size: 21px
.description,
.commentForGuidedTour
  font-size: 14px
  line-height: calc(29 / 14)
  margin-bottom: 15px
  white-space: pre-wrap // nl2br
  /deep/ a
    color: #A452E0
.commentForGuidedTour
  background-color: #05211A
  color: white
  padding: 20px 23px
  border-radius: 10px
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
    },
    prevDisabled: {
      type: Boolean,
      default: false
    },
    nextDisabled: {
      type: Boolean,
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
    category() {
      return this.$getTitle(this.data.category)
    },
    icon() {
      return this.$getIcon(this.this.$getTitle(this.listName))
    },
    belongingList() {
      // eslint-disable-next-line
      return window.viewer.scene.annotations.children.filter((a) => a.data.category === this.data.category)
    },
    player() {
      return this.$refs.youtube.player
    },
    autoplayAvailable() {
      return ['Oral Archives', 'Guided Tour'].includes(
        this.$store.getters.listName
      )
    },
    isGuidedTour() {
      return this.$store.getters.listName === 'Guided Tour'
    }
  },
  mounted() {
    document.body.setAttribute('data-drawer-header-color', this.category)
    if (
      !this.data.youtube &&
      !this.data.movie &&
      this.autoplayAvailable &&
      this.$store.getters.autoplay
    ) {
      this.startTimer()
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
    goToNextAnnotation() {
      if (
        this.autoplayAvailable &&
        this.$store.getters.autoplay &&
        !this.nextDisabled
      ) {
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
    },
    clickAutoplay() {
      this.$store.commit('autoplay', !this.$store.getters.autoplay)
      if (this.$store.getters.autoplay) {
        this.startTimer()
      }
    },
    startTimer() {
      // 一定時間後に次へ
      setTimeout(this.goToNextAnnotation, 15000)
    }
  }
}
</script>
