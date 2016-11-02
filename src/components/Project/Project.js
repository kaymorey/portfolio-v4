import Vue from 'vue'

import Mixin from 'scripts/Mixin'
import DataLoader from 'scripts/DataLoader'

import ProjectHeader from './ProjectHeader/ProjectHeader'
import ProjectContent from './ProjectContent/ProjectContent'

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
                    dataLoader: new DataLoader()
                }
            },
            mixins: [Mixin],
            route: {
                data () {
                    this.getProject()
                }
            },
            mounted () {
                this.getProject()
            },
            methods: {
                getProject: function () {
                    let slug = this.$route.params.project
                    this.dataLoader.loadData().then(() => {
                        this.project = this.dataLoader.getProject(slug)
                    })
                }
            }
        })
    }

}
