<template lang="pug">
aside
  .toggle Menu
  section.outlines
    h3 Outlines
    .btn.disabled History
    .btn.disabled Plans
    .btn.disabled 3D Data
  section.viewpoints
    h3.btn(@click="$emit('selectList', 'Viewpoints')" :class="{current: selectedListCategory === 'Viewpoints'}") Viewpoints
    .btn(@click="$emit('selectList', 'Viewpoints/Photos')" :class="{current: selectedListCategory === 'Viewpoints/Photos'}") Photos
    .btn(@click="$emit('selectList', 'Viewpoints/Movies')" :class="{current: selectedListCategory === 'Viewpoints/Movies'}") Movies
  section.elements
    h3.btn(@click="$emit('selectList', 'Elements')" :class="{current: selectedListCategory === 'Elements'}") Elements
    .btn(@click="$emit('selectList', 'Elements/Stones')" :class="{current: selectedListCategory === 'Elements/Stones'}") Stones
    .btn(@click="$emit('selectList', 'Elements/Plants')" :class="{current: selectedListCategory === 'Elements/Plants'}") Plants
    .btn(@click="$emit('selectList', 'Elements/Creatures')" :class="{current: selectedListCategory === 'Elements/Creatures'}") Creatures
    .btn(@click="$emit('selectList', 'Elements/Artifacts')" :class="{current: selectedListCategory === 'Elements/Artifacts'}") Artifacts
    .btn(@click="$emit('selectList', 'Elements/DNA Data')" :class="{current: selectedListCategory === 'Elements/DNA Data'}") DNA Data
  section
    .btn(@click="$emit('selectList', 'Oral Archives')" :class="{current: selectedListCategory === 'Oral Archives'}") Oral Archives
  section(v-if="this.$route.params.season")
    h3 Seasons
    .btn(
      v-for="season in [{label: 'Summer', alias: 'summer'}, {label: 'Winter', alias: 'winter'}, {label: 'Winter (snowing)', alias: 'winter-snow'}]"
      :key="season.alias"
      @click="goTo(`../${season.alias}/`)"
      :class="{current: $route.params.season === season.alias}"
    ) {{ season.label }}
  section.elements
    h3 Auto Modes
    .btn.disabled Guided Tour
    .btn.disabled Ramble Tour
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
  &:hover
    color: rgba(255,255,255,0.8)
  &.current
    color: white
    pointer-events: none
  input[type='checkbox']
    cursor: pointer
  label
    margin-left: 8px
    cursor: pointer
.disabled
  &:hover
    text-decoration: line-through
    cursor: default
</style>

<script>
export default {
  props: {
    selectedListCategory: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    goTo(path) {
      this.$emit('saveCameraInfo')
      this.$router.push(path)
    }
  }
}
</script>
