var mixin = {
  data () {
    return {
      earthquakes: [],
      activeEq: null,
    }
  },
  methods: {
    getEarthquakes () {
      this.$axios.get(this.$serverApi + 'earthquake/getList')
      .then((response) => {
        this.earthquakes = response.data

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