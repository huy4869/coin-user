<template>
  <div class="predict_team_component">
    <div v-if="$device.isMobile" class="predict_right">
      <div class="wallet_div wallet_div_mobile bg_div">
        <label for="" class="title_wallet">{{ $t('predict_team.wallet') }}</label>
        <div class="wallet_info">
          <div class="token_div">
            <img src="~/assets/images/icons/logo_token.svg" alt="" class="w-100">
            <span class="token_title">{{ $t('predict_team.chz', { v: user.coin_deposit }) }}</span>
          </div>
          <div class="btn_wallet_mobile">
            <el-button class="btn_receive" @click="openReceive">{{ $t('predict_team.receive') }}</el-button>
            <el-button class="btn_receive" @click="openWithdraw">{{ $t('predict_team.withdraw') }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$device.isMobile" class="tabs_div">
      <el-button class="btn_receive" :class="{'tab_disabled':tab ===1 }" @click="tab = 1">{{
          $t('tabs.predict')
        }}
      </el-button>
      <el-button class="btn_receive" :class="{'tab_disabled':tab ===2 }" @click="tab = 2">{{
          $t('tabs.history')
        }}
      </el-button>
    </div>
    <template v-if="tab === 1">
      <div class="predict_left">
        <div class="info_current_match bg_div">
          <div class="name_match mg-auto">
            <img src="~/assets/images/icons/predict/wc.svg" alt="">
            {{ currentMatch.league_round_name }}
          </div>
          <div v-if="$device.isMobile" class="main_info">
            <div class="all_info_match all_info_match_mobile">
              <div class="score">{{ currentMatch.home_score + ' - ' + currentMatch.away_score }}</div>
              <div>
                <div class="time_start">
                  {{
                    currentMatch.match_time_timestamp ? convertTimestampToTime(currentMatch.match_time_timestamp) : ''
                  }}
                </div>
                <div class="date_start">
                  {{
                    currentMatch.match_time_timestamp ? convertTimestampToDate(currentMatch.match_time_timestamp) : ''
                  }}
                </div>
              </div>
              <div class="amount_vote">
                <span>{{ currentMatch.home_coin_format + 'CHZ' }}</span>
                <div class="hr"></div>
                <span>{{ currentMatch.away_coin_format + 'CHZ' }}</span>
              </div>
            </div>
          </div>
          <div class="main_info">
            <div v-if="currentMatch.home_team" class="team_vote mg-auto"
                 :class="{'disable_img':currentMatch.started || currentMatch.finished, 'css-gray':currentMatch.won_team === currentMatch.away_team.id}">
              <img :src="require('assets/images/predict/bg_nft'+currentMatch.home_team.level.toString()+'.svg')" alt=""
                   class="img_bg_team">
              <span class="name_nft_team">{{
                  currentMatch.home_team.name
                }}</span>
              <img :src="currentMatch.home_team.logo" alt="" class="img_nation_team moveYShort">
              <el-button
                :class="{'disable_img css-gray':currentMatch.is_expire === 1 || isVoteExpired}"
                @click="openVote(currentMatch.home_team)">{{ $t('predict_team.vote') }}
              </el-button>
            </div>

            <div v-if="!$device.isMobile" class="all_info_match">
              <div class="score">{{ currentMatch.home_score + ' - ' + currentMatch.away_score }}</div>
              <div>
                <div class="time_start">
                  {{
                    currentMatch.match_time_timestamp ? convertTimestampToTime(currentMatch.match_time_timestamp) : ''
                  }}
                </div>
                <div class="date_start">
                  {{
                    currentMatch.match_time_timestamp ? convertTimestampToDate(currentMatch.match_time_timestamp) : ''
                  }}
                </div>
              </div>
              <div class="amount_vote">
                <span>{{ currentMatch.home_coin_format + 'CHZ' }}</span>
                <div class="hr"></div>
                <span>{{ currentMatch.away_coin_format + 'CHZ' }}</span>
              </div>
            </div>

            <div v-if="currentMatch.home_team" class="team_vote mg-auto"
                 :class="{'disable_img':currentMatch.started || currentMatch.finished, 'css-gray':currentMatch.won_team === currentMatch.home_team.id}">
              <img :src="require('assets/images/predict/bg_nft'+currentMatch.away_team.level.toString()+'.svg')" alt=""
                   class="img_bg_team">
              <span class="name_nft_team">{{
                  currentMatch.away_team.name
                }}</span>
              <img :src="currentMatch.away_team.logo" alt="" class="img_nation_team moveYShort">
              <el-button
                :class="{'disable_img css-gray':currentMatch.is_expire === 1 || isVoteExpired}"
                @click="openVote(currentMatch.away_team)">{{ $t('predict_team.vote') }}
              </el-button>
            </div>
          </div>
        </div>

        <div v-if="!$device.isMobile" class="summary">
          <div class="status_div">
            <el-select v-model="statusVote" placeholder="Status">
              <el-option
                v-for="item in lstStatus"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <el-table
            ref="historyTable"
            :data="histories"
            bitem
            fit
            stripe
            highlight-current-row
            :row-class-name="(row, rowIndex) => 'item-row-table'"
            class="table_history_pc table_f1_pc table_vote"
          >
            <el-table-column :label="$t('predict_team.date')" prop="created_at_ts" min-width="70">
              <template v-if="row.created_at_ts" slot-scope="{row}">
                {{ convertTimestampToDate(row.created_at_ts) }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('predict_team.bet')" prop="coin_format" min-width="50">
            </el-table-column>
            <el-table-column :label="$t('predict_team.match')" prop="match" min-width="">
              <template slot-scope="{row}">
                <div class="couple_team">
                  <img :src="row.match.home_team.logo" alt="" class="img_couple_team">
                  <span> VS </span>
                  <img :src="row.match.away_team.logo" alt="" class="img_couple_team">
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('predict_team.vote')" prop="team" min-width="40">
              <template slot-scope="{row}">
                <img :src="row.team.logo" alt="" class="img_couple_team">
              </template>
            </el-table-column>
            <el-table-column :label="$t('predict_team.score')" prop="score" min-width="50">
              <template slot-scope="{row}">
                <span class="score_value">{{
                    $t('predict_team.score_value', { v1: row.match.home_score, v2: row.match.away_score })
                  }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('predict_team.reward')" prop="reward">
              <template v-if="row.status===2" slot-scope="{row}">
                <span class="bonus">{{ '+' + row.reward.toString() }}</span>
              </template>
            </el-table-column>

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
      <div class="predict_right">
        <div v-if="$device.isDesktop" class="wallet_div bg_div">
          <label for="" class="title_wallet">{{ $t('predict_team.wallet') }}</label>
          <div class="wallet_info">
            <div class="token_div">
              <img src="~/assets/images/icons/logo_token.svg" alt="" class="w-100">
              <span class="token_title">{{ $t('predict_team.chz', { v: user.coin_deposit }) }}</span>
            </div>
            <el-button class="btn_receive" @click="openReceive">{{ $t('predict_team.receive') }}</el-button>
            <el-button class="btn_receive" @click="openWithdraw">{{ $t('predict_team.withdraw') }}</el-button>
          </div>
        </div>
        <div v-else-if="$device.isTablet" class="wallet_div wallet_div_mobile bg_div">
          <label for="" class="title_wallet">{{ $t('predict_team.wallet') }}</label>
          <div class="wallet_info">
            <div class="token_div">
              <img src="~/assets/images/icons/logo_token.svg" alt="" class="w-100">
              <span class="token_title">{{ $t('predict_team.chz', { v: user.coin_deposit }) }}</span>
            </div>
            <div class="btn_wallet_mobile">
              <el-button class="btn_receive" @click="openReceive">{{ $t('predict_team.receive') }}</el-button>
              <el-button class="btn_receive" @click="openWithdraw">{{ $t('predict_team.withdraw') }}</el-button>
            </div>
          </div>
        </div>

        <div class="lst_match_div bg_div">
          <div class="lst_date_match">
            <img src="~/assets/images/icons/predict/arrow_left.svg" alt="" class="img_arrow_date"
                 @click="changeDate('-')">
            <div class="date_math_text">{{ currentDate.value }}</div>
            <img src="~/assets/images/icons/predict/arrow_right.svg" alt="" class="img_arrow_date"
                 @click="changeDate('+')">
          </div>
          <div v-for="item in lstMatch" :key="item.key" class="day_match_div">
            <div class="time_title">
              {{ item.key }}
            </div>
            <div
              v-for="(match, index) in item.matches" :key="match.id"
              :class="{'border_match':index<item.matches.length-1}"
              @click="viewMatch(match)">
              <div :class="{'match_detail':true, 'selected': match.id === idCurrentMatch}">
                <div class="detail_team detail_team_left">
                  <span class="name_team">{{ match.home_team.name }}</span>
                  <img :src="match.home_team.logo" alt="" class="img_team">
                </div>
                <div class="time_team">{{ convertTimestampToTime(match.match_time_timestamp) }}</div>
                <div class="detail_team detail_team_right">
                  <img :src="match.away_team.logo" alt="" class="img_team">
                  <span class="name_team">{{ match.away_team.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <el-dialog
        :center="true" :close-on-click-modal="false" :destroy-on-close="true"
        :show-close="true" :visible.sync="isOpenReceive" class="dialog-deposit">
        <modal-receive-predict
          :address="address"
          :memo="user.send_memo.toString()"
          @close="closeReceive()"/>
      </el-dialog>

      <el-dialog
        :center="true" :close-on-click-modal="false" :destroy-on-close="true"
        :show-close="true" :visible.sync="isOpenWithdraw" class="dialog-deposit">
        <modal-withdraw-predict
          :address="user.wallet_address"
          :memo="user.send_memo.toString()"
          @close="closeWithdraw()"/>
      </el-dialog>

      <el-dialog
        :center="true" :close-on-click-modal="false" :destroy-on-close="true"
        :show-close="true" :visible.sync="isOpenVote" class="dialog-deposit dialog-vote">
        <modal-vote-predict
          :match="currentMatch"
          :team="teamVote"
          @close="closeVote()"/>
      </el-dialog>
    </template>
    <template v-else>
      <div class="summary">
        <h3 class="title_tab">{{ $t('tabs.history') }}</h3>
        <div class="status_div">
          <el-select v-model="statusVote" placeholder="Status">
            <el-option
              v-for="item in lstStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="table_history_mobile">
          <table>
            <thead>
            <tr>
              <th scope="col">{{ $t('predict_team.date') }}</th>
              <th scope="col">{{ $t('predict_team.bet') }}</th>
              <th scope="col">{{ $t('predict_team.match') }}</th>
              <th scope="col">{{ $t('predict_team.vote') }}</th>
              <th scope="col">{{ $t('predict_team.score') }}</th>
              <th scope="col">{{ $t('predict_team.reward') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(value, index) in histories" :key="index">
              <td :data-label="$t('predict_team.date')">
                {{ convertTimestampToDate(value.created_at_ts) }}
              </td>
              <td :data-label="$t('predict_team.bet')">
                {{ value.coin_format }}
              </td>
              <td :data-label="$t('predict_team.match')">
                <div class="couple_team">
                  <img :src="value.match.home_team.logo" alt="" class="img_couple_team">
                  <span> VS </span>
                  <img :src="value.match.away_team.logo" alt="" class="img_couple_team">
                </div>
              </td>
              <td :data-label="$t('predict_team.vote')">
                <img :src="value.team.logo" alt="" class="img_couple_team">
              </td>
              <td :data-label="$t('predict_team.score')">
               <span class="score_value">{{
                   $t('predict_team.score_value', { v1: value.match.home_score, v2: value.match.away_score })
                 }}</span>
              </td>
              <td :data-label="$t('predict_team.reward')">
                <span v-if="value.status===2" class="bonus">{{ '+' + value.reward.toString() }} CHZ</span>
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
    </template>
  </div>
</template>

<script>
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  PREDICT_CHECK_EXPIRED,
  PREDICT_GET_DETAIL_MATCH,
  PREDICT_GET_HISTORIES,
  PREDICT_GET_LST_DATE,
  PREDICT_GET_LST_MATCH,
  PREDICT_GET_LST_STATUS,
  USER_GET_WALLET_PREDICT
} from '@/store/store.const'
import ModalReceivePredict from '@/components/modals/modal-receive-predict'
import ModalWithdrawPredict from '@/components/modals/modal-withdraw-predict'
import { convertMatchToArr, convertTimestampToDate, convertTimestampToTime } from '@/utils/utils'
import ModalVotePredict from '@/components/modals/modal-vote-predict'
import Pagination from '@/components/element-ui/Pagination'

export default {
  name: 'PredictTeamComponent',
  middleware: 'auth-guard',
  components: { ModalVotePredict, ModalWithdrawPredict, ModalReceivePredict, Pagination },
  data() {
    return {
      user: this.$auth.user,
      isOpenReceive: false,
      isOpenWithdraw: false,
      isOpenVote: false,
      address: '',
      lstDate: [],
      lstMatch: [],
      indexDate: 0,
      currentMatch: {
        home_score: 0,
        away_score: 0,
        home_coin_format: 0,
        away_coin_format: 0
      },
      idCurrentMatch: null,
      teamVote: {},
      statusVote: '-1',
      total: 0,
      listQuery: {
        search: '',
        page: 1,
        per_page: this.$device.isDesktop ? 8 : 5,
        'orders[0][key]': 'created_at',
        'orders[0][dir]': 'desc',
        'filters[0][key]': 'status',
        'filters[0][data]': '1'
      },
      histories: [],
      lstStatus: [],
      tab: 1,
      isVoteExpired: false
    }
  },
  computed: {
    currentDate() {
      return this.lstDate[this.indexDate] ? this.lstDate[this.indexDate] : { value: '-- : --' }
    }
  },
  watch: {
    async indexDate() {
      this.$store.commit(INDEX_SET_LOADING, true)
      await this.getLstMatch()
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    async statusVote() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      this.listQuery['filters[0][data]'] = this.statusVote !== -1 ? this.statusVote : ''
      await this.getHistory()
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  },
  async mounted() {
    this.$store.commit(INDEX_SET_LOADING, true)
    await this.init()
    this.$store.commit(INDEX_SET_LOADING, false)
  },
  methods: {
    openReceive() {
      this.isOpenReceive = true
    },
    closeReceive() {
      this.isOpenReceive = false
    },
    openWithdraw() {
      this.isOpenWithdraw = true
    },
    closeWithdraw() {
      this.isOpenWithdraw = false
    },
    async openVote(team) {
      await this.checkExpired(team.id)
      if (this.isVoteExpired) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('noti.timed_vote') })
        return
      }
      this.teamVote = team
      this.isOpenVote = true
    },
    async closeVote() {
      this.isOpenVote = false
      await this.init()
    },
    async init() {
      await this.getPredictWallet()
      await this.getLstDate()
      await this.getLstMatch()
      await this.getLstStatus()
      await this.getHistory()
      if (this.idCurrentMatch != null) {
        await this.getDetailMatch(this.idCurrentMatch)
      } else {
        this.currentMatch = this.lstMatch[0].matches[0]
        this.idCurrentMatch = this.currentMatch.id
        this.isVoteExpired = this.currentMatch.is_expire === 1
      }
    },
    async getPredictWallet() {
      try {
        const data = await this.$store.dispatch(USER_GET_WALLET_PREDICT)
        switch (data.status_code) {
          case 200:
            this.address = data.data.address
            break
          case 422:
            for (const [key] of Object.entries(data.data)) {
              this.error = { key, value: data.data[key][0] }
            }
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })
            break
        }
      } catch (err) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    },
    async getLstStatus(id) {
      try {
        const data = await this.$store.dispatch(PREDICT_GET_LST_STATUS)
        switch (data.status_code) {
          case 200:
            this.lstStatus = data.data
            this.statusVote = this.lstStatus[0].id
            break
          case 422:
            for (const [key] of Object.entries(data.data)) {
              this.error = { key, value: data.data[key][0] }
            }
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })
            break
        }
      } catch (err) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    },
    async getDetailMatch(id) {
      try {
        const data = await this.$store.dispatch(PREDICT_GET_DETAIL_MATCH, id)
        switch (data.status_code) {
          case 200:
            this.currentMatch = data.data
            this.isVoteExpired = this.currentMatch.is_expire === 1
            break
          case 422:
            for (const [key] of Object.entries(data.data)) {
              this.error = { key, value: data.data[key][0] }
            }
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })
            break
        }
      } catch (err) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    },
    async getLstDate() {
      try {
        const data = await this.$store.dispatch(PREDICT_GET_LST_DATE)
        switch (data.status_code) {
          case 200:
            this.lstDate = data.data
            break
          case 422:
            for (const [key] of Object.entries(data.data)) {
              this.error = { key, value: data.data[key][0] }
            }
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })
            break
        }
      } catch (err) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    },
    changeDate(type) {
      if (type === '+' && this.indexDate < this.lstDate.length - 1) {
        this.indexDate++
      } else if (type === '-' && this.indexDate > 0) {
        this.indexDate--
      }
    },
    async getLstMatch() {
      try {
        const data = await this.$store.dispatch(PREDICT_GET_LST_MATCH, this.lstDate[this.indexDate].key)
        switch (data.status_code) {
          case 200:
            this.lstMatch = convertMatchToArr(data.data)
            break
          case 422:
            for (const [key] of Object.entries(data.data)) {
              this.error = { key, value: data.data[key][0] }
            }
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })
            break
        }
      } catch (err) {
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    },
    async viewMatch(match) {
      this.idCurrentMatch = match.id
      await this.getDetailMatch(match.id)
    },
    async getHistory() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(PREDICT_GET_HISTORIES, this.listQuery)
        switch (response.status_code) {
          case 200:
            this.histories = response.data.data
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
    async checkExpired(id) {
      await this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(PREDICT_CHECK_EXPIRED, id)
        switch (response.status_code) {
          case 200:
            this.isVoteExpired = response.data
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
    convertTimestampToTime(date) {
      return convertTimestampToTime(date)
    }, convertTimestampToDate(date) {
      return convertTimestampToDate(date)
    }
  }
}
</script>
