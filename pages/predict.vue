<template>
  <div class="predict_component">
    <div class="title_red_div">
      <h3>{{ $t('predict.box') }}</h3>
    </div>
    <div class="box_div">
      <div data-aos="fade-right" data-aos-duration="1500" class="mystery_box">
        <div class="bg_box_nft bg_box_common">
          <el-button class="btn_box">{{ $t('predict.box_title') }}</el-button>
          <img src="~/assets/images/predict/box.svg" alt="" class="img_box filter_img_red">
          <div class="nav_btn_div">
            <div class="amount_div">
              <span class="amount_text">{{ $t('predict.amount_convert', { v: amountBox }) }}</span>
            </div>
            <el-button class="btn_open" @click="openOpenBox">{{ $t('predict.open') }}</el-button>
          </div>
        </div>
      </div>
      <div data-aos="fade-left" data-aos-duration="1500" class="des_div">
        <h1 class="title_des">{{ $t('predict.des_title') }}</h1>
        <ul>
          <li><h3 class="sub-title">{{ $t('predict.des1') }}</h3></li>
          <li><h3 class="sub-title">{{ $t('predict.des2') }}</h3></li>
          <li><h3 class="sub-title">{{ $t('predict.des3') }}</h3></li>
        </ul>
        <el-button class="btn_buy_box" @click="openBuyBox">{{ $t('predict.buy') }}</el-button>
      </div>
    </div>
    <div class="lst_nft_div">
      <div class="title_red_div">
        <h3>{{ $t('predict.nft') }}</h3>
      </div>
      <div class="lst_nft">
        <div v-for="item in listTokenOpened" :key="item.id" class="bg_box_common bg_nft_item"
             data-aos="flip-left"
             data-aos-duration="2000">
          <el-button class="btn_box">{{ $t('predict.nft') }}</el-button>
          <div class="info_nft">
            <img src="~/assets/images/predict/bg_nft.svg" alt="" class="img_bg_nft filter_img_red">
            <span class="name_nft">{{ item.name }}</span>
            <img :src="item.logo" alt="" class="img_nation moveYShort">
          </div>
          <div class="nav_btn_div">
            <div class="amount_div amount_div_nft">
              <span class="amount_text">{{ $t('predict.amount_convert', { v: item.total_quantity }) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :center="true" :close-on-click-modal="false" :destroy-on-close="true" :lock-scroll="true"
      :show-close="true" :visible.sync="buyModal" class="dialog-deposit dialog-buy-box">
      <modal-buy-box
        :address="walletMystery.address"
        :memo="walletMystery.memo"
        @close="closeBuyBox()"/>
    </el-dialog>

    <el-dialog
      :center="true" :close-on-click-modal="false" :destroy-on-close="true" :lock-scroll="true"
      :show-close="true" :visible.sync="isOpenBox" class="dialog-open-box">
      <div class="bg_fog">
        <div id="foglayer_01" class="fog">
          <div class="image01"></div>
          <div class="image02"></div>
        </div>
        <div id="foglayer_02" class="fog">
          <div class="image01"></div>
          <div class="image02"></div>
        </div>
        <div id="foglayer_03" class="fog">
          <div class="image01"></div>
          <div class="image02"></div>
        </div>
      </div>
      <modal-open-box
        @close="closeOpenBox()"
        @completeOpen="completeOpen"
      />
    </el-dialog>

    <el-dialog
      :center="true" :close-on-click-modal="false" :destroy-on-close="true" :lock-scroll="true"
      :show-close="true" :visible.sync="isCongratulation" class="dialog-congratulation">
      <modals-modal-congratulation
        :lst-nft="lstNftOpened"
        :lst-nft-unique="lstNftUniqueOpened"
        @close="isCongratulation = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  USER_GET_LST_TOKEN_OPENED,
  USER_GET_WALLET_MYSTERY
} from '@/store/store.const'
import ModalBuyBox from '@/components/modals/modal-buy-box'
import ModalOpenBox from '@/components/modals/modal-open-box'

export default {
  name: 'PredictComponent',
  components: { ModalOpenBox, ModalBuyBox },
  middleware: 'auth-guard',
  data() {
    return {
      listTokenOpened: [],
      walletMystery: {},
      user: this.$auth.user,
      buyModal: false,
      isOpenBox: false,
      error: {
        key: null,
        value: ''
      },
      isCongratulation: false,
      lstNftOpened: [],
      lstNftUniqueOpened: []
    }
  },
  computed: {
    amountBox() {
      return this.$auth.user.mystery_box
    }
  },
  async mounted() {
    await this.init()
  },
  methods: {
    async init() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      await this.getListTokenOpened()
      await this.getWalletMystery()
      await this.$auth.fetchUser()
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async getListTokenOpened() {
      try {
        const response = await this.$store.dispatch(USER_GET_LST_TOKEN_OPENED)
        switch (response.status_code) {
          case 200:
            this.listTokenOpened = response.data
            break
          case 422:
            for (const [key] of Object.entries(response.data)) {
              this.error = { key, value: response.data[key][0] }
            }
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: response.message })
            break
        }
      } catch (err) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    },
    async getWalletMystery() {
      try {
        const response = await this.$store.dispatch(USER_GET_WALLET_MYSTERY)
        switch (response.status_code) {
          case 200:
            this.walletMystery = response.data
            this.walletMystery.memo = this.user.send_memo
            break
          case 422:
            for (const [key] of Object.entries(response.data)) {
              this.error = { key, value: response.data[key][0] }
            }
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: response.message })
            break
        }
      } catch (err) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    },
    async openBuyBox() {
      await this.getWalletMystery()
      this.buyModal = true
    },
    closeBuyBox() {
      this.buyModal = false
    },
    openOpenBox() {
      this.isOpenBox = true
    },
    closeOpenBox() {
      this.isOpenBox = false
    },
    async completeOpen(lstNft) {
      const temp = {}
      lstNft.forEach(item => {
        if (temp[item.id]) {
          temp[item.id].total = temp[item.id].total + 1
        } else {
          temp[item.id] = item
          temp[item.id].total = 1
        }
      })
      this.lstNftUniqueOpened = []
      for (const key in temp) {
        this.lstNftUniqueOpened.push(temp[key])
      }
      this.lstNftOpened = lstNft

      this.closeOpenBox()
      await this.init()
      setTimeout(
        () => {
          this.isCongratulation = true
        }, 0
      )
    }
  }
}
</script>
