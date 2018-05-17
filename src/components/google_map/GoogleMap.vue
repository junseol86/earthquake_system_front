<template>
  <div id="google-map">
    <div id="wrapper">
      <div id="map"
      :style="{
        width: `${sizes.winW - sizes.panelW - 1}px`,
        height: `${sizes.winH - sizes.topbarH}px`
      }">
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
  mounted () {
    window.tryInitMap()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/google_map/google_map.scss';
</style>