<template lang="pug">
aside
  .toggle Menu
  section.outlines
    h3 Outlines
    .btn History
    .btn Plans
    .btn 3D Data
  section.viewpoints
    h3 Viewpoints
    .btn
      input#photos(type='checkbox' checked)
      label(for="photos") Photos
    .btn
      input#movies(type='checkbox' checked)
      label(for="movies") Movies
  section.elements
    h3 Elements
    .btn
      input#stones(type='checkbox' checked)
      label(for="stones") Stones
    .btn
      input#plants(type='checkbox' checked)
      label(for="plants") Plants
    .btn
      input#creatures(type='checkbox' checked)
      label(for="creatures") Creatures
    .btn
      input#artifacts(type='checkbox' checked)
      label(for="artifacts") Artifacts
    .btn
      input#dna(type='checkbox' checked)
      label(for="dna") DNA Data
  section
    .btn
      input#oral(type='checkbox' checked)
      label(for="oral") Oral Archives
  section(v-if="this.$route.params.season")
    h3 Seasons
    nuxt-link.btn(
      v-for="season in ['summer', 'winter']"
      :to="`../${season}/`"
      :class="{current: $route.params.season === season}"
    ) {{ season }}
  section.elements
    h3 Auto Modes
    .btn Guided Tour
    .btn Random Tour
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
  font-size: 13px
  display: flex
  align-items: center
  input[type='checkbox']
    cursor: pointer
  label
    margin-left: 8px
    cursor: pointer
a.btn
  text-transform: capitalize
  &.current
    opacity: 0.5
    pointer-events: none
</style>

<script>
export default {}
</script>
