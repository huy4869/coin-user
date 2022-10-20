<template>
  <div class="deposit_component deposit-mobile vote_modal">
    <img src="~/assets/images/icons/close.svg" alt="" class="close_img" @click="close">
    <div>
      <h1 class="modal-title-vote">{{ $t('predict_team.predict_title') }}</h1>
      <div v-if="team.level" class="team_vote_modal mg-auto">
        <img :src="require('assets/images/predict/bg_nft'+team.level.toString()+'.svg')" alt=""
             class="img_bg_team">
        <span class="name_nft_team">{{
            team.name
          }}</span>
        <img :src="team.logo" alt="" class="img_nation_team moveYShort">
      </div>
      <h3 class="modal-subtitle-vote">{{ $t('predict_team.available', { v: user.coin_deposit }) }}</h3>
      <h3 class="modal-subtitle-vote">{{
          $t('predict_team.min_bet', { v: min_bet })
        }}</h3>
      <el-form
        ref="formVote"
        autocomplete="off"
        label-position="left"
        :model="voteForm"
        :rules="formRules">
        <br/>

        <el-form-item class="" :label="$t('predict_team.amount_bet')" prop="amount"
                      :error="error.value">
          <el-input
            ref="amount"
            v-model="voteForm.amount"
            name="amount"
            :placeholder="$t('predict_team.amount_bet')"
            oninput="this.value=this.value.replace(/[^0-9]/g,'');"
            type="text"
            tabindex="2"
            maxlength="12"
            @focus="resetValidate('amount')"
          >
          </el-input>
        </el-form-item>

        <div class="common-button">
          <el-button
            :disabled="disableBtn"
            @click="submit"
          >
            {{ $t('predict_team.vote') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { INDEX_SET_ERROR, INDEX_SET_LOADING, INDEX_SET_SUCCESS, MIN_BET, PREDICT_VOTE_TEAM } from '@/store/store.const'

export default {
  name: 'ModalVotePredict',
  components: {},
  props: {
    match: {},
    team: {}
  },
  data() {
    const validateAmount = (rule, value, callback) => {
      if (Number(value) < this.min_bet) {
        callback(new Error(this.$t('predict_team.valid_min')))
      } else if (Number(value) > this.user.coin_deposit) {
        callback(new Error(this.$t('predict_team.valid_max')))
      } else {
        callback()
      }
    }
    return {
      total_price: 150,
      user: this.$auth.user,
      min_bet: MIN_BET,
      valid: false,
      fullscreenLoading: false,
      voteForm: {
        amount: '',
        errors: {}
      },
      formRules: {
        amount: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('predict_team.amount_bet') }),
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
      return this.loading || this.voteForm.amount === '' || this.voteForm.amount < MIN_BET ||
        this.voteForm.amount > this.user.coin_deposit
    }
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.formVote.fields.find((f) => f.prop === ref).clearValidate()
      this.voteForm.errors[ref] = ''
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
        const response = await this.$store.dispatch(PREDICT_VOTE_TEAM,
          {
            'match_id': this.match.id,
            'coin': this.voteForm.amount,
            'prediction': 1,
            'team_id': this.team.id
          })
        switch (response.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, { show: true, text: response.message })
            this.voteForm = {
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
