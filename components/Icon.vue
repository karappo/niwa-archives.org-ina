<template lang="pug">
span.icon(v-if="icon" :data-category="category") {{ icon }}
</template>

<style lang="sass" scoped>
@import ../assets/style/const
.icon
  font-family: 'Font Awesome 5 Pro-Light-300'
  color: white
  width: 2em
  height: 2em
  border-radius: 50%
  display: inline-flex
  justify-content: center
  align-items: center
  margin-right: 0.5em
  &[data-category='Elements/Stones']
    background-color: $color_stones
  &[data-category='Elements/Plants']
    background-color: $color_plants
  &[data-category='Elements/Creatures']
    background-color: $color_creatures
  &[data-category='Elements/Artifacts']
    background-color: $color_artifacts
  &[data-category='Elements/DNA Data']
    background-color: $color_dna
  &[data-category='Viewpoints/Photos']
    background-color: $color_photos
  &[data-category='Viewpoints/Movies']
    background-color: $color_movies
</style>

<script>
export default {
  props: {
    category: {
      type: String,
      require: true,
      default: null
    }
  },
  computed: {
    icon() {
      return this.$getIcon(this.category)
    }
  }
}
</script>
