import _ from 'lodash'
import { handleApi } from '../utils/handleApi'
export const state = () => ({
  notifySuccess: { show: false, text: '' },
  notifyError: { show: false, text: '' },
  notifyWarning: { show: false, text: '' },
  language: '',
  loading: false
})

export const getters = {}

export const mutations = {
  setNotifySuccess(state, notify) {
    state.notifySuccess = _.cloneDeep(notify)
  },
  setNotifyError(state, notify) {
    state.notifyError = _.cloneDeep(notify)
  },
  setNotifyWarning(state, notify) {
    state.notifyWarning = _.cloneDeep(notify)
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setLanguage(state, language) {
    state.language = language
  }
}

export const actions = {
  getMasterData(context, resource) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/master-data?${resource}`), context)
    })
  },
  uploadFile(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/upload-image', data), context)
    })
  }
}
