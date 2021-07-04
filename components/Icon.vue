<template lang="pug">
span.icon(v-if="icon" :data-category="category") {{ icon }}
</template>

<style lang="sass" scoped>
article
  background-color: #111
  color: white
  width: calc(100% - 30px)
  min-height: calc(100% - 30px)
  padding: 15px
.close
  float: right
  cursor: pointer
  font-size: 12px
  color: #898989
  transition: color 0.2s
  &:hover
    color: white
h1
  margin: 0
  margin-bottom: 15px
  display: flex
  align-items: center
  .icon
    font-size: 50px
    margin-right: 0.5em
.description
  font-size: 12px
  line-height: 2
  margin-bottom: 15px
  white-space: pre-wrap // nl2br
.image
  width: 100%
  height: auto
%button
  background-color: #333
  color: #898989
  display: flex
  justify-content: center
  align-items: center
  border-radius: 5px
  cursor: pointer
  &:hover
    background-color: #1A1A1A
    color: white
    transition: background-color 0.2s, color 0.2s
.download
  @extend %button
  padding: 20px
.youtube,
.movie
  position: relative
  padding-top: calc(225 / 400 * 100%) // ここでアスペクト比（height / width）を設定
  overflow: hidden
  max-width: 100%
  height: auto
  iframe
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
.tags
  font-size: 12px
  line-height: 2
  ul
    margin: 0
  li
    text-decoration: underline
    cursor: pointer
    &:hover
      opacity: 0.5
.dateTime
  font-size: 12px
  margin-top: 50px
footer
  display: flex
  align-items: center
  margin-top: 15px
.prev,
.next
  @extend %button
  padding: 10px
  width: calc((100% - 15px)/2)
.next
  margin-left: 15px
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
