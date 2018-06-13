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
                        v-model="structure.str_branch"
                        placeholder="지사"/>
                      <input class="short" 
                        v-model="structure.str_line"
                        placeholder="노선"/>
                      <input 
                        v-model="structure.str_name"
                        placeholder="구조물명"/>

                    </td>
                    <td class="buttons">

                      <div @click.stop="structureModify(idx)">
                        <i class="fas fa-upload"></i> 수정
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
                <input class="long" 
                  v-model="structure.latitude"/>
                <input class="long" 
                  v-model="structure.longitude"/>
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
      var _this = this
      if (_this.strInsert.branch.length == 0 ||
        _this.strInsert.line.length == 0 ||
        _this.strInsert.name.length == 0 ||
        _this.strInsert.lat.length == 0 ||
        _this.strInsert.lng.length== 0) {
        alert('모든 항목을 입력해주세요.')
        return
      }
      var toSend = _this.strInsert
      toSend.jwtToken = _this.status.jwtToken
      _this.$axios.post(_this.$serverApi + 'structure/insert', _this.$qs.stringify(toSend), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then((response) => {
        _this.$bus.$emit('setJwtToken', response.data.jwtToken)
        if (!response.data.success) {
          window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
        } else {
          _this.$bus.$emit('addStructure', response.data.structure)
          _this.seeStructure(response.data.structure)
          _this.strInsert = {
            branch: '',
            line: '',
            name: '',
            lat: '',
            lng: ''
          }
        }
      }).catch((err) => {
        console.log(err)
        window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
      })
    },

    structureModify (idx) {
      var _this = this
      var structure = _this.structures[idx]
      if (structure.str_branch.length == 0 ||
        structure.str_line.length == 0 ||
        structure.str_name.length == 0 ||
        structure.latitude.length == 0 ||
        structure.longitude.length == 0) {
        alert('모든 항목을 입력해주세요.')
        return
      }
      var toSend = structure
      toSend.jwtToken = _this.status.jwtToken
      _this.$axios.put(_this.$serverApi + 'structure/modify', _this.$qs.stringify(toSend), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then((response) => {
        _this.$bus.$emit('setJwtToken', response.data.jwtToken)
        if (!response.data.success) {
          window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
        } else {
          window.alert('수정되었습니다.')
          _this.structures[idx] = response.data.structure
          _this.$bus.$emit('setStructures')
        }
      }).catch((err) => {
        console.log(err)
        window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
      })

    },

    structureDelete (idx) {
      if (window.confirm('이 구조물을 삭제하시겠습니까?')) {
        var _this = this
        var toSend = {
          str_idx: _this.structures[idx].str_idx,
          jwtToken: _this.status.jwtToken
        }
        _this.$axios.post(this.$serverApi + 'structure/delete', this.$qs.stringify(toSend), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then((response) => {
          _this.$bus.$emit('setJwtToken', response.data.jwtToken)
          if (!response.data.success) {
            window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
          } else {
            window.alert('삭제되었습니다.')
            _this.structures.splice(idx, 1)
            _this.$bus.$emit('setStructures')
          }
        }).catch((err) => {
          console.log(err)
          window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
        })
      }

    }

  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/panel/structure/structure.scss';
</style>