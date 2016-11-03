import Vue from 'vue'
import domready from 'domready'

import router from './Router'
import App from './components/App'
import Home from './components/Home/Home'
import Project from './components/Project/Project'

import './stylesheets/main.scss'

class Main {

    constructor () {
        this.app = new App()
        this.init()
    }

    init () {
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
