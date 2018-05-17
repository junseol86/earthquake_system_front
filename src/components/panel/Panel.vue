<template>
  <div id="panel">
    <div id="wrapper">
      <div
      :style="{
        width: `${sizes.panelW}px`,
        height: `${sizes.winH - sizes.topbarH}px`
      }">
        <table id="panelTop"
        :style="{
          height: `${sizes.panelTopH}px`
        }">
          <tr>
            <td v-for="(tabItem, idx) in tab.list" :key="idx"
            @click="setTab(tabItem[0])"
            :class="tabItem[0] == tab.current ? 'on' : ''"
            :style="{
              width: `${100 / tab.list.length}%`,
              height: `${sizes.panelTopH}px`,
              lineHeight: `${sizes.panelTopH}px`
            }">
            {{tabItem[1]}}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'panel',
  props: ['sizes'],
  data () {
    return {
      tab: {
        list: [
          ['situation', '상황'],
          ['team', '조편성'],
          ['chat', '통신'],
          ['structure', '구조물']
        ],
        current: 'situation'
      }
    }
  },
  methods: {
    setTab (which) {
      this.tab.current = which
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/panel/panel.scss';
</style>