import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {},
  token: null,
  permissions: {},
  roles: [],
  appCode: 'CJK2233448',
  application: {},
  organisation: {},
  organisations: []
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  },
  setPermissions (state, permissions) {
    state.permissions = permissions
  },
  setRoles (state, roles) {
    state.roles = roles
  },
  setApplication (state, app) {
    state.application = app
  },
  setOrganisation (state, organisation) {
    state.organisation = organisation
  },
  setOrganisations (state, organisations) {
    state.organisations = organisations
  }
}

const getters = {
  getUser () {
    return state.user
  },
  getToken () {
    return state.token
  },
  getPermissions () {
    return state.permissions
  },
  getRoles () {
    return state.roles
  },
  getApplication () {
    return state.application
  },
  getOrganisation () {
    return state.organisation
  },
  getOrganisations () {
    return state.organisations
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
