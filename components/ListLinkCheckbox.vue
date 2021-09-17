<template lang="pug">
.linkCheck
  ListLink(:listName="listName" :dot="dot") {{ title }}
  input(type="checkbox")
</template>

<style lang="sass" scoped>
.linkCheck
  display: flex
  align-items: center
  justify-content: space-between
</style>

<script>
export default {
  props: {
    listName: {
      type: String,
      required: true,
      default: ''
    },
    dot: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    title() {
      return this.$getTitle(this.listName)
    }
  }
}
</script>
