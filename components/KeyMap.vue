<template lang="pug">
.container
  .pcLayout
    .key Q
    .key W
    .key E
    .key R
    .key T

    .btn.panLeft(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="Q"
      title="Pan Left"
    )
    .btn.forward(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="W"
      title="Forward"
    )
    .btn.panRight(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="E"
      title="Pan Right"
    )
    .btn.up(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="R"
      title="Up"
    )
    .btn.tiltUp(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="T"
      title="Tilt Up"
    )

    .btn.left(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="A"
      title="Left"
    )
    .btn.backward(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="S"
      title="Backward"
    )
    .btn.right(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="D"
      title="Right"
    )
    .btn.down(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="F"
      title="Down"
    )
    .btn.tiltDown(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="G"
      title="Tilt Down"
    )

    .key A
    .key S
    .key D
    .key F
    .key G
  .spLayout(v-if="spVisibility")
    .empty
    .btn.forward(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="W"
      title="Forward"
    )
    .empty
    .gutter
    .btn.up(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="R"
      title="Up"
    )

    .btn.left(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="A"
      title="Left"
    )
    .btn.backward(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="S"
      title="Backward"
    )
    .btn.right(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="D"
      title="Right"
    )
    .gutter
    .btn.down(
      @pointerdown="start"
      @pointerup="end"
      @pointerleave="end"
      data-key="F"
      title="Down"
    )
</template>

<style lang="sass" scoped>
.container
  margin: auto 20px 20px auto
  pointer-events: none
  .pcLayout,
  .spLayout
    > *
      pointer-events: auto
      // iOS Safari / Chrome で長押しで選択されたり、コンテキストメニューが出てしまわないようにする
      -webkit-touch-callout: none
      -webkit-user-select: none
      -khtml-user-select: none
      -moz-user-select: none
      -ms-user-select: none
      user-select: none

.pcLayout
  display: grid
  grid-template-columns: 21px 21px 21px 21px 21px
  grid-template-rows: 20px 20px 21px 21px
  column-gap: 5px
  row-gap: 5px
.spLayout
  display: none
  grid-template-columns: 62px 62px 62px auto 62px
  grid-template-rows: 62px 62px
  column-gap: 17px
  row-gap: 17px
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
  touch-action: none // ピンチインアウトを無効化
  &.touched
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

// タブレットでもSPレイアウトを使用するため、閾値をPCレイアウトの閾値よりも大きく

@media (max-width: 1024px) and (max-height: 380px)
  .container
    margin-right: calc(22px + var(--sp-menu-width) + 11px) !important

@media only screen and (min-width: 1025px)
  .btn:hover
    background-color: #333

@media only screen and (max-width: 1024px)
  .container
    margin: auto 22px 22px 22px
  .pcLayout
    display: none
  .spLayout
    display: grid !important
  .btn
    border-radius: 10px
    background-color: rgba(29, 29, 29, 0.80)
  .forward
    background-size: 29px auto
  .backward
    background-size: 29px auto
  .left
    background-size: auto 29px
  .right
    background-size: auto 29px
  .up
    background-size: 29px auto
  .down
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
  methods: {
    start(e) {
      e.target.classList.add('touched')
      const key = e.target.dataset.key
      if (!key) return

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
    end(e) {
      e.target.classList.remove('touched')
      const key = e.target.dataset.key
      if (!key) return

      const keyCode = key.charCodeAt(0)
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
