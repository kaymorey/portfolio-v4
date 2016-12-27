import locales from '../../../static/api/locales'
import * as types from '../mutation-types'

const state = {
    all: locales,
    selected: locales[0]
}

const getters = {
    allLocales: state => state.all,
    selectedLocale: state => state.selected
}

const mutations = {
    [types.SET_LOCALE] (state, locale) {
        state.selected = locale
    }
}

export default {
    state,
    getters,
    mutations
}
