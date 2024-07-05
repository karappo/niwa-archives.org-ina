<template lang="pug">
.content
  header
    h2.category(:data-name="category") {{ category }}
    a.autoplay(
      v-if="$store.getters.pageName === 'Oral Archives'"
      @click="clickAutoplay"
      :class="{enabled: $store.getters.autoplay}"
      title="オートプレイ：自動的に次のアノテーションを表示・再生します"
    ) Auto<span class="play">play</span>
    template(v-if="prevNextVisibility")
      a.prev(
        @click="prev"
        title="Previus"
        :class="{disabled: prevDisabled}"
      )
        IconPrev
      a.next(
        @click="next"
        title="Next"
        :class="{disabled: nextDisabled}"
      )
        IconNext
      a.backTolist(
        v-if="!$store.getters.tourName"
        @click="$emit('backToList')"
        :title="`Back to list`"
      )
        IconList
    StopTourButton(v-if="$store.getters.tourName" :icon="true")
    DrawerCloseButton(v-else)
  article
    .commentForGuidedTour(v-if="isGuidedTour && data.commentForGuidedTour" v-html="data.commentForGuidedTour")
    img.image(v-if="data.image" :src="data.image")
    a.download(v-if="data.pdf" :href="data.pdf" target='_blank') PDFをみる
    .youtube(v-if="data.youtube")
      youtube(
        ref="youtube"
        :video-id="data.youtube.id()"
        :player-vars="playerVars"
        @playing="youtubeOnPlaying"
        @ended="goToNextAnnotation"
      )
      .cover(
        ref="cover"
        :class="{hidden: !cover}"
        @click="replayVideo()"
      )
        .icon 
    //- TODO GoogleDriveのビデオ対応をやめられないか
    .movie(v-if="data.movie")
      //- GoogleDrive上のビデオ
      iframe(
        :src="data.movie"
        frameborder="0"
        allow="autoplay"
        allowfullscreen
      )
    h1 {{ data.title }}
    .description(
      v-if="data.description"
      :class="{noBr}"
      v-html="data.description"
    )
    .tags(v-if="data.tags")
      h5 Tags
      .tag(v-for="tag in data.tags" @click="tagClick(tag)" :class="{disabled: $store.getters.tourName}")
        span \#{{ tag }}
        span.num {{ annotations.filter((_a) => _a.tags && _a.tags.includes(tag)).length }}
    .speaker(v-if="data.speaker")
      h5 Speaker
      .unit
        .thumb(:style="`background-image: url(${data.youtube.thumbnailUrl()});`")
        .text(v-html="data.speaker")
    .dateTime(v-if="data.dateTime")
      h5 Date
      p {{ showDateTime(data.dateTime) }}
</template>

<style lang="sass" scoped>
@import ~/assets/style/general/clf
@import ~/assets/style/const
@import ~/assets/style/drawer-common
header
  .autoplay
    padding: 0 14px
    margin-right: 8px
    &.enabled
      border-color: white !important
      +sp
        color: #fff !important
    +sp
      padding: 0 10px
      margin-right: 0
      background: transparent !important // activeやhoverの時に背景色が変わるのを防ぐために!importantつけている
      border: 0
      font-size: 14px
      color: #898989 !important // activeやhoverの時に背景色が変わるのを防ぐために!importantつけている
      .play
        display: none
  .backTolist
    font-family: 'Font Awesome 5 Pro-Light-300'
    width: 34px
    height: 34px
    margin-left: 1px
    margin-right: 1px
  .prev,
  .next
    width: 34px
    height: 34px
  .next
    margin-left: 1px
  /deep/ .stopTourButton
    @extend %button
    height: 34px
    padding-left: 18px
    font-size: 14px
    margin-left: 1px
    transition: color 0.2s
    svg
      margin-left: 14px
      margin-right: 14px
      line
        transition: stroke 0.2s
    &:hover
      svg
        line
          stroke: white
.content
  .description,
  .commentForGuidedTour
    color: #9B9B9B
    font-size: 14px
    line-height: calc(29 / 14)
    margin-bottom: 15px
    &:not(.noBr)
      white-space: pre-wrap // nl2br
    /deep/
      a
        color: #A452E0
      h1,
      h2,
      h3,
      h4,
      h5,
      h6
        @extend %font_bolder
      h2
        margin: 1.6em 0 0.3rem
        color: #ddd
        font-size: 1.8rem
      h3
        margin: 1.4em 0 0
        color: #DDD
        font-size: 1.4rem
  .commentForGuidedTour
    background-color: #151515
    color: white
    padding: 20px 23px
    border-radius: 10px
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
      background: #0e0e0e
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
    .tag + .tag
      margin-left: 8px
    .tag
      display: inline-flex
      background-color: #242424
      color: #D6D6D6
      border-radius: 5px
      padding: 3px 10px
      font-size: 14px
      cursor: pointer
      margin-bottom: 1em
      &.disabled
        opacity: 0.3
        pointer-events: none
      &:not(.disabled):hover
        background-color: lighten(#242424, 10%)
      span.num
        color: #7C7C7C
        font-family: 'K2-v1-Regular'
        margin-left: 1em
  .speaker
    .unit
      @extend .clf
    .thumb
      background-size: 180% // 上下に黒帯が入った正方形なのでceoverにするとNG
      background-position: center
      width: 87px
      height: 87px
      border-radius: 5px
      float: left
    .text
      float: left
      margin-left: 20px
      /deep/ h6
        font-size: 14px
        color: white
      /deep/ p
        font-size: 12px
        color: #9B9B9B
        margin-top: 14px
  .dateTime
    font-size: 14px
    margin-top: 50px
    color: #8B8B8B
</style>

<script>
import dayjs from 'dayjs'
import IconPrev from '~/assets/image/icon-prev.svg?inline'
import IconNext from '~/assets/image/icon-next.svg?inline'
import IconList from '~/assets/image/icon-list.svg?inline'
export default {
  components: {
    IconPrev,
    IconNext,
    IconList
  },
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
    },
    isSP: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const res = {
      playerVars: null,
      cover: null,
      timerID: null
    }
    if (this.data.youtube) {
      const playerVars = this.data.youtube.getParams()
      playerVars.autoplay = 1
      res.playerVars = playerVars
      res.cover = false
    }
    return res
  },
  computed: {
    category() {
      return this.$getTitle(this.data.category)
    },
    belongingList() {
      // TODO ここ、グループに属するannotationのことを考慮できていなさそう
      // window.viewer.scene.annotations.children ではなく this.annotations で判定するべきかも？
      // でも、その時ほんとに動作大丈夫か？
      // eslint-disable-next-line
      return window.viewer.scene.annotations.children.filter((a) => a.data.category === this.data.category)
    },
    player() {
      return this.$refs.youtube.player
    },
    isGuidedTour() {
      return this.$store.getters.pageName === 'Guided Tour'
    },
    noBr() {
      // DNA Dataの時はHTMLが複雑なので、自動で改行させない
      return this.category === 'DNA Data'
    }
  },
  watch: {
    data: {
      immediate: true, // 監視開始時（コンポーネントがマウントされた直後）にも反応するようにする
      handler(data) {
        // 初期化時の処理
        // mountedは、このコンポーネントの再描画時に呼ばれないので、ここで処理する
        // スクロール位置の初期化
        this.$nextTick(() => {
          this.$el.parentElement.scrollTop = 0
        })
        if (FONTPLUS) {
          FONTPLUS.start()
        }

        if (this.isSP) {
          this.startGoToNextTimer()
        } else if (
          !data.youtube &&
          !data.movie &&
          (this.$store.getters.autoplay || this.$store.getters.tourName)
        ) {
          this.startGoToNextTimer()
        }
      }
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
        !this.nextDisabled &&
        (this.$store.getters.autoplay || this.$store.getters.tourName)
      ) {
        this.$emit('next', this.data.id)
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
        this.startGoToNextTimer()
      }
    },
    startGoToNextTimer() {
      // 一定時間後に次へ
      this.timerID = setTimeout(this.goToNextAnnotation, 15000)
    },
    youtubeOnPlaying() {
      if (this.isSP) {
        this.clearTimer()
      }
    },
    tagClick(tag) {
      this.$nuxt.$emit('selectList', 'Annotations')
      this.$nextTick(function () {
        this.$nuxt.$emit('setTagIndexStr', tag)
      })
    },
    clearTimer() {
      if (this.timerID) {
        clearTimeout(this.timerID)
        this.timerID = null
      }
    },
    prev() {
      this.clearTimer()
      this.$emit('prev', this.data.id)
    },
    next() {
      this.clearTimer()
      this.$emit('next', this.data.id)
    }
  }
}
</script>
