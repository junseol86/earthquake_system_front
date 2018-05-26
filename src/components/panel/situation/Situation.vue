<template>
  <div id="situation">
    <div id="wrapper">

      <div v-if="status.token == undefined" id="beforeLogin"
        :style="{
          width: `${sizes.panelW - sizes.scrollBarW}px`
        }">
        <div>
          <div>
            <i class="fas fa-exclamation-triangle"></i> 로그인 후 사용 가능합니다.
          </div>
          <input type="text" placeholder="아이디"/>
          <input type="password" placeholder="비밀번호"/>
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
            <table v-for="(earthquake, idx) in earthquakes" :key="idx">
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

import mock from '../../../../mock'

export default {
  name: 'situation',
  props: ['sizes', 'status'],
  data () {
    return {
      sitSize: {
        eqInputH: 64
      },
      earthquakes: []
    }
  },
  methods: {
    login () {
      this.$bus.$emit('setToken', '1')
    }
  },
  mounted () {
    this.earthquakes = mock.earthquakes()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/panel/situation/situation.scss';
</style>