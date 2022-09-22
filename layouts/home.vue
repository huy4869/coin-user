<template>
  <div>
    <div class="eco_div_mobile">
      <img src="~/assets/images/eco2.png" alt=""
           class="eco_img_mobile">
      <img src="~/assets/images/eco1.png" alt=""
           class="eco_img_mobile">
      <img src="~/assets/images/eco3.png" alt="" class="eco_img_mobile">
    </div>
    <div :class="['body-content']">
      <client-only>
        <HeaderCommon/>
        <NotificationBlock/>
        <div class="home">
          <nuxt/>
        </div>
        <LoadingBar/>
        <FooterCommon/>
      </client-only>
    </div>
  </div>
</template>

<script>
import HeaderCommon from '../components/layout/HeaderCommonLanding'
import LoadingBar from '../components/LoadingBar'
import NotificationBlock from '../components/block-ui/NotificationBlock'
import FooterCommon from '~/components/layout/FooterCommonLanding'

export default {
  name: 'HomeLayout',
  components: { FooterCommon, LoadingBar, HeaderCommon, NotificationBlock },
  mounted() {
    document.querySelector('body').style.overflowX = 'hidden'

    // this.$store.commit(INDEX_SET_LOADING, true)
  }
}
</script>

<style lang="scss" scoped>
.eco_div_mobile {
  display: none;
}
</style>

