<template>
  <div :class="['body-content']">
    <client-only>
      <HeaderCommonAuth/>
      <NotificationBlock/>
      <div class="home-auth" :class="getBg">
        <nuxt/>
      </div>
      <LoadingBar/>
      <FooterCommonHome/>
    </client-only>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HeaderCommonAuth from '../components/layout/HeaderCommonAuth'
import LoadingBar from '../components/LoadingBar'
import NotificationBlock from '../components/block-ui/NotificationBlock'
import FooterCommonHome from '@/components/layout/FooterCommonHome'

export default {
  name: 'AuthLayout',
  components: { FooterCommonHome, HeaderCommonAuth, LoadingBar, NotificationBlock },
  computed: {
    ...mapState(['bgType']),
    getBg() {
      let temp = ''
      switch (this.bgType) {
        case 'login':
          temp = 'bg_login'
          break
        case 'register':
          temp = 'bg_register'
          break
        case 'auth':
          temp = 'bg_auth'
          break
        default:
          temp = 'bg_auth'
      }

      return temp
    }
  },
  mounted() {
    // this.$store.commit(INDEX_SET_LOADING, true)
  }
}
</script>
