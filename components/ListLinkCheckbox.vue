<template lang="pug">
.linkCheck
  ListLink(:listName="listName" :dot="dot") {{ title }}
  input(type="checkbox" v-model="visibility")
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
  data() {
    return {
      visibility: this.$store.getters.annotationVisibilities[this.listName]
    }
  },
  computed: {
    title() {
      return this.$getTitle(this.listName)
    }
  },
  watch: {
    visibility(value) {
      const key = this.listName
      this.$store.commit('annotationVisibilities', { key, value })
    }
  }
}
</script>
