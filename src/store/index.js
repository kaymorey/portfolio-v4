import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'

import locales from './modules/locales'
import projects from './modules/projects'
import transition from './modules/transition'

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    modules: {
        locales,
        projects,
        transition
    }
})
