<template>
  <div>
    <div class="header header_home">
      <div class="container-header">
        <div class="node_left">
          <div class="token_div">
            <img src="~/assets/images/icons/menu/user_active.svg" alt="" class="w-100">
            <span class="token_title">{{ $t('header.node', { v: user ? user.total_node_buy : 0 }) }}</span>
          </div>
          <div id="header_left_home" class="header_left">
            <div class="token_div">
              <img src="~/assets/images/icons/logo_token.svg" alt="" class="w-100">
              <span class="token_title">{{ $t('header.token', { v: user ? user.coin_format : 0 }) }}</span>
            </div>
            <el-button class="btn_receive" @click="openReceive">{{ $t('header.receive') }}</el-button>
            <div class="token_div cmz_div">
              <img style="width: 24px; height: 24px" src="~/assets/images/icons/logo_transfer.svg" alt="" class="w-100">
              <div class="info_cmz">
                <span class="token_title">{{ $t('header.cmz', { v: cmz ? cmz : 0 }) }}</span>
                <span class="token_title">{{ $t('header.cmz_speed', { v: user ? user.cmz_speed : 0 }) }}</span>
              </div>
            </div>
            <el-tooltip class="item" effect="dark" content="After KYC" placement="bottom">
            <span>
              <el-button disabled="disabled" class="btn_transfer">{{ $t('header.transfer') }}</el-button>
            </span>
            </el-tooltip>
          </div>
        </div>
        <div class="header_left_home_mobile">
          <img
            v-if="!$device.isDesktop" src="~/assets/images/logo_header.svg" alt="" class="logo_header"
            @click="redirect('/')">
        </div>
        <div class="header_right">

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
                  <img src="~/assets/images/logo_header.svg" alt="">
                </a>
              </div>
              <label for="nav-mobile-input" class="icon-close">
                <img id="close_btn" src="@/assets/images/icons/close1.svg" alt="">
              </label>
            </div>
            <div class="hr-moblie"></div>
            <div class="menu-mobile-alt ">
              <ul>
                <li id="li-home" :class="{'is-active' : $route.path === '/home' }" @click="handeClick('/home')">
                  <img
                    style="width: 18px; height: 18px; margin-right: 11px"
                    :src="require('@/assets/images/icons/menu/home.svg')" alt="copy">{{ $t('home.home') }}
                </li>
                <li id="li-home" :class="{'is-active' : $route.path === '/team' }" @click="handeClick('/team')">
                  <img
                    style="width: 18px; height: 18px; margin-right: 11px"
                    :src="require('@/assets/images/icons/menu/team.svg')" alt="copy">{{ $t('home.team') }}
                </li>
                <li id="li-home" :class="{'is-active' : $route.path === '/predict' }" @click="handeClick('/predict')">
                  <img
                    style="width: 18px; height: 18px; margin-right: 11px"
                    :src="require('@/assets/images/icons/menu/predict.svg')" alt="copy">{{ $t('home.predict') }}
                </li>
                <li id="li-home" :class="{'is-active' : $route.path === '/predict-team' }" @click="handeClick('/predict-team')">
                  <img
                    style="width: 18px; height: 18px; margin-right: 11px"
                    :src="require('@/assets/images/icons/menu/vs.svg')" alt="copy">{{ $t('home.predict_team') }}
                </li>
                <li id="li-home" :class="{'is-active' : $route.path === '/setting' }" @click="handeClick('/setting')">
                  <img
                    style="width: 18px; height: 18px; margin-right: 11px"
                    :src="require('@/assets/images/icons/menu/user.svg')" alt="copy">{{ $t('home.setting') }}
                </li>
                <li id="li-home" :class="{'is-active' : $route.path === '/history' }" @click="handeClick('/history')">
                  <img
                    style="width: 18px; height: 18px; margin-right: 11px"
                    :src="require('@/assets/images/icons/menu/history.svg')" alt="copy">{{ $t('home.history') }}
                </li>
                <li
                  id="li-home" :class="{'is-active' : $route.path === '/direct-referrals' }"
                  @click="handeClick('/direct-referrals')">
                  <img
                    style="width: 18px; height: 18px; margin-right: 11px"
                    :src="require('@/assets/images/icons/menu/team.svg')" alt="copy">{{ $t('home.f1') }}
                </li>
                <li
                  id="li-home"
                  @click="openContact()">
                  <img
                    style="width: 18px; height: 18px; margin-right: 11px"
                    :src="require('@/assets/images/icons/menu/home.svg')" alt="copy">{{ $t('header.contact') }}
                </li>
                <li id="li-home" @click="logout">
                  <img
                    style="width: 18px; height: 18px; margin-right: 11px"
                    :src="require('@/assets/images/icons/logout.svg')" alt="copy">{{ $t('header.logout') }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
      <div v-if="$route.path === '/home'" class="header-left-mobile" style="display: none">
        <div class="token_div">
          <img src="~/assets/images/icons/logo_token.svg" alt="" class="w-100">
          <span class="token_title">{{ $t('header.token', { v: user ? user.coin_format : 0 }) }}</span>
        </div>
        <el-button class="btn_receive" @click="openReceive">{{ $t('header.receive') }}</el-button>
      </div>
      <div v-if="$route.path === '/home'" class="header-left-mobile" style="display: none">
        <div class="token_div cmz_div">
          <img style="width: 24px; height: 24px" src="~/assets/images/icons/logo_transfer.svg" alt="" class="w-100">
          <div class="info_cmz">
            <span class="token_title">{{ $t('header.cmz', { v: cmz ? cmz : 0 }) }}</span>
            <span class="token_title">{{ $t('header.cmz_speed', { v: user ? user.cmz_speed : 0 }) }}</span>
          </div>
        </div>
        <el-tooltip style="width: 46%" class="item" effect="dark" content="After KYC" placement="bottom">
            <span>
              <el-button disabled="disabled" class="btn_transfer">{{ $t('header.transfer') }}</el-button>
            </span>
        </el-tooltip>
      </div>
    </div>
    <el-dialog
      :center="true" :close-on-click-modal="false" :destroy-on-close="true"
      :show-close="true" :visible.sync="receiveModal" class="dialog-deposit">
      <modal-deposit
        :address="address"
        :memo="user.send_memo.toString()"
        @close="closeReceive()"/>
    </el-dialog>

    <el-dialog :visible.sync="dialogContact" top="5vh" class="dialog-contact" :center="true"
               :close-on-click-modal="false"
               :destroy-on-close="true">
      <contact-modal @close="dialogContact = false"/>
    </el-dialog>
  </div>

</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { USER_GET_USER_NODE } from '../../store/store.const'
import {
  AUTH_LOGOUT,
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  SET_LANGUAGE,
  USER_GET_CMZ,
  USER_GET_SYSTEM_WALLET
} from '@/store/store.const'
import ModalDeposit from '@/components/modals/modal-deposit'
import ContactModal from '@/components/modals/modal-contact'

export default {
  name: 'HeaderCommonHome',
  components: { ContactModal, ModalDeposit },
  data() {
    return {
      dialogContact: false,
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
      titleForgot: this.$t('modal_login.send_forgot_password'),
      cmz: 0,
      userNode: 0,
      timer: null
    }
  },
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
  watch: {},
  created() {
    const dataLanguage = this.$cookies.get('lang') || 'en'
    this.languageActive = this.listLanguage.find(item => item.lang === dataLanguage)
    if (!this.languageActive) {
      this.languageActive = this.listLanguage.find(item => item.lang === 'en')
    }
  },
  async mounted() {
    await this.init()
    await this.getCMZ()
    this.timer = setInterval(async() => {
      await this.getCMZ()
    }, 60000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    async handeClick(link) {
      await this.$router.push(link)
      document.getElementById('close_btn').click()
    },
    openContact() {
      this.dialogContact = true
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
      // await this.getUserNode()
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
    },
    async getCMZ() {
      try {
        const data = await this.$store.dispatch(USER_GET_CMZ)
        switch (data.status_code) {
          case 200:
            this.cmz = data.data.coin
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })
            break
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    },
    async getUserNode() {
      try {
        const data = await this.$store.dispatch(USER_GET_USER_NODE)
        switch (data.status_code) {
          case 200:
            this.userNode = data.data
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })
            break
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    }
  }
}
</script>
