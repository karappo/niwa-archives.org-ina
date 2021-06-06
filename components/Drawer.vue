<template lang="pug">
article
  .close(@click="$emit('close')") Close
  h1 {{ data.title }}
  img.image(v-if="data.image" :src="data.image")
  a(v-if="data.pdf" :href="data.pdf" target='_blank') 【PDFリンク】
  iframe(
    width="560"
    height="315"
    :src="`https://www.youtube.com/embed/${data.youtube}`"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  )

</template>

<style lang="sass" scoped>
article
  background-color: rgba(0,0,0,0.8)
  color: white
  width: 430px
  height: 100%
.image
  width: 100%
  height: auto
.close
  float: right
  cursor: pointer
  font-size: 13px
  padding: 10px
</style>

<script>
export default {
  props: {
    data: {
      type: Object,
      require: true
    }
  }
}
</script>
