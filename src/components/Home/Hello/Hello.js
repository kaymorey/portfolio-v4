import Vue from 'vue'

import HomeLoading from 'scripts/HomeLoading'

import './hello.scss'

export default class Hello {

    constructor () {
        let loading = true

        this.component = Vue.component('hello', {
            template: require('./hello.html'),
            data () {
                return {
                    loading: loading,
                    homeLoading: {}
                }
            },
            mounted: function () {
                if (this.loading) {
                    this.homeLoading = new HomeLoading()
                    this.homeLoading.init()
                }
            },
            destroyed: function () {
                loading = false
            }
        })
    }
}
