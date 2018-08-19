var mixin = {
  data () {
    return {
      structures: [],
    }
  },
  methods: {

    getStructures () {
      var _this = this
      _this.$axios.get(_this.$serverApi + 'structure/getList')
      .then((response) => {
        _this.structures = response.data
        window.setStructures(_this.structures)
      })
    }

  },
  mounted () {
    this.$bus.$on('setStructures', () => {
      window.setStructures(this.structures)
    })
    this.$bus.$on('getStructures', () => {
      this.getStructures()
    })
  }
}
  
export default mixin