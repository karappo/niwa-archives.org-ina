<template lang="pug">
sup.footnote-ref
  a(:href="'#fn'+num" :id="'fnref'+num") {{ num }}
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
