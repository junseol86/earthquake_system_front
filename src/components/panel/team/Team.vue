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
              <select v-for="(member, m_idx) in team.members" :key="m_idx" 
                :class="isPosReported(member.mbr_pos_last_report) ? 'hasPos' : ''"
                @click="seeMember(member)">
                <option>
                  {{isPosReported(member.mbr_pos_last_report) ? '◉ ' : ''}}
                  {{member.mbr_name}}
                  {{arriveInIfInDay(member.mbr_arr_last_report, member.mbr_arrive_in)}}
                </option>
                <option v-for="(team, tt_idx) in teams" :key="tt_idx">→ {{team.no}}조</option>
              </select>
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
    // 하루 이내 보고되었을 시 도착 예상 시간
    arriveInIfInDay (arr_last_report, arrive_in) {
      if (this.$util.isInDay(arr_last_report)) {
        return this.$util.willComeUntil(arrive_in)
      } else {
        return ''
      }
    },
    isPosReported (pos_last_report) {
      return this.$util.isInDay(pos_last_report)
    },
    seeMember (member) {
      if (this.$util.isInDay(member.mbr_pos_last_report)) {
        window.moveToAndZoom(member, 16)
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/panel/team/team.scss';
</style>