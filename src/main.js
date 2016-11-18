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

        this.vue = new Vue({
            router,
            template: this.app.template,
            data () {
                return {
                    loading: loading,
                    menu: {}
                }
            },
            mounted () {
                this.menu = new Menu()
                this.menu.init()

                this.listenToScroll()
                // this.displayPage()
            },
            updated () {
                if (this.$route.name !== 'home') {
                    this.menu.deselectAnchor()
                }

                if (!loading) {
                    // this.displayPage()
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
                displayPage () {
                    Utils.loadImages().then(() => {
                        Utils.fadeInPage().then(() => {
                            if (this.$route.name == 'contact') {
                                this.menu.selectItem(1)
                            }
                        })
                    })
                }
            }
        }).$mount('#app')
    }

}

domready(() => {
    let main = new Main()
})
