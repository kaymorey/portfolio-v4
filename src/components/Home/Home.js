import Vue from 'vue'
import { mapGetters } from 'vuex'

import Hello from './Hello/Hello'
import Projects from './Projects/Projects'

import Mixin from 'scripts/Mixin'
import * as types from 'store/mutation-types'

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
                    rootPage: true,
                    route: ''
                }
            },
            computed: {
                ...mapGetters({
                    isTransitioning: 'isTransitioning',
                    transitionType: 'transitionType',
                    transitionTypes: 'allTransitionTypes'
                })
            },
            props: ['menu'],
            mounted () {
                this.route = this.$route.name

                if (loading && !this.projectToSlider) {
                    this.createHomeLoading()
                } else {
                    document.getElementById('main-container').classList.add('visible')
                }
            },
            destroyed () {
                loading = false
                this.menu.unSelectItem(this.route)
            },
            methods: {
                createHomeLoading () {
                    if (Object.keys(this.homeLoading).length === 0 && !this.transitionType !== this.transitionTypes['project-home']) {
                        this.homeLoading = new HomeLoading()
                        this.homeLoading.init()
                    }
                },
                createSliderFromProjectAnimation () {
                    if (Object.keys(this.sliderFromProjectAnimation).length === 0 && (this.transitionType === this.transitionTypes['project-home'] || this.transitionType === this.transitionTypes['anywhere-projects']) && this.isTransitioning) {
                        this.sliderFromProjectAnimation = new SliderFromProjectAnimation()
                    }
                }
            }
        })
    }

}
