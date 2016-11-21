import Vue from 'vue'
import domready from 'domready'

import router from './Router'
import App from './components/App'
import Home from './components/Home/Home'
import Project from './components/Project/Project'

import Utils from 'scripts/Utils'
import Menu from 'scripts/Menu/Menu'

import './stylesheets/main.scss'

class Main {

    constructor () {
        this.app = new App()
        this.init()
    }

    init () {
        let loading = true
        let sliderToProject = false

        this.vue = new Vue({
            router,
            template: this.app.template,
            data () {
                return {
                    loading: loading,
                    sliderToProject: sliderToProject,
                    menu: {}
                }
            },
            mounted () {
                this.menu = new Menu()
                this.menu.init()

                this.listenToScroll()
            },
            updated () {
                if (window.sessionStorage.getItem('navigateFrom') === 'home' && this.$route.name == 'project') {
                    this.sliderToProject = true
                } else {
                    this.sliderToProject = false
                }

                if (this.$route.name !== 'home') {
                    // this.menu.deselectAnchor()
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
                }
            }
        }).$mount('#app')
    }

}

domready(() => {
    let main = new Main()
})
