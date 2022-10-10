<template>
  <div class="congratulation_component">
    <el-button class="congratulation_text">{{ $t('open_box.congratulation') }}</el-button>
    <img src="~/assets/images/icons/close.svg" alt="" class="close_img" @click="close">
    <div class="lst_nft_opened_pc">
      <div class="lst_nft_opened">
        <div v-for="(item, index) in lstNft.slice(0, lstNft.length > 5 ? 5 : lstNft.length)" :key="index"
             class="bg_nft_item bg_nft_item_opened" data-aos="flip-left"
             data-aos-duration="2500">
          <div class="info_nft">
            <img :src="require('assets/images/predict/bg_nft'+item.level.toString()+'.svg')" alt=""
                 class="img_bg_nft">
            <span class="name_nft_congra" :class="'name_nft_'+item.level.toString()">{{ item.name }}</span>
            <img :src="item.logo" alt="" class="img_nation moveYShort">
          </div>
        </div>
      </div>
      <div v-if="lstNft.length > 5" class="lst_nft_opened">
        <div v-for="(item, index) in lstNft.slice(5)" :key="index" class="bg_nft_item bg_nft_item_opened"
             data-aos="flip-left"
             data-aos-duration="2500">
          <div class="info_nft">
            <img :src="require('assets/images/predict/bg_nft'+item.level.toString()+'.svg')" alt=""
                 class="img_bg_nft">
            <span class="name_nft_congra" :class="'name_nft_'+item.level.toString()">{{ item.name }}</span>
            <img :src="item.logo" alt="" class="img_nation moveYShort">
          </div>
        </div>

        <!--              <div v-for="index in 5" :key="index" class="bg_nft_item bg_nft_item_opened" data-aos="flip-left"-->
        <!--                   data-aos-duration="2500">-->
        <!--                <div class="info_nft">-->
        <!--                  <img src="~/assets/images/predict/bg_nft5.svg" alt="" class="img_bg_nft filter_img_red">-->
        <!--                  <span class="name_nft">sdfsdfdsfds</span>-->
        <!--                  <img src="~/assets/images/predict/nation.png" alt="" class="img_nation moveYShort">-->
        <!--                </div>-->
        <!--              </div>-->
      </div>
      <el-button class="btn_confirm" @click="close">{{ $t('open_box.confirm') }}</el-button>
    </div>

    <div class="lst_nft_opened_mobile">
      <div class="slide_nft_div">
        <VueSlickCarousel v-bind="slickOptions" class="row_nft">
          <div v-for="(item, index) in lstNft" :key="index" class="slide">
            <img :src="require('assets/images/predict/bg_nft'+item.level.toString()+'.svg')" alt=""
                 class="img_bg_nft_mobile filter_img_red">
            <span class="name_nft" :class="'name_nft_'+item.level.toString()">{{ item.name }}</span>
            <img :src="item.logo" alt="" class="img-nft-mobile img_nation moveYShort">
          </div>
          <!--          <div v-for="index in 6" :key="index" class="slide">-->
          <!--            <img src="~/assets/images/predict/bg_nft5.svg" alt=""-->
          <!--                 class="img_bg_nft_mobile filter_img_red">-->
          <!--            <span class="name_nft">asdas</span>-->
          <!--            <img-->
          <!--              src="~/assets/images/predict/nation.png"-->
          <!--              alt="" class="img-nft-mobile img_nation moveYShort"/>-->
          <!--          </div>-->
        </VueSlickCarousel>
      </div>

      <div class="summary_token">
        <div class="lst_row">
          <div v-for="(item, index) in lstNftUnique" :key="index" class="row_token">
            <span class="token_name">{{ index + 1 }}. {{ item.name }}</span>
            <span class="token_value">x{{ item.total }}</span>
          </div>
        </div>
        <el-button class="btn_confirm" @click="close">{{ $t('open_box.confirm') }}</el-button>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'ModalCongratulation',
  components: { VueSlickCarousel },
  props: ['lstNft', 'lstNftUnique'],
  data() {
    return {
      slickOptions: {
        dots: true,
        arrows: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 1000,
        pauseOnHover: true,
        touchMove: true,
        slidesToShow: 1,
        speed: 500,
        cssEase: 'linear',
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              speed: 500
            }
          }
        ]
      }
    }
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
