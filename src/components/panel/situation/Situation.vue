<template>
  <div id="situation">
    <div id="wrapper">

      <div v-if="status.jwtToken == undefined" id="beforeLogin"
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
            <select>
              <option>내륙</option>
              <option>해안</option>
            </select>
            <input type="text" placeholder="위도"/>
            <input type="text" placeholder="경도"/>
            <div class="button">
              <i class="fas fa-upload"></i> 지진 입력
            </div>
          </div>
        </div>
        
        <div id="earthquakes"
          :style="{
            height: `${sizes.winH - sizes.topbarH - sizes.panelTopH - sitSize.eqInputH - 1}px`
          }">
          <div>
            <table v-for="(earthquake, idx) in earthquakes" :key="idx"
              @click="showEarthquake(earthquake, 12)">
              <tr>
                <td>
                  {{earthquake.eq_type}}
                  {{earthquake.eq_datetime}}
                </td>
                <td class="sendAlarm">
                  <span class="sendAlarmBtn">
                    <i class="fas fa-bell"></i> 알람 보내기
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
      }
    }
  },
  methods: {
    login () {
      var _this = this
      this.$axios.post(this.$serverApi + 'member/passwordLogin', this.$qs.stringify(this.loginInput), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      }).then((response) => {
        _this.$bus.$emit('setJwtToken', response.data)
      }).catch((err) => {
        console.log(err)
        window.alert('아이디와 비밀번호를 다시 확인하세요.')
      })
    },
    showEarthquake (earthquake, zoom) {
      window.moveToAndZoom(earthquake, zoom)
      window.drawEqCircles(earthquake)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/panel/situation/situation.scss';
</style>