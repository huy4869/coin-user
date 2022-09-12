<template>
  <div class="deposit_component deposit-mobile">
    <img src="~/assets/images/icons/close.svg" alt="" class="close_img" @click="close">
    <div>
      <h3 class="modal-title">{{ $t('deposit.title') }}</h3>
      <h3 class="modal-title">{{ $t('deposit.direct_title') }}</h3>
      <ul>
        <li><h3 class="sub-title">{{ $t('deposit.direct1') }}</h3></li>
        <li><h3 class="sub-title">{{ $t('deposit.direct2') }}</h3></li>
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
      valid: false,
      loading: false,
      fullscreenLoading: false
    }
  },
  computed: {},
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
    }
  }
}
</script>
