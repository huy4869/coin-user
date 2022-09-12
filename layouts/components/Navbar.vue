<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <div class="right-menu">
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '../../components/Hamburger'
import { SET_LANGUAGE } from '../../store/store.const'

export default {
  name: 'NavBarComponent',
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ])
  },
  data() {
    return {
      user: this.$auth.user,
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
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    changePassword() {
      this.$router.push('/change-password')
    },
    changeSetting() {
      this.$router.push({ name: 'setting' })
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

<style lang="scss" scoped>
@import "assets/scss/variables";
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: $color-bg-navbar;
  box-shadow: inset 0px -1px 0px $color-dark-functional-300;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 14px;
      color: #11284D !important;
      vertical-align: text-bottom;

      .avatar-user {
        width: 35px;
        height: 35px;
        border-radius: 100rem;
        object-fit: cover;
        margin-right: 8px;
        border: 1px solid #97a8be;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: transparent;
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      display: flex;
      align-items: center;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 19px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
