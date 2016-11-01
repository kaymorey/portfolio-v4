import Vue from 'vue'
import VueResource from 'vue-resource'

export default class DataLoader {

    constructor () {
        this.filePath = './static/data/data.json'
        this.data = []
        Vue.use(VueResource)
    }

    loadData () {
        return new Promise((resolve) => {
            Vue.http.get(this.filePath).then((response) => {
                return response.json()
            }, (response) => {
                console.log('error when retrieving data')
            }).then((json) => {
                this.projects = json
                resolve(json)
            })
        })
    }

    getProject (slug) {
        let project = this.projects.find((project) => {
            return project.slug === slug
        })

        return project
    }
}
