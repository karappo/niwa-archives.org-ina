<template>
  <div
    v-if="list"
    :class="{
      visible,
      border: !mainStore.tourName
    }"
    :data-sp-visibility="spVisibility"
    class="soundBar"
  >
    <audio ref="player"></audio>
    <div class="toggleBtn" @click="visible = !visible">
      <span class="text">Sounds</span>
      <TriangleArrow class="icon"></TriangleArrow>
    </div>
    <div class="spHeader">
      <span class="text">Sounds</span>
      <div class="closeBtn" @click="emit('spClose')">
        <SpClose></SpClose>
      </div>
    </div>
    <div class="content">
      <SelectBox v-model="index" :options="list" class="selectBox"></SelectBox>
      <div class="controlsAndMovies">
        <div class="controls">
          <div class="playPauseBtn" @click="togglePlay()">
            <span v-if="paused"><Play /></span>
            <span v-else><Pause /></span>
          </div>
          <div
            ref="seekBarHitArea"
            class="seekBarHitArea"
            @click.stop="seekBarClick"
          >
            <div ref="return" class="return"></div>
            <div class="seekBar">
              <div class="progress" :style="progressStyle()"></div>
            </div>
          </div>
          <div class="time">{{ currentTime }} / {{ totalTime }}</div>
        </div>
        <div
          v-if="data.movieId || data.ambisonicsUrl"
          class="movieAndAmbisonics"
        >
          <nuxt-link
            v-if="data.movieId"
            to="TODO"
            :class="{ disabled: mainStore.tourName }"
            class="button link movie"
          >
            Movie
            <span class="icon"></span>
          </nuxt-link>
          <ExternalLink
            v-if="data.ambisonicsUrl"
            :href="data.ambisonicsUrl"
            :class="{ disabled: mainStore.tourName }"
            class="button link ambisonics"
          >
            Ambisonics
            <span class="icon"></span>
          </ExternalLink>
        </div>
      </div>
      <dl class="place">
        <dt>Place</dt>
        <dd>
          <template v-if="data.place">
            <a
              :class="{ disabled: mainStore.tourName }"
              @click="placeClick(data.place.annotation)"
            >
              {{ data.place.label }}
            </a>
          </template>
        </dd>
      </dl>
      <dl
        :class="{ empty: !(data.creatures && data.creatures.length) }"
        class="creatures"
      >
        <dt>Creatures</dt>
        <dd>
          <template v-if="data.creatures && data.creatures.length">
            <template v-for="(creature, i) in data.creatures">
              <a
                v-if="tags.includes(creature)"
                :key="`link-${i}`"
                :class="{ disabled: mainStore.tourName }"
                class="creature"
                @click="tagClick(creature)"
              >
                {{ tag }}
              </a>
              <span v-else :key="`span-${i}`" class="creature">
                {{ creature }}
              </span>
            </template>
          </template>
        </dd>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.soundBar {
  --background-color: black;
  background-color: var(--background-color);
  color: white;
  font-size: 12px;
  position: relative;
  width: 100%;
  font-family: 'K2-v1-Bold';
  margin-bottom: -100%;
  transition: margin 0.8s;
  @media only screen and (max-width: 749px) {
    font-size: 15px;
    .selectBox {
      order: 1;
    }
    .controlsAndMovies {
      order: 3;
      margin-top: 15px;
      display: block;
      .movieAndAmbisonics {
        margin-top: 30px;
        margin-left: 0; /* 中のボタンのマージンを打ち消す */
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 11px;
        .link {
          margin-left: 0;
          width: auto;
          font-size: 15px;
        }
      }
    }
    .place {
      order: 2;
    }
    .creatures {
      order: 4;
      &.empty {
        display: none;
      }
    }
  }
  /* border-rightだと表示領域外になってしまうため、疑似要素で… */
  &.border:after {
    position: absolute;
    top: 0;
    right: 0;
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background-color: #3c3c3c;
  }
  @media only screen and (max-width: 749px) {
    display: none;
  }
  &[data-sp-visibility='true'] {
    @media only screen and (max-width: 749px) {
      display: block;
    }
  }
  &.visible {
    margin-bottom: -44px;
    &:hover {
      margin-bottom: 0;
      transition: margin 0.08s;
    }
    @media only screen and (max-width: 749px) {
      margin-bottom: 0;
    }
    .toggleBtn {
      .icon {
        transform: rotate(0deg);
      }
    }
  }
}
.spHeader {
  display: none;
  position: relative;
  @media only screen and (max-width: 749px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 20px;
    color: #898989;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 0;
  }
}
.closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding: 0 26px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toggleBtn {
  --height: 24px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 188px;
  height: var(--height);
  background-color: var(--background-color);
  top: calc(var(--height) * -1);
  left: 24px;
  border-radius: 5px 5px 0 0;
  font-size: 12px;
  color: #898989;
  cursor: pointer;
  z-index: 10;
  justify-content: space-between;
  @media only screen and (max-width: 749px) {
    display: none;
  }
  span.text {
    margin-left: 10px;
    margin-right: auto;
  }
  .icon {
    margin-left: auto;
    margin-right: 10px;
    transform: rotate(180deg);
    &:hover {
      color: white;
    }
  }
}
.content {
  display: grid;
  padding: 15px 18px 15px 24px;
  grid-template-columns: 188px 1fr;
  grid-template-rows: repeat(2, 1fr);
  row-gap: 15px;
  column-gap: 20px;
  @media only screen and (max-width: 749px) {
    display: flex;
    flex-direction: column;
    padding: 0 20px 20px;
  }
}
.controlsAndMovies {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
.controls {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
.movieAndAmbisonics {
  display: flex;
  align-items: center;
}
.playPauseBtn {
  margin-left: -20px;
  width: 77px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
  &:hover {
    svg {
      &:deep(rect),
      &:deep(path) {
        fill: white;
      }
    }
  }
}
.seekBarHitArea {
  cursor: pointer;
  width: 100%;
  height: 100%;
  margin-right: 12px;
  display: flex;
  align-items: center;
  position: relative;
  .return {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 4px;
    z-index: 2;
  }
  .seekBar {
    width: 100%;
    height: 4px;
    background-color: #272727;
    z-index: 1;
    .progress {
      height: 100%;
      max-width: 100%;
      background-color: #3e3e3e;
      background-color: white;
    }
  }
}
.time {
  min-width: 100px;
  text-align: right;
  white-space: nowrap;
  color: #898989;
  flex-shrink: 0;
  @media only screen and (max-width: 749px) {
    letter-spacing: 0;
  }
}
.link {
  margin-left: 8px;
  border-radius: 5px;
  white-space: nowrap;
  width: 90px;
  flex-shrink: 0;
  padding: 4px 10px;
  font-size: 12px;
  display: flex;
  .icon {
    margin-left: auto;
    margin-right: 0;
    font-family: 'Font Awesome 5 Pro-Solid-900';
  }
}
.time + .link {
  margin-left: 12px;
}
dl {
  color: #898989;
  background-color: var(--textbox-bg-color);
  border-radius: 5px;
  display: flex;
  align-items: center;
  &:first-child {
    width: 188px;
    flex-shrink: 0;
  }
  &:nth-child(2) {
    width: 100%;
  }
  dt,
  dd {
    padding-top: 6px;
    padding-bottom: 6px;
  }
  dt {
    padding-left: 12px;
    padding-right: 12px;
    font-family: 'K2-v1-Bold';
    font-size: 12px;
    border-right: 1px solid var(--background-color);
    @media only screen and (max-width: 749px) {
      font-size: 15px;
    }
  }
  dd {
    padding-left: 12px;
    padding-right: 12px;
    font-size: 11px;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    @media only screen and (max-width: 749px) {
      font-size: 14px;
      font-weight: bold;
    }
    a.disabled {
      opacity: 1;
    }
    a {
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
    .creature + .creature {
      margin-left: 1.5em;
    }
  }
}
.creatures {
  @media only screen and (max-width: 749px) {
    display: block;
    background-color: transparent;
    width: auto;
    letter-spacing: 0;
    dt {
      padding-left: 0;
    }
    dd {
      background-color: var(--textbox-bg-color);
      border-radius: 5px;
      font-size: 12px;
      width: auto;
      line-height: 20px;
    }
  }
}
audio {
  width: 100%;
}
</style>

<script setup>
import AllSoundData from '~/data/sounds.js'
import TriangleArrow from '~/assets/image/SoundBar/triangle-arrow-down.svg'
import Play from '~/assets/image/SoundBar/play.svg'
import Pause from '~/assets/image/SoundBar/pause.svg'
import SpClose from '~/assets/image/SoundBar/sp-close.svg'
import { useMainStore } from '~/stores/main.js'
const mainStore = useMainStore()
import { useAnnotationsStore } from '~/stores/annotations.js'
import { useEventBus } from '~/composables/useEventBus'
const annotationsStore = useAnnotationsStore()

const props = defineProps({
  annotations: {
    type: Array,
    required: true,
    default: null
  },
  spVisibility: {
    type: Boolean,
    required: true,
    default: false
  }
})

const emit = defineEmits(['spClose'])

const visible = ref(true)
const index = ref('0') // SelectBoxに渡す関係でStringにしておく必要がある
const route = useRoute()
const { $garden, $getTags, $nuxt } = useNuxtApp()
const list = computed(() => AllSoundData[$garden(route)] || null)
const currentTime = ref('00:00')
const totalTime = ref('00:00')
const paused = ref(true)
const duration = ref(0)
const percent = ref(0) // Number: 0 ~ 100

const data = computed(() => list.value[parseInt(index.value, 10)])
const file = computed(() => data.value.src)
const player = ref(null)
const tags = computed(() => $getTags(props.annotations))

watch(index, () => {
  if (!paused.value) {
    pause()
  }
  player.value.src = data.value.src
  player.value.load()
})

onMounted(() => {
  if (list.value) {
    player.value.addEventListener('playing', playing)
    player.value.addEventListener('pause', pause)
    player.value.addEventListener('timeupdate', timeupdate)
    player.value.addEventListener('loadedmetadata', loadedmetadata)
    player.value.src = data.value.src
    player.value.load()
  }
})

onBeforeUnmount(() => {
  if (list.value) {
    player.value.removeEventListener('playing', playing)
    player.value.removeEventListener('pause', pause)
    player.value.removeEventListener('timeupdate', timeupdate)
    player.value.removeEventListener('loadedmetadata', loadedmetadata)
  }
})

function playing() {
  paused.value = false
}

function pause() {
  paused.value = true
}

function togglePlay() {
  if (player.value.paused) {
    player.value.play()
  } else {
    player.value.pause()
  }
}

function timeupdate() {
  const current = Math.floor(player.value.currentTime)
  const duration = Math.floor(player.value.duration)
  percent.value = (current / duration) * 100
  currentTime.value = current ? playTime(current) : '00:00'
}

function loadedmetadata() {
  const current = Math.floor(player.value.currentTime)
  const duration = Math.floor(player.value.duration)
  percent.value = 0
  currentTime.value = current ? playTime(current) : '00:00'
  totalTime.value = duration ? playTime(duration) : '00:00'
}

function playTime(t) {
  let hms = ''
  const h = (t / 3600) | 0
  const m = ((t % 3600) / 60) | 0
  const s = t % 60
  const z2 = (v) => {
    const s = '00' + v
    return s.substr(s.length - 2, 2)
  }
  if (h !== 0) {
    hms = h + ':' + z2(m) + ':' + z2(s)
  } else if (m !== 0) {
    hms = z2(m) + ':' + z2(s)
  } else {
    hms = '00:' + z2(s)
  }
  return hms
}

function progressStyle() {
  return {
    width: `${percent.value}%`
  }
}

function seekBarClick(e) {
  if (e.target === player.value.$refs.return) {
    player.value.currentTime = 0
  } else {
    player.value.currentTime = player.value.duration * (e.offsetX / player.value.$refs.seekBarHitArea.offsetWidth)
  }
}

function placeClick(annotationId) {
  console.log('placeClick', annotationId)
  const eventBus = useEventBus()
  eventBus.emit('clickAnnotationLink', annotationId)
}

function tagClick(tag) {
  const eventBus = useEventBus()
  eventBus.emit('selectList', 'Annotations')
  nextTick(() => {
    eventBus.emit('setTagIndexStr', tag)
  })
}
</script>
