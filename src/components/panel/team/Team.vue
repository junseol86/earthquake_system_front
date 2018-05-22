<template>
  <div id="team">
    <div id="wrapper">
      <table>
        <tr class="team" v-for="(team, t_idx) in teams" :key="t_idx">
          <td class="title">{{team.no}}</td>
          <td class="members">
            <select v-for="(member, m_idx) in team.members" :key="m_idx">
              <option>{{member.mbr_name}}</option>
              <option>위치확인</option>
              <option v-for="(team, tt_idx) in teams" :key="tt_idx">→ {{team.no}}조</option>
            </select>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import mock from '../../../../mock'

export default {
  name: 'team',
  props: ['sizes', 'status'],
  data () {
    return {
      teams: []
    }
  },
  methods: {
    getTeamIdxByNo (teams, no) {
      var result = -1
      teams.map((team, idx) => {
        if (team.no === no) {
          result = idx
        }
      })
      return result
    },
    intoTeam (members) {
      var _this = this
      var teams = []
      members.map((member) => {
        var teamIdx = _this.getTeamIdxByNo(teams, member.mbr_team)
        if (teamIdx === -1) {
          var team = {
            no: member.mbr_team,
            members: [member]
          }
          teams.push(team)
        } else {
          teams[teamIdx].members.push(member)
        }
      })
      this.teams = teams      
    }
  },
  mounted () {
    this.intoTeam(mock.members())
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/panel/team/team.scss';
</style>