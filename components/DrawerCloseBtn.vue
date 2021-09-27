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
  color: #898989
  transition: color 0.2s
  margin-left: 10px
  margin-right: 0
  &:hover
    color: white
</style>

<script>
import CloseBtn from '~/assets/image/close.svg?inline'
export default {
  components: {
    CloseBtn
  }
}
</script>
