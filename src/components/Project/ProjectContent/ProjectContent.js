import Vue from 'vue'

import Mixin from 'scripts/Mixin'

import './project-content.scss'

export default class ProjectContent {

    constructor () {
        this.component = Vue.component('project-content', {
            template: require('./project-content.html'),
            props: ['project']
        })
    }

}
