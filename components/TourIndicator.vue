<template lang="pug">
.tourModeIndicator
  template(v-if="this.$store.getters.tourName==='Guided Tour'")
    | {{ label }} - {{ denominator }}/{{ numerator }}
  template(v-else)
    | {{ label }}
</template>

<style lang="sass" scoped>
@import ~/assets/style/mixins
@keyframes flash
  0%
    opacity: 1
  100%
    opacity: 0.25
.tourModeIndicator
  position: absolute
  top: 25px
  right: 25px
  font-family: 'K2-v1-Bold'
  font-size: 15px
  color: white
  display: flex
  align-items: center
  &:after
    content: ''
    display: inline-block
    width: 18px
    height: 18px
    background-color: #00FDAF
    border-radius: 50%
    margin-left: 13px
    animation: flash 0.5s ease-in-out infinite
    animation-direction: alternate
    +sp
      margin-left: 0
      margin-right: 10px
  +sp
    flex-direction: row-reverse
    top: auto
    right: auto
    left: 15px
    bottom: 10px
</style>

<script>
export default {
  props: {
    numerator: {
      type: Number,
      required: true
    },
    denominator: {
      type: Number,
      required: true
    }
  },
  computed: {
    label() {
      return this.$store.getters.tourName.replace(/ with(out)? Annotations/, '')
    }
  }
}
</script>
