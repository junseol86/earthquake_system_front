<template>
  <div id="chatting">
    <div id="wrapper">
      <table id="selectTo"
        :style="{
          width: `${sizes.panelW}px`,
          height: `${chtSize.selectToH}px`,
          lineHeight: `${chtSize.selectToH}px`
        }">
        <tr>
          <td :class="to == 'all' ? 'on' : ''">
            전체
          </td>
          <td :class="to == 'team' ? 'on' : ''">
            <div>
              <select>
                <option v-for="(team, idx) in teams" :key="idx">
                  → {{team}}조 
                </option>
              </select>
            </div>
          </td>
          <td :class="to == 'member' ? 'on' : ''">
            <div>
              <select>
                <option v-for="(member, idx) in members" :key="idx">
                  → {{member.mbr_name}}
                </option>
              </select>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import mock from '../../../../mock'

export default {
  name: 'chatting',
  props: ['sizes', 'status'],
  data () {
    return {
      chtSize: {
        selectToH: 40
      },
      to: 'all',
      teams: [],
      members: []
    }
  },
  mounted () {
    this.teams = mock.teams
    this.members = mock.memberNamesSorted()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/panel/chatting/chatting.scss';
</style>