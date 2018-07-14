var mixin = {
  data () {
    return {
      spots: [],
    }
  },
  methods: {

    getSpots () {
      var _this = this
      _this.$axios.get(_this.$serverApi + 'spot/getList')
      .then((response) => {
        _this.spots = response.data
        window.setSpots(_this.spots)
      })
    }

  },
  mounted () {
    window.getSpots = this.getSpots
  }
}

export default mixin