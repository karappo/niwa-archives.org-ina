<template lang="pug">
.btn(
  @click="$nuxt.$emit('selectList', listName)"
  :data-name="listName"
  :class="{current: $store.getters.pageName === listName}"
)
  .dot.icon(v-if="icon==='dot'")
  IconTour.tour(v-else-if="icon==='tour'")
  IconHyphen.tour(v-else-if="icon==='hyphen'")
  | {{ title }}
</template>

<style lang="sass" scoped>
@import ../assets/style/const
.btn
  cursor: pointer
  font-family: 'K2-v1-Heavy'
  font-weight: normal
  font-size: 14px
  letter-spacing: 0.01em
  display: flex
  align-items: center

  --bg-color: #{$color_annotationDefault}
  &[data-name='Viewpoints/Still Images']
    --bg-color: #{$color_stillImages}
  &[data-name='Viewpoints/Movies']
    --bg-color: #{$color_movies}
  &[data-name='Elements/Stones']
    --bg-color: #{$color_stones}
  &[data-name='Elements/Plants']
    --bg-color: #{$color_plants}
  &[data-name='Elements/Creatures']
    --bg-color: #{$color_creatures}
  &[data-name='Elements/Artifacts']
    --bg-color: #{$color_artifacts}
  &[data-name='Elements/DNA Data']
    --bg-color: #{$color_dnaData}
  &[data-name='Oral Archives']
    --bg-color: #{$color_oralArchives}
  &[data-name='Guided Tour']
    --bg-color: #{$color_guidedTour}
  &[data-name='Ramble Tour']
    --bg-color: #{$color_rambleTour}

  &:hover
    color: rgba(255,255,255,0.8)
  &.current
    color: white
    pointer-events: none

  .dot
    display: inline-block
    width: 6px
    height: 6px
    background-color: var(--bg-color)
    margin-right: 8px
    border-radius: 50%
  .tour
    margin-right: 10px
    path
      fill: var(--bg-color)
  .hyphen
    margin-right: 10px
</style>

<script>
import IconHyphen from '~/assets/image/icon-hyphen.svg?inline'
import IconTour from '~/assets/image/icon-tour.svg?inline'
export default {
  components: {
    IconHyphen,
    IconTour
  },
  props: {
    listName: {
      type: String,
      required: true,
      default: ''
    },
    dot: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: null
    }
  },
  computed: {
    title() {
      return this.$getTitle(this.listName)
    }
  }
}
</script>
