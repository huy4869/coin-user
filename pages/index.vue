<template>
  <div class="landing_component">
    <section class="bg_video">
      <!--      <video class="video_goal" autoplay loop muted>-->
      <!--        <source src="~/assets/video/messi.mp4" type="video/mp4">-->
      <!--        Your browser does not support HTML video.-->
      <!--      </video>-->
      <!--      <img src="~/assets/images/landing/bg1.png" alt="" class="img_bg_1">-->

      <div class="text_des_div" data-aos="fade-up" data-aos-duration="1500">
        <div class="title_div_1">
          <img src="~/assets/images/landing/text1.png" alt="" class="bg_text bg_text_1"
               data-aos="fade-up" data-aos-duration="1500" data-aos-easing="linear">
          <h1 class="title_home">{{ $t('landing.title') }}</h1>
        </div>
        <h3 class="sub_title_home">{{ $t('landing.sub_title') }}</h3>
        <el-button class="btn_app" @click="dialogComingSoon=true">
          {{ $t('landing.app') }}
        </el-button>
      </div>
    </section>
    <!--    <div class='stars'></div>-->
    <!--    <div class='stars2'></div>-->
    <!--    <div class='stars3'></div>-->

    <section class="bg_eco">
      <div class="title_div_1">
        <img src="~/assets/images/landing/text2.png" alt="" class="bg_text"
             data-aos="fade-up" data-aos-duration="1500" data-aos-easing="linear">
        <h1 class="title_home">{{ $t('landing.eco') }}</h1>
      </div>
      <div class="eco_home">
        <div class="eco_left" data-aos="fade-up-right" data-aos-duration="1500">
          <div class="eco_content_div" data-aos="fade-up-right" data-aos-duration="1500">
            <a href="https://www.chiliz.net/" target="_blank"><img src="~/assets/images/eco1.png" alt=""
                                                                   class="eco_img"></a>
            <div class="download">
              <a href="https://play.google.com/store/apps/details?id=net.chiliz.broker.android" target="_blank"><img
                src="~/assets/images/chplay.png" alt="" class="eco_img"></a>
              <a href="https://apps.apple.com/vn/app/chiliz-exchange/id1493980225" target="_blank"><img
                src="~/assets/images/ios.png" alt="" class="eco_img"></a>
            </div>
            <a href="https://www.socios.com/" target="_blank"><img src="~/assets/images/eco2.png" alt=""
                                                                   class="eco_img"></a>
            <img src="~/assets/images/eco3.png" alt="" class="eco_img">
          </div>
        </div>

        <div class="eco_center" data-aos="fade-up" data-aos-duration="1500">
          <div class="bg_nft">
            <div class="nft_div">
              <img
                src="~/assets/images/cup_logo.png" alt="" class="cup_img filter_img" data-aos="fade-up"
                data-aos-duration="1500"/>
              <img src="~/assets/gif/nft.gif" alt="" class="img_nft">
            </div>
          </div>
        </div>

        <div class="eco_right" data-aos="fade-up-left" data-aos-duration="1500">
          <img src="~/assets/images/messi.png" alt="" class="img_messi">
        </div>
      </div>
    </section>

    <section class="system_div_component">
      <div class="title_div_1 title_div_system">
        <img src="~/assets/images/landing/text3.png" alt="" class="bg_text bg_text_system"
             data-aos="fade-up" data-aos-duration="1500" data-aos-easing="linear">
        <h1 class="title_home">{{ $t('landing.system') }}</h1>
      </div>
      <div class="title_system_div">
        <h3 class="sub_system_title work-break">{{ $t('landing.sub_system') }}</h3>
      </div>

      <div class="system_main_div">
        <img src="~/assets/images/coin_system1.png" alt="" class="coin_system1_top filter_img">

        <img src="~/assets/images/coin_system.png" alt="" class="coin_system filter_img">
        <div class="content">
          <div class="system_div system_left" data-aos="fade-up-right" data-aos-duration="1500">
            <span class="system_div_title">{{ $t('landing.total_user') }}</span>
            <span class="system_div_title">562,345</span>
            <img src="~/assets/images/system1.png" alt="" class="w-100 pt-20">
          </div>
          <div class="system_div system_right" data-aos="fade-up-left" data-aos-duration="1500">
            <span class="system_div_title">{{ $t('landing.total_chz') }}</span>
            <span class="system_div_title">6,325,435 CHZ</span>
            <img src="~/assets/images/system2.png" alt="" class="w-100 pt-20">
          </div>
        </div>
      </div>
      <div class="coin_system_div">
        <img src="~/assets/images/coin_system1.png" alt="" class="coin_system1_bottom filter_img">
        <img src="~/assets/images/coin_system2.png" alt="" class="coin_system1 filter_img">
      </div>
      <div class="enter_app">
        <el-button class="enter_app_btn" @click="dialogComingSoon=true">{{ $t('landing.app') }}</el-button>
      </div>
    </section>
    <section class="product_component">
      <div class="title_div_1 title_div_product">
        <img src="~/assets/images/landing/text4.png" alt="" class="bg_text bg_text_system"
             data-aos="fade-up" data-aos-duration="4500" data-aos-easing="linear">
        <h1 class="title_home">{{ $t('landing.product') }}</h1>
      </div>
      <div class="lst_product_div">
        <div @click="dialogComingSoon=true" data-aos="fade-up-right" class="product_div bg_pr_1">
          <el-button class="btn_product">{{ $t('landing.p1') }}</el-button>
          <div class="img_top img_top_div">
            <img src="~/assets/images/landing/ball_red.svg" alt="" class="img_ball">
            <img src="~/assets/images/landing/vs.svg" alt="" class="">
            <img src="~/assets/images/landing/ball_blue.svg" alt="" class="img_ball">
          </div>
        </div>
        <div @click="dialogComingSoon=true" data-aos="fade-up" class="product_div bg_pr_2">
          <el-button class="btn_product">{{ $t('landing.p2') }}</el-button>
          <div class="img_top_div img_cup">
            <!--            <img src="~/assets/images/landing/cup1.png" alt="" class="img_cup_1">-->
            <img src="~/assets/images/landing/cup1.svg" alt="" class="img_cup_1">
            <div class="img_cup_under">
              <img src="~/assets/images/landing/cup2.png" alt="" class="">
              <img src="~/assets/images/landing/cup3.png" alt="" class="">
            </div>
          </div>
        </div>
        <div @click="dialogComingSoon=true" data-aos="fade-up-left" class="product_div bg_pr_3">
          <el-button class="btn_product">{{ $t('landing.p3') }}</el-button>
          <div class="tex-center img_top_div img_jackpot">
            <div class="arrow_jackpot">
              <img src="~/assets/images/landing/arrow_jackpot.svg" alt="" class="w-100 filter_img">
            </div>
            <div class="jackpot">
              <img src="~/assets/images/landing/jackpot.svg" alt="" class="h-100 w-100 filter_img">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="roadmap_component">
      <div class="title_div_1 title_div_roadmap">
        <img src="~/assets/images/landing/text5.png" alt="" class="bg_text bg_text_system"
             data-aos="fade-up" data-aos-duration="5500" data-aos-easing="linear">
        <h1 class="title_home">{{ $t('landing.roadmap') }}</h1>
      </div>
      <div class="main_roadmap">
        <img src="~/assets/images/landing/roadmap.svg" alt="" class="img_roadmap">

        <img src="~/assets/images/landing/q1.svg" alt="" class="q1 img_q">
        <img src="~/assets/images/landing/q2.svg" alt="" class="q2 img_q">
        <img src="~/assets/images/landing/q3.svg" alt="" class="q3 img_q">
        <img src="~/assets/images/landing/q4.svg" alt="" class="q4 img_q">
      </div>
    </section>

    <section class="partner_component">
      <div class="title_div_1 title_div_partner">
        <img src="~/assets/images/landing/text6.png" alt="" class="bg_text bg_text_system"
             data-aos="fade-up" data-aos-duration="5500" data-aos-easing="linear">
        <h1 class="title_home">{{ $t('landing.partner') }}</h1>
      </div>
      <div v-if="$device.isMobile" class="div_main_partner">
        <div v-for="(size, row) in lstLengthRow" :key="row">
          <VueSlickCarousel v-bind="slickOptions" :rtl="row % 2 === 0" class="row_partner">
            <div v-for="index in size" :key="index" class="slide">
              <img
                :src="require('@/assets/images/partner/row'+Number(Math.floor(row / 2) + 1)+'/p'+Number(index + lstLengthRowBefore[row])+'.png')"
                alt="" class="img-partner"/>
            </div>
            <div v-for="index in size" :key="index" class="slide">
              <img
                :src="require('@/assets/images/partner/row'+Number(Math.floor(row / 2) + 1)+'/p'+Number(index + lstLengthRowBefore[row])+'.png')"
                alt="" class="img-partner"/>
            </div>
          </VueSlickCarousel>
        </div>
      </div>

      <div v-else class="div_main_partner">
        <div v-for="(size, row) in lstLengthRow" :key="row">
          <VueSlickCarousel v-bind="slickOptions" :rtl="row % 2 === 0" class="row_partner">
            <div v-for="index in size" :key="index" class="slide">
              <img
                :src="require('@/assets/images/partner/row'+Number(row+1)+'/p'+Number(index + lstLengthRowBefore[row])+'.png')"
                alt="" class="img-partner"/>
            </div>
            <div v-for="index in size" :key="index" class="slide">
              <img
                :src="require('@/assets/images/partner/row'+Number(row+1)+'/p'+Number(index + lstLengthRowBefore[row])+'.png')"
                alt="" class="img-partner"/>
            </div>
          </VueSlickCarousel>
        </div>
      </div>

      <img src="~/assets/images/landing/mask.png" alt="" class="mask">
    </section>

    <el-dialog :visible.sync="dialogComingSoon" top="5vh" class="dialog-coming-soon" :center="true">
      <coming-soon-modal @close="dialogComingSoon = false"/>
    </el-dialog>
  </div>
</template>

<script>
import ComingSoonModal from '@/components/modals/coming_soon'

export default {
  name: 'IndexPage',
  components: { ComingSoonModal },
  layout: 'home',
  data() {
    return {
      slickOptions1: {},
      slickOptions2: {},
      slickOptions3: {},
      slickOptions4: {},
      slickOptions: {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1,
        pauseOnHover: true,
        touchMove: false,
        slidesToShow: 16,
        speed: 4000,
        cssEase: 'linear',
        responsive: [
          {
            breakpoint: 1300,
            settings: {
              autoplay: true,
              slidesToShow: 10
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 6
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5,
              speed: 3000
            }
          }
        ]
      },
      lstLengthRow: this.$device.isMobile ? [8, 8, 7, 8, 8, 8, 7, 8] : [16, 15, 16, 15],
      lstLengthRowBefore: this.$device.isMobile ? [0, 8, 16, 23, 31, 39, 47, 54] : [0, 16, 31, 47],
      countPartner: 0,
      htmlRow1: '',
      htmlRow2: '',
      htmlRow3: '',
      htmlRow4: '',
      dialogComingSoon: false
    }
  },
  created() {
  }, methods: {}
}
</script>
