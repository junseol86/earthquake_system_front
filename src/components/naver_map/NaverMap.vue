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
            <h1>자체대응</h1>
            점검반: 4조 이하
            
          </td>
        </tr>
        <tr>
          <td>
            <img src="../../assets/img/mark_blue.png"/>
          </td>
          <td>
            <h1>대응 1단계</h1>
            점검반: 6조 이하
          </td>
        </tr>
        <tr>
          <td>
            <img src="../../assets/img/mark_red.png"/>
          </td>
          <td>
            <h1>대응 2단계</h1>
            점검반: 8조 이하
          </td>
        </tr>
      </table>

      <div id="toInitPosZm" @click="toInitPosZm()">
        <i class="fas fa-compass"></i> 초기 위치로
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'naver-map',
  props: ['sizes'],
  data () {
    return {
    }
  },
  methods: {
    toInitPosZm () {
      window.toInitPosZm()
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