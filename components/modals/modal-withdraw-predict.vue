<template>
  <div class="deposit_component deposit-mobile">
    <img src="~/assets/images/icons/close.svg" alt="" class="close_img" @click="close">
    <div>
      <h3 class="modal-title">{{ $t('predict_team.withdraw') }}</h3>
      <h3 class="modal-title">{{ $t('predict_team.title_receive') }}</h3>
      <ul>
        <li><h3 class="sub-title">{{ $t('predict_team.direct3') }}</h3></li>
      </ul>
      <el-form
        ref="formWithdraw"
        autocomplete="off"
        label-position="left"
        :model="withdrawForm"
        :rules="formRules">
        <br/>
        <el-form-item class="" :label="$t('predict_team.address')">
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
        <el-form-item class="" :label="$t('predict_team.memo')">
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

        <el-form-item class="" :label="$t('predict_team.amount')" prop="amount"
                      :error="error.value">
          <el-input
            ref="amount"
            v-model="withdrawForm.amount"
            name="amount"
            :placeholder="$t('predict_team.amount_text')"
            oninput="this.value=this.value.replace(/[^0-9]/g,'');"
            type="text"
            tabindex="2"
            maxlength="12"
            @focus="resetValidate('amount')"
          >
          </el-input>
        </el-form-item>

        <div class="fee pb-24">{{ $t('predict_team.fee', { v: 1 }) }}</div>

        <div class="common-button">
          <el-button
            :disabled="disableBtn"
            @click="submit"
          >
            {{ $t('predict_team.confirm') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { INDEX_SET_ERROR, INDEX_SET_LOADING, INDEX_SET_SUCCESS, USER_WITHDRAW_PREDICT } from '@/store/store.const'

export default {
  name: 'ModalWithdrawPredict',
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
    const validateAmount = (rule, value, callback) => {
      if (Number(value) <= 0) {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('predict_team.amount_text') })))
      } else {
        callback()
      }
    }
    return {
      amount_max: 99999999999999,
      total_price: 150,
      valid: false,
      fullscreenLoading: false,
      withdrawForm: {
        amount: '',
        errors: {}
      },
      formRules: {
        amount: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('predict_team.amount_text') }),
            trigger: 'blur'
          },
          {
            validator: validateAmount, trigger: 'blur'
          }
        ]
      },
      error: {
        key: null,
        value: ''
      }
    }
  },
  computed: {
    ...mapState(['loading']),
    disableBtn() {
      return this.loading || this.withdrawForm.amount === '' || this.withdrawForm.amount <= 0
    }
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.formWithdraw.fields.find((f) => f.prop === ref).clearValidate()
      this.withdrawForm.errors[ref] = ''
    },
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
      // if (type === '+' && this.amount < this.amount_max) {
      if (type === '+') {
        this.amount++
      } else if (type === '-' && this.amount > 1) {
        this.amount--
      }
    },
    async submit() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(USER_WITHDRAW_PREDICT,
          {
            coin: this.withdrawForm.amount
          })
        switch (response.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, { show: true, text: response.message })
            this.withdrawForm = {
              amount: '',
              errors: {}
            }
            this.$emit('close')
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
      await this.$store.commit(INDEX_SET_LOADING, false)
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
