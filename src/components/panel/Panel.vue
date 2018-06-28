<template>
  <div id="panel">
    <div id="wrapper">
      <div
        :style="{
          width: `${sizes.panelW}px`,
          height: `${sizes.winH - sizes.topbarH}px`
        }">
        <table v-if="status.jwtToken.length > 0" id="panelTop"
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
            <i :class="`fa ${tabItem[2]}`"></i> {{tabItem[1]}}
            </td>
          </tr>
        </table>

        <div id="panelScroll"
          :style="{
              width: `${sizes.panelW}px`,
              height: `${sizes.winH - sizes.topbarH - sizes.panelTopH - 1}px`
          }">

          <situation v-if="tab.current == 'situation'" 
            :sizes="sizes"
            :status="status"
            :earthquakes="earthquakes"
            />
          <team v-if="tab.current == 'team'" 
            :sizes="sizes" 
            :status="status"
            :teams="teams"
            />
          <chatting v-if="tab.current == 'chatting'" 
            :sizes="sizes" 
            :status="status"
            :teams="teams"
            />
          <structure v-if="tab.current == 'structure'" 
            :sizes="sizes" 
            :status="status"
            :structures="structures"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Situation from './situation/Situation'
import Team from './team/Team'
import Chatting from './chatting/Chatting'
import Structure from './structure/Structure'

export default {
  name: 'panel',
  props: ['sizes', 'status', 'earthquakes', 'structures', 'teams'],
  components: {
    Situation, Team, Chatting, Structure
  },
  data () {
    return {
      tab: {
        list: [
          ['situation', '상황', 'fa-globe'],
          ['team', '조편성', 'fa-user-friends'],
          ['chatting', '통신', 'fa-comments'],
          ['structure', '구조물', 'fa-building']
        ],
        current: 'situation'
      }
    }
  },
  methods: {
    setTab (which) {
      if (this.status.jwtToken == undefined) {
        return
      }
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