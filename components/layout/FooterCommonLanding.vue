<template>
  <div class="footer">
    <div class="container-footer ">
      <div class="content">
        <div class="footer-left">
          <img src="~/assets/images/logo_header.svg" alt="" class="img_footer"
               @click="$router.push('/')">
          <div class="hr"></div>
          <span class="title_nav_footer">{{ $t('header.eco') }}</span>
          <span class="title_nav_footer">{{ $t('header.product') }}</span>
          <span class="title_nav_footer">{{ $t('header.partner') }}</span>
          <span class="title_nav_footer"
                @click="dialogContact=true">{{ $t('header.contact') }}</span>
        </div>
        <div class="footer-left-mobile">
          <div>
            <img src="~/assets/images/logo_header.svg" alt="" class="img_footer"
                 @click="$router.push('/')">
          </div>
          <div class="hr-moblie"></div>
          <div class="nav-item-mobile">
            <span class="title_nav_footer">{{ $t('header.eco') }}</span>
            <span class="title_nav_footer">{{ $t('header.product') }}</span>
            <span class="title_nav_footer">{{ $t('header.partner') }}</span>
            <span class="title_nav_footer"
                  @click="dialogContact=true">{{ $t('header.contact') }}</span>
          </div>
        </div>
        <div class="footer-right">
          <a href="https://www.facebook.com/chilizdotcom/" target="_blank"><img
            src="~/assets/images/icons/footer/face.svg" alt=""></a>
          <a href="https://twitter.com/chiliz" target="_blank"><img src="~/assets/images/icons/footer/twiiter.svg"
                                                                    alt=""></a>
          <a href="https://t.me/chiliz_io" target="_blank"><img src="~/assets/images/icons/footer/telegram.svg" alt=""></a>
          <a href="https://medium.com/chiliz" target="_blank"><img src="~/assets/images/icons/footer/medium.svg" alt=""></a>
          <a href="http://bit.ly/Chilizens" target="_blank"><img src="~/assets/images/icons/footer/discord.svg" alt=""></a>
          <a href="https://www.reddit.com/r/chiliz" target="_blank"><img src="~/assets/images/icons/footer/reddit.svg"
                                                                         alt=""></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>{{ $t('footer.copyright') }}</span>
    </div>
    <el-dialog :visible.sync="dialogContact" top="5vh" class="dialog-contact" :center="true"
               :close-on-click-modal="false" :destroy-on-close="true">
      <contact-modal @close="dialogContact = false"/>
    </el-dialog>
  </div>
</template>
<script>
import ContactModal from '@/components/modals/modal-contact'

export default {
  name: 'FooterCommon',
  components: { ContactModal },
  // eslint-disable-next-line vue/require-prop-types
  props: ['listMenu'],
  data() {
    return {
      dialogContact: false
    }
  }
}
</script>
