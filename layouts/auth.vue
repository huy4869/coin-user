<template>
  <div :class="['body-content']">
    <client-only>
      <HeaderCommonAuth/>
      <NotificationBlock/>
      <div class="home-auth">
        <nuxt/>
      </div>
      <LoadingBar/>
      <FooterCommonHome/>
    </client-only>
  </div>
</template>

<script>
import HeaderCommonAuth from '../components/layout/HeaderCommonAuth'
import LoadingBar from '../components/LoadingBar'
import NotificationBlock from '../components/block-ui/NotificationBlock'
import FooterCommonHome from '@/components/layout/FooterCommonHome'

export default {
  name: 'AuthLayout',
  components: { FooterCommonHome, HeaderCommonAuth, LoadingBar, NotificationBlock },
  mounted() {
    // this.$store.commit(INDEX_SET_LOADING, true)
  }
}
</script>
