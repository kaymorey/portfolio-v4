import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        locale: 'fr-FR'
    },
    mutations: {
        setLocale (state, payload) {
            state.locale = payload.locale
        }
    }
})

export default store
