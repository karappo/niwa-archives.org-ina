<template>
  <div class="selectBox">
    <select :value="value" @change="$emit('update:value', $event.target.value)">
      <option v-if="allowEmpty"></option>
      <option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label || item"
        :value="index"
      >
        {{ item.label || item }}
      </option>
    </select>
    <div class="icon">
      <TriangleArrow />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.selectBox
  height: 30px
  background: var(--button-bg-color)
  position: relative
  border-radius: 5px
  flex-shrink: 0
  transition: background-color 0.2s, color 0.2s
  &:hover
    background-color: #1A1A1A
    color: white
  select
    cursor: pointer
    -webkit-appearance: none
    appearance: none
    padding: 0
    outline: 0
    background: transparent
    border: 0
    width: 100%
    height: 100%
    color: #ADADAD
    font-size: 12px
    padding: 7px 50px 8px 10px
  .icon
    pointer-events: none
    position: absolute
    top: 0
    right: 0
    height: 100%
    width: 28px
    border-left: 1px solid black
    display: flex
    justify-content: center
    align-items: center
  &:hover
    select
      color: white
    .icon
      svg
        path
          fill: white
@media only screen and (max-width: 428px)
  .selectBox
    height: 38px
    select
      font-size: 15px
    .icon
      width: 38px
</style>

<script>
import TriangleArrow from '~/assets/image/SoundBar/triangle-arrow-down.svg?inline'
export default {
  components: {
    TriangleArrow
  },
  props: {
    value: {
      type: String,
      require: true,
      default: '0'
    },
    options: {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    allowEmpty: {
      type: Boolean,
      require: false,
      defatul: false
    }
  }
}
</script>
