<template lang="pug">
.annotationList
  ul.list(v-if="list.length")
    li(v-for="o in list" @click="$nuxt.$emit('showAnnotation', o.index)")
      Icon(v-if="icon" :category="o.category")
      .thumb(v-if="o.image" :style="`background-image: url(${o.image});`")
      .thumb(v-if="o.youtube" :style="`background-image: url(${o.youtube.thumbnailUrl()});`")
      span.title {{ o.title }}
      span.type(v-if="o.image") 
      span.type.youtube(v-else-if="o.youtube") 
  .empty(v-else) データがありません
</template>

<style lang="sass" scoped>
@import ~/assets/style/const
.list
  display: block
  padding: 0
  margin: 0
  li
    display: flex
    align-items: center
    padding: 0.2em 0
    border-top: 1px solid #555
    color: #898989
    cursor: pointer
    font-size: 15px
    &:hover
      color: white
    .icon
      margin-right: 0.5em
    .thumb
      width: 40px
      height: 30px
      border-radius: 5px
      background-size: cover
      background-position: center
      margin-right: 10px
    .title
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
    .type
      font-size: 18px
      margin-left: auto
      margin-right: 0
      font-family: 'Font Awesome 5 Pro-Light-300'
      &.youtube
        font-family: 'Font Awesome 5 Brands-Regular-400'
  li:last-child
    border-bottom: 1px solid #555
.empty
  color: #898989
</style>

<script>
export default {
  props: {
    list: {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    icon: {
      type: Boolean,
      require: false,
      default: false
    }
  }
}
</script>
