<template>
  <div class="main-setting" style="display: flex">
    <div class="btn-common btn_setting_div">
      <div class="btn-common-mobile">
        <el-button :class="{'active' : !isChangePass}" class="btn_common" @click="showChangePass(false)">
          {{ $t('account.setting') }}
        </el-button>
        <br>
        <el-button :class="{'active' : isChangePass}" class="btn_common" @click="showChangePass(true)">
          {{ $t('account.change_pass') }}
        </el-button>
      </div>
    </div>
    <div class="main-login form_setting_div" style="border: 1px solid #555;">
      <div class="login login-width login-mobile">
        <h3 v-if="!isChangePass" class="title">{{ $t('account.setting') }}</h3>
        <h3 v-else class="title">{{ $t('account.change_pass') }}</h3>
        <el-form
          ref="accountForm"
          :model="accountForm"
          :rules="accountRules"
          label-position="left"
          @keyup.enter.native="update"
        >
          <div :class="{change_pass: isChangePass}">
            <el-form-item
              class="email-login"
              :label="$t('register.name')"
              prop="name"
              :error="getErrResponse('name')">
              <el-input
                ref="name"
                v-model="accountForm.name"
                :placeholder="$t('register.name')"
                name="name"
                type="text"
                tabindex="1"
                maxlength="50"
                @focus="resetValidate('name')"
              />
            </el-form-item>
            <el-form-item
              class="email-login"
              :label="$t('register.email')"
              prop="email"
              :error="getErrResponse('email')">
              <el-input
                ref="email"
                v-model.trim="accountForm.email"
                :placeholder="$t('register.email')"
                name="email"
                type="text"
                tabindex="2"
                maxlength="50"
                disabled
                readonly
                @focus="resetValidate('email')"
              />
            </el-form-item>
            <el-form-item :label="$t('register.phone')" prop="phone" :error="getErrResponse('phone')">
              <el-input
                ref="phone"
                v-model.trim="accountForm.phone"
                :placeholder="$t('register.phone')"
                oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                name="phone"
                type="text"
                tabindex="3"
                maxlength="12"
                @focus="resetValidate('phone')"
              />
            </el-form-item>
            <!-- <el-form-item :label="$t('register.referral_code')" prop="invite_code" :error="getErrResponse('invite_code')">
              <el-input
                ref="referral_code"
                v-model.trim="accountForm.invite_code"
                :placeholder="$t('register.referral_code')"
                name="invite_code"
                disabled
                type="text"
                tabindex="8"
                maxlength="20"
                @focus="resetValidate('invite_code')"
              />
            </el-form-item> -->
            <!--  -->
            <hr class="line-through">
            <!--  -->
            <div class="d-flex align-items-center text-center" style="margin-top: 1.5rem">
              <span class="bnb-title">
                BEP2 Wallet
              </span>
            </div>
            <div class="bnb-description">
              <span>{{ $t('common.bnb_des') }}</span>
            </div>
            <!--  -->
            <el-form-item :label="$t('register.wallet_address')" prop="wallet_address"
                          :error="getErrResponse('wallet_address')">
              <el-input
                ref="wallet_address"
                v-model.trim="accountForm.wallet_address"
                :placeholder="$t('register.wallet_address')"
                name="wallet_address"
                type="text"
                tabindex="6"
                disabled
                maxlength="30"
                @focus="resetValidate('wallet_address')"
              />
            </el-form-item>
            <el-form-item :label="$t('register.memo')" prop="memo" :error="getErrResponse('memo')">
              <el-input
                ref="memo"
                v-model.trim="accountForm.memo"
                :placeholder="$t('register.memo')"
                name="memo"
                disabled
                type="text"
                tabindex="7"
                maxlength="30"
                @focus="resetValidate('memo')"
              />
            </el-form-item>
          </div>
          <!--  -->
          <!-- <div class="d-flex align-items-center text_link">
            <div class="here" @click="showChangePass()">{{ $t('account.change_pass') }}</div>
          </div> -->
          <div :class="{change_pass: !isChangePass}">
            <el-form-item
              class="email-login" :label="$t('account.current_pass')" prop="password"
              :error="getErrResponse('password')">
              <el-input
                ref="password"
                v-model="accountForm.password"
                :placeholder="$t('account.current_pass')"
                name="password"
                :type="showPass?'text':'password'"
                tabindex="4"
                maxlength="32"
                autocomplete="off"
                @focus="resetValidate('password')"
              >
                <i slot="suffix" class="cursor-pointer" @click="displayPass('pass')">
                  <img v-if="showPass" class="icon-show-pass" src="~/assets/images/icons/eye-input.svg"/>
                  <img v-else class="icon-show-pass" src="@/assets/images/icons/hide-eye.svg"/>
                </i>
              </el-input>
            </el-form-item>
            <el-form-item
              class="email-login mb-32" :label="$t('account.new_password')" prop="new_password"
              :error="getErrResponse('new_password')">
              <el-input
                ref="new_password"
                v-model="accountForm.new_password"
                :placeholder="$t('account.new_password')"
                name="new_password"
                :type="showNewPass?'text':'password'"
                tabindex="5"
                maxlength="32"
                autocomplete="off"
                @focus="resetValidate('new_password')"
              >
                <i slot="suffix" class="cursor-pointer" @click="displayPass('newPass')">
                  <img v-if="showNewPass" class="icon-show-pass" src="~/assets/images/icons/eye-input.svg"/>
                  <img v-else class="icon-show-pass" src="@/assets/images/icons/hide-eye.svg"/>
                </i>
              </el-input>
            </el-form-item>
            <el-form-item
              class="email-login" :label="$t('account.password_confirmation')" prop="new_password_confirmation"
              :error="getErrResponse('new_password_confirmation')">
              <el-input
                ref="new_password_confirmation"
                v-model="accountForm.new_password_confirmation"
                :placeholder="$t('account.password_confirmation')"
                name="new_password_confirmation"
                :type="showPassConfirm?'text':'password'"
                tabindex="5"
                maxlength="32"
                autocomplete="off"
                @focus="resetValidate('new_password_confirmation')"
              >
                <i slot="suffix" class="cursor-pointer" @click="displayPass('passConfirm')">
                  <img v-if="showPassConfirm" class="icon-show-pass" src="~/assets/images/icons/eye-input.svg"/>
                  <img v-else class="icon-show-pass" src="@/assets/images/icons/hide-eye.svg"/>
                </i>
              </el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <div :class="{'disabled' : disabledButton, 'common-button': 'common-button', 'setting-button' : true}">
              <el-button
                v-loading.fullscreen.lock="fullscreenLoading"
                :loading="loading"
                :disabled="disabledButton"
                @click.native="update"
              >
                {{ $t('account.reset') }}
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  USER_UPDATE,
  USER_UPDATE_PASS
} from '@/store/store.const'
import { validEmail, validPhoneNoPrefix } from '@/utils/validate'

export default {
  name: 'ProfilePage',
  middleware: 'auth',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error(this.$t('validation.email_format')))
      } else {
        callback()
      }
    }
    // const validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error(this.$t('validation.required', { _field_: this.$t('account.password') }).toString()))
    //   } else {
    //     if (!validPassword(value)) {
    //       callback(new Error(this.$t('validation.pass_format')))
    //     }
    //     if (this.accountForm.password_confirmation !== '') {
    //       this.$refs.accountForm.validateField('password_confirmation')
    //     }
    //     callback()
    //   }
    // }

    const validateConfirmPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('account.password_confirmation') })))
      } else if (value !== this.accountForm.new_password) {
        callback(new Error(this.$t('validation.passNotMatch')))
      } else {
        callback()
      }
    }

    const validateNewPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('account.password_confirmation') })))
      } else if (value.length < 8 || value.length > 32) {
        callback(new Error(this.$t('validation.pass_format')))
      } else {
        callback()
      }
    }

    const validPhoneNumber = (rule, value, callback) => {
      if (value == null || value === '') {
        callback()
      } else if (!validPhoneNoPrefix(value)) {
        callback(new Error(this.$t('validation.phone_length')))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        email: this.$auth.user.email,
        password: '',
        name: this.$auth.user.name,
        phone: this.$auth.user.phone,
        new_password: '',
        new_password_confirmation: '',
        wallet_address: this.$auth.user.wallet_address,
        memo: this.$auth.user.memo,
        invite_code: this.$auth.user.invite_code ? this.$auth.user.invite_code : '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        email: [
          // {
          //   required: !this.isChangePass,
          //   message: this.$t('validation.required', { _field_: this.$t('account.email') }),
          //   trigger: 'blur'
          // },
          {
            validator: validateEmail, trigger: 'blur'
          }
        ],
        phone: [
          {
            validator: validPhoneNumber, trigger: 'blur'
          }
        ],
        name: [
          {
            required: !this.isChangePass,
            message: this.$t('validation.required', { _field_: this.$t('account.fullName') }),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.current_pass') }),
            trigger: 'blur'
          }
        ],
        new_password: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.new_password') }),
            trigger: 'blur'
          },
          { validator: validateNewPass, trigger: 'blur' }
        ],
        new_password_confirmation: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.password_confirmation') }),
            trigger: 'blur'
          },
          { validator: validateConfirmPass, trigger: 'blur' }
        ]
      },
      valid: false,
      showPass: false,
      showNewPass: false,
      showPassConfirm: false,
      isValid: false,
      isAuthErr: false,
      fullscreenLoading: false,
      loading: false,
      isChangePass: false,
      errorResponse: []
    }
  },
  computed: {
    disabledButton() {
      let check = false
      this.isChangePass
        ? check = this.accountForm.password === '' ||
          this.accountForm.new_password === '' || this.accountForm.new_password_confirmation === ''
        : check = this.accountForm.name === '' || this.accountForm.email === ''
      return check
    }
  },
  methods: {
    handeRegister() {
      this.$router.push('/register')
    },
    showChangePass(option) {
      this.isChangePass = option
      this.accountForm.password = ''
      this.accountForm.new_password = ''
      this.accountForm.new_password_confirmation = ''
      this.resetValidate('password')
      this.resetValidate('new_password')
      this.resetValidate('new_password_confirmation')
    },
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    async update() {
      this.errorResponse = []
      this.error = { key: null, value: '' }
      await this.validateForm()
      if (!this.isValid) {
        return
      }
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dto = {
        email: this.$auth.user.email,
        name: this.accountForm.name,
        phone: this.accountForm.phone,
        password: this.accountForm.password,
        new_password: this.accountForm.new_password,
        new_password_confirmation: this.accountForm.new_password_confirmation,
        avatar: 'avatar'
      }
      // if (this.isChangePass) {
      //   dto = {
      //     ...dto,
      //     password: this.accountForm.password,
      //     new_password: this.accountForm.new_password,
      //     new_password_confirmation: this.accountForm.new_password_confirmation
      //   }
      // }
      let response = null
      if (!this.isChangePass) {
        response = await this.$store.dispatch(USER_UPDATE, dto)
      } else {
        const dto = {
          old_password: this.accountForm.password,
          password: this.accountForm.new_password,
          password_confirmation: this.accountForm.new_password_confirmation
        }
        response = await this.$store.dispatch(USER_UPDATE_PASS, dto)
      }
      if (response.status_code === 200) {
        await this.$store.commit(INDEX_SET_SUCCESS, {
          show: true,
          text: response.message
        })
        this.accountForm.password = ''
        this.accountForm.new_password = ''
        this.accountForm.new_password_confirmation = ''
        await this.$auth.fetchUser()
      } else if (response.status_code === 422) {
        for (const [k] of Object.entries(response.data)) {
          this.error = { key: k, value: response.data[k][0] }
          this.errorResponse.push({ key: k, value: response.data[k][0] })
        }
      } else {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: response.message
        })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    validateForm() {
      if (!this.isChangePass) {
        this.$refs.accountForm.validateField('name', valid => {
          this.isValid = valid === ''
        })
        this.$refs.accountForm.validateField('phone', valid => {
          this.isValid = valid === ''
        })
      } else {
        this.$refs.accountForm.validate(valid => {
          this.isValid = valid
        })
      }
    },
    displayPass(type) {
      if (type === 'pass') {
        this.showPass = !this.showPass
      } else if (type === 'newPass') {
        this.showNewPass = !this.showNewPass
      } else {
        this.showPassConfirm = !this.showPassConfirm
      }
    },
    getErrResponse(key) {
      let result = ''
      if (this.errorResponse == null || this.errorResponse.length === 0) {
        return
      }
      this.errorResponse.forEach(err => {
        if (err.key === key) {
          result = err.value
          return false
        }
      })
      return result
    }
  }
}
</script>
<style scoped lang="scss">
</style>
