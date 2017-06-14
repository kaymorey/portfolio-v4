import Vue from 'vue'
import { mapGetters } from 'vuex'

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
            computed: {
                ...mapGetters({
                    transitionType: 'transitionType',
                    transitionTypes: 'allTransitionTypes',
                    selectedLocale: 'selectedLocale'
                })
            },
            destroyed () {
                loading = false
            }
        })
    }
}
