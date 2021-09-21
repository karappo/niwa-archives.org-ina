<template lang="pug">
.linkCheck
  ListLink(:listName="listName" :dot="dot") {{ title }}
  input(type="checkbox" v-model="visibility" :disabled="disabled")
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
    },
    disabled() {
      if (this.listName === 'Annotations') {
        return false
      } else if (!this.$store.getters.annotationVisibilities.Annotations) {
        return true
      } else if (this.listName.includes('/')) {
        return !this.$store.getters.annotationVisibilities[
          this.listName.split('/')[0] // parent
        ]
      }
      return false
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
