<template lang="pug">
aside
  nuxt-link.menu(to="/") Back to Top
  section.outlines
    h3 Outlines
    .btn.disabled History
    SideBarLink(:category="'Plans'" :dot="false") Plans
    .btn.disabled 3D Data
  section.viewpoints
    h3.btn(@click="$nuxt.$emit('selectList', 'Viewpoints')" :class="{current: $store.getters.selectedCategory === 'Viewpoints'}") Viewpoints
    SideBarLink(:category="'Viewpoints/Photos'")
    SideBarLink(:category="'Viewpoints/Movies'")
  section.elements
    h3.btn(@click="$nuxt.$emit('selectList', 'Elements')" :class="{current: $store.getters.selectedCategory === 'Elements'}") Elements
    SideBarLink(:category="'Elements/Stones'")
    SideBarLink(:category="'Elements/Plants'")
    SideBarLink(:category="'Elements/Creatures'")
    SideBarLink(:category="'Elements/Artifacts'")
    SideBarLink(:category="'Elements/DNA Data'")
  section.orals
    SideBarLink(:category="'Oral Archives'")
  section.seasons(v-if="$variation($route)")
    h3 Seasons
    .btn(
      v-for="season in ['summer', 'winter', 'snow']"
      :key="season"
      @click="goTo(`../${$garden($route)}-${season}/`)"
      :class="{current: $variation($route) === season}"
    ) {{ capitalCase(season) }}
  section.autos
    h3 Tour Modes
    .btn.disabled Guided Tour
    .btn.disabled Ramble Tour
</template>

<style lang="sass" scoped>
aside
  background-color: #1A1A1A
  color: #898989
  z-index: 1
.menu
  display: flex
  align-items: center
  padding: 20px 15px
  cursor: pointer
  font-size: 13px
  &:hover
    color: white
section
  padding: 20px 15px
  border-top: 1px solid #3C3C3C
  &:last-child
    border-bottom: 1px solid #3C3C3C
  &.outlines,
  &.viewpoints,
  &.autos
    border-top: 1px solid #3C3C3C
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
import { capitalCase } from 'change-case'
export default {
  methods: {
    goTo(path) {
      this.$emit('saveCameraInfo') // TODO 機能していない？？
      this.$router.push(path)
    },
    capitalCase(str) {
      return capitalCase(str)
    }
  }
}
</script>
