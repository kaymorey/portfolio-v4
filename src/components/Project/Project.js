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
                projects: 'allProjects',
                transitionType: 'transitionType',
                transitionTypes: 'allTransitionTypes'
            }),
            props: ['menu'],
            watch: {
                '$route': 'getProject',
                'project': function (val) {
                    let images = []
                    images.push(this.imagePath(val.image, val.slug))

                    let content = val.content
                    for (let c of content) {
                        if (c.image) {
                            images.push(this.imagePath(c.image, val.slug))
                        }
                    }

                    if (this.transitionType !== this.transitionTypes['home-project']) {
                        Utils.loadImages(images).then(() => {
                            Utils.fadeInPage()
                        })
                    }
                }
            },
            mounted () {
                this.getProject()
            },
            updated () {
                this.createProjectFromHomeAnimation()
                this.createProjectToHomeAnimation()
            },
            methods: {
                getProject () {
                    this.dispatchProjectAccordingToLocale(this.locales).then(() => {
                        let slug = this.$route.params.project
                        this.project = this.projects.find(project => project.slug === slug)
                    })
                },
                createProjectFromHomeAnimation () {
                    if (Object.keys(this.projectFromHomeAnimation).length === 0 && this.transitionType === this.transitionTypes['home-project']) {
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
