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
      handleApi(resolve, reject, this.$axios.post(`/user`, params), context)
    })
  }
}
