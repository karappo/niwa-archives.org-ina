<template lang="pug">
select(@change="updateShape")
  option(v-for="(v, k) in options" :value="v" :selected="$store.state.shape === v") {{ k }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      options: Potree.PointShape
    }
  },
  computed: {
    ...mapState({
      shape: (state) => state.obj.shape
    })
  },
  methods: {
    updateShape(e) {
      if (Potree) {
        this.$store.commit('shape', e.target.value)
        this.$nuxt.$emit('setting-updated')
      } else {
        console.error('Potree is not defined...')
      }
    }
  }
}
</script>
