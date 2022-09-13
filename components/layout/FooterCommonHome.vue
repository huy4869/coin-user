<template>
  <div class="footer footer_home">
    <div class="footer-bottom">
      <span>{{ $t('footer.copyright') }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FooterCommonHome',
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
