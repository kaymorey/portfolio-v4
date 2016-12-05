import Vue from 'vue'
import VueResource from 'vue-resource'

export default class DataLoader {

    constructor () {
        this.directory = './static/data/'
        this.data = []
        Vue.use(VueResource)
    }

    loadData (locale) {
        return new Promise((resolve) => {
            let filePath = this.directory + locale + '/data-' + locale + '.json'

            Vue.http.get(filePath).then((response) => {
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
