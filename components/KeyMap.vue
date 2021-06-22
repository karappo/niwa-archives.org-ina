<template lang="pug">
.container
  .btn.forward(@mousedown="mousedown('w', 87)")
    .key W
  .btn.backward(@mousedown="mousedown('s', 40)")
    .key S
  .btn.left(@mousedown="mousedown('a', 37)")
    .key A
  .btn.right(@mousedown="mousedown('d', 39)")
    .key D
  .btn.up(@mousedown="mousedown('r', 33)")
    .key R
  .btn.down(@mousedown="mousedown('f', 34)")
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
    mousedown(key, keyCode) {
      if (!(key && keyCode)) {
        return
      }
      this.currentKey = key
      this.currentKeyCode = keyCode
      this.canvas.dispatchEvent(
        new KeyboardEvent('keydown', {
          key,
          keyCode,
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
