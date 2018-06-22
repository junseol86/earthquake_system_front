<template>
  <div id="naver-map">
    <div id="wrapper">
      <div id="map"
      :style="{
        width: `${sizes.winW - sizes.panelW - 1}px`,
        height: `${sizes.winH - sizes.topbarH}px`
      }">
      </div>
      <div class="line"
        :style="{
          width: `${sizes.winW - sizes.panelW - 3}px`,
          height: '1px',
          top: `${(sizes.winH - sizes.topbarH)/2 - 2}px`,
          left: '1px'
        }"/>
      <div class="line"
        :style="{
          width: '1px',
          height: `${sizes.winH - sizes.topbarH - 2}px`,
          top: '1px',
          left: `${(sizes.winW - sizes.panelW) / 2 - 2}px`
        }"/>

      <table id="markerDesc">
        <tr>
          <td>
            <img src="../../assets/img/mark_green.png"/>
          </td>
          <td>
            <span :class="eqLevel == 0 ? 'on' : ''">자체대응</span>
            
          </td>
        </tr>
        <tr>
          <td>
            <img src="../../assets/img/mark_blue.png"/>
          </td>
          <td>
            <span :class="eqLevel == 1 ? 'on' : ''">대응 1단계</span>
          </td>
        </tr>
        <tr>
          <td>
            <img src="../../assets/img/mark_red.png"/>
          </td>
          <td>
            <span :class="eqLevel == 2 ? 'on' : ''">대응 2단계</span>
          </td>
        </tr>
      </table>

      <div id="toInitPosZm" @click="toInitPosZm()">
        <i class="fas fa-compass"></i> 초기 위치로
      </div>

      <div v-if="activeEq != null" id="strOnTeams"
        :style="{height: `${sizes.winH - sizes.topbarH}px`}">
        <div>
          <div class="item" 
            v-if="structures != null" v-for="(objKey, idx) in Object.keys(strOnTeam)" :key="idx">
            <div class="team">
              {{objKey}}조
            </div>
            <div class="strs">
              <span v-for="(str, idx) in strOnTeam[objKey]" :key="idx" 
                @click="seeStructure(str)">
                {{str.str_name}}
              </span>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: 'naver-map',
  props: ['sizes', 'activeEq', 'structures'],
  data () {
    return {
    }
  },
  computed: {
    eqLevel() {
      if (this.activeEq == null) {
        return -1
      } else {
        return this.activeEq.eq_level
      }
    },
    strOnTeam() {
      var result = {}
      for (var i = 1; i < 9; i++) {
        result[i] = []
      }
      this.structures.map((structure) => {
        if (structure.on_team > 0)
          result[structure.on_team].push(structure)
      })
      return result
    }
  },
  methods: {
    toInitPosZm () {
      window.toInitPosZm()
    },
    seeStructure (structure) {
      window.moveToAndZoom(structure, 16)
    }
  },
  mounted () {
    window.tryInitMap()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/naver_map/naver_map.scss';
</style>