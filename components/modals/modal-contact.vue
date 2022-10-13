<template>
  <div class="contact">
    <img src="~/assets/images/icons/close.svg" alt="" class="close_img" @click="$emit('close')">

    <p class="title_home_coming">{{ $t('header.contact') }}</p>
    <el-form
      ref="contactForm"
      :model="contactForm"
      :rules="contactRules"
      autocomplete="off"
      label-position="left"
    >
      <el-form-item class="email-login" prop="email" :error="(error.key === 'email') ? error.value : ''">
        <label for="email">{{ $t('contact.email') }}</label>
        <el-input
          id="email"
          ref="email"
          v-model.trim="contactForm.email"
          :placeholder="$t('contact.email')"
          name="email"
          type="text"
          tabindex="2"
          maxlength="50"
          @focus="resetValidate('email')"
        />
      </el-form-item>
      <el-form-item class="email-login" prop="title" :error="(error.key === 'title') ? error.value : ''">
        <label for="title">{{ $t('contact.title') }}</label>
        <el-input
          id="title"
          ref="title"
          v-model="contactForm.title"
          :placeholder="$t('contact.title')"
          name="title"
          type="text"
          tabindex="2"
          maxlength="100"
          @focus="resetValidate('title')"
        />
      </el-form-item>
      <el-form-item class="email-login" prop="content" :error="(error.key === 'content') ? error.value : ''">
        <label for="content">{{ $t('contact.content') }}</label>
        <el-input
          id="content"
          ref="content"
          v-model="contactForm.content"
          :placeholder="$t('contact.content')"
          name="content"
          type="textarea"
          tabindex="2"
          maxlength="1000"
          @focus="resetValidate('content')"
        />
      </el-form-item>
      <el-form-item>
        <div :class="{'disabled' : disabledButton, 'common-button': 'common-button'}">
          <el-button
            :disabled="disabledButton"
            @click.native="submit"
          >
            {{ $t('contact.submit') }}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validEmail } from '@/utils/validate'
import { INDEX_SET_ERROR, INDEX_SET_LOADING, INDEX_SET_SUCCESS, USER_CONTACT } from '@/store/store.const'

export default {
  name: 'ContactModal',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error(this.$t('validation.email_format')))
      } else {
        callback()
      }
    }
    return {
      contactForm: {
        email: '',
        title: '',
        content: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      contactRules: {
        email: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('contact.email') }),
            trigger: 'blur'
          },
          {
            validator: validateEmail, trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('contact.title') }),
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('contact.content') }),
            trigger: 'blur'
          }
        ]
      },
      valid: false
    }
  },
  computed: {
    disabledButton() {
      return this.contactForm.email === '' || this.contactForm.title === '' || this.contactForm.content === ''
    }
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.contactForm.fields.find((f) => f.prop === ref).clearValidate()
      this.contactForm.errors[ref] = ''
    },
    async submit() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(USER_CONTACT,
          {
            email: this.contactForm.email,
            title: this.contactForm.title,
            contact: this.contactForm.contact
          })
        switch (response.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, { show: true, text: response.message })
            this.contactForm = {
              email: '',
              title: '',
              content: '',
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

.title_home_coming {
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  align-items: center;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;

  color: $color-red-primary;
  -webkit-text-stroke: 1px $color-white;

}

</style>
