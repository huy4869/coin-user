<template>
  <div class="history_component">
    <div class="title_div">
      <h1 class="title">{{ $t('history.title') }}</h1>
    </div>
    <div class="">
      <el-table
        ref="productTable"
        :data="histories"
        bitem
        fit
        stripe
        highlight-current-row
        :row-class-name="(row, rowIndex) => 'item-row-table'"
        class="table_history_pc"
      >
        <el-table-column :label="$t('history.created_at')" prop="created_at" width="200"></el-table-column>
        <el-table-column :label="$t('history.email')" prop="email"></el-table-column>
        <el-table-column :label="$t('history.tx_hash')" prop="tx_hash" width="800"></el-table-column>
        <el-table-column :label="$t('history.token')" prop="value_text" width="200">
          <template slot-scope="{row}">
            <span v-if="row.operator === '-'" class="minus">{{ row.value_text }} CHZ</span>
            <span v-else class="bonus">{{ row.value_text }} CHZ</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('history.type_name')" prop="type_name"></el-table-column>
        <el-table-column :label="$t('history.status')" prop="status_text"></el-table-column>
        <div v-if="histories.length===0" slot="append" class="table-empty">
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
            <th scope="col">{{ $t('history.created_at') }}</th>
            <th scope="col">{{ $t('history.email') }}</th>
            <th scope="col">{{ $t('history.tx_hash') }}</th>
            <th scope="col">{{ $t('history.token') }}</th>
            <th scope="col">{{ $t('history.type_name') }}</th>
            <th scope="col">{{ $t('history.status') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(value, index) in histories" :key="index">
            <td :data-label="$t('history.created_at')">
              {{ value.created_at }}
            </td>
            <td :data-label="$t('history.email')">
              {{ value.email }}
            </td>
            <td :data-label="$t('history.tx_hash')">
              {{ renderTxHash(value.tx_hash) }}
            </td>
            <td :data-label="$t('history.token')">
              <span v-if="value.operator === '-'" class="minus">{{ value.value_text }} CHZ</span>
              <span v-else class="bonus">{{ value.value_text }} CHZ</span>
            </td>
            <td :data-label="$t('history.type_name')">
              {{ value.type_name }}
            </td>
            <td :data-label="$t('history.status')">
              {{ value.status_text }}
            </td>
          </tr>
          </tbody>
        </table>
        <hr/>
        <div v-if="histories.length === 0" slot="append" class="table-empty">
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
        @pagination="getHistory()"
      />
    </div>
  </div>
</template>

<script>
import { INDEX_SET_ERROR, INDEX_SET_LOADING, USER_GET_HISTORY } from '@/store/store.const'
import Pagination from '@/components/element-ui/Pagination'

export default {
  name: 'HistoryComponent',
  components: { Pagination },
  data() {
    return {
      histories: [],
      total: 0,
      listQuery: {
        page: 1,
        per_page: this.$device.isDesktop ? 10 : 5
        // per_page: 2
      }
    }
  },
  async mounted() {
    await this.init()
  },
  methods: {
    async getHistory() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(USER_GET_HISTORY, this.listQuery)
        switch (response.status_code) {
          case 200:
            this.histories = response.data.data
            this.total = response.data.total
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
      await this.getHistory()
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    renderTxHash(hash) {
      if (hash !== null && hash !== '') {
        return hash.slice(0, 6) + '...' + hash.slice(hash.length - 6)
      } else {
        return ''
      }
    }
  }
}
</script>
