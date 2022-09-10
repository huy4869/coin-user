<template>
  <div class="footer">
    <div class="container-footer container-footer-auth">
      <div class="content">
        <div class="footer-left">
          <img src="~/assets/images/logo_header.png" alt="" class="img_footer"
               @click="$router.push('/')">
          <div class="hr"></div>
          <span class="title_nav_footer">{{ $t('header.eco') }}</span>
          <span class="title_nav_footer">{{ $t('header.product') }}</span>
          <span class="title_nav_footer">{{ $t('header.partner') }}</span>
        </div>
        <div class="footer-right">
          <img src="~/assets/images/icons/footer/face.svg" alt="">
          <img src="~/assets/images/icons/footer/twiiter.svg" alt="">
          <img src="~/assets/images/icons/footer/telegram.svg" alt="">
          <img src="~/assets/images/icons/footer/medium.svg" alt="">
          <img src="~/assets/images/icons/footer/discord.svg" alt="">
          <img src="~/assets/images/icons/footer/reddit.svg" alt="">
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>{{ $t('footer.copyright') }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FooterCommon',
  // eslint-disable-next-line vue/require-prop-types
  props: ['listMenu'],
  data() {
    return {
      listMenuLeft: [
        {
          key: 'introduction',
          title: this.$t('home.footer.introduction'),
          link: '/'
        },
        {
          key: 'contact_customer',
          title: this.$t('home.footer.contact_customer'),
          link: '/'
        },
        {
          key: 'privacy',
          title: this.$t('home.footer.privacy'),
          link: '/'
        },
        {
          key: 'refund',
          title: this.$t('home.footer.refund'),
          link: '/'
        },
        {
          key: 'store',
          title: this.$t('home.footer.store'),
          link: '/'
        },
        {
          key: 'insurance',
          title: this.$t('home.footer.insurance'),
          link: '/'
        }
      ]
    }
  }
}
</script>
