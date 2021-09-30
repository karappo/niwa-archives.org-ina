<template lang="pug">
.content
  header
    h1(:data-name="title") {{ title }}
    .filter(v-if="tags.length && !data.name.includes('Tour')")
      FilterSelectBox(:options="tags" :value.sync="tagIndexStr")
    DrawerCloseButton
  article
    template(v-if="data.name === 'Guided Tour'")
      .description Guided Tourでは、庭園をひとめぐりしながら、INAの全体が把握できるような自動モードです。
      .bigBtn.guidedTour(@click="startTour('Guided Tour')") Start Tour
    template(v-else-if="data.name === 'Ramble Tour'")
      h3 Tour with Annotations
      .description Ramble Tourは、全てのアノテーションをランダムに巡っていくツアーモードです。こちらは、各Annotationの説明を表示しながら進めるモードです。
      .bigBtn.rambleTour(@click="startTour('Ramble Tour with Annotations')") Start Tour
      h3 Tour without Annotations
      .description Ramble Tourは、全てのアノテーションをランダムに巡っていくツアーモードです。こちらは、説明を表示せず純粋に景色を楽しむモードです。
      .bigBtn.rambleTour(@click="startRambleTourWithoutAnnotations()") Start Tour

    template(v-if="data.name !== 'Ramble Tour'")
      .groups(v-if="data.name === 'Oral Archives'")
        .group(v-for="(val, key) in this.groups")
          .head
            h5 {{ key }}
            .thumb(:style="`background-image: url(${val[0].youtube.thumbnailUrl()});`")
          AnnotationList(:list="filterByTag(val)" :icon="!$getIcon(data.name)")
      AnnotationList(v-else :list="filterByTag(data.list)" :icon="!$getIcon(data.name)")
</template>

<style lang="sass" scoped>
@import ~/assets/style/const
@import ~/assets/style/drawer-common
article
  h3
    font-family: 'K2-v1-Bold'
    font-size: 16px
    color: #BCBCBC
    margin-bottom: 1em
  .bigBtn + h3
    margin-top: 70px

.description
  font-size: 14px
  line-height: 2
  color: #898989
.bigBtn
  font-size: 17px
  font-family: 'K2-v1-Bold'
  color: white
  display: flex
  justify-content: center
  align-items: center
  margin: 30px 0
  padding: 20px
  border-radius: 5px
  cursor: pointer
  transition: background-color .1s
  &.guidedTour
    background-color: #112526
    &:hover
      background-color: darken($color_guidedTour, 10%)
  &.rambleTour
    background-color: #252134
    &:hover
      background-color: darken($color_rambleTour, 30%)
.empty
  color: #898989
.groups
  .group + .group
    margin-top: 60px
  .group
    .head
      display: flex
      align-items: center
      margin-bottom: 8px
      h5
        font-size: 15px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        flex: 1
      .thumb
        width: 120px
        height: 80px
        background-size: 180%
        background-position: center
        margin-left: 10px
</style>

<script>
import _groupBy from 'lodash/groupBy'
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
      return this.$getTags(this.data.list)
    },
    tagIndex() {
      return parseInt(this.tagIndexStr, 10)
    },
    selectedTag() {
      return this.tags[this.tagIndex]
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
    startRambleTourWithoutAnnotations() {
      this.$store.commit('tourName', 'Ramble Tour without Annotations')
      this.$nuxt.$emit('startRambleTourWithoutAnnotations')
    },
    startTour(tourName) {
      this.$store.commit('tourName', tourName)
      this.$store.commit('autoplay', true)
      this.$nextTick(() => {
        this.$nuxt.$emit('showAnnotation', this.data.list[0].index)
      })
    },
    filterByTag(list) {
      if (!this.selectedTag) {
        return list
      }
      return list.filter((o) => o.tags && o.tags.includes(this.selectedTag))
    }
  }
}
</script>
