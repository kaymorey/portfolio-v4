import Vue from 'vue'
import { mapGetters } from 'vuex'

import Mixin from 'scripts/Mixin'
import Slider from 'scripts/Slider/Slider'
import SliderToProjectAnimation from 'scripts/SliderToProjectAnimation'

import './projects.scss'

export default class Projects {

    constructor () {
        let loading = true

        this.component = Vue.component('projects', {
            template: require('./projects.html'),
            data () {
                return {
                    loading: loading,
                    draggingText: Array.from('drag to change . '),
                    currentProject: {},
                    nextProject: {},
                    slider: {},
                    sliderToProjectAnimation: {}
                }
            },
            computed: mapGetters({
                projects: 'allProjects',
                locales: 'allLocales',
                selectedLocale: 'selectedLocale'
            }),
            created () {
                this.dispatchProjectAccordingToLocale(this.locales)
            },
            updated: function () {
                this.createSlider()
                this.createSliderToProjectAnimation()
            },
            destroyed () {
                loading = false
            },
            methods: {
                createSlider () {
                    if (Object.keys(this.slider).length === 0) {
                        this.slider = new Slider()
                        this.slider.init()

                        this.slider.el.addEventListener('didClickOnPaginationLink', (e) => {
                            let index = e.detail

                            if (!this.slider.reversedTexts) {
                                this.nextProject = this.projects[index]
                            } else {
                                this.currentProject = this.projects[index]
                            }
                        })

                        if (this.projects.length >= 2) {
                            this.currentProject = this.projects[0]
                            this.nextProject = this.projects[1]
                        }

                        this.$emit('projects-updated')
                    }
                },
                createSliderToProjectAnimation () {
                    if (Object.keys(this.sliderToProjectAnimation).length === 0) {
                        this.sliderToProjectAnimation = new SliderToProjectAnimation()
                        this.sliderToProjectAnimation.init()
                    }
                }
            }
        })
    }

}
