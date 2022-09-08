<template>
  <div :class="['body-content']">
    <client-only>
      <HeaderCommonAuth/>
      <NotificationBlock/>
      <div class="home">
        <nuxt/>
      </div>
      <LoadingBar/>
      <FooterCommonAuth/>
    </client-only>
  </div>
</template>

<script>
import HeaderCommonAuth from '../components/layout/HeaderCommonAuth'
import FooterCommonAuth from '../components/layout/FooterCommonAuth'
import LoadingBar from '../components/LoadingBar'
import NotificationBlock from '../components/block-ui/NotificationBlock'

export default {
  name: 'DefaultLayout',
  components: { HeaderCommonAuth, FooterCommonAuth, LoadingBar, NotificationBlock },
  mounted() {
    // this.$store.commit(INDEX_SET_LOADING, true)
  }
}
</script>
