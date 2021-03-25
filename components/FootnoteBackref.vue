<template lang="pug">
a.footnote-backref(v-scroll-to="{el: `#fnref${num}`, offset: 0}" href="#") ↩
</template>

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
