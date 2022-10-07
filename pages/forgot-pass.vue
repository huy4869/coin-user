<template>
  <div v-if="step === 1" class="main-login">
    <div>
      <div class="login login-width login-mobile">
        <h3 class="title">{{ $t('account.reset_password') }}</h3>
        <h4 class=" ">{{ $t('account.forgot_title') }}</h4>
        <el-form
          ref="accountForm"
          :model="accountForm"
          :rules="accountRules"
          autocomplete="off"
          label-position="left"
          @keydown.enter.native.prevent="submit"
        >
          <el-form-item class="email-login" :label="$t('account.email')" prop="email"
                        :error="(error.key === 'email') ? error.value : ''">
            <el-input
              id="email"
              ref="email"
              v-model.trim="accountForm.email"
              :placeholder="$t('account.email')"
              name="email"
              type="text"
              tabindex="2"
              maxlength="50"
              @focus="resetValidate('email')"
            />
          </el-form-item>

          <el-form-item>
            <div :class="{'disabled' : disabledButton, 'common-button': 'common-button', 'mb-0' : true}">
              <el-button
                v-loading.fullscreen.lock="fullscreenLoading"
                :loading="loading"
                :disabled="disabledButton"
                @click.native="submit"
              >
                {{ $t('account.send') }}
              </el-button>
            </div>
          </el-form-item>
          <div class="back" style="margin-top: 1.5rem">
            <router-link to="/" class="align-items-center cursor-pointer">
              {{ $t('account.back') }}
            </router-link>
          </div>
        </el-form>
      </div>
    </div>
  </div>
  <div v-else class="main-login" style="background: #FFF">
    <div class="login login-width login-mobile">
      <img class="noti-img" src="~/assets/images/email.png" alt="">
      <h3 class="noti-title">{{ $t('noti.send_mail_forgot') }}</h3>
      <h4 class="noti-subtitle">{{ $t('noti.send_mail_forgot_sub') }}</h4>
      <div class="common-button mb-0">
        <el-button
          v-loading.fullscreen.lock="fullscreenLoading"
          :loading="loading"
          @click.native="$router.push('/')"

        >
          {{ $t('noti.ok') }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { INDEX_SET_ERROR, INDEX_SET_LOADING, SET_BG_TYPE } from '@/store/store.const'
import { validEmail } from '@/utils/validate'
import { AUTH_SEND_EMAIL_FORGOT } from '@/constants/store'

export default {
  name: 'ForgotPage',
  layout: 'auth',
  middleware: 'auth-guard',
  data() {
    const validdateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error(this.$t('validation.email_format')))
      } else {
        callback()
      }
    }

    return {
      step: 1,
      token: '',
      user: {},
      accountForm: {
        email: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        email: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.email') }),
            trigger: 'blur'
          },
          {
            validator: validdateEmail, trigger: 'blur'
          }
        ]
      },
      valid: false,
      capsToolPasswordTip: false,
      loading: false,
      fullscreenLoading: false,
      showPass: false,
      isValid: false,
      isAuthErr: false
    }
  },
  computed: {
    disabledButton() {
      return this.accountForm.email === ''
    }
  },
  created() {
    this.$store.commit(SET_BG_TYPE, 'auth')
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    checkCapslock(e, attr) {
      const { key } = e
      this[attr] = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    async submit() {
      this.error = { key: null, value: '' }
      this.validateForm()
      if (!this.isValid) {
        return
      }
      try {
        this.$store.commit(INDEX_SET_LOADING, true)
        const data = await this.$store.dispatch(AUTH_SEND_EMAIL_FORGOT,
          { email: this.accountForm.email })

        switch (data.status_code) {
          case 200:
            // this.$store.commit(INDEX_SET_SUCCESS, {
            //   show: true,
            //   text: this.$t('noti.success'),
            //   message: this.$t('noti.send_mail_forgot') + this.$t('noti.send_mail_forgot_sub')
            // })
            this.accountForm.email = ''
            this.step = 2
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: 'Lỗi', message: data.message })
            break
        }
      } catch (err) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: 'Lỗi', message: this.$t('message.message_error') })
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    validateForm() {
      this.$refs.accountForm.validate(valid => {
        this.isValid = valid
      })
    },
    closeModalErr() {
      this.isAuthErr = false
    }
  }
}
</script>
<style scoped lang="scss">
</style>
