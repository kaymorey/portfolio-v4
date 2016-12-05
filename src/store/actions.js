import portfolio from '../../static/api/portfolio'
import * as types from './mutation-types'

export const getAllProjects = ({commit, state}) => {
    portfolio.getProjects(state.locales.selected, projects => {
        commit(types.RECEIVE_PROJECTS, projects)
    })
}
