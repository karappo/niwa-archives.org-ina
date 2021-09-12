<template lang="pug">
article
  header
    h1
      Icon(:category="data.category")
      | {{ title }}
    template(v-if="tags.length" )
      label Filter:
      SelectBox(:options="tags" :value.sync="tagIndexStr" :allowEmpty="true")
    a.close(@click="$emit('close')" title="Close") X
  ul.list(v-if="filteredList.length")
    li(v-for="o in filteredList" @click="$emit('showAnnotation', o.index)")
      Icon(v-if="!icon" :category="o.category")
      .thumb(v-if="o.image" :style="`background-image: url(${o.image});`")
      .thumb(v-if="o.youtube" :style="`background-image: url(${o.youtube.thumbnailUrl()});`")
      span.title {{ o.title }}
      span.type(v-if="o.image") 
      span.type.youtube(v-else-if="o.youtube") 
  .empty(v-else) データがありません
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
  label
    font-size: 12px
    color: #898989
    margin-right: 1em
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
h1
  display: flex
  align-items: center
  margin: 0
  margin-right: auto
  .icon
    font-size: 30px
    margin-right: 0.5em
.list
  display: block
  padding: 0
  margin: 0
  li
    display: flex
    align-items: center
    padding: 0.2em 0
    border-top: 1px solid #555
    color: #898989
    cursor: pointer
    font-size: 15px
    &:hover
      color: white
    .icon
      margin-right: 0.5em
    .thumb
      width: 40px
      height: 30px
      border-radius: 5px
      background-size: cover
      background-position: center
      margin-right: 10px
    .title
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
    .type
      font-size: 18px
      margin-left: auto
      margin-right: 0
      font-family: 'Font Awesome 5 Pro-Light-300'
      &.youtube
        font-family: 'Font Awesome 5 Brands-Regular-400'
  li:last-child
    border-bottom: 1px solid #555
.empty
  color: #898989
</style>

<script>
import _flattenDeep from 'lodash/flattenDeep'
import _map from 'lodash/map'
import _uniq from 'lodash/uniq'
export default {
  props: {
    data: {
      type: Object,
      require: true,
      default: null
    }
  },
  data() {
    return {
      tagIndexStr: ''
    }
  },
  computed: {
    title() {
      return this.$getTitle(this.data.name)
    },
    icon() {
      return this.$getIcon(this.data.name)
    },
    tags() {
      return _uniq(_flattenDeep(_map(this.data.list, (o) => o.tags)))
        .filter((o) => o)
        .sort()
    },
    tagIndex() {
      return parseInt(this.tagIndexStr, 10)
    },
    selectedTag() {
      return this.tags[this.tagIndex]
    },
    filteredList() {
      if (this.selectedTag) {
        return this.data.list.filter(
          (o) => o.tags && o.tags.includes(this.selectedTag)
        )
      }
      return this.data.list
    }
  },
  mounted() {
    this.$nuxt.$on('setTagIndexStr', this.setTagIndexStr)
  },
  beforeDestroy() {
    this.$nuxt.$off('setTagIndexStr', this.setTagIndexStr)
  },
  methods: {
    setTagIndexStr(tag) {
      this.setTag(tag)
    },
    setTag(tag) {
      const index = this.tags.indexOf(tag)
      if (0 <= index) {
        this.tagIndexStr = this.tags.indexOf(tag) + ''
      } else {
        console.error(`「${tag}」というタグは見つかりませんでした`)
      }
    }
  }
}
</script>
