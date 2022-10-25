import { handleApi } from '@/utils/handleApi'

export const state = () => ({})

export const actions = {
  getLstDate(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/leagues/matches/date-filter'), context)
    })
  },
  getLstMatch(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/leagues/matches/date?filter_date=${data}`), context)
    })
  },
  voteTeam(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/predictions/match`, data), context)
    })
  },
  checkExpired(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/leagues/matches/${id}/is_expire`), context)
    })
  },
  getDetailMatch(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/leagues/matches/${data}`), context)
    })
  },
  getLstStatus(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/predictions/option`), context)
    })
  },
  getHistories(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/predictions?' + new URLSearchParams(query).toString()), context)
    })
  }
}
