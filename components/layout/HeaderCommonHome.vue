<template>
  <div>
    <div class="header header_home">
      <div class="container-header">
        <div class="header_left" id="header_left_home">
          <div class="token_div">
            <img src="~/assets/images/icons/logo_token.svg" alt="" class="w-100">
            <span class="token_title">{{ $t('header.token', { v: user ? user.coin : 0 }) }}</span>
          </div>
          <el-button class="btn_receive" @click="openReceive">{{ $t('header.receive') }}</el-button>
        </div>
        <div class="header_left_home_mobile">
          <img src="~/assets/images/logo_header.png" alt="" class="logo_header" @click="redirect('/')">
        </div>
        <div class="header_right">

          <el-dropdown class="cursor-pointer d-flex lang_div" trigger="click" placement="bottom-start">
            <span class="img_lang">
              <img class="image-language" :src="languageActive.icon" alt="">
              <img class="image-dropdown" src="~/assets/images/icons/arrow_down.svg" alt="">
            </span>
            <template #dropdown>
              <el-dropdown-menu class="dropdown-language">
                <el-dropdown-item v-for="(language, index) in listLanguage" :key="index" :command="index">
                  <div class="select-language d-flex" @click="changeLanguage(language)">
                    <img :src="language.icon" alt="">
                    <div class="language-name pd-l-10">{{ language.name }}</div>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="logout_div" @click="logout">
            <img src="~/assets/images/icons/logout.svg" alt="" class="img_logout">
            <span class="logout_title">{{ $t('header.logout') }}</span>
          </div>
        </div>
        <!--  -->
        <div class="header-main-menu-mobile">
          <label for="nav-mobile-input">
            <div class="menu-mobile pointer">
              <img src="@/assets/images/icons/menu.svg" alt="">
            </div>
          </label>
          <input id="nav-mobile-input" type="checkbox" name="" hidden class="nav-input">
          <label for="nav-mobile-input" class="nav-overlay"></label>
          <div class="nav_mobile" style="position: fixed !important">
            <div class="flex justify-between items-center menu-mobile-top ">
              <div class="img-logo">
                <a href="/">
                <img src="~/assets/images/logo_header.png" alt="">
                </a>
              </div>
              <label for="nav-mobile-input" class="icon-close">
                <img id="close_btn" src="@/assets/images/icons/close1.svg" alt="">
              </label>
            </div>
            <div class="hr-moblie"></div>
            <div class="menu-mobile-alt ">
              <ul>
                <li id="li-home" @click="handeClick('/home')" :class="{'is-active' : $route.path === '/home' }">
                <img style="width: 18px; height: 18px; margin-right: 11px" :src="require('@/assets/images/icons/menu/home.svg')" alt="copy">{{ $t('home.home') }}</li>
                <li id="li-home" @click="handeClick('/team')" :class="{'is-active' : $route.path === '/team' }">
                <img style="width: 18px; height: 18px; margin-right: 11px" :src="require('@/assets/images/icons/menu/team.svg')" alt="copy">{{ $t('home.team') }}</li>
                <li id="li-home" @click="handeClick('/setting')" :class="{'is-active' : $route.path === '/setting' }">
                <img style="width: 18px; height: 18px; margin-right: 11px" :src="require('@/assets/images/icons/menu/user.svg')" alt="copy">{{ $t('home.setting') }}</li>
                <li id="li-home" @click="logout">
                <img style="width: 18px; height: 18px; margin-right: 11px" :src="require('@/assets/images/icons/logout.svg')" alt="copy">{{ $t('header.logout') }}</li>
              </ul>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
      <div v-if="$route.path === '/home'" class="header-left-mobile" style="display: none">
        <div class="token_div">
          <img src="~/assets/images/icons/logo_token.svg" alt="" class="w-100">
          <span class="token_title">{{ $t('header.token', { v: user ? user.coin : 0 }) }}</span>
        </div>
        <el-button class="btn_receive" @click="openReceive">{{ $t('header.receive') }}</el-button>
      </div>
    </div>
    <el-dialog
      :center="true" :close-on-click-modal="false" :destroy-on-close="true"
      :show-close="true" :visible.sync="receiveModal" class="dialog-deposit">
      <modal-deposit
        :address="address"
        :memo="user.memo"
        @close="closeReceive()"/>
    </el-dialog>
  </div>

</template>
<script>
import { mapGetters, mapState } from 'vuex'
import {
  AUTH_LOGOUT,
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  SET_LANGUAGE,
  USER_GET_SYSTEM_WALLET
} from '@/store/store.const'
import ModalDeposit from '@/components/modals/modal-deposit'

export default {
  name: 'HeaderCommonHome',
  components: { ModalDeposit },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ]),
    ...mapState('authentication', {
      resetCartState: state => state.resetCartState,
      openModalLoginState: state => state.openModalLoginState
    })
  },
  data() {
    return {
      keyword: '',
      showModal: false,
      hideModal: false,
      receiveModal: false,
      user: this.$auth.user,
      address: '',
      listLanguage: [
        {
          id: 1,
          name: 'English',
          lang: 'en',
          icon: require('~/assets/images/english.svg')
        },
        {
          id: 2,
          name: 'Tiếng Việt',
          lang: 'vi',
          icon: require('~/assets/images/vietnam.svg')
        }
      ],
      languageActive: {
        id: 1,
        name: 'English',
        icon: require('~/assets/images/english.svg')
      },
      modalLogin: false,
      modalState: 'login',
      titleRegister: this.$t('register_account'),
      titleForgot: this.$t('modal_login.send_forgot_password')
    }
  },
  watch: {},
  async mounted() {
    await this.init()
  },
  methods: {
    async handeClick(link) {
      await this.$router.push(link)
      document.getElementById('close_btn').click()
    },
    async logout() {
      this.$store.commit(INDEX_SET_LOADING, true)
      await this.$auth.logout()
      try {
        await this.$store.dispatch(AUTH_LOGOUT)
        this.$router.push('/')
      } catch (e) {
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    async init() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      await this.getSystemWallet()
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    changeLanguage(language) {
      if (this.$i18n.locale !== language.lang) {
        this.$i18n.locale = language.lang
        this.languageActive = language
        this.$store.commit(SET_LANGUAGE, language.lang)
        this.$cookies.set('lang', language.lang)
        // window.location.reload()
      }
    },
    redirect(url) {
      this.$router.push(url)
    },
    closeReceive() {
      this.receiveModal = false
    },
    async openReceive() {
      await this.getSystemWallet()
      this.receiveModal = true
    },
    async getSystemWallet() {
      try {
        const data = await this.$store.dispatch(USER_GET_SYSTEM_WALLET)
        switch (data.status_code) {
          case 200:
            this.address = data.data.address
            break
          case 422:
            for (const [key] of Object.entries(data.data)) {
              this.error = { key, value: data.data[key][0] }
            }
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })
            break
        }
      } catch (err) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    }
  }
}
</script>
