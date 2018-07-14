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
            경주지사 지진관리 시스템
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

import accountMxn from '../mixins/console/account'

export default {
  name: 'console',
  components: {
    Panel, NaverMap
  },
  mixins: [accountMxn],
  data () {
    return {
      structures: [],
      spots: [],
      earthquakes: [],
      activeEq: null,
      teams: [],
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

    logout () {
      this.status.jwtToken = ''
      this.$cookie.set('jwtToken', '')
    },

    getEarthquakes () {
      this.$axios.get(this.$serverApi + 'earthquake/getList')
      .then((response) => {
        this.earthquakes = response.data

        var thereIsActive = false
        this.earthquakes.map((earthquake) => {
          if (earthquake.eq_active == 1) {
            this.activeEq = earthquake
            thereIsActive = true
          }
        })
        if (thereIsActive == false) {
          this.activeEq = null
        }
        window.setEarthquake(this.activeEq)
        this.getStructures()
        this.getSpots()
      })
    },
    getStructures () {
      var _this = this
      _this.$axios.get(_this.$serverApi + 'structure/getList')
      .then((response) => {
        _this.structures = response.data
        window.setStructures(_this.structures)
      })
    },
    getSpots () {
      var _this = this
      _this.$axios.get(_this.$serverApi + 'spot/getList')
      .then((response) => {
        _this.spots = response.data
        window.setSpots(_this.spots)
      })
    },
    getMembers () {
      var _this = this
      _this.$axios.get(this.$serverApi + 'member/getList')
      .then((response) => {
        var members = response.data
        members.map((member) => {
          member.hasPos = _this.isPosReported(member.mbr_pos_last_report)
          member.arrival = _this.arriveInIfInDay(member.mbr_arr_last_report, member.mbr_arrive_in)
        })
        var teams = []
        for (var i = 0; i <= 10; i++) {
          teams.push({
            no: i,
            members: []
          })
        }
        members.map((member) => {
          teams[member.mbr_team].members.push(member)
        })
        this.teams = teams
        this.showMembersOnMap(members)
      })
    },

    // 하루 이내 보고되었을 시 도착 예상 시간
    arriveInIfInDay (arr_last_report, arrive_in) {
      if (this.$util.isInDay(arr_last_report)) {
        return this.$util.willComeUntil(arrive_in)
      } else {
        return ''
      }
    },
    isArrReported (arr_last_report) {
      return this.$util.isInDay(arr_last_report)
    },
    isPosReported (pos_last_report) {
      return this.$util.isInDay(pos_last_report)
    },

    showMembersOnMap (members) {
      var reported = []
      members.map(function(member) {
        if (member.hasPos) {
          reported.push(member)
        }
      })
      window.setMembers(reported)
    },
  },
  mounted () {
    this.setSizes()
    let setSizes = this.setSizes
    window.addEventListener('resize', function () {
      setSizes()
    })

    this.$bus.$on('getEarthquakes', () => {
      this.getEarthquakes()
    })
    this.$bus.$on('getMembers', () => {
      this.getMembers()
    })
    this.$bus.$on('setStructures', () => {
      window.setStructures(this.structures)
    })
    this.$bus.$on('getStructures', () => {
      this.getStructures()
    })

    this.getEarthquakes()
    this.getMembers()

    window.getSpots = this.getSpots

  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/console.scss';
</style>
