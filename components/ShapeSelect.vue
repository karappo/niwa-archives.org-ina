<template lang="pug">
select(@change="updateShape")
  option(v-for="(v, k) in options" :value="v" :selected="$store.state.shape === v") {{ k }}
</template>

<script>
export default {
  data() {
    return {
      options: Potree.PointShape
    }
  },
  methods: {
    updateShape(e) {
      if (Potree) {
        this.$store.commit('shape', e.target.value)
        this.$nuxt.$emit('settingUpdated')
      } else {
        console.error('Potree is not defined...')
      }
    }
  }
}
</script>
