import Vue from 'vue'

import DataLoader from 'scripts/DataLoader'
import Slider from 'scripts/Slider'

import './projects.scss'

export default class Projects {

    constructor () {
        this.component = Vue.component('projects', {
            template: require('./projects.html'),
            data () {
                return {
                    draggingText: Array.from('drag to change . '),
                    projects: [],
                    currentProject: {},
                    nextProject: {},
                    slider: {},
                    dataLoader: new DataLoader()
                }
            },
            mounted: function () {
                this.getProjects()
            },
            watch: {
                projects: function () {
                    this.createSlider()
                }
            },
            methods: {
                getProjects () {
                    this.dataLoader.loadData().then((projects) => {
                        this.projects = projects
                    })
                },
                createSlider () {
                    console.log(this.projects)
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
                    }
                }
            }
        })
    }

}
