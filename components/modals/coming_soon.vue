<template>
  <div class="coming-soon">
    <img src="~/assets/images/icons/close.svg" alt="" class="close_img" @click="$emit('close')">

    <img :src="require('~/assets/images/coming-soon/coin.png')" alt="" class="coin filter_img">
    <p class="title_home_coming">Chiliz Meta Zone</p>
    <p class="content">{{ $t('noti.coming') }}</p>
  </div>
</template>

<script>
export default {
  name: 'ComingSoonModal'
}
</script>

<style lang="scss" scoped>
@import "assets/scss/variables";

.title_home_coming {
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  align-items: center;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;

  color: $color-red-primary;
  -webkit-text-stroke: 1px $color-white;

}

</style>
