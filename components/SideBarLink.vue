<template lang="pug">
.btn(
  @click="$nuxt.$emit('selectList', category)"
  :data-category="category"
  :class="{current: $store.getters.selectedCategory === category, dot}"
) {{ title }}
</template>

<style lang="sass" scoped>
@import ../assets/style/const
.btn
  cursor: pointer
  font-size: 13px
  display: flex
  align-items: center

  --category-color: #{$color_annotation_default}
  &[data-category='Viewpoints/Photos']
    --category-color: #{$color_photos}
  &[data-category='Viewpoints/Movies']
    --category-color: #{$color_movies}
  &[data-category='Elements/Stones']
    --category-color: #{$color_stones}
  &[data-category='Elements/Plants']
    --category-color: #{$color_plants}
  &[data-category='Elements/Creatures']
    --category-color: #{$color_creatures}
  &[data-category='Elements/Artifacts']
    --category-color: #{$color_artifacts}
  &[data-category='Elements/DNA Data']
    --category-color: #{$color_dna}
  &[data-category='Oral Archives']
    --category-color: #{$color_oral}

  &.dot:before
    content: ''
    display: inline-block
    width: 8px
    height: 8px
    background-color: var(--category-color)
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
    category: {
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
      return this.$getTitle(this.category)
    }
  }
}
</script>
