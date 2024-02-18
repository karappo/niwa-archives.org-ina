<template lang="pug">
.container
  .pcLayout
    .key Q
    .key W
    .key E
    .key R
    .key T

    .btn.panLeft(@pointerdown="pointerdown('Q')" title="Pan Left")
    .btn.forward(@pointerdown="pointerdown('W')" title="Forward")
    .btn.panRight(@pointerdown="pointerdown('E')" title="Pan Right")
    .btn.up(@pointerdown="pointerdown('R')" title="Up")
    .btn.tiltUp(@pointerdown="pointerdown('T')" title="Tilt Up")

    .btn.left(@pointerdown="pointerdown('A')" title="Left")
    .btn.backward(@pointerdown="pointerdown('S')" title="Backward")
    .btn.right(@pointerdown="pointerdown('D')" title="Right")
    .btn.down(@pointerdown="pointerdown('F')" title="Down")
    .btn.tiltDown(@pointerdown="pointerdown('G')" title="Tilt Down")

    .key A
    .key S
    .key D
    .key F
    .key G
  .spLayout(v-if="spVisibility")
    .empty
    .btn.forward(@pointerdown="pointerdown('W')" title="Forward")
    .empty
    .gutter
    .btn.up(@pointerdown="pointerdown('R')" title="Up")

    .btn.left(@pointerdown="pointerdown('A')" title="Left")
    .btn.backward(@pointerdown="pointerdown('S')" title="Backward")
    .btn.right(@pointerdown="pointerdown('D')" title="Right")
    .gutter
    .btn.down(@pointerdown="pointerdown('F')" title="Down")
</template>

<style lang="sass" scoped>
// タブレットでもSPレイアウトを使用するため、閾値をPCレイアウトの閾値よりも大きく
$pc_sp_threshold: 1024px
@import ~/assets/style/general/pc-sp
.container
  margin: auto 20px 20px auto
  pointer-events: none
  .pcLayout,
  .spLayout
    > *
      pointer-events: auto
      // iOS Safariで長押しで選択されてしまわないようにする
      user-select: none
      -webkit-user-select: none
      -moz-user-select: none
  +sp
    margin: auto 22px 22px 22px
.pcLayout
  display: grid
  grid-template-columns: 21px 21px 21px 21px 21px
  grid-template-rows: 20px 20px 21px 21px
  column-gap: 5px
  row-gap: 5px
  +sp
    display: none
.spLayout
  display: none
  grid-template-columns: 62px 62px 62px auto 62px
  grid-template-rows: 62px 62px
  column-gap: 17px
  row-gap: 17px
  +sp
    display: grid !important
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
  +sp
    border-radius: 10px
    background-color: rgba(29, 29, 29, 0.80)
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
  +sp
    background-size: 29px auto
.backward
  background-image: url(~assets/image/arrow.svg)
  transform: rotate(180deg)
  +sp
    background-size: 29px auto
.left
  background-image: url(~assets/image/arrow.svg)
  transform: rotate(-90deg)
  +sp
    background-size: auto 29px
.right
  background-image: url(~assets/image/arrow.svg)
  transform: rotate(90deg)
  +sp
    background-size: auto 29px
.up
  background-image: url(~assets/image/arrow-outline.svg)
  +sp
    background-size: 29px auto
.down
  background-image: url(~assets/image/arrow-outline.svg)
  transform: rotate(180deg)
  +sp
    background-size: 29px auto
</style>

<script>
export default {
  props: {
    spVisibility: {
      type: Boolean,
      require: true,
      default: true
    }
  },
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
    document.addEventListener('pointerup', this.pointerup)
  },
  beforeDestroy() {
    document.removeEventListener('pointerup', this.pointerup)
  },
  methods: {
    pointerdown(key) {
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
    pointerup() {
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
