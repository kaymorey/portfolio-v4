import Vue from 'vue'
import Hello from './Hello/Hello'
import Projects from './Projects/Projects'

export default class Home {

    constructor () {
        this.hello = new Hello()
        this.projects = new Projects()

        this.component = Vue.component('home', {
            components: {
                'hello': this.hello.component,
                'projects': this.projects.component
            },
            template: require('./home.html')
        })
    }

}
