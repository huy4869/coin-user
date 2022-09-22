<template>
  <div class="home_component">
    <div class="account_div">
      <div class="account_left sub_div">
        <h3 class="title">{{ $t('profile.title') }}</h3>
        <el-form
          autocomplete="off"
          label-position="left">
          <br/>
          <el-form-item class="" :label="$t('profile.referral')">
            <el-input
              ref="walletAddress"
              :value="account.memo"
              name="walletAddress"
              type="text"
              tabindex="2"
              class="address disabled-common"
              readonly
            >
              <img
                slot="suffix" class="cursor-pointer pd-r-10" src="~/assets/images/icons/copy.svg" alt="copy"
                @click="copy(account.memo)">
            </el-input>
          </el-form-item>
          <el-form-item class="" :label="$t('profile.link')">
            <el-input
              ref="walletAddress"
              :value="link_ref_short"
              name="walletAddress"
              type="text"
              tabindex="2"
              class="address disabled-common"
              readonly
            >
              <img
                slot="suffix" class="cursor-pointer pd-r-10" src="~/assets/images/icons/copy.svg" alt="copy"
                @click="copy(link_ref)">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="account_right sub_div">
        <div>
          <h3 class="title">{{ $t('profile.note_title') }}</h3>
          <ul>
            <li class="sub_note"><h3 class="sub-title">{{ $t('profile.note1') }}</h3></li>
            <li class="sub_note"><h3 class="sub-title">{{ $t('profile.note2') }}</h3></li>
            <li class="sub_note"><h3 class="sub-title">{{ $t('profile.note3') }}</h3></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="div_product">
      <div class="title_product_div">
        <h3>{{ $t('profile.product') }}</h3>
      </div>
      <div class="lst_product_div lst_product_div_home">
        <div @click="dialogComingSoon=true" data-aos="fade-up-right" class="product_div_home bg_pr_1">
          <el-button class="btn_product">{{ $t('landing.p1') }}</el-button>
          <div class="img_top img_top_div">
            <img src="~/assets/images/landing/ball_red.png" alt="" class="img_ball">
            <img src="~/assets/images/landing/vs.svg" alt="" class="">
            <img src="~/assets/images/landing/ball_blue.png" alt="" class="img_ball">
          </div>
        </div>
        <div @click="dialogComingSoon=true" data-aos="fade-up-right" class="product_div_home bg_pr_2">
          <el-button class="btn_product">{{ $t('landing.p2') }}</el-button>
          <div class="img_top_div img_cup">
            <img src="~/assets/images/landing/cup1.png" alt="" class="img_cup_1">
            <div class="img_cup_under">
              <img src="~/assets/images/landing/cup2.png" alt="" class="">
              <img src="~/assets/images/landing/cup3.png" alt="" class="">
            </div>
          </div>
        </div>
        <div @click="dialogComingSoon=true" data-aos="fade-up-left" class="product_div_home bg_pr_3">
          <el-button class="btn_product">{{ $t('landing.p3') }}</el-button>
          <div class="tex-center img_top_div img_jackpot">
            <img src="~/assets/images/landing/arrow_jackpot.png" alt="" class="w-100 arrow_jackpot filter_img">
            <img src="~/assets/images/landing/jackpot.png" alt="" class="h-100 w-100 jackpot filter_img">
          </div>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogComingSoon" top="5vh" class="dialog-coming-soon" :center="true">
      <coming-soon-modal @close="dialogComingSoon = false"/>
    </el-dialog>
  </div>
</template>

<script>
import { INDEX_SET_SUCCESS } from '@/store/store.const'
import ComingSoonModal from '@/components/modals/coming_soon'

export default {
  name: 'HomeComponent',
  components: { ComingSoonModal },
  layout: 'default',
  middleware: 'auth-guard',
  data() {
    return {
      account: this.$auth.user,
      link_ref: window.location.origin.toString(),
      link_ref_short: window.location.protocol.toString(),
      dialogComingSoon: false
    }
  },
  async created() {
    await this.$auth.fetchUser()
    this.account = this.$auth.user
    this.link_ref_short += '//...?code=' + this.account.memo
    this.link_ref += '/register?code=' + this.account.memo
  },
  methods: {
    copy(data) {
      const textarea = document.createElement('textarea')
      textarea.value = data
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      this.$store.commit(INDEX_SET_SUCCESS, {
        show: true,
        text: this.$t('noti.copy_success')
      })
    }
  }
}
</script>
