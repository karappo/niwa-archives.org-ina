<template lang="pug">
nuxt/
</template>

<script>
export default {
  mounted() {
    window.addEventListener('resize', this.setVH)
    this.setVH()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setVH)
  },
  methods: {
    setVH() {
      const vh = window.innerHeight
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  }
}
</script>
