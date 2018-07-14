var mixin = {
  data () {
    return {
      status: {
        jwtToken: ''
      },
      registerCode: '',
    }
  },
  methods: {

    // 회원가입 코드
    getRegisterCode () {
      var _this = this
      _this.$axios.get(_this.$serverApi + 'code/getRegisterCode')
      .then((response) => {
        _this.registerCode = response.data.cd_code
      }).catch((err) => {
        console.log(err)
      })
    },
    registerCodeModify () {
      var _this = this
      if (_this.registerCode.length < 6) {
        window.alert('6글자 이상 입력해주세요.')
        return
      }
      var toSend = {
        jwtToken: _this.status.jwtToken,
        name: 'register',
        code: _this.registerCode
      }
      _this.$axios.put(_this.$serverApi + 'code/modify', _this.$qs.stringify(toSend), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then((response) => {
        _this.$bus.$emit('setJwtToken', response.data.jwtToken)
        if (!response.data.success) {
          window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
        } else {
          window.alert('수정되었습니다.')
          _this.getRegisterCode()
        }
      }).catch((err) => {
        console.log(err)
        window.alert('오류가 발생했습니다.  다시 시도해 주세요.')
      })

    },

    tokenLogin (jwtToken) {
      var _this = this
      _this.$axios.post(_this.$serverApi + 'member/tokenLogin',
      _this.$qs.stringify({ jwtToken: jwtToken }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .then((response) => {
        _this.status.jwtToken = response.data
        _this.getRegisterCode()
      }).catch((err) => {
        console.log(err)
        _this.status.jwtToken = undefined
      })
    }

  },
  mounted () {

    this.$bus.$on('setJwtToken', (jwtToken) => {
      this.status.jwtToken = jwtToken
      this.$cookie.set('jwtToken', jwtToken, { expires: 1 })
      this.getRegisterCode()
    })

    var jwtToken = this.$cookie.get('jwtToken')
    if (jwtToken != null && jwtToken.length > 0) {
      this.tokenLogin(jwtToken)
    }

  }
}

export default mixin