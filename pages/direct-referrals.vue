<template>
  <div class="f1_component">
    <div class="title_div">
      <h1 class="title">{{ $t('f1.title', { v: total }) }}</h1>
    </div>
    <div class="">

      <el-table
        ref="productTable"
        :data="lstRef"
        bitem
        fit
        stripe
        highlight-current-row
        :row-class-name="(row, rowIndex) => 'item-row-table'"
        class="table_history_pc table_f1_pc"
      >
        <el-table-column
          :label="$t('f1.no')"
          width="80"
        class-name="no_div">
          <template slot-scope="scope">
            {{ listQuery.page * (scope.$index +1) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('f1.email')" prop="email"></el-table-column>
        <el-table-column :label="$t('f1.wallet_address')" prop="wallet_address"></el-table-column>
        <el-table-column :label="$t('f1.node')" prop="nodes"></el-table-column>

        <div v-if="lstRef.length===0" slot="append" class="table-empty">
          <div>
            <div>
              <img src="~/assets/images/empty.svg" alt="empty" class="empty_img"/>
            </div>
            <div>
              <span>{{ $t('noti.empty') }}</span>
            </div>
          </div>
        </div>
      </el-table>

      <div class="table_history_mobile">
        <table>
          <thead>
          <tr>
            <th scope="col">{{ $t('f1.email') }}</th>
            <th scope="col">{{ $t('f1.wallet_address') }}</th>
            <th scope="col">{{ $t('f1.node') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(value, index) in lstRef" :key="index">
            <td :data-label="$t('f1.email')">
              {{ value.email }}
            </td>
            <td :data-label="$t('f1.wallet_address')">
              {{ renderLongText(value.wallet_address) }}
            </td>
            <td :data-label="$t('f1.node')">
              {{ value.node }}
            </td>
          </tr>
          </tbody>
        </table>
        <hr/>
        <div v-if="lstRef.length === 0" slot="append" class="table-empty">
          <div>
            <div>
              <img class="empty_img" src="~/assets/images/empty.svg" alt="empty"/>
            </div>
            <div>
              <span>{{ $t('noti.empty') }}</span>
            </div>
          </div>
        </div>
      </div>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.per_page"
        :auto-scroll="false"
        :paper-count="5"
        :is-small="false"
        @pagination="getF1()"
      />
    </div>
  </div>
</template>

<script>
import { INDEX_SET_ERROR, INDEX_SET_LOADING, USER_GET_F1 } from '@/store/store.const'
import Pagination from '@/components/element-ui/Pagination'

export default {
  name: 'DirectReferrals',
  components: { Pagination },
  data() {
    return {
      user: this.$auth.user,
      lstRef: [],
      total: 0,
      listQuery: {
        search: '',
        page: 1,
        per_page: this.$device.isDesktop ? 10 : 5,
        'orders[0][key]': 'updated_at',
        'orders[0][dir]': 'desc'
      }
    }
  },
  watch: {},
  async mounted() {
    await this.init()
  },
  methods: {
    async getF1() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(USER_GET_F1, this.listQuery)
        switch (response.status_code) {
          case 200:
            this.lstRef = response.data.data
            this.total = Number(response.data.total)
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
    },
    async init() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      await this.getF1()
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    renderLongText(text) {
      if (text !== null && text !== '') {
        return text.slice(0, 6) + '...' + text.slice(text.length - 6)
      } else {
        return ''
      }
    }
  }
}
</script>
