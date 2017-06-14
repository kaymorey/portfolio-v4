import Vue from 'vue'
import VueResource from 'vue-resource'
import domready from 'domready'
import { mapGetters } from 'vuex'

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
Vue.use(VueResource)

class Main {

    constructor () {
        this.app = new App()
        this.init()
    }

    init () {
        let loading = true
        let sliderToProject = false
        let projectToSlider = false

        Vue.mixin(Mixin)

        this.vue = new Vue({
            store,
            router,
            template: this.app.template,
            data () {
                return {
                    loading: loading,
                    sliderToProject: sliderToProject,
                    projectToSlider: projectToSlider,
                    isHomePage: false,
                    menu: {},
                    hasTransitioned: false
                }
            },
            computed: {
                ...mapGetters({
                    locales: 'allLocales',
                    selectedLocale: 'selectedLocale',
                    isTransitioning: 'isTransitioning',
                    transitionType: 'transitionType',
                    transitionTypes: 'allTransitionTypes'
                })
            },
            watch: {
                '$route': 'updateDataAccordingToRoute'
            },
            mounted () {
                this.menu = new Menu()
                this.menu.init()
                this.listenToScroll()
                this.listenAfterRoute()
                this.updateDataAccordingToRoute()

                this.hasTransitioned = this.isTransitioning
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

                    if (this.$route.params.project) {
                        router.push({name: this.$route.name, params: {locale: locale.slug, project: this.$route.params.project}})
                    } else {
                        router.push({name: this.$route.name, params: {locale: locale.slug}})
                    }
                },
                updateDataAccordingToRoute () {
                    if (this.$route.name === 'home') {
                        this.isHomePage = true
                    } else {
                        this.isHomePage = false
                    }
                },
                listenAfterRoute () {
                    router.afterEach((to, from) => {
                        this.loading = false
                        if (from.name === 'home' && to.name === 'project' || from.name === 'project' && to.name === 'home') {
                            if (this.isTransitioning) {
                                this.$store.commit(types.SET_TRANSITION, {
                                    from: from.name,
                                    to: to.name
                                })
                            }
                        }
                    })
                }
            }
        }).$mount('#app')
    }

}

domready(() => {
    let main = new Main()
})
