<template>
  <div id="team">
    <div id="wrapper"
      :style="{
        height: `${sizes.winH - sizes.topbarH - sizes.panelTopH - 1}px`
      }">
      <div id="noticeBtn"
        :style="{
          height: `${tmSize.noticeBtnH}px`,
          lineHeight: `${tmSize.noticeBtnH}px`
        }">
        <i class="fas fa-bell"></i> 조편성 알림 보내기
      </div>
      <div id="teams"
        :style="{
          height: `${sizes.winH - sizes.topbarH - sizes.panelTopH - tmSize.noticeBtnH - 2}px`
        }">
        <table v-if="teams != null">
          <tr class="team" v-for="(team, t_idx) in teams" :key="t_idx">
            <td class="title">{{team.no == 0 ? '미편성' : team.no + '조'}}</td>
            <td class="members">
              <div v-for="(member, m_idx) in team.members" 
                :key="m_idx"
                :class="(member.hasPos ? 'hasPos ' : ' ')
                   + (member.arrival.length > 0 ? 'hasArr' : '')"
                @click="seeMember(member)">
                <span class="name">
                  <i v-if="member.hasPos" class="fas fa-map-marker"></i>
                  {{member.mbr_name}}
                  {{member.arrival}}
                </span>
                <i class="fas fa-phone-square" @click.stop="phoneNumber(member.mbr_phone)"></i>
                <select v-model="member.mbr_team" :value="member.mbr_team"
                  @change="changeTeam(member.mbr_idx, member.mbr_team)">
                  <option v-for="(team, tt_idx) in teams" 
                    :key="tt_idx" 
                    :value="tt_idx">
                    {{team.no == 0 ? '미편성' : (team.no + '조')}}
                  </option>
                  <option :value="-1">
                   ✕ 삭제
                  </option>
                </select>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'team',
  props: ['sizes', 'status', 'teams'],
  data () {
    return {
      tmSize: {
        noticeBtnH: 44
      }
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
    seeMember (member) {
      if (this.$util.isInDay(member.mbr_pos_last_report)) {
        window.moveToAndZoom(member)
      }
    },
    changeTeam(mbr_idx, team) {
      if (team == -1) {
        this.deleteMember(mbr_idx)
      } else {
        var _this = this
        var toSend = {
          mbr_idx: mbr_idx,
          team: team,
          jwtToken: _this.status.jwtToken
        }
        _this.$axios.put(this.$serverApi + 'member/changeTeam', this.$qs.stringify(toSend), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then((response) => {
          _this.$bus.$emit('setJwtToken', response.data.jwtToken)
          if (!response.data.success) {
            window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
          } else {
            this.$bus.$emit('getMembers')
          }
        }).catch((err) => {
          console.log(err)
          window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
        })
      }
    },
    phoneNumber(phone) {
      window.alert('☎︎ ' + phone)
    },
    deleteMember (mbr_idx) {
      if (window.confirm('이 계정을 삭제하시겠습니까?')) {
        var _this = this
        var toSend = {
          mbr_idx: mbr_idx,
          jwtToken: _this.status.jwtToken
        }
        _this.$axios.post(this.$serverApi + 'member/delete', this.$qs.stringify(toSend), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then((response) => {
          _this.$bus.$emit('setJwtToken', response.data.jwtToken)
          if (!response.data.success) {
            window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
          } else {
            this.$bus.$emit('getMembers')
          }
        }).catch((err) => {
          console.log(err)
          window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
        })
      }
    }
  },
  mounted () {
    clearTimeout(window.getChatsAfterTimeout)
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/panel/team/team.scss';
</style>