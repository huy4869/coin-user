import { handleApi } from '@/utils/handleApi'

export const state = () => ({
  roles: [],
  permissions: [],
  openModalLoginState: true,
  resetCartState: true
})

export const mutations = {
  setRoles(state, roles) {
    state.roles = roles
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  }
}

export const actions = {
  getWallet(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/wallets/system'), context)
    })
  },
  update(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/profile`, params), context)
    })
  },
  updatePass(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/auth/change-password`, params), context)
    })
  },
  getLstTeam(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/profile/nodes'), context)
    })
  },
  getTreeByTeam(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/profile/nodes/${data}`), context)
    })
  },
  getHistory(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/profile/history?' + new URLSearchParams(query).toString()), context)
    })
  },
  getCMZ(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/cmz'), context)
    })
  },
  getUserNode(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/cmz'), context)
    })
  },
  getTransactionType(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/profile/history-types'), context)
    })
  },
  getF1(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/presenter?' + new URLSearchParams(query).toString()), context)
    })
  },
  getListTokenOpened(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/tokens'), context)
    })
  },
  getWalletMystery(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/wallets/mystery'), context)
    })
  },
  openBox(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/mystery-box/open`, data,
        {
          headers: { 'Access-Control-Allow-Origin': '*' }
        }), context)
    })
  },
  getInfoNft(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/mystery-box/count'), context)
    })
  }

}
