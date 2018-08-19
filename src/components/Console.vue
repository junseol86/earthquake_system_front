<template>
  <div id="console">
    <div id="wrapper"
      :style="{
        height: `${sizes.winH}px`
        }">
      <table id="consoleTable"
        :style="{
          width: `${sizes.winW}px`,
          height: `${sizes.winH}px`
        }">
        <tr>
          <td id="topbar"
            colspan="2"
            :style="{
              height: `${sizes.topbarH}px`,
              lineHeight: `${sizes.topbarH}px`
            }">
            <img src="../assets/img/app_logo.png"/>
            한국도로공사 경주지사 지진관리 시스템
            <table v-if="status.jwtToken.length > 0">
              <tr>
                <td>
                  <span>
                    가입코드 수정
                  </span>
                </td>
                <td class="inputCon">
                  <input type="text" maxlength="10" v-model="registerCode"/>
                </td>
                <td class="button" @click="registerCodeModify()">
                  확인
                </td>
                <td class="space">
                </td>
                <td class="button" @click="logout()">
                  로그아웃
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td id="panelCon"
            :style="{
              width: `${sizes.panelW}px`,
              height: `${sizes.winH - sizes.topbarH}px`
            }">
          <panel 
            :sizes="sizes" 
            :status="status" 
            :structures="structures"
            :earthquakes="earthquakes"
            :teams="teams"
            />
          </td>
          <td id="mapCon">
            <naver-map :sizes="sizes" :structures="structures" :activeEq="activeEq"/>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import Panel from './panel/Panel'
import NaverMap from './naver_map/NaverMap'

import accountMxn from './Console_account'
import earthquakeMxn from './Console_earthquake'
import structureMxn from './Console_structure'
import spotMxn from './Console_spot'
import memberMxn from './Console_member'

export default {
  name: 'console',
  components: {
    Panel, NaverMap
  },
  mixins: [accountMxn, earthquakeMxn, structureMxn, spotMxn, memberMxn],
  data () {
    return {
      sizes: {
        winW: 0,
        winH: 0,
        scrollBarW: 0,
        panelW: 440,
        panelTopH: 36,
        topbarH: 56
      }
    }
  },
  methods: {
    setSizes () {
      this.sizes.winW = window.innerWidth
      this.sizes.winH = window.innerHeight
      if (window.navigator.platform.indexOf('Mac') < 0) {
        this.sizes.scrollBarW = 17
      }
    },

  },
  mounted () {
    this.setSizes()
    let setSizes = this.setSizes
    window.addEventListener('resize', function () {
      setSizes()
    })

  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/console.scss';
</style>
