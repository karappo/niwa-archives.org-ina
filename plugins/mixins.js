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
      // let title = this.$t('title') TODO
      const title = '終わらない庭のアーカイヴ - Incomplete Niwa Archives'
      let titleTemplate = `%s | ${title}`
      // ページクラス
      if (this.isPage('/')) {
        _class.push('top')
        titleTemplate = null
      } else {
        // eslint-disable-next-line
        const _page = this.$route.path.replace(this.localePath('/'), '').replace('/', '')
        _class.push(_page)
        // title = this.$t(`${_page}.title`) TODO
      }
      // noScroll
      if (this.noScroll) {
        _class.push('noScroll')
      }
      if (this.$ua.is.ie) {
        _class.push('ie')
      }
      // Canonical
      return {
        htmlAttrs: { lang: this.$i18n.locale },
        bodyAttrs: { class: _class },
        titleTemplate,
        title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.$t('description')
          }
        ],
        link: [
          {
            el: 'canonical',
            href: `${process.env.siteUrl}${this.$route.path}`
          }
        ]
      }
    }
  },
  head() {
    return this._head()
  }
})
