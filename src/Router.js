import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App'
import Home from './components/Home/Home'
import Project from './components/Project/Project'

Vue.use(VueRouter)

class Router extends VueRouter {

    constructor () {
        let home = new Home()
        let project = new Project()

        let routes = [
            {
                path: '/',
                component: home.component
            },
            {
                path: '/works/:project',
                name: 'project',
                component: project.component
            }
        ]

        super({
            routes
        })
    }

}

let router = new Router()
export default router
