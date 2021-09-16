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
      .description Ramble Tourは、全てのアノテーションをランダムに巡っていくツアーモードです。
      .bigBtn(@click="startTour") Start Tour

    .groups(v-if="data.name === 'Oral Archives'")
      .group(v-for="(val, key) in this.groups")
        .head
          .thumb(:style="`background-image: url(${val[0].youtube.thumbnailUrl()});`")
          h5 {{ key }}
        AnnotationList(:list="val" :icon="!$getIcon(data.name)")
    AnnotationList(v-else :list="filteredList" :icon="!$getIcon(data.name)")
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
.groups
  .group + .group
    margin-top: 60px
  .group
    .head
      display: flex
      align-items: center
      .thumb
        width: 80px
        height: 60px
        border-radius: 5px
        background-size: cover
        background-position: center
        margin-right: 10px
      h5
        font-size: 15px
        flex: 1
</style>

<script>
import _flattenDeep from 'lodash/flattenDeep'
import _groupBy from 'lodash/groupBy'
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
      tagIndexStr: '',
      groups: null // Oral Archivesのときにdata.listをグルーピングして保持する
    }
  },
  computed: {
    title() {
      return this.$getTitle(this.data.name)
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
      if (!this.selectedTag) {
        return this.data.list
      }
      return this.data.list.filter(
        (o) => o.tags && o.tags.includes(this.selectedTag)
      )
    }
  },
  watch: {
    data: {
      immediate: true,
      async handler(data) {
        this.tagIndexStr = '' // タグをリセット

        if (data.name === 'Oral Archives') {
          const groups = _groupBy(data.list, (item) => {
            return item.youtube.id()
          })
          // videoIdがkeyになっているのをYoutubeタイトルをキーに
          const res = {}
          for (const videoId of Object.keys(groups)) {
            const data = await fetch(
              `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.API_KEY}`
            ).then((res) => res.json())
            console.log(data.items[0].snippet.title)
            res[data.items[0].snippet.title] = groups[videoId]
          }
          this.groups = res
        } else {
          // TODO ここ要るのか確認
          this.groups = null
        }
      }
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
        this.$nuxt.$emit('showAnnotation', this.data.list[0].index)
      })
    },
    async youtubeTitleOf(videoId) {
      const data = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.API_KEY}`
      ).then((res) => res.json())
      return data.items[0].snippet.title
    }
  }
}
</script>
