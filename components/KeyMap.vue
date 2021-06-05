<template lang="pug">
.container
  .btn.forward(@mousedown="mousedown('w', 87)" @mouseup="mouseup('w', 87)")
    .key W
  .btn.backward(@mousedown="mousedown('s', 40)" @mouseup="mouseup('s', 40)")
    .key S
  .btn.left(@mousedown="mousedown('a', 37)" @mouseup="mouseup('a', 37)")
    .key A
  .btn.right(@mousedown="mousedown('d', 39)" @mouseup="mouseup('d', 39)")
    .key D
  .btn.up(@mousedown="mousedown('r', 33)" @mouseup="mouseup('r', 33)")
    .key R
  .btn.down(@mousedown="mousedown('f', 34)" @mouseup="mouseup('f', 34)")
    .key F
</template>

<style lang="sass" scoped>
.container
  display: grid
  grid-template-columns: 20px 20px 20px 20px
  grid-template-rows: 20px 20px
  column-gap: 5px
  row-gap: 5px
  grid-template-areas: '. key . key' 'key key key key'
  position: absolute
  bottom: 20px
  right: 20px
  z-index: 10
.btn
  background-color: black
  border-radius: 3px
  overflow: hidden
  color: white
  cursor: pointer
  position: relative
  &:before
    position: absolute
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    content: url(~assets/image/arrow.svg)
  &:hover
    .key
      opacity: 1
.key
  position: absolute
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  font-size: 13px
  line-height: 1
  color: #666
  font-weight: bold
  background-color: black
  opacity: 0
  transition: opacity 0.2s
  margin-top: 1px // ちょっとY軸方向のずれがあったので調整
.forward
  grid-column-start: 2
  grid-column-end: 3
  grid-row-start: 1
  grid-row-end: 2
  &:before
    content: url(~assets/image/arrow.svg)
    transform: translateY(-1px)
.backward
  grid-column-start: 2
  grid-column-end: 3
  grid-row-start: 2
  grid-row-end: 3
  &:before
    content: url(~assets/image/arrow.svg)
    transform: translateY(1px) rotate(180deg)
.left
  grid-column-start: 1
  grid-column-end: 2
  grid-row-start: 2
  grid-row-end: 3
  &:before
    content: url(~assets/image/arrow.svg)
    transform: translateX(-1px) rotate(-90deg)
.right
  grid-column-start: 3
  grid-column-end: 4
  grid-row-start: 2
  grid-row-end: 3
  &:before
    content: url(~assets/image/arrow.svg)
    transform: translateX(1px) rotate(90deg)
.up
  grid-column-start: 4
  grid-column-end: 5
  grid-row-start: 1
  grid-row-end: 2
  &:before
    content: url(~assets/image/arrow-outline.svg)
    transform: translateY(-1px)
.down
  grid-column-start: 4
  grid-column-end: 5
  grid-row-start: 2
  grid-row-end: 3
  &:before
    content: url(~assets/image/arrow-outline.svg)
    transform: translateY(1px) rotate(180deg)
</style>

<script>
export default {
  computed: {
    canvas() {
      // eslint-disable-next-line
      return document.body.querySelector('#potree_render_area canvas:not(.ol-unselectable)')
    }
  },
  methods: {
    mousedown(key, keyCode) {
      this.canvas.dispatchEvent(
        new KeyboardEvent('keydown', {
          key,
          keyCode,
          code: `Key${key.toUpperCase()}`
        })
      )
    },
    mouseup(key, keyCode) {
      this.canvas.dispatchEvent(
        new KeyboardEvent('keyup', {
          key,
          keyCode,
          code: `Key${key.toUpperCase()}`
        })
      )
    }
  }
}
</script>
