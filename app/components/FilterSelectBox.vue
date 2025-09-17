<template>
  <div class="selectBox">
    <select
      class="button"
      :value="value"
      @change="emit('update:value', $event.target.value)"
    >
      <option value="" selected>Filter</option>
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

<style scoped>
.selectBox {
  min-width: 156px;
  height: 40px;
  border: 0;
  margin-right: 15px;
  position: relative;
  flex-shrink: 0;
  &:hover {
    select {
      color: white;
    }
    .icon svg:deep(path) {
      fill: white;
    }
  }
  select {
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    padding: 0;
    outline: 0;
    border: 0;
    width: 100%;
    height: 100%;
    padding: 7px 50px 8px 14px;
  }
  .icon {
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 40px;
    border-left: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<script setup>
import TriangleArrow from '~/assets/image/filter-triangle-arrow-down.svg'

defineProps({
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
  }
})

const emit = defineEmits(['update:value'])
</script>
