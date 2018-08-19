<template>
  <div id="situation">
    <div id="wrapper">

      <div v-if="status.jwtToken.length <= 0" id="beforeLogin"
        :style="{
          width: `${sizes.panelW - sizes.scrollBarW}px`
        }">
        <div>
          <div>
            <i class="fas fa-exclamation-triangle"></i> 로그인 후 사용 가능합니다.
          </div>
          <input type="text" 
            placeholder="아이디(임시: test)"
            v-model="loginInput.mbr_id"/>
          <input type="password" 
            placeholder="비밀번호(임시: test)"
            v-model="loginInput.password"/>
          <div class="button" @click="login()">
            <i class="fa fa-sign-in-alt"></i> 로그인
          </div>
        </div>
      </div>

      <div v-else id="afterLogin"
        :style="{
          top: `${sizes.topbarH + sizes.panelTopH + 1}px`
        }">

        <div id="eqInput"
          :style="{
            width: `${sizes.panelW}px`,
            height: `${sitSize.eqInputH}px`
          }">
          <div>
            <select v-model="earthquakeInput.type">
              <option value="inland">내륙</option>
              <option value="waters">해역</option>
            </select>
            <input v-model="earthquakeInput.strength"
              type="number" step="0.1" class="short" placeholder="강도"/>
            <input v-model="earthquakeInput.lat" 
              type="text" placeholder="위도"/>
            <input v-model="earthquakeInput.lng" 
              type="text" placeholder="경도"/>
            <div class="button" @click="earthquakeInsert()">
              <i class="fas fa-upload"></i> 지진 입력
            </div>
          </div>
        </div>
        
        <div id="earthquakes"
          :style="{
            height: `${sizes.winH - sizes.topbarH - sizes.panelTopH - sitSize.eqInputH - 1}px`
          }">
          <div>
            <table v-for="(earthquake, idx) in earthquakes" :key="idx">
              <tr>
                <td>
                  <span v-if="earthquake.eq_active > 0" class="stat active"
                    @click.stop="activeToggle(earthquake.eq_idx, 0)">종료</span>
                  <span v-else class="stat"
                    @click.stop="activeToggle(earthquake.eq_idx, 1)">활성</span>
                  <span>
                    {{earthquake.eq_type.replace("inland", "내륙").replace("waters", "해역")}}
                  </span>
                  |
                  <span>
                    {{earthquake.eq_strength}}
                  </span>
                  |
                  <span>
                    {{earthquake.eq_kortime}}
                  </span>
                </td>
                <td class="buttons">
                  <span class="deleteBtn" @click.stop="earthquakeDelete(idx)">
                      <i class="fas fa-trash"></i> 삭제
                  </span>
                  <span v-if="earthquake.eq_active > 0" class="sendAlarmBtn" @click="sendEqNotification(earthquake)">
                    <i class="fas fa-bell"></i> 알람
                  </span>
                </td>
              </tr>
            </table>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'situation',
  props: ['sizes', 'status', 'earthquakes'],
  data () {
    return {
      sitSize: {
        eqInputH: 64
      },
      loginInput: {
        mbr_id: '',
        password: ''
      },
      earthquakeInput: {
        type: 'inland',
        strength: '',
        lat: '',
        lng: ''
      }
    }
  },
  methods: {
    login () {
      var _this = this
      this.$axios.post(this.$serverApi + 'member/passwordLogin', this.$qs.stringify(this.loginInput), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then((response) => {
        _this.$bus.$emit('setJwtToken', response.data)
      }).catch((err) => {
        console.log(err)
        window.alert('아이디와 비밀번호를 다시 확인하세요.')
      })
    },
    earthquakeInsert () {
      var _this = this
      if (_this.earthquakeInput.type.length == 0 ||
        _this.earthquakeInput.strength.length == 0 ||
        _this.earthquakeInput.lat.length == 0 ||
        _this.earthquakeInput.lng.length == 0) {
        alert('모든 항목을 입력해주세요.')
        return
      }
      var toSend = _this.earthquakeInput
      toSend.jwtToken = _this.status.jwtToken
      _this.$axios.post(_this.$serverApi + 'earthquake/insert', _this.$qs.stringify(toSend), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then((response) => {
        _this.$bus.$emit('setJwtToken', response.data.jwtToken)
        if (!response.data.success) {
          window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
        } else {
          _this.$bus.$emit('getEarthquakes')
        }
      }).catch((err) => {
        console.log(err)
        window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
      })
    },


    activeToggle (idx, set) {
      var _this = this
      var toSend = {
        jwtToken: _this.status.jwtToken,
        eq_idx: idx,
        set: set
      }
      _this.$axios.put(_this.$serverApi + 'earthquake/activeToggle', _this.$qs.stringify(toSend), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      }).then((response) => {
        _this.$bus.$emit('setJwtToken', response.data.jwtToken)
        if (!response.data.success) {
          window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
        } else {
          _this.$bus.$emit('getEarthquakes')
        }
      }).catch((err) => {
        console.log(err)
        window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
      })
    },

    earthquakeDelete (idx) {
      if (window.confirm('이 지진을 삭제하시겠습니까?')) {
        var _this = this
        var toSend = {
          eq_idx: _this.earthquakes[idx].eq_idx,
          jwtToken: _this.status.jwtToken
        }
        _this.$axios.post(this.$serverApi + 'earthquake/delete', this.$qs.stringify(toSend), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then((response) => {
          _this.$bus.$emit('setJwtToken', response.data.jwtToken)
          if (!response.data.success) {
            window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
          } else {
            window.alert('삭제되었습니다.')
            _this.$bus.$emit('getEarthquakes')
          }
        }).catch((err) => {
          console.log(err)
          window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
        })
      }
    },

    sendEqNotification (earthquake) {
      var _this = this
      var toSend = {
        jwtToken: _this.status.jwtToken,
        level: earthquake.eq_level,
        strength: earthquake.eq_strength,
        type: earthquake.eq_type
      }
      _this.$axios.post(this.$serverApi + 'earthquake/sendEqNotification', this.$qs.stringify(toSend), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then((response) => {
          _this.$bus.$emit('setJwtToken', response.data.jwtToken)
          window.alert('알림을 전송했습니다.')
      }).catch((err) => {
          console.log(err)
          window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
      })
    }

  },
  mounted () {
    clearTimeout(window.getChatsAfterTimeout)
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/panel/situation/situation.scss';
</style>