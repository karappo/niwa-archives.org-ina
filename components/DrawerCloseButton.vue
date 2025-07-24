<template lang="pug">
.close.button(title="Close" @click="$nuxt.$emit('closeDrawer')")
  IconClose
</template>

<style lang="sass" scoped>
.close
  height: 34px
  width: 34px
  font-size: 12px
  transition: color 0.2s
</style>

<script>
import IconClose from '~/assets/image/icon-close.svg?inline'
export default {
  components: {
    IconClose
  }
}
</script>
