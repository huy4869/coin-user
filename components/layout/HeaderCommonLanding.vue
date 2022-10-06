<template>
  <div>
    <div class="header header_landing">
      <div id="header_landing" class="container-header">
        <div class="header_left">
          <img src="~/assets/images/logo_header.svg" alt="" class="logo_header" @click="redirect('/')">
         <div class="lst_menu">
           <div class="title_nav title_nav_left" id="nav-item" @click="$router.push('/home')">{{ $t('header.dashboard') }}</div>
           <div class="title_nav title_nav_left" id="nav-item">{{ $t('header.eco') }}</div>
           <div class="title_nav title_nav_left" id="nav-item">{{ $t('header.product') }}</div>
           <div class="title_nav title_nav_left" id="nav-item">{{ $t('header.partner') }}</div>
         </div>
        </div>
        <div class="header_right">
          <template v-if="!$auth.loggedIn">
            <span class="title_nav" @click="$router.push('/login')">{{ $t('header.login') }}</span>
            <el-button class="btn_register" @click="$router.push('/register')">
              {{ $t('header.register') }}
            </el-button>
          </template>

          <div v-if="$auth.loggedIn" class="logout_div" @click="logout">
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
          <div class="nav_mobile">
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
            <div class="menu-mobile-alt ">
              <ul>
                <li @click="handeClick('/home')">
                  {{ $t('header.dashboard') }}
                </li>
                <li>
                  {{ $t('header.eco') }}
                </li>
                <li>
                  {{ $t('header.product') }}
                </li>
                <li>
                  {{ $t('header.partner') }}
                </li>
                <li v-if="$auth.loggedIn" @click="logout">
                  <img style="width: 18px; height: 18px; margin-right: 11px"
                       :src="require('@/assets/images/icons/logout.svg')" alt="logout">
                  {{ $t('header.logout') }}
                </li>
              </ul>
            </div>
            <div v-if="!$auth.loggedIn" class="header-main-actions-mobile flex">
              <el-button class="btn-mobile" @click="handeClick('/login')">
                {{ $t('header.login') }}
              </el-button>
              <el-button class="btn-mobile" @click="handeClick('/register')">
                {{ $t('header.register') }}
              </el-button>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
  </div>

</template>
<script>
import { mapState } from 'vuex'
import { AUTH_LOGOUT, INDEX_SET_LOADING, SET_LANGUAGE } from '@/store/store.const'

export default {
  name: 'HeaderCommon',
  data() {
    return {
      keyword: '',
      showModal: false,
      hideModal: false,
      cartCount: 0,
      user: {},
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
  computed: {
    ...mapState('authentication', {
      resetCartState: state => state.resetCartState,
      openModalLoginState: state => state.openModalLoginState
    })
  },
  watch: {},
  async created() {
    const dataLanguage = this.$cookies.get('lang') || 'en'
    this.languageActive = this.listLanguage.find(item => item.lang === dataLanguage)
    if (!this.languageActive) {
      this.languageActive = this.listLanguage.find(item => item.lang === 'en')
    }
    if (this.$auth.loggedIn) {
      await this.fetchData()
    }
  },
  mounted() {
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
    fetchData() {
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
    }
  }
}
</script>
