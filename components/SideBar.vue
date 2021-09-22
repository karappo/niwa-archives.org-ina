<template lang="pug">
aside
  nuxt-link.menu(to="/") Back to Top
  h2 Outlines
  section.outlines
    .btn.disabled History
    ListLink(:listName="'Plans'" :dot="false") Plans
    .btn.disabled 3D Data
    SelectBox.variations(
      v-if="$variation($route)"
      :options="variations"
      :value.sync="variationIndex"
    )
  h2
    ListLinkCheckbox(:listName="'Annotations'" :dot="false")
  section.viewpoints
    h3
      ListLinkCheckbox(:listName="'Viewpoints'" :dot="false")
    ListLinkCheckbox(:listName="'Viewpoints/Still Images'")
    ListLinkCheckbox(:listName="'Viewpoints/Movies'")
  section.elements
    h3
      ListLinkCheckbox(:listName="'Elements'" :dot="false")
    ListLinkCheckbox(:listName="'Elements/Stones'")
    ListLinkCheckbox(:listName="'Elements/Plants'")
    ListLinkCheckbox(:listName="'Elements/Creatures'")
    ListLinkCheckbox(:listName="'Elements/Artifacts'")
    ListLinkCheckbox(:listName="'Elements/DNA Data'")
  section.orals
    ListLinkCheckbox(:listName="'Oral Archives'")
  h2 Tour Modes
  section.tours
    ListLink(v-if="guidedTourExists" :listName="'Guided Tour'" :dot="false")
    ListLink(:listName="'Ramble Tour'" :dot="false")
</template>

<style lang="sass" scoped>
aside
  background-color: #000
  color: #898989
  z-index: 1
  border-left: 1px solid #3C3C3C
.menu
  display: flex
  align-items: center
  padding: 20px 15px
  cursor: pointer
  font-size: 13px
  &:hover
    color: white
section
  padding: 20px
  border-top: 1px solid #3C3C3C
  &:last-child
    border-bottom: 1px solid #3C3C3C
h2 + section
  border-top: 0
.variations
  margin-top: 10px
  width: 130px
  /deep/ select
    text-transform: capitalize
h2
  background-color: #171717
  color: #898989
  font-size: 14px
  line-height: 2
  padding: 2px 20px
  margin: 0
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
  props: {
    guidedTourExists: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const variations = ['summer', 'winter', 'snow']
    let variationIndex = variations.indexOf(this.$variation(this.$route))
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
