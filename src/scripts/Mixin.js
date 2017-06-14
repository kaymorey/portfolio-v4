import * as types from '../store/mutation-types'
import store from '../store'
import enMessages from '../../static/data/en/messages-en.js'
import frMessages from '../../static/data/fr/messages-fr.js'

export default {
    beforeDestroy () {
        if (this.rootPage) {
            if (!store.state.transition.isTransitioning) {
                this.resetOpacityPage()
            }
        }
    },
    methods: {
        imagePath: function (path, slug = '') {
            if (path) {
                if (slug) {
                    return require('assets/images/projects/' + slug + '/' + path)
                } else {
                    return require('assets/images/' + path)
                }
            }
        },
        lazyImagePath: function (path, slug = '') {
            let image = {
                src: this.imagePath(path, slug)
            }

            return image
        },
        videoPath: function (path, slug) {
            if (slug) {
                return require('assets/videos/projects/' + slug + '/' + path)
            }
        },
        imagesLoaded: function (images, callback) {
            if (images && images.length > 0) {
                let src = images[0]

                let image = new window.Image()
                image.src = src
                image.onload = () => {
                    images = images.slice(1)
                    this.imagesLoaded(images, callback)
                }
            } else {
                callback()
            }
        },
        resetOpacityPage: function () {
            let header = document.querySelector('header.header')
            let container = document.getElementById('main-container')

            header.style.opacity = ''
            header.classList.remove('visible')

            container.style.opacity = ''
            container.classList.remove('visible')
        },
        reloadDataAcccordingToLocale: function (locales) {
            let localeSlug = this.$route.params.locale
            if (!localeSlug) {
                localeSlug = 'fr'
            }

            let locale = locales.find(locale => locale.slug === localeSlug)
            this.$store.commit(types.SET_LOCALE, locale)
        },
        dispatchProjectAccordingToLocale: function (locales) {
            return new Promise((resolve) => {
                this.reloadDataAcccordingToLocale(locales)
                this.$store.dispatch('getAllProjects').then(() => {
                    resolve(true)
                })
            })
        },
        translate: function (text) {
            if (store.getters.selectedLocale.identifier == 'fr-FR') {
                return frMessages[text]
            } else {
                return enMessages[text]
            }
        }
    },
    filters: {
        translate: function (text) {
            if (store.getters.selectedLocale.identifier == 'fr-FR') {
                return frMessages[text]
            } else {
                return enMessages[text]
            }
        }
    }
}
