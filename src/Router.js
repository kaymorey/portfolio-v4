import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App'
import Home from './components/Home/Home'
import Project from './components/Project/Project'
import Contact from './components/Contact/Contact'
import NotFound from './components/NotFound/NotFound'

Vue.use(VueRouter)

class Router extends VueRouter {

    constructor () {
        let home = new Home()
        let project = new Project()
        let contact = new Contact()
        let notFound = new NotFound()

        let routes = [
            {
                path: '/',
                name: 'home',
                component: home.component
            },
            {
                path: '/contact',
                name: 'contact',
                component: contact.component
            },
            {
                path: '/project/:project',
                name: 'project',
                component: project.component
            },
            {
                path: '*',
                name: '404',
                component: notFound.component
            }
            // {
            //     path: '/',
            //     alias: '/:locale',
            //     name: 'home',
            //     component: home.component
            // },
            // {
            //     path: '/:locale/contact',
            //     name: 'contact',
            //     component: contact.component
            // },
            // {
            //     path: '/:locale/:project',
            //     name: 'project',
            //     component: project.component
            // }
        ]

        super({
            routes
        })
    }

}

let router = new Router()
export default router
