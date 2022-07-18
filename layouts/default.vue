<template>
  <div>
    <HeaderCommon />
    <NotificationBlock />
    <div class="home">
      <nuxt />
    </div>
    <div v-if="$route.path === '/'">
      <div class="home_background">
        <div class="home_service">
          <ServiceCommon />
        </div>
      </div>
      <div class="home_service">
        <RegisterCommon />
      </div>
    </div>
    <LoadingBar />
  </div>
</template>

<script>
import HeaderCommon from '../components/layout/HeaderCommon'
import LoadingBar from '../components/LoadingBar'
import NotificationBlock from '../components/block-ui/NotificationBlock'
import ServiceCommon from '../components/home/ServiceCommon'
import RegisterCommon from '../components/home/RegisterCommon'

export default {
  name: 'DefaultLayout',
  components: { LoadingBar, HeaderCommon, NotificationBlock, ServiceCommon, RegisterCommon },
  async fetch() {
    await this.fetchDataCategory()
  }
}
</script>
