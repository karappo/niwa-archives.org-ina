<template lang="pug">
.annotationList
  ul.list(v-if="list.length")
    li(v-for="(o, i) in list" @click="$nuxt.$emit('showAnnotation', o.index)")
      .thumb(v-if="!isOralArchives" :style="`background-image: url(${thumbURL(o)});`")

      span.index(v-if="isOralArchives") {{ i + 1 }}
      span.type(v-else)
        TypeImage(v-if="o.image")
        TypeVideo(v-if="o.youtube")

      span.title {{ o.title }}
      .dotWrap(v-if="typeVisibility" :data-category="o.category" :title="o.category")
        .dot
  .empty(v-else) データがありません
</template>

<style lang="sass" scoped>
@import ~/assets/style/const
.list
  display: block
  padding: 0
  margin: 0
  li + li
    margin-top: 3px
  li
    display: flex
    padding: 0
    margin: 0
    background: #1A1A1A
    color: #898989
    cursor: pointer
    font-size: 14px
    height: 60px
    &:hover
      color: white

    .dotWrap
      margin-right: 10px
      margin-left: auto
      display: flex
      align-items: center
      --bg-color: transparent
      &[data-category='Viewpoints/Still Images']
        --bg-color: #{$color_stillImages}
      &[data-category='Viewpoints/Movies']
        --bg-color: #{$color_movies}
      &[data-category='Elements/Stones']
        --bg-color: #{$color_stones}
      &[data-category='Elements/Plants']
        --bg-color: #{$color_plants}
      &[data-category='Elements/Creatures']
        --bg-color: #{$color_creatures}
      &[data-category='Elements/Artifacts']
        --bg-color: #{$color_artifacts}
      &[data-category='Elements/DNA Data']
        --bg-color: #{$color_dnaData}
      &[data-category='Oral Archives']
        --bg-color: #{$color_oralArchives}
      .dot
        display: inline-block
        width: 6px
        height: 6px
        background-color: var(--bg-color)
        margin-right: 10px
        border-radius: 50%

    .icon
      margin-right: 0.5em
    .thumb
      width: 90px
      height: 60px
      background-size: 180% // 上下に黒帯が入った正方形なのでceoverにするとNG
      background-position: center
      background-color: #333
      flex-shrink: 0
    .index
      margin-right: 20px
      width: 30px
      display: flex
      align-items: center
      justify-content: flex-end
    .title
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      display: flex
      align-items: center
    .type
      width: 46px
      display: flex
      justify-content: center
      align-items: center
.empty
  color: #898989
</style>

<script>
import TypeImage from '~/assets/image/type-image.svg?inline'
import TypeVideo from '~/assets/image/type-video.svg?inline'
export default {
  components: {
    TypeImage,
    TypeVideo
  },
  props: {
    list: {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    typeVisibility: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isOralArchives() {
      return this.$store.getters.pageName === 'Oral Archives'
    }
  },
  methods: {
    thumbURL(o) {
      if (o.image) {
        return o.image
      } else if (o.youtube) {
        return o.youtube.thumbnailUrl()
      } else {
        return ''
      }
    }
  }
}
</script>
