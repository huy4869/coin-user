<template>
  <div class="team_component">
    <div v-if="lstTeam.length === 0" class="team_btn_div">
      <el-button
        class="btn_common_red"
        @click="changeTeam(null, null)">Team 1
      </el-button>
    </div>
    <div v-else class="team_btn_div">
      <el-button
        v-for="(team, index) in lstTeam" :key="index"
        :class="[idTeam===team?'btn_common_red':'btn_common_black']"
        @click="changeTeam(team, index)">Team {{ index + 1 }}
      </el-button>
    </div>

    <el-dropdown class="dropdown-mobile cursor-pointer" trigger="click" placement="bottom-start">
      <div class="team">
        Team {{ selectedTeam }}
      </div>
      <template #dropdown>
        <el-dropdown-menu class="dropdown-team">
          <el-dropdown-item v-for="(team, index) in lstTeam" :key="index" :command="index">
            <div>
              <el-button
                :class="[idTeam===team?'btn_common_red':'btn_common_black']"
                @click="changeTeam(team, index)">Team {{ index + 1 }}
              </el-button>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <div class="network_div">
      <chart :data-tree="userRoot"></chart>
    </div>
  </div>
</template>

<script>
import { INDEX_SET_ERROR, INDEX_SET_LOADING, SET_BG_TYPE, USER_LST_TEAM, USER_TREE_BY_TEAM } from '../store/store.const'
import Chart from '@/components/chart/Chart'

export default {
  name: 'TeamComponent',
  components: {
    Chart
  },
  middleware: 'auth-guard',
  data() {
    return {
      invite_code: '',
      total_profit: '',
      idTeam: 1,
      selectedTeam: 1,
      lstTeam: [],
      userRoot: {},
      lstUser: [],
      error: {}
    }
  },
  created() {
    this.$store.commit(SET_BG_TYPE, 'home')
  },
  async mounted() {
    await this.$store.commit(INDEX_SET_LOADING, true)
    await this.getLstTeam()
    this.idTeam = this.lstTeam[0]
    await this.getTree()
    await this.$store.commit(INDEX_SET_LOADING, false)
  },
  methods: {
    async changeTeam(id, index) {
      if (this.lstTeam.length < 1) {
        return false
      }
      this.idTeam = id
      this.selectedTeam = index + 1
      await this.getTree()
    },
    async getLstTeam() {
      try {
        const data = await this.$store.dispatch(USER_LST_TEAM)
        switch (data.status_code) {
          case 200:
            this.lstTeam = data.data
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
    async getTree() {
      if (this.lstTeam.length === 0) {
        this.userRoot = {}
        return
      }
      await this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const data = await this.$store.dispatch(USER_TREE_BY_TEAM, this.idTeam)
        switch (data.status_code) {
          case 200:
            // eslint-disable-next-line no-case-declarations
            const temp = {
              ...data.data,
              expand: true
            }
            if (temp.children.length > 0) {
              for (let i = 0; i < temp.children.length; i++) {
                temp.children[i] = { ...temp.children[i], expand: true }
              }
            }
            this.userRoot = temp
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
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
