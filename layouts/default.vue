<template>
  <div :class="classObj" class="app-wrapper">
    <client-only>
      <sidebar class="sidebar-container"/>
      <div class="main-container">
        <header-common-home/>
        <NotificationBlock/>
        <div class="home-sidebar" :class="getBg">
          <nuxt/>
        </div>
        <LoadingBar/>
        <footer-common-home/>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoadingBar from '../components/LoadingBar'
import NotificationBlock from '../components/block-ui/NotificationBlock'
import HeaderCommonHome from '../components/layout/HeaderCommonHome'
import FooterCommonHome from '../components/layout/FooterCommonHome'
import Sidebar from './components/Sidebar'

export default {
  name: 'DefaultLayout',
  components: { FooterCommonHome, HeaderCommonHome, Sidebar, LoadingBar, NotificationBlock },
  computed: {
    ...mapState({
      sidebar: state => state.sidebar,
      device: state => state.device,
      bgType: state => state.bgType
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    getBg() {
      let temp = ''
      switch (this.bgType) {
        case 'home':
          temp = 'bg_home'
          break
        case 'setting':
          temp = 'bg_setting'
          break
        case 'predict':
          temp = 'bg_predict'
          break
        default:
          temp = 'bg_home'
      }

      return temp
    }
  },
  mounted() {
    // this.$store.commit(INDEX_SET_LOADING, true)
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
@import "../assets/scss/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}

footer {
  font-size: .875rem;
  padding-left: 20px;
  border-top: 1px solid $color-text-5;
  //position: fixed;
  //bottom: 0;
  background: $color-white;
  //width: calc(100% - 250px);
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 40px;
}
</style>
