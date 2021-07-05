<template lang="pug">
aside
  .toggle Menu
  section.outlines
    h3 Outlines
    .btn.disabled History
    .btn.disabled Plans
    .btn.disabled 3D Data
  section.viewpoints
    h3.btn(@click="$nuxt.$emit('selectList', 'Viewpoints')" :class="{current: $store.state.selectedListCategory === 'Viewpoints'}") Viewpoints
    SideBarLink(:category="'Viewpoints/Photos'")
    SideBarLink(:category="'Viewpoints/Movies'")
  section.elements
    h3.btn(@click="$nuxt.$emit('selectList', 'Elements')" :class="{current: $store.state.selectedListCategory === 'Elements'}") Elements
    SideBarLink(:category="'Elements/Stones'")
    SideBarLink(:category="'Elements/Plants'")
    SideBarLink(:category="'Elements/Creatures'")
    SideBarLink(:category="'Elements/Artifacts'")
    SideBarLink(:category="'Elements/DNA Data'")
  section
    SideBarLink(:category="'Oral Archives'")
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
.disabled
  &:hover
    text-decoration: line-through
    cursor: default
</style>

<script>
export default {
  methods: {
    goTo(path) {
      this.$emit('saveCameraInfo')
      this.$router.push(path)
    }
  }
}
</script>
