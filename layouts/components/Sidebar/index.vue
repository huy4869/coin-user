<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :class="[{ activeMenu : 'font-bold' }]"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="menu in lstMenu" :key="menu.id" :item="menu" :base-path="menu.path"/>
        <div class="toggle_sidebar">
          <el-menu-item>
            <hamburger
              id="hamburger-container"
              :is-active="sidebar.opened"
              class="hamburger-container"
              @toggleClick="toggleSideBar"
            />
          </el-menu-item>
        </div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '../../../components/Hamburger'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/scss/variables.scss'

export default {
  name: 'SidebarComponent',
  components: { SidebarItem, Logo, Hamburger },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      lstMenu: [
        {
          id: 0,
          icon: 'home.svg',
          icon_active: 'home_active.svg',
          path: '/home',
          title: this.$t('home.home'),
          active: true,
          hidden: false
        },
        {
          id: 1,
          icon: 'team.svg',
          icon_active: 'team_active.svg',
          path: '/team',
          title: this.$t('home.team'),
          active: false,
          hidden: false
        },
        {
          id: 2,
          icon: 'predict.svg',
          icon_active: 'predict_active.svg',
          path: '/predict',
          title: this.$t('home.predict'),
          active: false,
          hidden: false
        },
        {
          id: 3,
          icon: 'user.svg',
          icon_active: 'user_active.svg',
          path: '/setting',
          title: this.$t('home.setting'),
          active: false,
          hidden: false
        }, {
          id: 4,
          icon: 'history.svg',
          icon_active: 'history_active.svg',
          path: '/history',
          title: this.$t('home.history'),
          active: false,
          hidden: false
        },
        {
          id: 5,
          icon: 'team.svg',
          icon_active: 'team_active.svg',
          path: '/direct-referrals',
          title: this.$t('home.f1'),
          active: false,
          hidden: false
        }
      ]
    }
  },
  methods: {
    activeMenuClick(menu) {
      this.lstMenu.forEach((item) => {
        item.active = item.id = menu.id
      })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>
