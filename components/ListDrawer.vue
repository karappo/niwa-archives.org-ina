<template lang="pug">
article
  header
    h1(:data-category="title") {{ title }}
    .filter(v-if="filterVisibility && tags.length" )
      label Filter:
      SelectBox(:options="tags" :value.sync="tagIndexStr" :allowEmpty="true")
    a.close(@click="$emit('close')" title="Close") X
  .content
    template(v-if="data.name === 'Guided Tour'")
      .description Guided Tourは、庭園をひとめぐりしながら、INAの全体が把握できるようなツアーモードです。
      .bigBtn(@click="startTour") Start Tour
    template(v-else-if="data.name === 'Ramble Tour'")
      .description Ramble Tourは、全アノテーションをランダムに巡っていくツアーモードです。
      .bigBtn(@click="startTour") Start Tour
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
@import ~/assets/style/drawer-common
.description
  font-size: 14px
  line-height: 2
  color: #898989
.bigBtn
  font-size: 17px
  font-family: 'K2-v1-Bold'
  color: white
  background-color: #084033
  display: flex
  justify-content: center
  align-items: center
  margin: 30px 0
  padding: 20px
  border-radius: 5px
  cursor: pointer
  transition: background-color .1s
  &:hover
    background-color: lighten(#084033, 5%)
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
    filterVisibility() {
      return !['Guided Tour', 'Ramble Tour', 'Plans'].includes(this.title)
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
    },
    startTour() {
      this.$store.commit('autoplay', true)
      this.$nextTick(() => {
        this.$emit('showAnnotation', this.filteredList[0].index)
      })
    }
  }
}
</script>
