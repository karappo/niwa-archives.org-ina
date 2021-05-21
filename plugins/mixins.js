import Vue from 'vue'

Vue.mixin({
  methods: {
    initFuwa() {
      let boxes = document.querySelectorAll('[data-fuwa]')
      boxes = Array.prototype.slice.call(boxes, 0) // IE11対策
      const doWhenIntersect = function (entries) {
        entries = Array.prototype.slice.call(entries, 0) // IE11対策
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-fuwa', 'visible')
          }
        })
      }
      const observer = new IntersectionObserver(doWhenIntersect, {
        root: null,
        rootMargin: '0px',
        threshold: 0
      })
      boxes.forEach(function (box) {
        observer.observe(box)
      })
    },
    updateGoogleAnalyticsTitle() {
      this.$ga.page({
        page: this.$route.path,
        title: this.$metaInfo.title,
        location: window.location.href
      })
    },
    isPage(localePath) {
      return this.localePath(localePath) === this.$route.path
    },
    _head() {
      const _class = []
      const title = this.$t('title')
      // const titleTemplate = `%s | ${title}`
      return {
        htmlAttrs: { lang: this.$i18n.locale },
        bodyAttrs: { class: _class },
        // titleTemplate,
        title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.$t('description')
          }
        ],
        link: [
        ]
      }
    }
  },
  head() {
    return this._head()
  }
})
