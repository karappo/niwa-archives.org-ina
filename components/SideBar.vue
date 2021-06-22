<template lang="pug">
aside
  .toggle Menu
  section.outlines
    h3 Outlines
    .btn.disabled History
    .btn.disabled Plans
    .btn.disabled 3D Data
  section.viewpoints
    h3 Viewpoints
    .btn(@click="$emit('select', 'Viewpoints/Photos')") Photos
    .btn(@click="$emit('select', 'Viewpoints/Photos')") Movies
  section.elements
    h3 Elements
    .btn(@click="$emit('select', 'Elements/Stones')") Stones
    .btn(@click="$emit('select', 'Elements/Plants')") Plants
    .btn(@click="$emit('select', 'Elements/Creatures')") Creatures
    .btn(@click="$emit('select', 'Elements/Artifacts')") Artifacts
    .btn(@click="$emit('select', 'Elements/DNA Data')") DNA Data
  section
    .btn(@click="$emit('select', 'Oral Archives')") Oral Archives
  section(v-if="this.$route.params.season")
    h3 Seasons
    nuxt-link.btn(
      v-for="season in ['summer', 'winter']"
      :to="`../${season}/`"
      :class="{current: $route.params.season === season}"
    ) {{ season }}
  section.elements
    h3 Auto Modes
    .btn.disabled Guided Tour
    .btn.disabled Random Tour
</template>

<style lang="sass" scoped>
aside
  background-color: #1A1A1A
  color: #898989
  z-index: 1
.toggle
  display: flex
  align-items: center
  padding: 20px 15px
  border-bottom: 1px solid #3C3C3C
  cursor: pointer
  &:after
    content: url(~assets/image/ham.svg)
    margin-left: auto
    margin-right: 0
section
  padding: 20px 15px
  border-bottom: 1px solid #3C3C3C
h3
  font-size: 13px
  margin: 0
  margin-bottom: 10px
.btn
  cursor: pointer
  font-size: 13px
  display: flex
  align-items: center
  input[type='checkbox']
    cursor: pointer
  label
    margin-left: 8px
    cursor: pointer
.disabled
  &:hover
    text-decoration: line-through
    cursor: default
a.btn
  text-transform: capitalize
  &.current
    opacity: 0.5
    pointer-events: none
</style>

<script>
export default {}
</script>
