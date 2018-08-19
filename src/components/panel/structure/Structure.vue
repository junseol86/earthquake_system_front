<template>
  <div id="structure">
    <div id="wrapper">

      <div id="strInput"
        :style="{
          width: `${sizes.panelW}px`,
          height: `${strSize.strInputH}px`
        }">
        <div>
          <input class="short" type="text" 
            placeholder="지사" v-model="strInsert.branch"
            @keyup.enter="structureInsert()"/>
          <input class="short" type="text" 
            placeholder="노선" v-model="strInsert.line"
            @keyup.enter="structureInsert()"/>
          <input class="long" type="text" 
            placeholder="구조물명" v-model="strInsert.name"
            @keyup.enter="structureInsert()"/>
          <div id="space"/>
          <input class="short" type="text" 
            placeholder="순서" v-model="strInsert.order"
            @keyup.enter="structureInsert()"/>
          <input type="text" 
            placeholder="위도" v-model="strInsert.lat"
            @keyup.enter="structureInsert()"/>
          <input type="text" 
            placeholder="경도" v-model="strInsert.lng"
            @keyup.enter="structureInsert()"/>
          <div class="button" @click="structureInsert()">
            <i class="fas fa-upload"></i> 입력
          </div>
        </div>
      </div>

      <table id="search"
        :style="{
          height: `${strSize.searchH}px`,
          lineHeight: `${strSize.searchH}px`
          }">
        <tr>
          <td class="sign">
            <i class="fas fa-search"></i>
          </td>
          <td>
            <input placeholder="구조물 이름, 지사, 노선 검색" v-model="searchKwd"/>
          </td>
          <td class="sign button" @click="searchKwd = ''">
            <i class="fas fa-times-circle"></i>
          </td>
        </tr>
      </table>

      <div id="structures"
        :style="{
          height: `${sizes.winH - sizes.topbarH - sizes.panelTopH - strSize.strInputH - strSize.searchH}px`
        }">
        <div>
          <div class="structure" 
            v-for="(structure, idx) in structures" 
            v-if="searchKwd.length == 0 
            || structure.str_name.includes(searchKwd)
            || structure.str_branch.includes(searchKwd)
            || structure.str_line.includes(searchKwd)"
            :key="idx"
            @click="seeStructure(structure)">
            <div>
              <div>

                <table>
                  <tr>
                    <td>
                      <input class="short" 
                        v-model="structure.str_branch"
                        placeholder="지사"/>
                      <input class="short" 
                        v-model="structure.str_line"
                        placeholder="노선"/>
                      <input class="highlighted"
                        v-model="structure.str_name"
                        placeholder="구조물명"/>
                    </td>
                    <td class="buttons">
                      <div @click.stop="structureModify(idx)">
                        <i class="fas fa-upload"></i> 저장
                      </div>
                      <div @click.stop="structureDelete(idx)">
                        <i class="fas fa-trash"></i> 삭제
                      </div>
                    </td>
                  </tr>
                </table>

              </div>
              <div id="space"/>
              <div>
                <table>
                  <tr>
                    <td>
                      <input class="tiny"
                          v-model="structure.str_order"
                          placeholder="순서"/>
                      <input class="long"
                        v-model="structure.latitude"/>
                      <input class="long"
                        v-model="structure.longitude"/>
                    </td>
                  </tr>
                </table>
              </div>
              <div id="space"/>

              <div class="specCon">
                <textarea class="spec" v-model="structure.str_spec" placeholder="제원">
                </textarea>
              </div>

              <div id="space"/>
              <div>
                <table class="report">
                  <tr>
                    <td class="buttonCon">

                      <table class="button">
                        <tr>
                          <td :class="(structure.str_rpt_prior > 0 ? 'on' : '')" @click.stop="priorityToggle(idx)">
                            우선
                          </td>
                          <td :class="(structure.str_need_check > 0 ? 'on' : '')" @click.stop="needCheckToggle(idx)">
                            점검 
                          </td>
                          <td :class="'alert ' + (structure.str_need_check > 0 ? 'on' : '')" @click.stop="requestReport(idx)">
                            <i class="fas fa-bell"></i>
                          </td>
                        </tr>
                      </table>

                    </td>

                    <td class="text">
                      {{structure.str_report}}
                      <span class="date">
                        {{parseTime(structure.str_last_reported)}}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import asyncMxn from './Structure_async'

export default {
  name: 'structure',
  props: ['sizes', 'status', 'structures'],
  mixins: [asyncMxn],
  data () {
    return {
      strSize: {
        strInputH: 104,
        searchH: 40
      },
      strInsert: {
        branch: '',
        line: '',
        name: '',
        order: '',
        lat: '',
        lng: ''
      },
      searchKwd: ''
    }
  },
  methods: {
    seeStructure (structure) {
      window.moveToAndZoom(structure, 16)
    },
    parseTime (dt) {
      return dt != null && dt.length > 0 ?  this.$util.parseIso8601(new Date(dt)) : ''
    },

  },
  mounted () {
    clearTimeout(window.getChatsAfterTimeout)
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/panel/structure/structure.scss';
</style>