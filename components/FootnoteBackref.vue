<template lang="pug">
a.footnote-backref(v-scroll-to="{el: `#fnref${num}`, offset: 0}" href="#")
  img.arrow(src="~/assets/image/back-arrow.svg")
</template>

<style lang="sass" scoped>
.arrow
  display: inline-block
  height: 0.7em
  width: auto
  margin-left: 0.5em
  vertical-align: middle
</style>

<script>
export default {
  props: {
    num: {
      type: String,
      required: true
    }
  }
}
</script>
