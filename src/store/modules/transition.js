import * as types from '../mutation-types'

const HOME_TO_PROJECT = 'HOME_TO_PROJECT'
const PROJECT_TO_HOME = 'PROJECT_TO_HOME'
const TO_PROJECTS = 'TO_PROJECTS'

const transitionTypes = {
    'home-project': HOME_TO_PROJECT,
    'project-home': PROJECT_TO_HOME,
    'anywhere-projects': TO_PROJECTS
}

const state = {
    isTransitioning: false,
    from: '',
    to: '',
    type: '',
    types: transitionTypes
}

const getters = {
    isTransitioning: state => state.isTransitioning,
    transitionType: state => state.type,
    allTransitionTypes: state => state.types
}

const mutations = {
    [types.SET_IS_TRANSITIONING] (state) {
        state.isTransitioning = true
    },
    [types.SET_TRANSITION] (state, transition) {
        state.from = transition.from
        state.to = transition.to
        state.type = state.types[transition.from + '-' + transition.to]
    },
    [types.REMOVE_IS_TRANSITIONING] (state) {
        state.isTransitioning = false
    },
    [types.REMOVE_TRANSITION] (state) {
        state.isTransitioning = false
        state.from = ''
        state.to = ''
        state.type = ''
    }
}

export default {
    state,
    getters,
    mutations
}
