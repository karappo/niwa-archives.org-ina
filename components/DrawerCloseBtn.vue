<template lang="pug">
.close(title="Close" @click="$nuxt.$emit('closeDrawer')")
  CloseBtn
</template>

<style lang="sass" scoped>
@import ~/assets/style/const
.close
  @extend %button
  height: 34px
  width: 34px
  font-size: 12px
  transition: color 0.2s
</style>

<script>
import CloseBtn from '~/assets/image/close.svg?inline'
export default {
  components: {
    CloseBtn
  }
}
</script>
