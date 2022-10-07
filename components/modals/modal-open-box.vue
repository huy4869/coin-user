<template>
  <div class="open_box_component">
    <img src="~/assets/images/icons/close.svg" alt="" class="close_img"
         :class="{'disable_img': !isCompleteOpen}"
         @click="close">

    <div class="main_open_div">
      <div class="open_left">
        <span class="open_title title_box">{{ $t('open_box.title', { v: ifoBox.name }) }}</span>
        <span class="open_max_title">{{ $t('open_box.max', { v: $auth.user.mystery_box }) }}</span>
        <el-form
          ref="openForm"
          :model="openForm"
          :rules="openRules"
          autocomplete="off"
          label-position="left"
          @keyup.enter.native="handleOpen"
        >
          <div class="amount_open_div">
            <div class="set_amount_div">
              <img src="~/assets/images/predict/minus.png" alt=""
                   :class="{'disable_img': openForm.amount <= 0}"
                   @click="changeAmount('-')">
              <el-form-item prop="amount" :error="error.value" class="input_amount_open">
                <el-input
                  ref="amount"
                  v-model.trim="openForm.amount"
                  :placeholder="$t('open_box.amount')"
                  oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                  name="amount"
                  type="text"
                  tabindex="3"
                  maxlength="12"
                  @focus="resetValidate('amount')"
                />
              </el-form-item>
              <img src="~/assets/images/predict/plus.png" alt=""
                   :class="{'disable_img': openForm.amount >= max}"
                   @click="changeAmount('+')">
            </div>
            <el-button :disabled="disableBtn"
                       @click="handleOpen">{{ $t('open_box.open') }}
            </el-button>
          </div>
        </el-form>
      </div>
      <div class="open_right" data-aos="fade-down"
           data-aos-easing="linear"
           data-aos-duration="1500">
        <img src="~/assets/images/predict/under_box.svg" alt="" class="under_box">
        <img src="~/assets/images/predict/nft_box.svg" alt="" class="nft_box"
             :class="[isOPenSuccess?'appear_nft':'']">
        <img src="~/assets/images/predict/lid_box.svg" alt="" class="lid_box before_open filter_img_red"
             :class="[isOPenSuccess?classAfterOpenBox:'before_open']">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { INDEX_SET_ERROR, MAX_OPEN_BOX, USER_OPEN_BOX } from '@/store/store.const'

export default {
  name: 'ModalOpenBox',
  props: ['ifoBox'],
  data() {
    const validateAmount = (rule, value, callback) => {
      if (Number(value) > Number(this.$auth.user.mystery_box)) {
        callback(new Error(this.$t('open_box.validate_balance')))
      } else if (Number(value) > MAX_OPEN_BOX) {
        callback(new Error(this.$t('open_box.validate_max')))
      } else {
        callback()
      }
    }
    return {
      max: this.$auth.user.mystery_box > MAX_OPEN_BOX ? MAX_OPEN_BOX : this.$auth.user.mystery_box,
      openForm: {
        amount: this.$auth.user.mystery_box > MAX_OPEN_BOX ? MAX_OPEN_BOX : this.$auth.user.mystery_box,
        errors: {}
      },
      error: { key: null, value: '' },
      openRules: {
        amount: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('open_box.amount') }),
            trigger: 'blur'
          },
          {
            validator: validateAmount, trigger: 'blur'
          }
        ]
      },
      isOPenSuccess: false,
      classAfterOpenBox: '',
      isCompleteOpen: true,
      lstNftOpened: []
    }
  },
  computed: {
    ...mapState(['loading']),
    disableBtn() {
      return this.loading || this.openForm.amount <= 0 || this.openForm.amount > this.max || !this.isCompleteOpen
    }
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.openForm.fields.find((f) => f.prop === ref).clearValidate()
      this.openForm.errors[ref] = ''
    },
    changeAmount(type) {
      type === '-' ? this.openForm.amount-- : this.openForm.amount++
      this.$refs.openForm.validate(valid => {
      })
    },
    close() {
      this.$emit('close')
    },
    completeOpen() {
      this.$emit('completeOpen', this.lstNftOpened)
      this.isCompleteOpen = true
    },
    async handleOpen() {
      try {
        this.isCompleteOpen = false
        const response = await this.$store.dispatch(USER_OPEN_BOX,
          { quantity: this.openForm.amount })
        switch (response.status_code) {
          case 200:
            this.isOPenSuccess = true
            this.classAfterOpenBox = 'shake_lid_box'
            this.lstNftOpened = response.data
            setTimeout(() => {
              this.classAfterOpenBox = 'reset_lid_box'
              setTimeout(() => {
                this.classAfterOpenBox = 'reset_lid_box moveUpLidBox'
                setTimeout(this.completeOpen, 0)
              }, 2000)
            }, 1500)
            await this.$auth.fetchUser()
            this.max = this.$auth.user.mystery_box > MAX_OPEN_BOX ? MAX_OPEN_BOX : this.$auth.user.mystery_box
            break
          case 422:
            for (const [key] of Object.entries(response.data)) {
              this.error = { key, value: response.data[key][0] }
            }
            break
          default:
            this.isOPenSuccess = false
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: response.message })
            break
        }
      } catch (err) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    }
  }

}
</script>
