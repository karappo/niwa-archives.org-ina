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
.btn
  cursor: pointer
  font-family: 'K2-v1-Heavy'
  font-weight: normal
  font-size: 14px
  letter-spacing: 0.01em
  display: flex
  align-items: center
  margin-left: 20px

  --bg-color: #4d4d4d
  &[data-name='Viewpoints/Still Images']
    --bg-color: var(--color--still-images)
  &[data-name='Viewpoints/Movies']
    --bg-color: var(--color--movies)
  &[data-name='Elements/Stones']
    --bg-color: var(--color--stones)
  &[data-name='Elements/Plants']
    --bg-color: var(--color--plants)
  &[data-name='Elements/Creatures']
    --bg-color: var(--color--creatures)
  &[data-name='Elements/Artifacts']
    --bg-color: var(--color--artifacts)
  &[data-name='Elements/DNA Data']
    --bg-color: var(--color--dna-data)
  &[data-name='Oral Archives']
    --bg-color: var(--color--oral-archives)
  &[data-name='Guided Tour']
    --bg-color: var(--color--guided-tour)
  &[data-name='Ramble Tour']
    --bg-color: var(--color--ramble-tour)

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
    margin-left: 1px
    margin-right: 9px
    border-radius: 50%
  .tour
    margin-right: 8px
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
