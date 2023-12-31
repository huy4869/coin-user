import variables from '@/assets/scss/element-variables.scss'
import defaultSettings from '@/settings'

const { tagsView, fixedHeader, sidebarLogo, supportPinyinSearch } = defaultSettings

const state = {
  theme: variables.theme,
  showRightSidebar: false,
  tagsView,
  fixedHeader,
  sidebarLogo,
  supportPinyinSearch,
  rightComponent: null
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

