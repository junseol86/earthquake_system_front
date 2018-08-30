var mixin = {
  methods: {

    structureInsert () {
      var _this = this
      if (_this.strInsert.branch.length == 0 ||
        _this.strInsert.line.length == 0 ||
        _this.strInsert.name.length == 0 ||
        _this.strInsert.order.length == 0 ||
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
          _this.$bus.$emit('getStructures')
          _this.strInsert = {
            branch: '',
            line: '',
            name: '',
            order: '',
            lat: '',
            lng: ''
          }
        }
      }).catch((err) => {
        console.log(err)
        window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
      })
    },

    priorityToggle (idx) {
      var _this = this
      _this.structures[idx].str_rpt_prior = (1 - _this.structures[idx].str_rpt_prior)
      _this.structureModify(idx)
    },

    needCheckToggle (idx) {
      var _this = this
      _this.structures[idx].str_need_check = (1 - _this.structures[idx].str_need_check)
      _this.structureModify(idx)
    },

    requestReport (idx) {
      var _this = this
      var toSend = _this.structures[idx]
      toSend.jwtToken = _this.status.jwtToken
      _this.$axios.post(_this.$serverApi + 'structure/requestReport', _this.$qs.stringify(toSend), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then((response) => {
        _this.$bus.$emit('setJwtToken', response.data.jwtToken)
        window.alert('알림을 전송했습니다.')
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
          _this.structures.splice(idx, 1, response.data.structure)
          _this.$bus.$emit('setStructures')
        }
      }).catch((err) => {
        console.log(err)
        window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
      })

    },

    clearReport (idx) {
      var _this = this
      var structure = _this.structures[idx]
      if (window.confirm('이 보고를 지우시겠습니까?')) {
        var toSend = {
          str_idx: structure.str_idx,
          str_report: '',
          jwtToken: _this.status.jwtToken
        }
        toSend.jwtToken = _this.status.jwtToken
        _this.$axios.put(_this.$serverApi + 'structure/report', _this.$qs.stringify(toSend), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then((response) => {
          _this.$bus.$emit('setJwtToken', response.data.jwtToken)
          if (!response.data.success) {
            window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
          } else {
            _this.structures[idx].str_report = ''
          }
        }).catch((err) => {
          console.log(err)
          window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
        })
      }
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
  }
}

export default mixin