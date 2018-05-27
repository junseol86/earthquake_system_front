<template>
  <div id="structure">
    <div id="wrapper">

      <div id="strInput"
        :style="{
          width: `${sizes.panelW}px`,
          height: `${strSize.strInputH}px`
        }">
        <div>
          <select>
            <option>다리</option>
            <option>기타</option>
          </select>
          <input class="long" type="text" placeholder="이름"/>
          <div id="space"/>
          <input type="text" placeholder="위도"/>
          <input type="text" placeholder="경도"/>
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

                      <select>
                        <option>다리</option>
                        <option>기타</option>
                      </select>
                      <input :value="structure.str_name"/>

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
                <input :value="structure.latitude"/>
                <input :value="structure.longitude"/>
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