import Vue from 'vue'
import Hello from './Hello/Hello'
import Projects from './Projects/Projects'

import Mixin from 'scripts/Mixin'

import HomeLoading from 'scripts/LoadingAnimation/HomeLoading'
import SliderFromProjectAnimation from 'scripts/LoadingAnimation/SliderFromProjectAnimation'

export default class Home {

    constructor () {
        let loading = true

        this.hello = new Hello()
        this.projects = new Projects()

        this.component = Vue.component('home', {
            components: {
                'hello': this.hello.component,
                'projects': this.projects.component
            },
            template: require('./home.html'),
            data () {
                return {
                    loading: loading,
                    homeLoading: {},
                    sliderFromProjectAnimation: {},
                    rootPage: true
                }
            },
            mounted () {
                if (loading) {
                    this.createHomeLoading()
                } else {
                    document.getElementById('main-container').classList.add('visible')
                }
            },
            destroyed () {
                loading = false
            },
            methods: {
                createHomeLoading () {
                    if (Object.keys(this.homeLoading).length === 0 && !this.projectToSlider) {
                        this.homeLoading = new HomeLoading()
                        this.homeLoading.init()
                    }
                },
                createSliderFromProjectAnimation () {
                    if (Object.keys(this.sliderFromProjectAnimation).length === 0 && this.projectToSlider) {
                        this.sliderFromProjectAnimation = new SliderFromProjectAnimation()
                    }
                }
            }
        })
    }

}
