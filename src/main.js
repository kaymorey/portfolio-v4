import Vue from 'vue'
import VueRouter from 'vue-router'
import domready from 'domready'

import App from './components/App'
import Home from './components/Home/Home'

import './stylesheets/main.scss'

Vue.use(VueRouter)

class Main {

    constructor () {
        this.app = new App()
        this.home = new Home()

        this.routes = [
            {
                path: '/',
                component: this.home.component
            }
        ]

        let routes = this.routes
        this.router = new VueRouter({
            routes
        })

        this.init()
    }

    init () {
        let router = this.router
        this.vue = new Vue({
            router,
            template: this.app.template,
            data () {
                return {
                    loading: true
                }
            }
        }).$mount('#app')
    }

}

domready(() => {
    let main = new Main()
})
