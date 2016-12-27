import Vue from 'vue'
import domready from 'domready'
import { mapGetters, mapMutations } from 'vuex'

import router from './Router'
import store from './store'
import * as types from './store/mutation-types'
import App from './components/App'
import Home from './components/Home/Home'
import Project from './components/Project/Project'

import Utils from 'scripts/Utils'
import Mixin from 'scripts/Mixin'
import Menu from 'scripts/Menu/Menu'

import './stylesheets/main.scss'

Vue.config.debug = true

class Main {

    constructor () {
        this.app = new App()
        this.init()
    }

    init () {
        let loading = true
        let sliderToProject = false

        Vue.mixin(Mixin)

        this.vue = new Vue({
            store,
            router,
            template: this.app.template,
            data () {
                return {
                    loading: loading,
                    sliderToProject: sliderToProject,
                    isHomePage: false,
                    menu: {}
                }
            },
            computed: {
                ...mapGetters({
                    locales: 'allLocales',
                    selectedLocale: 'selectedLocale'
                })
            },
            mounted () {
                this.menu = new Menu()
                this.menu.init()
                this.listenToScroll()

                let localeSlug = this.$route.params.locale
                if (localeSlug) {
                    let locale = this.locales.find(locale => locale.slug === localeSlug)
                    this.$store.commit(types.SET_LOCALE, locale)
                    this.$store.dispatch('getAllProjects')
                }
            },
            updated () {
                console.log('updated')

                if (window.sessionStorage.getItem('navigateFrom') === 'home' && this.$route.name == 'project') {
                    this.sliderToProject = true
                } else {
                    this.sliderToProject = false
                }

                if (this.$route.name !== 'home') {
                    // this.menu.deselectAnchor()
                } else {
                    this.isHomePage = true
                }

                loading = false
            },
            methods: {
                listenToScroll () {
                    window.addEventListener('scroll', (e) => {
                        if (!ticking) {
                            window.requestAnimationFrame(() => {
                                if (this.$route.name === 'home') {
                                    this.menu.onScroll()
                                }

                                let ticking = false
                            })
                        }
                        let ticking = true
                    })
                },
                setLocale (locale) {
                    this.$store.commit(types.SET_LOCALE, locale)
                    this.$store.dispatch('getAllProjects')

                    router.push({name: this.$route.name, params: {locale: locale.slug}})
                }
            }
        }).$mount('#app')
    }

}

domready(() => {
    let main = new Main()
})
