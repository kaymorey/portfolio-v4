import * as types from '../mutation-types'

const state = {
    all: []
}

const getters = {
    allProjects: state => state.all
}

const mutations = {
    [types.RECEIVE_PROJECTS] (state, projects) {
        state.all = projects
    }
}

export default {
    state,
    getters,
    mutations
}
