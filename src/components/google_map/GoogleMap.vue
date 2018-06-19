<template>
  <div id="google-map">
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
            <img src="../../assets/img/mark_grey.png"/>
          </td>
          <td>
            <h1>출동없음 - 자체대응</h1>
            해당없음
          </td>
        </tr>
        <tr>
          <td>
            <img src="../../assets/img/mark_green.png"/>
          </td>
          <td>
            <h1>자체대응</h1>
            점검반: 4조 이하<br>
            비탈면: 9, 10조<br>
            <span>
            본사: 사장 등 3명<br>
            본부: 차장 등 2명
            </span>
            
          </td>
        </tr>
        <tr>
          <td>
            <img src="../../assets/img/mark_yellow.png"/>
          </td>
          <td>
            <h1>대응 1단계</h1>
            점검반: 6조 이하<br>
            비탈면: 9, 10조<br>
            <span>
            본사: 구조물처장 등 14명<br>
            본부: 처장 등 7명
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <img src="../../assets/img/mark_red.png"/>
          </td>
          <td>
            <h1>대응 2단계</h1>
            점검반: 8조 이하<br>
            비탈면: 9, 10조<br>
            <span>
            본사: 본부장 등 10명<br>
            본부: 지사장 등 9명
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <img src="../../assets/img/mark_purple.png"/>
          </td>
          <td>
            <h1>대응 2단계</h1>
            <span>
            본사: 차장 등 2명<br>
            본부: 차, 과장 1명
            </span>
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
  name: 'google-map',
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
  @import '../../assets/scss/google_map/google_map.scss';
</style>