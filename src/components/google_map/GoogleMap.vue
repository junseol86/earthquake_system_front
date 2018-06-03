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
  mounted () {
    window.tryInitMap()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/google_map/google_map.scss';
</style>