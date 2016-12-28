import Vue from 'vue'
import { mapGetters } from 'vuex'

import Mixin from 'scripts/Mixin'
import ProjectFromHomeAnimation from 'scripts/ProjectFromHomeAnimation'
import ProjectToHomeAnimation from 'scripts/LoadingAnimation/ProjectToHomeAnimation'

import ProjectHeader from './ProjectHeader/ProjectHeader'
import ProjectContent from './ProjectContent/ProjectContent'

import Utils from 'scripts/Utils'

import './project.scss'

export default class Project {

    constructor () {
        this.projectHeader = new ProjectHeader()
        this.projectContent = new ProjectContent()

        this.component = Vue.component('project', {
            components: {
                'project-header': this.projectHeader.component,
                'project-content': this.projectContent.component
            },
            template: require('./project.html'),
            data () {
                return {
                    project: '',
                    projectFromHomeAnimation: {},
                    projectToHomeAnimation: {},
                    rootPage: true
                }
            },
            computed: mapGetters({
                locales: 'allLocales',
                selectedLocale: 'selectedLocale',
                projects: 'allProjects'
            }),
            props: ['menu'],
            route: {
                data () {
                    this.getProject()
                }
            },
            mounted () {
                if (!this.sliderToProject) {
                    Utils.loadImages().then(() => {
                        Utils.fadeInPage()
                    })
                }

                this.dispatchProjectAccordingToLocale(this.locales).then(() => {
                    this.getProject()
                })
            },
            updated () {
                this.createProjectFromHomeAnimation()
                this.createProjectToHomeAnimation()
            },
            methods: {
                getProject () {
                    let slug = this.$route.params.project

                    this.project = this.projects.find(project => project.slug === slug)
                },
                createProjectFromHomeAnimation () {
                    if (Object.keys(this.projectFromHomeAnimation).length === 0 && this.sliderToProject) {
                        this.projectFromHomeAnimation = new ProjectFromHomeAnimation()
                    }
                },
                createProjectToHomeAnimation () {
                    if (Object.keys(this.projectToHomeAnimation).length === 0) {
                        this.projectToHomeAnimation = new ProjectToHomeAnimation()
                        this.projectToHomeAnimation.init()
                    }
                }
            }
        })
    }

}
