<template>
  <div id="chatting">
    <div id="wrapper">

      <div id="send">
        <table id="selectTo"
          :style="{
            width: `${sizes.panelW}px`,
            height: `${chtSize.selectToH}px`,
            lineHeight: `${chtSize.selectToH}px`
          }">
          <tr>
            <td :class="to == 'all' ? 'on' : ''" @click="setTo('all')">
              <span>전체</span>
            </td>
            <td :class="to == 'team' ? 'on' : ''">
              <div>
                <select @click="setTo('team')">
                  <option v-for="(team, idx) in teams" :key="idx">
                    ▶︎ {{team}}조 
                  </option>
                </select>
              </div>
            </td>
            <td :class="to == 'member' ? 'on' : ''">
              <div>
                <select @click="setTo('member')">
                  <option v-for="(member, idx) in members" :key="idx">
                    ▶︎ {{member.mbr_name}}
                  </option>
                </select>
              </div>
            </td>
          </tr>
        </table>

        <div id="message"
          :style="{
            height: `${chtSize.messageH}px`,
            }">
          <textarea placeholder="메시지 입력 후 엔터"
          :style="{
            margin: `${chtSize.messageM}px`,
            width: `${sizes.panelW - sizes.scrollBarW - 2 * (chtSize.messageM)}px`,
            height: `${chtSize.messageH - 2 * (chtSize.messageM)}px`
            }"/>
        </div>

      </div>

      <div id="chats"
        :style="{
          height: `${sizes.winH - sizes.topbarH - sizes.panelTopH - chtSize.selectToH - chtSize.messageH - 1}px`
          }">
        <div>
          <table v-for="(message, idx) in messages" :key="idx"
            :class="message.msg_from_idx.length == 0 ? 'on' : ''">
            <tr>
              <td v-if="message.msg_from_idx.length == 0" class="fromTo">
                <i class="fas fa-arrow-circle-right"></i> {{message.msg_to_name}}
              </td>
              <td v-else class="fromTo">
                <i class="fas fa-arrow-circle-left"></i>︎ {{message.msg_from_name}}
              </td>
              <td class="datetime">
                {{message.msg_datetime}}
              </td>
            </tr>
            <tr>
              <td colspan="2" class="content">
                {{message.msg_content}}
              </td>
            </tr>
          </table>
        </div>
      </div>

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
        selectToH: 40,
        messageH: 80,
        messageM: 8
      },
      to: 'all',
      teams: [],
      members: [],
      messages: []
    }
  },
  methods: {
    setTo (which) {
      this.to = which
    }
  },
  mounted () {
    this.teams = mock.teams
    this.members = mock.memberNamesSorted()
    this.messages = mock.chats()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/panel/chatting/chatting.scss';
</style>