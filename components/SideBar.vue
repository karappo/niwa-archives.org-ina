<template lang="pug">
aside
  nuxt-link.backToTop(to="/")
    span Back to top
    MenuArrow
  h2 Outlines
  section.outlines
    ListLink(listName='History' icon='hyphen') History
    ListLink(listName='Plans' icon='hyphen') Plans
    ListLink(listName='3D Data' icon='hyphen') 3D Data
    SelectBox.variations(
      v-if="$variation($route)"
      :options="variations"
      :value.sync="variationIndex"
    )
  h2
    ListLinkCheckbox(listName='Annotations')
  section.viewpoints
    h3
      ListLinkCheckbox(listName='Viewpoints')
    ListLinkCheckbox(listName='Viewpoints/Still Images' icon='dot')
    ListLinkCheckbox(listName='Viewpoints/Movies' icon='dot')
  section.elements
    h3
      ListLinkCheckbox(listName='Elements')
    ListLinkCheckbox(listName='Elements/Stones' icon='dot')
    ListLinkCheckbox(listName='Elements/Plants' icon='dot')
    ListLinkCheckbox(listName='Elements/Creatures' icon='dot')
    ListLinkCheckbox(listName='Elements/Artifacts' icon='dot')
    ListLinkCheckbox(listName='Elements/DNA Data' icon='dot')
  section.orals
    ListLinkCheckbox(listName='Oral Archives' icon='dot')
  h2 Tour Modes
  section.tours
    ListLink(v-if="guidedTourExists" listName='Guided Tour' icon='tour')
    ListLink(listName='Ramble Tour' icon='tour')
</template>

<style lang="sass" scoped>
aside
  background-color: #000
  color: #898989
  z-index: 1
  border-left: 1px solid #3C3C3C
  overflow-y: auto
.backToTop
  display: flex
  align-items: center
  font-family: 'K2-v1-Heavy'
  font-weight: normal
  font-size: 15px
  padding: 18px 15px 18px 20px
  cursor: pointer
  span
    font-size: 15px
    font-family: 'K2-v1-Bold'
    color: #898989
    margin-right: auto
    transition: color 0.2s
  svg
    margin-left: auto
    g
      path
        transition: fill 0.2s
  &:hover
    span
      color: white
    svg
      g
        path
          fill: white
section
  padding: 11px 0
  border-top: 1px solid #2C2C2C
  &.outlines,
  &.tours
    padding: 15px 0
h2 + section
  border-top: 0
.variations
  margin-left: 34px
  margin-top: 10px
  width: 121px
  min-width: 0
  /deep/ select
    text-transform: capitalize
h2
  background-color: #171717
  color: #898989
  font-family: 'K2-v1-Heavy'
  font-weight: normal
  font-size: 14px
  line-height: 2
  letter-spacing: 0.01em
  padding-top: 2px
  padding-bottom: 2px
  padding-left: 20px
  margin: 0
  /deep/ .linkCheck .btn
    margin-left: 0
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
.btn + .btn,
.linkCheck + .linkCheck
  margin-top: 8px
.disabled
  &:hover
    text-decoration: line-through
    cursor: default
</style>

<script>
import MenuArrow from '~/assets/image/menu-arrow.svg?inline'
export default {
  components: {
    MenuArrow
  },
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
