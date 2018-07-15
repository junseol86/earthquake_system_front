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
                <select v-model="toTeam" @click="setTo('team')">
                  <option v-for="(team, idx) in teams" :key="idx" :value="team.no">
                    ▶︎ {{team.no == 0 ? '미편성' : `${team.no}조`}} 
                  </option>
                </select>
              </div>
            </td>
            <td :class="to == 'member' ? 'on' : ''">
              <div>
                <select v-model="toMember" @click="setTo('member')">
                  <option v-for="(member, idx) in members" :key="idx" :value="member.mbr_idx">
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
          <textarea placeholder="메시지 입력 후 엔터" v-model="textToSend"
          :style="{
            margin: `${chtSize.messageM}px`,
            width: `${sizes.panelW - sizes.scrollBarW - 2 * (chtSize.messageM)}px`,
            height: `${chtSize.messageH - 2 * (chtSize.messageM)}px`
            }" @keypress.enter="sendChat()"/>
        </div>

      </div>

      <div id="chats"
        :style="{
          height: `${chatsH}px`
          }" @scroll="onScroll">
        <div ref="scrolled">
          <table v-for="(chat, idx) in chats" :key="idx"
            :class="chat.cht_from_idx == 0 ? 'mine' : ''">
            <tr>
              <td v-if="chat.cht_from_idx == 0" class="fromTo">
                <i class="fas fa-arrow-circle-right"></i>
                {{chat.cht_to_name.length > 0 ? chat.cht_to_name : chat.cht_to_team > 0 ? chat.cht_to_team + '조' : '전원'}}
              </td>
              <td v-else class="fromTo">
                <i class="fas fa-arrow-circle-left"></i>︎ {{chat.cht_from_name}} → {{chat.cht_to == 0 ? '전체' : '상황실'}}
              </td>
              <td class="datetime">
                {{chat.cht_sent}}
              </td>
            </tr>
            <tr>
              <td colspan="2" class="content">
                {{chat.cht_text}}
              </td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'chatting',
  props: ['sizes', 'status', 'teams'],
  data () {
    return {
      chtSize: {
        selectToH: 40,
        messageH: 80,
        messageM: 8
      },
      to: 'all',
      toTeam: 1,
      toMember: null,
      textToSend: '',
      chats: [],
      pool: {
        down: [],
        toAdd: []
      },
      getChatsBeforeLocked: false
    }
  },
  computed: {
    chatsH () {
      return this.sizes.winH - this.sizes.topbarH - this.sizes.panelTopH - this.chtSize.selectToH - this.chtSize.messageH - 1
    },
    members () {
      var members = []
      this.teams.map((team) => {
        members = members.concat(team.members)
      })
      members.sort((a, b) => {
        return (a.mbr_name > b.mbr_name) ? 1 : -1
        })
      return members
    },
    memberToSend () {
      var result = null
      this.members.map((member) => {
        if (member.mbr_idx == this.toMember) {
          result = member
        }
      })
      return result
    },
    chatTo () {
      var result = null
      switch (this.to) {
        case 'all': result = 0; break
        case 'team': result = -1; break
        default: result = this.memberToSend.mbr_idx
      }
      return result
    }
  },
  methods: {
    setTo (which) {
      this.to = which
    },
    onScroll (e) {
      if (!this.getChatsBeforeLocked && Number(e.srcElement.scrollTop) + Number(this.chatsH) + 100 > Number(this.$refs.scrolled.clientHeight)) {
        this.getChatsBeforeLocked = true
        this.getChatsBefore()
      }
    },
    getChatsBefore () {
      var _this = this
      var isFirst = _this.chats.length == 0
      var before = isFirst ? 0 : _this.chats[this.chats.length - 1].cht_idx
      _this.$axios.get(_this.$serverApi + 'chat/getHqBefore/' + before)
      .then((response) => {
        _this.chats = _this.chats.concat(response.data)
        _this.getChatsBeforeLocked = false
        if (isFirst) {
          window.getChatsAfterTimeout = setTimeout(this.getChatsAfter, '3000')
        }
      })
    },
    getChatsAfter () {
      if (this.chats.length == 0) {
        return
      }
      var _this = this
      var after = _this.chats[0].cht_idx
      _this.$axios.get(_this.$serverApi + 'chat/getHqAfter/' + after)
      .then((response) => {
        if (response.data.length > 0) {
          _this.pool.toAdd = []
          _this.pool.down = response.data
          for (var i = _this.pool.down.length - 1; i >= 0; i--) {
            if (_this.pool.down[i].cht_idx > _this.chats[0].cht_idx) {
              _this.pool.toAdd = [_this.pool.down[i]].concat(_this.pool.toAdd)
            }
          }
          if (_this.pool.toAdd.length > 0) {
            this.chats = _this.pool.toAdd.concat(this.chats)
          }
        }
        window.getChatsAfterTimeout = setTimeout(this.getChatsAfter, '3000')

      })

    },
    sendChat () {
      var _this = this
      var toSend = {
        jwtToken: _this.status.jwtToken,
        cht_to: _this.chatTo,
        cht_to_team: _this.to == 'team' ? this.toTeam : '-1',
        cht_to_name: _this.to == 'member' ? this.memberToSend.mbr_name : '',
        cht_text: _this.textToSend
      }
      _this.$axios.post(_this.$serverApi + 'chat/insertHq', _this.$qs.stringify(toSend), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then((response) => {
        _this.$bus.$emit('setJwtToken', response.data.jwtToken)
        if (!response.data.success) {
          window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
        } else {
          _this.textToSend = ''
          console.log(response.data)

          clearTimeout(window.getChatsAfterTimeout)
          _this.getChatsAfter()
        }
      }).catch((err) => {
        console.log(err)
        window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
      })

    }
  },
  mounted () {
    this.toTeam = this.teams[1].no
    this.toMember = this.members[0].mbr_idx
    this.getChatsBefore()
    this.getChatsAfter()
  },
  beforeDestroy () {
    clearTimeout(window.getChatsAfterTimeout)
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/panel/chatting/chatting.scss';
</style>