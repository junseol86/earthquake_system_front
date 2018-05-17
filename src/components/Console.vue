<template>
  <div id="console">
    <div id="wrapper">
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
            경주도로공사 지진관리 시스템
          </td>
        </tr>
        <tr>
          <td id="panelCon"
          :style="{
            width: `${sizes.panelW}px`,
            height: `${sizes.winH - sizes.topbarH}px`
          }">
          <panel :sizes="sizes"/>
          </td>
          <td id="mapCon">
            <google-map :sizes="sizes"/>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import Panel from './panel/Panel'
import GoogleMap from './google_map/GoogleMap'

export default {
  name: 'console',
  components: {
    Panel, GoogleMap
  },
  data () {
    return {
      account: {
        token: ''
      },
      sizes: {
        winW: 0,
        winH: 0,
        panelW: 480,
        panelTopH: 36,
        topbarH: 56
      }
    }
  },
  methods: {
    setSizes () {
      this.sizes.winW = window.innerWidth
      this.sizes.winH = window.innerHeight
    }
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
