import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
    getProjects (locale, callback) {
        let filePath = './static/data/' + locale.slug + '/data-' + locale.slug + '.json'

        Vue.http.get(filePath).then((response) => {
            return response.json()
        }, (response) => {
            console.log('error when retrieving data')
        }).then((json) => {
            callback(json)
        })
    }
}
