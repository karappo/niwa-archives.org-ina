<template lang="pug">
.content
  header
    h1(:data-name="title") {{ title }}
    .filter(v-if="tags.length && !data.name.includes('Tour')")
      FilterSelectBox(:options="tags" :value.sync="data.tagIndexStr")
    DrawerCloseButton
  article
    template(v-if="data.name === 'Guided Tour'")
      .description Guided Tourは、庭園をひとめぐりしながらINAの基本的な機能を把握することのできる自動モードです。
      .bigBtn.guidedTour(@click="startTour('Guided Tour')") Start Tour
    template(v-else-if="data.name === 'Ramble Tour'")
      h3 Tour with Annotations
      .description Ramble Tourは、全てのアノテーションをランダムにめぐってゆく自動モードです。Tour with Annotationsでは、各Annotationの説明を表示しながら進んでゆきます。
      .bigBtn.rambleTour(@click="startTour('Ramble Tour with Annotations')") Start Tour
      h3 Tour without Annotations
      .description Ramble Tourは、全てのアノテーションをランダムにめぐってゆく自動モードです。Tour without Annotationsでは、各Annotationの説明を表示せず、園内を移動しつづけます。同時にSoundsを再生させることもできます。
      .bigBtn.rambleTour(@click="startRambleTourWithoutAnnotations()") Start Tour

    template(v-if="data.name !== 'Ramble Tour'")
      .groups(v-if="data.name === 'Oral Archives'")
        .group(v-for="(val, key) in this.groups")
          .head
            h5 {{ key }}
            .thumb(:style="`background-image: url(${val[0].youtube.thumbnailUrl()});`")
          AnnotationList(:list="filterByTag(val)" :typeVisibility="typeVisibility" :thin="true")
      AnnotationList(v-else :list="filterByTag(data.list)" :typeVisibility="typeVisibility")
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
    margin-top: 28px

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
  margin: 13px 0
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
      margin-bottom: 3px
      background-color: #1A1A1A
      h5
        padding-left: 20px
        font-size: 15px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        flex: 1
        color: #898989
        margin-top: 0
        margin-bottom: 0
      .thumb
        width: 120px
        height: 80px
        background-size: 180%
        background-position: center
        margin-left: 10px
        border-left: 3px solid black
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
      return parseInt(this.data.tagIndexStr, 10)
    },
    selectedTag() {
      return this.tags[this.tagIndex]
    },
    typeVisibility() {
      return ![
        'Viewpoints/Still Images',
        'Viewpoints/Movies',
        'Elements/Stones',
        'Elements/Plants',
        'Elements/Creatures',
        'Elements/Artifacts',
        'Elements/DNA Data',
        'Oral Archives'
      ].includes(this.data.name)
    }
  },
  watch: {
    data: {
      immediate: true,
      async handler(data) {
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
    this.$nextTick(() => {
      if (FONTPLUS) {
        FONTPLUS.start()
      }
    })
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
        this.data.tagIndexStr = this.tags.indexOf(tag) + ''
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
      this.$nextTick(() => {
        this.$nuxt.$emit('clickAnnotationLink', this.data.list[0].id)
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
