<template lang="pug">
article
  .close(@click="$emit('close')") Close
  h1 {{ data.title }}
  img.image(v-if="data.image" :src="data.image")
  .description {{ data.description }}
  a.download(v-if="data.pdf" :href="data.pdf" target='_blank') PDFをみる
  iframe(
    v-if="data.youtube"
    width="400"
    height="225"
    :src="data.youtube.embedUrl()"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  )

</template>

<style lang="sass" scoped>
article
  background-color: rgba(0,0,0,0.8)
  color: white
  width: 400px
  height: calc(100% - 30px)
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
  font-size: 15px
  margin: 0
  margin-bottom: 15px
.description
  font-size: 12px
  line-height: 2
  margin-bottom: 15px
  white-space: pre-wrap // nl2br
.image
  width: 100%
  height: auto
.download
  padding: 20px
  background-color: #333
  color: #898989
  display: flex
  justify-content: center
  align-items: center
  border-radius: 5px
  &:hover
    background-color: #1A1A1A
    color: white
    transition: background-color 0.2s, color 0.2s
</style>

<script>
export default {
  props: {
    data: {
      type: Object,
      require: true,
      default: null
    }
  }
}
</script>
