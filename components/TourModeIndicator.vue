<template lang="pug">
.tourModeIndicator(v-if="$store.getters.tourName") {{ $store.getters.tourName }}
</template>

<style lang="sass" scoped>
@keyframes flash
  0%
    opacity: 1
  100%
    opacity: 0.6
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
    animation: flash 0.5s linear infinite
    animation-direction: alternate
</style>
