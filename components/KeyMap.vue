<template lang="pug">
.container
  .key Q
  .key W
  .key E
  .key R
  .key T

  .btn.panLeft(@mousedown="mousedown('Q')" title="Pan Left")
  .btn.forward(@mousedown="mousedown('W')" title="Forward")
  .btn.panRight(@mousedown="mousedown('E')" title="Pan Right")
  .btn.up(@mousedown="mousedown('R')" title="Up")
  .btn.tiltUp(@mousedown="mousedown('T')" title="Tilt Up")

  .btn.left(@mousedown="mousedown('A')" title="Left")
  .btn.backward(@mousedown="mousedown('S')" title="Backward")
  .btn.right(@mousedown="mousedown('D')" title="Right")
  .btn.down(@mousedown="mousedown('F')" title="Down")
  .btn.tiltDown(@mousedown="mousedown('G')" title="Tilt Down")

  .key A
  .key S
  .key D
  .key F
  .key G
</template>

<style lang="sass" scoped>
.container
  display: grid
  grid-template-columns: 21px 21px 21px 21px 21px
  grid-template-rows: 20px 20px 21px 21px
  column-gap: 5px
  row-gap: 5px
  grid-template-areas: 'key key key key key' 'key key key key key' 'key key key key key' 'key key key key key'
  margin: auto 20px 20px auto
.key,
.btn
  color: white
  position: relative
  display: flex
  justify-content: center
  align-items: center
  font-size: 12px
  font-family: 'K2-v1-Bold'
.key
  pointer-events: none
.btn
  cursor: pointer
  border-radius: 3px
  background-color: black
  background-repeat: no-repeat
  background-position: center
  transition: background-color 0.2s
  &:hover
    background-color: #333
.panLeft
  background-image: url(~assets/image/pan.svg)
.panRight
  background-image: url(~assets/image/pan.svg)
  transform: rotate(180deg)
.tiltUp
  background-image: url(~assets/image/pan.svg)
  transform: rotate(90deg)
.tiltDown
  background-image: url(~assets/image/pan.svg)
  transform: rotate(-90deg)
.forward
  background-image: url(~assets/image/arrow.svg)
.backward
  background-image: url(~assets/image/arrow.svg)
  transform: rotate(180deg)
.left
  background-image: url(~assets/image/arrow.svg)
  transform: rotate(-90deg)
.right
  background-image: url(~assets/image/arrow.svg)
  transform: rotate(90deg)
.up
  background-image: url(~assets/image/arrow-outline.svg)
.down
  background-image: url(~assets/image/arrow-outline.svg)
  transform: rotate(180deg)
</style>

<script>
export default {
  data() {
    return {
      currentKey: null,
      currentKeyCode: null
    }
  },
  computed: {
    canvas() {
      // eslint-disable-next-line
      return document.body.querySelector('#potree_render_area canvas:not(.ol-unselectable)')
    }
  },
  mounted() {
    document.addEventListener('mouseup', this.mouseup)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.mouseup)
  },
  methods: {
    mousedown(key) {
      if (!key) {
        return
      }
      this.currentKey = key
      this.currentKeyCode = key.charCodeAt(0)
      this.canvas.dispatchEvent(
        new KeyboardEvent('keydown', {
          key,
          keyCode: this.currentKeyCode,
          code: `Key${key.toUpperCase()}`
        })
      )
    },
    mouseup() {
      if (!(this.currentKey && this.currentKeyCode)) {
        return
      }
      this.canvas.dispatchEvent(
        new KeyboardEvent('keyup', {
          key: this.currentKey,
          keyCode: this.currentKeyCode,
          code: `Key${this.currentKey.toUpperCase()}`
        })
      )
    }
  }
}
</script>
