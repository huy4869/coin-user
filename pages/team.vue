<template>
  <div class="team_component">
    <div class="team_btn_div">
      <el-button
        v-for="index in 3" :key="index"
        :class="[idTeam===index?'btn_common_red':'btn_common_black']"
        @click="changeTeam(index)">Team {{ index }}
      </el-button>
    </div>
    <div class="network_div">
      <chart :data-tree="userRoot"></chart>
    </div>
  </div>
</template>

<script>
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
      userRoot: {},
      lstUser: []
    }
  },
  methods: {
    changeTeam(id) {
      this.idTeam = id
    }
  }
}
</script>
