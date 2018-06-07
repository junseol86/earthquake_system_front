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
          <input type="text" 
            placeholder="구조물명" v-model="strInsert.name"
            @keyup.enter="structureInsert()"/>
          <div id="space"/>
          <input class="long" type="text" 
            placeholder="위도" v-model="strInsert.lat"
            @keyup.enter="structureInsert()"/>
          <input class="long" type="text" 
            placeholder="경도" v-model="strInsert.lng"
            @keyup.enter="structureInsert()"/>
          <div class="button" @click="structureInsert()">
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
      },
      strInsert: {
        branch: '',
        line: '',
        name: '',
        lat: '',
        lng: ''
      }
    }
  },
  methods: {
    seeStructure (structure) {
      window.moveToAndZoom(structure, 16)
    },
    structureInsert () {
      if (this.strInsert.branch.length == 0 ||
        this.strInsert.line.length == 0 ||
        this.strInsert.name.length == 0 ||
        this.strInsert.lat.length == 0 ||
        this.strInsert.lng.length== 0) {
        alert('모든 항목을 입력해주세요.')
        return
      }
      var _this = this
      var toSend = this.strInsert
      toSend.jwtToken = _this.status.jwtToken
      _this.$axios.post(this.$serverApi + 'structure/insert', this.$qs.stringify(toSend), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      }).then((response) => {
        _this.$bus.$emit('setJwtToken', response.data.jwtToken)
        _this.$bus.$emit('addStructure', response.data.structure)
        _this.strInsert = {
          branch: '',
          line: '',
          name: '',
          lat: '',
          lng: ''
        }
      }).catch((err) => {
        console.log(err)
        window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/panel/structure/structure.scss';
</style>