var mixin = {
  data () {
    return {
      teams: [],
    }
  },
  methods: {

    getMembers () {
      var _this = this
      _this.$axios.get(this.$serverApi + 'member/getList')
      .then((response) => {
        var members = response.data
        members.map((member) => {
          member.hasPos = _this.isPosReported(member.mbr_pos_last_report)
          member.arrival = _this.arriveInIfInDay(member.mbr_arr_last_report, member.mbr_arrive_in)
        })
        var teams = []
        for (var i = 0; i <= 10; i++) {
          teams.push({
            no: i,
            members: []
          })
        }
        members.map((member) => {
          teams[member.mbr_team].members.push(member)
        })
        this.teams = teams
        this.showMembersOnMap(members)
      })
    },

    // 하루 이내 보고되었을 시 도착 예상 시간
    arriveInIfInDay (arr_last_report, arrive_in) {
      if (this.$util.isInDay(arr_last_report)) {
        return this.$util.willComeUntil(arrive_in)
      } else {
        return ''
      }
    },
    isArrReported (arr_last_report) {
      return this.$util.isInDay(arr_last_report)
    },
    isPosReported (pos_last_report) {
      return this.$util.isInDay(pos_last_report)
    },

    showMembersOnMap (members) {
      var reported = []
      members.map(function(member) {
        if (member.hasPos) {
          reported.push(member)
        }
      })
      window.setMembers(reported)
    }

  },
  mounted () {
    this.$bus.$on('getMembers', () => {
      this.getMembers()
    })

    this.getMembers()
  }
}

export default mixin