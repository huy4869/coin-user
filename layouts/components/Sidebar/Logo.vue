<template>
  <div class="sidebar-logo-container " :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link flex justify-center text-center items-center" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo mg-auto">
        <h1 v-else class="sidebar-title mr-3">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link flex justify-center text-center items-center" to="/">
        <img v-if="logo_full" :src="logo_full" class="sidebar-logo">
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'chiliz',
      logo: require('@/assets/logo.svg'),
      logo_full: require('@/assets/logo_full.svg')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/scss/variables";
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: $height-header-home;
  line-height: 50px;
  background: $color-bg-navbar;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;

    & .sidebar-logo {
      width: 120px;
      height: 53px;
      vertical-align: middle;
      object-fit: contain;
    }
    & .sidebar-logo-amaisoft{
      width: 100%;
      height: 100%;
      padding: 4px 1.5rem;
    }

    & .sidebar-title {
      margin: 0;
      background: $color-white;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
      line-height: 50px;
      font-size: 24px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      //margin-right: 0px;
    }
  }
}
</style>
