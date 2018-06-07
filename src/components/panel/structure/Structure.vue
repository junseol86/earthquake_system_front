<template>
  <div id="structure">
    <div id="wrapper">

      <div id="strInput"
        :style="{
          width: `${sizes.panelW}px`,
          height: `${strSize.strInputH}px`
        }">
        <div>
          <input class="short" type="text" placeholder="지사"/>
          <input class="short" type="text" placeholder="노선"/>
          <input type="text" placeholder="구조물명"/>
          <div id="space"/>
          <input class="long" type="text" placeholder="위도"/>
          <input class="long" type="text" placeholder="경도"/>
          <div class="button">
            <i class="fas fa-upload"></i> 입력
          </div>
        </div>
      </div>
      <div id="structures"
        :style="{
          height: `${sizes.winH - sizes.topbarH - sizes.panelTopH - strSize.strInputH}px`
        }">
        <div>
          <div class="structure" v-for="(structure, idx) in structures" :key="idx"
            @click="seeStructure(structure)">
            <div>
              <div>

                <table>
                  <tr>
                    <td>

                      <input class="short" 
                        :value="structure.str_branch"
                        placeholder="지사"/>
                      <input class="short" 
                        :value="structure.str_line"
                        placeholder="노선"/>
                      <input 
                        :value="structure.str_name"
                        placeholder="구조물명"/>

                    </td>
                    <td class="buttons">

                      <div>
                        <i class="fas fa-upload"></i> 수정
                      </div>
                      <div>
                        <i class="fas fa-trash"></i> 삭제
                      </div>

                    </td>
                  </tr>
                </table>

              </div>
              <div id="space"/>
              <div>
                <input class="long" :value="structure.latitude"/>
                <input class="long" :value="structure.longitude"/>
              </div>
            </div>
            <div v-if="structure.selected">
              <div class="button">
                수정
              </div>
              <div class="button">
                삭제
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'structure',
  props: ['sizes', 'status', 'structures'],
  data () {
    return {
      strSize: {
        strInputH: 104
      }
    }
  },
  methods: {
    seeStructure (structure) {
      window.moveToAndZoom(structure, 16)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/panel/structure/structure.scss';
</style>