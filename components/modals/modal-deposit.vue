<template>
  <div class="deposit_component deposit-mobile">
    <img src="~/assets/images/icons/close.svg" alt="" class="close_img" @click="close">
    <div>
      <h3 class="modal-title">{{ $t('deposit.title') }}</h3>
      <h3 class="modal-title">{{ $t('deposit.direct_title') }}</h3>
      <ul>
        <li><h3 class="sub-title">{{ $t('deposit.direct1') }}</h3></li>
        <li><h3 class="sub-title">{{ $t('deposit.direct2') }}</h3></li>
        <li><h3 class="sub-title">{{ $t('deposit.direct3') }}</h3></li>
        <li><h3 class="sub-title">{{ $t('deposit.direct4') }}</h3></li>
      </ul>
      <el-form
        autocomplete="off"
        label-position="left">
        <br/>
        <el-form-item class="" :label="$t('deposit.address')">
          <el-input
            ref="walletAddress"
            :value="address"
            name="walletAddress"
            type="text"
            tabindex="2"
            class="address disabled-common"
            readonly
          >
            <img
              slot="suffix" class="cursor-pointer pd-r-10" src="~/assets/images/icons/copy.svg" alt="copy"
              @click="copy(address)">
          </el-input>
        </el-form-item>
        <el-form-item class="" :label="$t('deposit.memo')">
          <el-input
            ref="walletAddress"
            :value="memo"
            name="walletAddress"
            type="text"
            tabindex="2"
            class="address disabled-common"
            readonly
          >
            <img
              slot="suffix" class="cursor-pointer pd-r-10" src="~/assets/images/icons/copy.svg" alt="copy"
              @click="copy(memo)">
          </el-input>
        </el-form-item>

        <label for="amount" class="label_node_div">
          <span class="label_node">{{ $t('deposit.activate') }}</span>
          <span class="value_node">{{ totalPrice }} CHZ</span>
        </label>
        <el-form-item
          id="amount"
          class="email-login amount_input"
        >
          <el-input
            name="amount"
            type="number"
            :value="amount"
            tabindex="1"
            maxlength="3"
            :max="this.amount_max"
            :min="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            pattern="[0-9]*" inputmode="numeric"
          >
            <div :class="['btn_amount', {'btn_disable' : amount <= 1}]"
                 slot="prepend" @click="changeAmount('-')">
              <el-button :disabled="amount <= 1" class="btn_amount_el">-</el-button>
            </div>
            <div :class="['btn_amount', {'btn_disable' : amount >= this.amount_max}]"
                 slot="append" @click="changeAmount('+')">
              <el-button :disabled="amount >= this.amount_max" class="btn_amount_el">+</el-button>
            </div>
          </el-input>
        </el-form-item>
        <div class="common-button">
          <el-button
            @click="close"
          >
            {{ $t('deposit.confirm') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { INDEX_SET_SUCCESS } from '@/store/store.const'

export default {
  name: 'ModalDeposit',
  components: {},
  props: {
    address: {
      type: String,
      default: ''
    },
    memo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      amount: 1,
      amount_max: 100000000,
      total_price: 150,
      valid: false,
      loading: false,
      fullscreenLoading: false
    }
  },
  computed: {
    totalPrice() {
      return Number(this.amount) * this.total_price
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
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
    },
    changeAmount(type) {
      if (type === '+' && this.amount < this.amount_max) {
        this.amount++
      } else if (type === '-' && this.amount > 1) {
        this.amount--
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/scss/variables";

.price_div {
  width: 100%;
  box-sizing: border-box;
  //border: 1px solid $color-border-sidebar;
  border: 1px solid #DCDFE6;
  border-radius: 6px;
  padding: 11px 12px;
  display: flex;
  justify-content: left;
  gap: 50px;
  align-items: center;

  .logo_price {
    width: fit-content;
    display: flex;
    justify-content: space-between;
    gap: 17px;

    .price_text {
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
      text-align: center;
      color: $color-red-primary;
    }
  }
}

.info_div {
  padding: 17px 12px;
  display: grid;
  grid-template-columns: auto;
  gap: 30px;

  .item_div {
    display: flex;
    justify-content: left;
    gap: 18px;
    align-items: center;

    img {
      border-radius: unset;
    }
  }

  .des_info {
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;

    color: $color-text-6;
    max-width: 100%;
    word-break: break-word;

  }
}

.amount_input {
  padding-top: 10px;
  padding-bottom: 15px;
}

.btn_amount_el {
  box-shadow: unset;
  background: unset;
}

.label_node_div {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .label_node {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }

  .value_node {
    font-weight: 800;
    font-size: 20px;
    line-height: 20px;
    color: $color-red-primary;
  }
}
</style>
