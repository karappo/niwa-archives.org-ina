<template lang="pug">
article
  header
    h1
      Icon(:category="data.category")
      | {{ data.title }}
    a.prev(
      @click="$emit('prev', data.index)"
      :title="`Previus ${$getTitle(data.category)}`"
      :disabled="belongingList.length <= 1"
    ) &lt;
    a.next(
      @click="$emit('next', data.index)"
      :title="`Next ${$getTitle(data.category)}`"
      :disabled="belongingList.length <= 1"
    ) &gt;
    a.close(@click="$emit('close')" title="Close") X
  img.image(v-if="data.image" :src="data.image")
  a.download(v-if="data.pdf" :href="data.pdf" target='_blank') PDFをみる
  .youtube(v-if="data.youtube")
    iframe(
      :src="data.youtube.embedUrl()"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    )
  .movie(v-if="data.movie")
    iframe(
      :src="data.movie"
      frameborder="0"
      allow="autoplay"
      allowfullscreen
    )
  .person(v-if="data.person") Speaker: {{ data.person }}
  .description(v-if="data.description") {{ data.description }}
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
  height: 32px
  width: 32px
  font-size: 12px
  color: #898989
  transition: color 0.2s
  margin-left: 10px
  margin-right: 0
  &:hover
    color: white
.prev,
.next
  @extend %button
  font-size: 12px
  height: 32px
  width: 32px
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
.image
  width: 100%
  height: auto
%button
  background-color: #333
  color: #898989
  display: flex
  justify-content: center
  align-items: center
  border-radius: 5px
  cursor: pointer
  flex-shrink: 0
  &:not([disabled]):hover
    background-color: #1A1A1A
    color: white
    transition: background-color 0.2s, color 0.2s
  &[disabled]
    cursor: not-allowed
    opacity: 0.5
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
  iframe
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
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
    }
  },
  computed: {
    icon() {
      return this.$getIcon(this.data.category)
    },
    belongingList() {
      // eslint-disable-next-line
      return window.viewer.scene.annotations.children.filter((a) => a.data.category === this.data.category)
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
    }
  }
}
</script>
