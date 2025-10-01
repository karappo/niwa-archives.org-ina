<template>
  <div class="annotationList">
    <ul v-if="list.length" :class="{ thin }" class="list">
      <li
        v-for="(o, i) in list"
        :key="o.id"
        @click="handleClickAnnotationLink(o.id)"
      >
        <div
          v-if="!isOralArchives"
          class="thumb"
          :style="`background-image: url(${thumbURL(o)});`"
        ></div>
        <span v-if="isOralArchives" class="index">{{ i + 1 }}</span>
        <span v-else class="type">
          <TypeImage v-if="o.image"></TypeImage>
          <TypeVideo v-if="o.youtube"></TypeVideo>
        </span>
        <span class="title">{{ o.title }}</span>
        <div
          v-if="typeVisibility"
          class="dotWrap"
          :data-category="o.category"
          :title="o.category"
        >
          <div class="dot"></div>
        </div>
      </li>
    </ul>
    <div v-else class="empty">データがありません</div>
  </div>
</template>

<style scoped>
.list {
  display: block;
  padding: 0;
  margin: 0;
  li + li {
    margin-top: 3px;
  }
  &.thin {
    li {
      height: 45px;
    }
  }
  li {
    display: flex;
    padding: 0;
    margin: 0;
    background: #1a1a1a;
    color: #898989;
    cursor: pointer;
    font-size: 14px;
    height: 60px;
    transition: background 0.2s, color 0.2s;
    svg:deep(path) {
      transition: fill 0.2s;
    }
    &:hover {
      background-color: #171717;
      color: white;
      svg:deep(path) {
        fill: white;
      }
    }

    .dotWrap {
      margin-right: 0;
      margin-left: auto;
      display: flex;
      align-items: center;
      --bg-color: transparent;
      &[data-category='Viewpoints/Still Images'] {
        --bg-color: var(--color--still-images);
      }
      &[data-category='Viewpoints/Movies'] {
        --bg-color: var(--color--movies);
      }
      &[data-category='Elements/Stones'] {
        --bg-color: var(--color--stones);
      }
      &[data-category='Elements/Plants'] {
        --bg-color: var(--color--plants);
      }
      &[data-category='Elements/Creatures'] {
        --bg-color: var(--color--creatures);
      }
      &[data-category='Elements/Artifacts'] {
        --bg-color: var(--color--artifacts);
      }
      &[data-category='Elements/DNA Data'] {
        --bg-color: var(--color--dna-data);
      }
      &[data-category='Oral Archives'] {
        --bg-color: var(--color--oral-archives);
      }
      .dot {
        display: inline-block;
        width: 6px;
        height: 6px;
        margin: 0 20px;
        background-color: var(--bg-color);
        border-radius: 50%;
      }
    }

    .icon {
      margin-right: 0.5em;
    }
    .thumb {
      width: 90px;
      height: 60px;
      background-size: 180%; /* 上下に黒帯が入った正方形なのでceoverにするとNG */
      background-position: center;
      background-color: #333;
      flex-shrink: 0;
    }
    .index {
      margin-right: 0.75em;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .title {
      flex-shrink: 10;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      align-items: center;
    }
    .type {
      flex-shrink: 0;
      width: 46px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.empty {
  color: #898989;
}
</style>

<script setup>
import TypeImage from '~/assets/image/type-image.svg'
import TypeVideo from '~/assets/image/type-video.svg'
import { useMainStore } from '~/stores/main'
import { useEventBus } from '~/composables/useEventBus'

const props = defineProps({
  list: {
    type: Array,
    require: true,
    default() {
      return []
    }
  },
  typeVisibility: {
    type: Boolean,
    default: false
  },
  thin: {
    type: Boolean,
    default: false
  }
})

// Store
const store = useMainStore()

// EventBus
const eventBus = useEventBus()

// Functions
const handleClickAnnotationLink = (id) => {
  eventBus.emit('clickAnnotationLink', id)
}

// Computed properties
const isOralArchives = computed(() => store.getPageName === 'Oral Archives')

// Methods
function thumbURL(o) {
  if (o.image) {
    return o.image
  } else if (o.youtube) {
    return o.youtube.thumbnailUrl()
  } else {
    return ''
  }
}
</script>
