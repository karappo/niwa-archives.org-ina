<template lang="pug">
.stopTourButton(@click="$store.commit('tourName', null)")
  | Stop Tour
  CloseIcon(v-if="icon")
</template>

<script>
import CloseIcon from '~/assets/image/close.svg?inline'
export default {
  components: {
    CloseIcon
  },
  props: {
    icon: {
      type: Boolean,
      default: false
    }
  }
}
</script>
