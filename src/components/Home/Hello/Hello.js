import Vue from 'vue'

import HomeLoading from 'scripts/HomeLoading'

import './hello.scss'

export default class Hello {

    constructor () {
        this.component = Vue.component('hello', {
            template: require('./hello.html'),
            data () {
                return {
                    loading: true
                }
            },
            mounted: () => {
                this.create()
                this.init()
            }
        })
    }

    create () {
        this.homeLoading = new HomeLoading()
    }

    init () {
        this.homeLoading.init()
    }

}
