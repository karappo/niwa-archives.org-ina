<template lang="pug">
aside
  nuxt-link.menu(to="/") Back to Top
  section.outlines
    h3 Outlines
    .btn.disabled History
    SideBarLink(:category="'Plans'" :dot="false") Plans
    .btn.disabled 3D Data
    SelectBox.variations(
      v-if="$variation($route)"
      :options="variations"
      :value.sync="variationIndex"
    )
  section.viewpoints
    h3.btn(@click="$nuxt.$emit('selectCategory', 'Viewpoints')" :class="{current: $store.getters.selectedCategory === 'Viewpoints'}") Viewpoints
    SideBarLink(:category="'Viewpoints/Photos'")
    SideBarLink(:category="'Viewpoints/Movies'")
  section.elements
    h3.btn(@click="$nuxt.$emit('selectCategory', 'Elements')" :class="{current: $store.getters.selectedCategory === 'Elements'}") Elements
    SideBarLink(:category="'Elements/Stones'")
    SideBarLink(:category="'Elements/Plants'")
    SideBarLink(:category="'Elements/Creatures'")
    SideBarLink(:category="'Elements/Artifacts'")
    SideBarLink(:category="'Elements/DNA Data'")
  section.orals
    SideBarLink(:category="'Oral Archives'")
  section.autos
    h3 Tour Modes
    .btn(@click="$nuxt.$emit('selectGuidedTour')") Guided Tour
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
.variations
  margin-top: 10px
  width: 130px
  /deep/ select
    text-transform: capitalize
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
  data() {
    const variations = ['summer', 'winter', 'snow']
    let variationIndex = variations.indexOf(this.$variation(this.$route))
    console.log('variationIndex', variationIndex, this.$variation(this.$route))
    variationIndex += '' // SelectBoxに渡す関係でvariationIndexはStringにしておく必要がある
    return {
      variations,
      variationIndex
    }
  },
  watch: {
    variationIndex(val) {
      this.$emit('saveCameraInfo') // TODO 機能していない？？
      const varStr = this.variations[parseInt(val, 10)].toLowerCase()
      this.$router.push(`../${this.$garden(this.$route)}-${varStr}/`)
    }
  }
}
</script>
