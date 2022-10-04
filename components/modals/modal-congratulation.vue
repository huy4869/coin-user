<template>
  <div class="congratulation_component">
    <el-button class="congratulation_text">{{ $t('open_box.congratulation') }}</el-button>
    <img src="~/assets/images/icons/close.svg" alt="" class="close_img" @click="close">
    <div class="lst_nft_opened">
      <div v-for="(item, index) in lstNft" :key="index" class="bg_nft_item bg_nft_item_opened" data-aos="flip-left"
           data-aos-duration="2500">
        <div class="info_nft">
          <img src="~/assets/images/predict/bg_nft.svg" alt="" class="img_bg_nft filter_img_red">
          <span class="name_nft">{{ item.name }}</span>
          <img :src="item.logo" alt="" class="img_nation moveYShort">
        </div>
      </div>

    </div>
    <el-button class="btn_confirm" @click="close">{{ $t('open_box.confirm') }}</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ModalCongratulation',
  props: ['lstNft'],
  data() {
    return {}
  },
  computed: {
    ...mapState(['loading'])
  },
  mounted() {
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }

}
</script>
