import Vue from 'vue'
import domready from 'domready'

import router from './Router'
import App from './components/App'
import Home from './components/Home/Home'
import Project from './components/Project/Project'

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
            },
            updated () {
                loading = false
                if (this.$route.name !== 'home') {
                    this.menu.deselectAnchor()
                }
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
