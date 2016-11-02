import Vue from 'vue'

import Mixin from 'scripts/Mixin'

import './project-header.scss'

export default class ProjectHeader {

    constructor () {
        this.component = Vue.component('project-header', {
            template: require('./project-header.html'),
            props: ['project']
        })
    }

}
