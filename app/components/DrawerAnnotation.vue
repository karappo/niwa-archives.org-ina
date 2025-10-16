<template>
  <div class="drawerAnnotation">
    <header>
      <h2 class="category" :data-name="category">{{ category }}</h2>
      <a
        v-if="pageName === 'Oral Archives'"
        class="button autoplay"
        :class="{ enabled: autoplay }"
        title="オートプレイ：自動的に次のアノテーションを表示・再生します"
        @click="clickAutoplay"
      >
        Auto<span class="play">play</span>
      </a>
      <template v-if="prevNextVisibility">
        <a
          title="Previus"
          class="button prev"
          :class="{ disabled: prevDisabled }"
          @click="prev"
        >
          <IconPrev />
        </a>
        <a
          title="Next"
          class="button next"
          :class="{ disabled: nextDisabled }"
          @click="next"
        >
          <IconNext />
        </a>
        <a
          v-if="!tourName"
          class="button backTolist"
          :title="`Back to list`"
          @click="emit('backToList')"
        >
          <IconList />
        </a>
      </template>
      <StopTourButton
        v-if="tourName"
        class="button"
        :icon="true"
      />
      <DrawerCloseButton v-else />
    </header>
    <article>
      <div
        v-if="isGuidedTour && data.commentForGuidedTour"
        class="commentForGuidedTour"
        v-html="data.commentForGuidedTour"
      ></div>
      <img v-if="data.image" :src="data.image" class="image" />
      <a
        v-if="data.pdf"
        class="button download"
        :href="data.pdf"
        target="_blank"
      >
        PDFをみる
      </a>
      <div v-if="flagForYoutube && data.youtube" class="youtube">
        <YouTube
          ref="youtube"
          :src="data.youtube.id()"
          :vars="playerVars"
          @state-change="onStateChange"
        ></YouTube>
        <div
          class="cover"
          :class="{ hidden: !coverVisibility }"
          @click="replayVideo()"
        >
          <div class="icon"></div>
        </div>
      </div>
      <h1>{{ data.title }}</h1>
      <div
        v-if="data.description"
        class="description"
        :class="{ noBr }"
        v-html="data.description"
      ></div>
      <div v-if="data.tags" class="tags">
        <h5>Tags</h5>
        <div class="tagsContent">
          <div
            v-for="tag in data.tags"
            :key="tag"
            class="tag"
            :class="{ disabled: tourName }"
            @click="tagClick(tag)"
          >
            <span>#{{ tag }}</span>
            <span class="num">
              {{
                annotations.filter((_a) => _a.tags && _a.tags.includes(tag))
                  .length
              }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="data.speaker" class="speaker">
        <h5>Speaker</h5>
        <div class="speakerContent">
          <div
            class="thumb"
            :style="`background-image: url(${data.youtube.thumbnailUrl()});`"
          ></div>
          <div class="text" v-html="data.speaker"></div>
        </div>
      </div>
      <div v-if="data.dateTime" class="dateTime">
        <h5>Date</h5>
        <p>{{ showDateTime(data.dateTime) }}</p>
      </div>
    </article>
  </div>
</template>

<style scoped>
@import '~/assets/style/_drawer-common.css';

header {
  .autoplay {
    padding: 0 14px;
    margin-right: 8px;
    &.enabled {
      border-color: white !important;
      @media (max-width: 990px) {
        color: #fff !important;
      }
    }
    @media (max-width: 990px) {
      padding: 0 10px;
      margin-right: 0;
      background: transparent !important; /* activeやhoverの時に背景色が変わるのを防ぐために!importantつけている */
      border: 0;
      font-size: 14px;
      color: #898989 !important; /* activeやhoverの時に背景色が変わるのを防ぐために!importantつけている */
      .play {
        display: none;
      }
    }
  }
  .backTolist {
    font-family: 'Font Awesome 5 Pro-Light-300';
    width: 34px;
    height: 34px;
    margin-left: 1px;
    margin-right: 1px;
  }
  .prev,
  .next {
    width: 34px;
    height: 34px;
  }
  .next {
    margin-left: 1px;
  }
}

.drawerAnnotation {
  .description,
  .commentForGuidedTour {
    color: #9b9b9b;
    font-size: 14px;
    line-height: calc(29 / 14);
    margin-bottom: 15px;
    &:not(.noBr) {
      white-space: pre-wrap; /* nl2br */
    }
  }
  .commentForGuidedTour {
    background-color: #151515;
    color: white;
    padding: 20px 23px;
    border-radius: 10px;
  }
  .download {
    padding: 20px;
  }
  .youtube {
    position: relative;
    padding-top: calc(
      225 / 400 * 100%
    ); /* ここでアスペクト比（height / width）を設定 */
    overflow: hidden;
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
    .cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      font-family: 'Font Awesome 5 Pro-Light-300';
      font-size: 50px;
      color: white;
      background: #0e0e0e;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .icon {
        opacity: 0.5;
        transition: opacity 0.2s;
      }
      &:hover {
        .icon {
          opacity: 1;
        }
      }
      &.hidden {
        display: none;
      }
    }
  }
  .tags {
    font-size: 12px;
    line-height: 2;
    .tagsContent {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      .tag {
        display: inline-flex;
        background-color: #242424;
        color: #d6d6d6;
        border-radius: 5px;
        padding: 3px 10px;
        font-size: 14px;
        cursor: pointer;
        &.disabled {
          opacity: 0.3;
          pointer-events: none;
        }
        &:not(.disabled):hover {
          background-color: #2e2e2e;
        }
        span.num {
          color: #7c7c7c;
          font-family: 'K2-v1-Regular';
          margin-left: 1em;
        }
      }
    }
  }
  .speaker {
    .speakerContent {
      display: flex;
      margin: 0;
      gap: 20px;
      .thumb {
        background-size: 180%; /* 上下に黒帯が入った正方形なのでceoverにするとNG */
        background-position: center;
        width: 87px;
        height: 87px;
        border-radius: 5px;
        flex-shrink: 0;
      }
    }
  }
  .dateTime {
    font-size: 14px;
    margin-top: 50px;
    color: #8b8b8b;
  }
}
</style>

<style>
/* 下記のコードは本当はdeepでscopedの方に入れたい */
.drawerAnnotation {
  header {
    .stopTourButton {
      height: 34px;
      padding-left: 18px;
      font-size: 14px;
      margin-left: 1px;
      transition: color 0.2s;
      svg {
        margin-left: 14px;
        margin-right: 14px;
        &:deep(line) {
          transition: stroke 0.2s;
        }
      }
      &:hover {
        svg:deep(line) {
          stroke: white;
        }
      }
    }
  }
  .description,
  .commentForGuidedTour {
    a {
      color: #a452e0;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'K2-v1-Bold', 'TsukuGoPro-E', '游ゴシック体', 'Yu Gothic',
        'YuGothic', YuGothic, 'Lucida Grande', 'Hiragino Kaku Gothic Pro',
        'ヒラギノ角ゴ Pro W3', 'HiraKakuProN-W3', 'メイリオ', 'Meiryo',
        'ＭＳ ゴシック', 'MS Gothic', Osaka, Verdana, arial, helvetica,
        sans-serif;
      font-weight: normal;
    }
    h2 {
      margin: 1.6em 0 0.3rem;
      color: #ddd;
      font-size: 1.8rem;
    }
    h3 {
      margin: 1.4em 0 0;
      color: #ddd;
      font-size: 1.4rem;
    }
  }
  .youtube {
    > div {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      z-index: 1 !important;
      iframe {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
  .speaker {
    .text {
      h6 {
        font-size: 14px;
        color: white;
      }
      p {
        font-size: 12px;
        color: #9b9b9b;
        margin-top: 14px;
      }
    }
  }
}
</style>

<script setup lang="ts">
import dayjs from 'dayjs'
import IconPrev from '~/assets/image/icon-prev.svg'
import IconNext from '~/assets/image/icon-next.svg'
import IconList from '~/assets/image/icon-list.svg'
import { useMainStore } from '~/stores/main'
import { useEventBus } from '~/composables/useEventBus'

const props = defineProps({
  data: {
    type: Object,
    require: true,
    default: null
  },
  annotations: {
    type: Array,
    require: true,
    default: null
  },
  prevNextVisibility: {
    type: Boolean,
    require: true,
    default: false
  },
  prevDisabled: {
    type: Boolean,
    default: false
  },
  nextDisabled: {
    type: Boolean,
    default: false
  },
  isSP: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['next', 'prev', 'backToList'])

// Reactive data
const playerVars = ref(null)
const coverVisibility = ref(false)
const timerID = ref(null)
const flagForYoutube = ref(true) // data.youtubeの値が変わった時に再描画されない問題への対処

// Template refs
const youtube = ref(null)

// Store
const store = useMainStore()
const { $getTitle, $isMobileOrTablet, $nuxt } = useNuxtApp()

// Computed properties
const pageName = computed(() => store.getPageName)
const tourName = computed(() => store.getTourName)
const autoplay = computed(() => store.autoplay)
const category = computed(() => $getTitle(props.data?.category))

const belongingList = computed(() => {
  // TODO ここ、グループに属するannotationのことを考慮できていなさそう
  // window.viewer.scene.annotations.children ではなく props.annotations で判定するべきかも？
  // でも、その時ほんとに動作大丈夫か？
  // eslint-disable-next-line
  return window.viewer?.scene?.annotations?.children?.filter((a) => a.data.category === props.data?.category) || []
})

const player = computed(() => youtube.value?.player)
const isGuidedTour = computed(() => pageName.value === 'Guided Tour')
const noBr = computed(() => {
  // DNA Dataの時はHTMLが複雑なので、自動で改行させない
  return category.value === 'DNA Data'
})

// Methods
function showDateTime(dateTime) {
  const d = dayjs(dateTime)
  let format = 'YYYY/MM/DD'
  if (!(d.hour() === 0 && d.minute() === 0 && d.second() === 0)) {
    format += ' HH:mm'
  }
  return d.format(format)
}

function goToNextAnnotation() {
  if (
    !props.nextDisabled &&
    (autoplay.value || tourName.value)
  ) {
    emit('next', props.data.id)
  } else {
    coverVisibility.value = true
    player.value?.seekTo(playerVars.value?.start || 0)
    player.value?.pauseVideo()
  }
}

function replayVideo() {
  coverVisibility.value = false
  player.value?.playVideo()
}

function clickAutoplay() {
  store.setAutoplay(!autoplay.value)
  if (autoplay.value) {
    startGoToNextTimer()
  }
}

function startGoToNextTimer() {
  // 一定時間後に次へ
  timerID.value = setTimeout(goToNextAnnotation, 15000)
}

function onStateChange(event) {
  // YouTube player states:
  // -1: unstarted, 0: ended, 1: playing, 2: paused, 3: buffering, 5: cued

  if (event.data === 1) { // playing
    // かならず ※1 と条件を揃えること
    if ($isMobileOrTablet()) {
      clearTimer()
    }
  } else if (event.data === 0) { // ended
    goToNextAnnotation()
  }
}

function tagClick(tag) {
  const eventBus = useEventBus()
  eventBus.emit('selectList', 'Annotations')
  nextTick(() => {
    eventBus.emit('setTagIndexStr', tag)
  })
}

function clearTimer() {
  if (timerID.value) {
    clearTimeout(timerID.value)
    timerID.value = null
  }
}

function prev() {
  clearTimer()
  emit('prev', props.data.id)
}

function next() {
  clearTimer()
  emit('next', props.data.id)
}

// Watch for data changes
watch(() => props.data, (data) => {
  // 初期化時の処理
  // mountedは、このコンポーネントの再描画時に呼ばれないので、ここで処理する

  if (props.data?.youtube) {
    flagForYoutube.value = false // 一旦要素を消すためにフラグをfalseにする ※2

    const vars = props.data.youtube.getParams()
    vars.autoplay = 1
    playerVars.value = vars
    coverVisibility.value = false
  }

  // ※1
  if ($isMobileOrTablet()) {
    // Youtubeの自動再生できないので、時間が来たら次へ
    startGoToNextTimer()
  } else if (
    !data?.youtube &&
    !data?.movie &&
    (autoplay.value || tourName.value)
  ) {
    startGoToNextTimer()
  }

  nextTick(() => {
    // 再度、要素を表示するためにフラグをtrueにする（※2とセット）
    if (props.data?.youtube) {
      flagForYoutube.value = true
    }
    // スクロール位置の初期化
    const el = getCurrentInstance()?.proxy?.$el
    if (el?.parentElement) {
      el.parentElement.scrollTop = 0
    }
    // フォント
    if (typeof FONTPLUS !== 'undefined') {
      FONTPLUS.start()
    }
  })
}, { immediate: true })
</script>
