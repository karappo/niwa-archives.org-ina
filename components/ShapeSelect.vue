<template lang="pug">
select(@change="updateShape")
  option(value='SQUARE') SQUARE
  option(value='CIRCLE') CIRCLE
  option(value='PARABOLOID') PARABOLOID
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      shape: (state) => state.obj.shape
    })
  },
  methods: {
    updateShape(e) {
      if (Potree) {
        const val = Potree.PointShape[e.target.value]
        this.$store.commit('shape', val)
        this.$nuxt.$emit('setting-updated')
      } else {
        console.error('Potree is not defined...')
      }
    }
  }
}
</script>
