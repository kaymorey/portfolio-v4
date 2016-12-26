import Vue from 'vue'

import Utils from 'scripts/Utils'

import './not-found.scss'

export default class Contact {

    constructor () {
        this.component = Vue.component('not-found', {
            template: require('./not-found.html'),
            props: ['menu'],
            mounted () {
                Utils.fadeInPage()
            }
        })
    }

}
