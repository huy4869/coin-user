<template>
  <div class="main-login">
    <div>
      <div class="login login-width login-mobile">
        <h3 class="title">{{ $t('account.reset_password') }}</h3>
        <el-form
          ref="accountForm"
          :model="accountForm"
          :rules="accountRules"
          label-position="left"
          @keyup.enter.native="reset"
        >
          <el-form-item
            class="email-login mb-32" :label="$t('account.new_password')" prop="password"
            :error="getErrResponse('password')">
            <el-input
              ref="password"
              v-model="accountForm.password"
              :placeholder="$t('account.new_password')"
              name="password"
              :type="showPass?'text':'password'"
              tabindex="3"
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
            class="email-login" :label="$t('account.password_new_confirmation')" prop="password_confirmation"
            :error="getErrResponse('password_confirmation')">
            <el-input
              ref="password_confirmation"
              v-model="accountForm.password_confirmation"
              :placeholder="$t('account.password_new_confirmation')"
              name="password_confirmation"
              :type="showPassConfirm?'text':'password'"
              tabindex="3"
              maxlength="32"
              autocomplete="off"
              @focus="resetValidate('password_confirmation')"
            >
              <i slot="suffix" class="cursor-pointer" @click="displayPass('passConfirm')">
                <img v-if="showPassConfirm" class="icon-show-pass" src="~/assets/images/icons/eye-input.svg"/>
                <img v-else class="icon-show-pass" src="@/assets/images/icons/hide-eye.svg"/>
              </i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div :class="{'disabled' : disabledButton, 'common-button': 'common-button'}">
              <el-button
                v-loading.fullscreen.lock="fullscreenLoading"
                :loading="loading"
                :disabled="disabledButton"
                @click.native="reset"
              >
                {{ $t('account.reset') }}
              </el-button>
            </div>
          </el-form-item>
          <div class="back" style="margin-top: 1.5rem">
            <router-link to="/" class="align-items-center color-orange cursor-pointer">
              {{ $t('account.back') }}
            </router-link>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { INDEX_SET_ERROR, INDEX_SET_LOADING, INDEX_SET_SUCCESS, SET_BG_TYPE } from '@/store/store.const'
import { AUTH_CHECK_TOKEN, AUTH_RESET_PASS, TYPE_REGISTER_OTP } from '@/constants/store'
import { validPassword } from '@/utils/validate'

export default {
  name: 'ResetPasswordPage',
  layout: 'auth',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('account.password') }).toString()))
      } else {
        if (value.length < 8 || value.length > 32) {
          callback(new Error(this.$t('validation.pass_format')))
        }
        if (this.accountForm.password_confirmation !== '') {
          this.$refs.accountForm.validateField('password_confirmation')
        }
        callback()
      }
    }
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('account.password') }).toString()))
      } else if (value !== this.accountForm.password) {
        callback(new Error(this.$t('validation.passNotMatch').toString()))
      } else {
        callback()
      }
    }
    return {
      typeVerify: TYPE_REGISTER_OTP,
      token: '',
      user: {},
      accountForm: {
        password: '',
        password_confirmation: '',
        errors: {}
      },
      errorResponse: [],
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        password: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.password') }),
            trigger: 'blur'
          },
          { validator: validatePass, trigger: 'blur' }
        ],
        password_confirmation: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.password_confirmation') }),
            trigger: 'blur'
          },
          {
            validator: validateConfirmPass,
            message: this.$t('validation.passNotMatch'),
            trigger: 'blur'
          }
        ]
      },
      valid: false,
      loading: false,
      fullscreenLoading: false,
      isValid: false,
      showPass: false,
      showPassConfirm: false
    }
  },
  computed: {
    ...mapState(['language']),
    disabledButton() {
      if (!this.isMounted) {
        return
      }
      return this.accountForm.password === '' ||
        this.accountForm.password_confirmation === ''
    }
  },
  watch: {
    language() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('validation.required', { _field_: this.$t('account.password') }).toString()))
        } else {
          if (!validPassword(value)) {
            callback(new Error(this.$t('validation.pass_format')))
          }
          if (this.accountForm.password_confirmation !== '') {
            this.$refs.accountForm.validateField('password_confirmation')
          }
          callback()
        }
      }
      const validateConfirmPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('validation.required', { _field_: this.$t('account.password') }).toString()))
        } else if (value !== this.accountForm.password) {
          callback(new Error(this.$t('validation.passNotMatch').toString()))
        } else {
          callback()
        }
      }
      this.accountRules = {
        password: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.password') }),
            trigger: 'blur'
          },
          { validator: validatePass, trigger: 'blur' }
        ],
        password_confirmation: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.password_confirmation') }),
            trigger: 'blur'
          },
          {
            validator: validateConfirmPass,
            message: this.$t('validation.passNotMatch'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  async created() {
    this.$store.commit(SET_BG_TYPE, 'auth')
    this.token = this.$route.query.token
    if (this.token == null || this.token === '') {
      this.$router.push('/')
    } else {
      const data = await this.$store.dispatch(AUTH_CHECK_TOKEN, {
        token: this.token
      })
      if (data.status_code !== 200) {
        this.$router.push('/')
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })
      }
    }
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    updateNumber(event) {
      let value = event.target.value
      // eslint-disable-next-line prefer-regex-literals
      value = value.replace(new RegExp('[^0-9]+$', 'gm'), '')
      event.target.value = value
    },
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    async reset() {
      this.errorResponse = []
      this.error = { key: null, value: '' }
      await this.validateForm()
      if (!this.isValid) {
        return
      }
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dto = {
          token: this.token,
          password: this.accountForm.password,
          password_confirmation: this.accountForm.password_confirmation
        }
        const data = await this.$store.dispatch(AUTH_RESET_PASS, dto)

        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: this.$t('noti.success'),
              message: this.$t('noti.reset_success')
            })
            this.$router.push('/login')
            break
          case 422:
            for (const [k] of Object.entries(data.data)) {
              this.error = { key: k, value: data.data[k][0] }
              this.errorResponse.push({ key: k, value: data.data[k][0] })
            }
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })
            break
        }
      } catch (err) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    async validateForm() {
      await this.$refs.accountForm.validate(async valid => {
        this.isValid = (await valid)
      })
    },
    displayPass(type) {
      if (type === 'pass') {
        this.showPass = !this.showPass
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
