<template>
  <div>
    <div class="header">
      <div class="container-header">
        <div class="header-burger">
          <div v-click-outside="closeModal" class="icon-burger">
            <img class="cursor-pointer" src="/assets/images/icons/close-sidebar.svg" alt="" @click="showModal = true">
            <div>
              <div :class="['show-modal-panel-header', {'show-modal': showModal}, {'hide-modal': hideModal}]">
                <div class="title-page-div">
                  <span class="title-page"><img src="/assets/images/page.svg" alt=""></span>
                </div>
                <div v-for="(menu, index) in listMenu" :key="index" class="header-menu">
                  <div class="cursor-pointer" @click="changeToLink(menu.link)">
                    <img :src="menu.image" alt="">
                    <span :class="['menu-left', {'label-active': checkActiveMenu(menu.link)}]">{{ menu.title }}</span>
                  </div>
                  <div v-if="menu.key === 'account' && $auth.user" class="name-account">
                    <span>{{ $auth.user.name }}</span>
                  </div>
                </div>
                <div class="button-auth">
                  <button v-if="$auth.user" type="button" class="button-logout" @click="logout">{{
                      $t('logout')
                    }}
                  </button>
                  <button v-else class="button-login" type="button" @click="openModalLogin">{{ $t('login') }}</button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showModal && !modalLogin" class="modal-default"></div>
          <a @click="redirectHome" style="cursor: pointer">
            <span class="title-page"><img src="/assets/images/page.svg" alt=""></span>
          </a>
        </div>
        <div class="input-search-header">
          <div class="icon-left-search">
            <img class="cursor-pointer" src="/assets/images/icons/search.svg" alt="" @click="searchKeyword">
            <input v-model="keyword" type="text" class="input-search" :placeholder="$t('home.placeholder_search_input')"
                   @keyup.enter="searchKeyword">
          </div>
        </div>
        <div class="cart-header">
          <div class="icon-cart cursor-pointer" @click="showCart">
            <img src="/assets/images/icons/shopping-cart.svg" alt="">
            <span v-if="cartCount > 0" class="count-cart">{{ cartCount }}</span>
            <span class="name-cart">{{ $t('home.cart') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { mapState } from 'vuex'
import { AUTH_LOGOUT, INDEX_SET_LOADING } from '@/store/store.const'
import { textToHref } from '@/utils/utils'

export default {
  name: 'HeaderCommon',
  data() {
    return {
      keyword: '',
      showModal: false,
      hideModal: false,
      cartCount: 0,
      user: {},
      listMenu: [
        {
          key: 'account',
          title: this.$t('home.my_account'),
          image: '/assets/images/icons/user-avatar.svg',
          link: '/my_account'
        },
        {
          key: 'order',
          title: this.$t('home.my_order'),
          image: '/assets/images/icons/my-orders.svg',
          link: '/orders'
        },
        {
          key: 'list_seen',
          title: this.$t('home.list_seen'),
          image: '/assets/images/icons/clock.svg',
          link: '/product/old'
        },
        {
          key: 'list_like',
          title: this.$t('home.list_like'),
          image: '/assets/images/icons/favorite.svg',
          link: '/product/favorite'
        }
      ],
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
  watch: {
    async openModalLoginState() {
      await this.openModalLogin()
    },
    async resetCartState() {
      await this.fetchCart()
    }
  },
  async created() {
    if (this.$auth.loggedIn) {
      await this.fetchData()
      await this.fetchCart()
    }
  },
  mounted() {
    this.action()
  },
  methods: {
    closeModal() {
      this.showModal = false
      this.hideModal = false
    },
    checkActiveMenu(link) {
      return link === this.$route.fullPath
    },
    async openModalLogin() {
      this.modalLogin = true
      this.changeModal('login')
      await this.closeModal()
    },
    changeModal(state) {
      this.modalState = state
      this.addHashToLocation(state)
    },
    changeTitleModal(title) {
      switch (title.state) {
        case 'register':
          this.titleRegister = title.value
          break
        case 'forgot':
          this.titleForgot = title.value
          break
      }
    },
    closeModalLogin() {
      this.modalLogin = false
      this.addHashToLocation('')
    },
    searchKeyword() {
      const data = this.keyword
      this.keyword = ''
      this.$router.push({ path: '/search', query: { search: data }})
    },
    async changeToLink(link) {
      if (this.$auth.user) {
        await this.$router.push(link)
        await this.closeModal()
      } else {
        await this.openModalLogin()
      }
    },
    async logout() {
      this.$store.commit(INDEX_SET_LOADING, true)
      await this.$auth.logout()
      try {
        await this.$store.dispatch(AUTH_LOGOUT)
        this.fetchCart()
      } catch (e) {
      }
      await this.openModalLogin()
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    fetchData() {
    },
    addHashToLocation(params) {
      history.pushState(
        {},
        null,
        this.$route.path + (params ? textToHref(params) : '')
      )
    },
    action() {
      let modal = ''
      switch (this.$route.hash) {
        case '#login':
          modal = 'login'
          break
        case '#register':
          modal = 'register'
          break
        case '#forgot':
          modal = 'forgot'
          break
      }
      if (modal !== '') {
        this.openModalLogin()
        this.changeModal(modal)
      }
    },
    showCart() {
      if (this.$auth.loggedIn) {
        this.$router.push('/cart')
      } else {
        this.openModalLogin()
      }
    },
    redirectHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/')
      } else {
        window.location.reload()
      }
    }
  }
}
</script>
