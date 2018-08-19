var mixin = {
  data () {
    return {
      earthquakes: [],
      activeEq: null,
    }
  },
  methods: {
    getEarthquakes () {
      window.clearTimeout(window.getEarthquakeAfterTimeout)
      var _this = this
      this.$axios.get(this.$serverApi + 'earthquake/getList')
      .then((response) => {
        var eqDown = response.data
        eqDown.map((eq) => {
          var dt = new Date(eq.eq_datetime)
          eq.eq_kortime = _this.$util.parseIso8601(dt) 
        })
        this.earthquakes = eqDown 

        var thereIsActive = false
        this.earthquakes.map((earthquake) => {
          if (earthquake.eq_active == 1) {
            this.activeEq = earthquake
            thereIsActive = true
          }
        })
        if (thereIsActive == false) {
          this.activeEq = null
        }
        window.setEarthquake(this.activeEq)
        this.getStructures()
        this.getSpots()
        window.getEarthquakeAfterTimeout = setTimeout(this.getEarthquakes, '20000')
      })
    }
  },
  mounted () {
    this.$bus.$on('getEarthquakes', () => {
      this.getEarthquakes()
    })

    this.getEarthquakes()
  }
}

export default mixin