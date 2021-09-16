<template lang="pug">
.btn(
  @click="$nuxt.$emit('selectList', listName)"
  :data-list-name="listName"
  :class="{current: $store.getters.listName === listName, dot}"
) {{ title }}
</template>

<style lang="sass" scoped>
@import ../assets/style/const
.btn
  cursor: pointer
  font-size: 13px
  display: flex
  align-items: center

  --bg-color: #{$color_annotationDefault}
  &[data-list-name='Viewpoints/Photos']
    --bg-color: #{$color_photos}
  &[data-list-name='Viewpoints/Movies']
    --bg-color: #{$color_movies}
  &[data-list-name='Elements/Stones']
    --bg-color: #{$color_stones}
  &[data-list-name='Elements/Plants']
    --bg-color: #{$color_plants}
  &[data-list-name='Elements/Creatures']
    --bg-color: #{$color_creatures}
  &[data-list-name='Elements/Artifacts']
    --bg-color: #{$color_artifacts}
  &[data-list-name='Elements/DNA Data']
    --bg-color: #{$color_dnaData}
  &[data-list-name='Oral Archives']
    --bg-color: #{$color_oral}

  &.dot:before
    content: ''
    display: inline-block
    width: 6px
    height: 6px
    background-color: var(--bg-color)
    margin-right: 0.5em
    border-radius: 50%
  &:hover
    color: rgba(255,255,255,0.8)
  &.current
    color: white
    pointer-events: none
</style>

<script>
export default {
  props: {
    listName: {
      type: String,
      required: true,
      default: ''
    },
    dot: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    title() {
      return this.$getTitle(this.listName)
    }
  }
}
</script>
