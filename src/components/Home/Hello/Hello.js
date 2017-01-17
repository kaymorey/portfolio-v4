import Vue from 'vue'

import './hello.scss'

export default class Hello {

    constructor () {
        let loading = true

        this.component = Vue.component('hello', {
            template: require('./hello.html'),
            data () {
                return {
                    loading: loading
                }
            },
            props: ['projectToSlider'],
            destroyed () {
                loading = false
            }
        })
    }
}
