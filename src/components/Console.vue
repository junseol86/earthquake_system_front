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
          <panel :sizes="sizes" :status="status" :structures="structures"/>
          </td>
          <td id="mapCon">
            <google-map :sizes="sizes" :structures="structures"/>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import Panel from './panel/Panel'
import GoogleMap from './google_map/GoogleMap'

import mock from '../../mock'

export default {
  name: 'console',
  components: {
    Panel, GoogleMap
  },
  data () {
    return {
      status: {
        token: undefined
      },
      structures: [],
      sizes: {
        winW: 0,
        winH: 0,
        scrollBarW: 0,
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
      if (window.navigator.platform.indexOf('Mac') < 0) {
        this.sizes.scrollBarW = 17
      }
    }
  },
  mounted () {
    this.setSizes()
    let setSizes = this.setSizes
    window.addEventListener('resize', function () {
      setSizes()
    })

    this.$bus.$on('setToken', (token) => {
      this.status.token = token
    })

    this.structures = mock.structures()
    window.setStructures(this.structures)
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/console.scss';
</style>
