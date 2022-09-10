<template>
  <div class="landing_component">
    <div class='stars'></div>
    <div class='stars2'></div>
    <div class='stars3'></div>
    <section class="bg_video">
      <video class="video_goal" autoplay loop muted>
        <source src="~/assets/video/bg.mp4" type="video/mp4">
        Your browser does not support HTML video.
      </video>

      <div class="text_des_div" data-aos="fade-up" data-aos-duration="1500">
        <h1 class="title_home">{{ $t('landing.title') }}</h1>
        <h3 class="sub_title_home title--glitch" :data-text="$t('landing.sub_title')">{{ $t('landing.sub_title') }}</h3>
      </div>
    </section>

    <section class="bg_eco">
      <div class="eco_home">
        <div class="eco_left">
          <div class="title_left_div">
            <div class="red_hr"></div>
            <span class="eco_title title--glitch" :data-text="$t('landing.eco')">{{ $t('landing.eco') }}</span>
          </div>
          <div class="eco_content_div" data-aos="fade-up-right" data-aos-duration="1500">
            <a href="https://www.chiliz.net/" target="_blank"><img src="~/assets/images/eco1.png" alt="" class="eco_img"></a>
            <div class="download">
              <a href="https://play.google.com/store/apps/details?id=net.chiliz.broker.android" target="_blank"><img src="~/assets/images/chplay.png" alt="" class="eco_img"></a>
              <a href="https://apps.apple.com/vn/app/chiliz-exchange/id1493980225" target="_blank"><img src="~/assets/images/ios.png" alt="" class="eco_img"></a>
            </div>
            <a href="https://www.socios.com/" target="_blank"><img src="~/assets/images/eco2.png" alt="" class="eco_img"></a>
            <img src="~/assets/images/eco3.png" alt="" class="eco_img">
          </div>
        </div>
        <div class="eco_right" data-aos="fade-up-left" data-aos-duration="1500">
          <img src="~/assets/images/messi.png" alt="" class="img_messi">
        </div>
      </div>
    </section>

    <section class="bg_nft">
      <img src="~/assets/images/list_nft.png" alt="" class="list_nft filter_img">
      <div class="nft_div">
        <img
          src="~/assets/images/cup_logo.png" alt="" class="cup_img pulse filter_img" data-aos="fade-up"
          data-aos-duration="1500"/>
        <div class="gift_div">
          <img src="~/assets/images/box.png" alt="" class="box shake">
          <img src="~/assets/images/under_gift.png" alt="" class="under_gift filter_img">
        </div>
      </div>
    </section>

    <section class="system_div_component">
      <div class="title_system_div">
        <h1 class="system_title title--glitch" :data-text="$t('landing.system')">{{ $t('landing.system') }}</h1>
        <h3 class="sub_system_title work-break">{{ $t('landing.sub_system') }}</h3>
      </div>

      <div class="system_main_div">
        <img src="~/assets/images/coin_system.png" alt="" class="coin_system filter_img">
        <div class="content">
          <div class="system_div system_left" data-aos="fade-up-right" data-aos-duration="1500">
            <span class="system_div_title">{{ $t('landing.total_user') }}</span>
            <span class="system_div_title">10,000,000</span>
            <img src="~/assets/images/system1.png" alt="" class="w-100 pt-20">
          </div>
          <div class="system_div system_right" data-aos="fade-up-left" data-aos-duration="1500">
            <span class="system_div_title">{{ $t('landing.total_chz') }}</span>
            <span class="system_div_title">100,000,000 CHZ</span>
            <img src="~/assets/images/system2.png" alt="" class="w-100 pt-20">
          </div>
        </div>
        <div class="enter_app">
          <el-button class="enter_app_btn">{{ $t('landing.app') }}</el-button>
        </div>
      </div>
      <img src="~/assets/images/coin_system1.png" alt="" class="coin_system1 filter_img">

    </section>
    <section class="product_component">
      <h1 class="title_product title--glitch" :data-text="$t('landing.product')">{{ $t('landing.product') }}</h1>
      <div class="lst_product_div">
        <div data-aos="fade-up-right" class="product_div bg_pr_1">
          <div class="img_top img_top_div">
            <img src="~/assets/images/landing/ball_red.png" alt="" class="img_ball">
            <img src="~/assets/images/landing/vs.png" alt="" class="">
            <img src="~/assets/images/landing/ball_blue.png" alt="" class="img_ball img_ball_right">
          </div>
          <div class="product_des title--glitch">{{ $t('landing.p1') }}</div>
        </div>
        <div data-aos="fade-up" class="product_div bg_pr_2">
          <div class="tex-center img_top_div">
            <img src="~/assets/images/landing/cup.png" alt="" class="h-100 w-100 cup filter_img">
          </div>
          <div class="product_des title--glitch">{{ $t('landing.p2') }}</div>
        </div>
        <div data-aos="fade-up-left" class="product_div bg_pr_3">
          <div class="tex-center img_top_div img_jackpot">
            <img src="~/assets/images/landing/arrow_jackpot.png" alt="" class="w-100 arrow_jackpot filter_img">
            <img src="~/assets/images/landing/jackpot.png" alt="" class="h-100 w-100 jackpot filter_img">
          </div>
          <img src="~/assets/images/landing/coin.png" alt="" class="w-100 coin filter_img">
          <div class="product_des title--glitch">{{ $t('landing.p3') }}</div>

        </div>
      </div>
    </section>

    <section class="partner_component">
      <div>
        <div class="star"></div>
        <div class="meteor-1"></div>
        <div class="meteor-2"></div>
        <div class="meteor-3"></div>
        <div class="meteor-4"></div>
        <div class="meteor-5"></div>
        <div class="meteor-6"></div>
        <div class="meteor-7"></div>
        <div class="meteor-8"></div>
        <div class="meteor-9"></div>
        <div class="meteor-10"></div>
        <div class="meteor-11"></div>
        <div class="meteor-12"></div>
        <div class="meteor-13"></div>
        <div class="meteor-14"></div>
        <div class="meteor-15"></div>
      </div>
      <h1 class="title_partner title--glitch" :data-text="$t('landing.partner')">{{ $t('landing.partner') }}</h1>
      <div class="div_main_partner">
        <VueSlickCarousel v-bind="slickOptions" rtl class="row_partner">
          <div v-for="index in 16" :key="index" class="slide">
            <img :src="require('@/assets/images/partner/row1/p'+index+'.png')" alt="" class="img-partner"/>
          </div>
        </VueSlickCarousel>
        <VueSlickCarousel class="row_partner" v-bind="slickOptions">
          <div v-for="index in 15" :key="index" class="slide">
            <img :src="require('@/assets/images/partner/row2/p'+Number(16 + index)+'.png')" alt=""
                 class="img-partner"/>
          </div>
        </VueSlickCarousel>
        <VueSlickCarousel class="row_partner" v-bind="slickOptions" rtl>
          <div v-for="index in 16" :key="index" class="slide">
            <img :src="require('@/assets/images/partner/row3/p'+Number(31 + index)+'.png')" alt=""
                 class="img-partner"/>
          </div>
        </VueSlickCarousel>
        <VueSlickCarousel class="row_partner" v-bind="slickOptions">
          <div v-for="index in 15" :key="index" class="slide">
            <img :src="require('@/assets/images/partner/row4/p'+Number(47 + index)+'.png')" alt=""
                 class="img-partner"/>
          </div>
        </VueSlickCarousel>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
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
        slidesToShow: 10,
        speed: 4000,
        cssEase: 'linear',
        responsive: [
          {
            breakpoint: 1000,
            settings: {
              autoplay: true,
              slidesToShow: 6
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {}
          }
        ]
      },
      lstLengthRow: [16, 15, 16, 15],
      countPartner: 0,
      htmlRow1: '',
      htmlRow2: '',
      htmlRow3: '',
      htmlRow4: ''
    }
  },
  created() {
  }, methods: {}
}
</script>
