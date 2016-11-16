import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App'
import Home from './components/Home/Home'
import Project from './components/Project/Project'
import Contact from './components/Contact/Contact'

Vue.use(VueRouter)

class Router extends VueRouter {

    constructor () {
        let home = new Home()
        let project = new Project()
        let contact = new Contact()

        let routes = [
            {
                path: '/',
                name: 'home',
                component: home.component
            },
            {
                path: '/works/:project',
                name: 'project',
                component: project.component
            },
            {
                path: '/contact',
                name: 'contact',
                component: contact.component
            }
        ]

        super({
            routes
        })
    }

}

let router = new Router()
export default router
