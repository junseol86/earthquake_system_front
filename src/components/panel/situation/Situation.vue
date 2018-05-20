<template>
  <div id="situation">
    <div id="wrapper">

      <div v-if="status.token == undefined" id="beforeLogin">
        <div>
          로그인 후 사용 가능합니다.
        </div>
        <input type="text" placeholder="아이디"/>
        <input type="password" placeholder="비밀번호"/>
        <div class="button" @click="login()">
          로그인
        </div>
      </div>

      <div v-else id="afterLogin">

        <div id="eqInput"
          :style="{
            height: `${sitSize.eqInputH}px`
          }">
          <div>
            <select>
              <option>내륙</option>
              <option>해안</option>
            </select>
            <input type="date"/>
            <input type="time"/>
            <div id="space"/>
            <input type="text" placeholder="위도"/>
            <input type="text" placeholder="경도"/>
            <div class="button">지진 입력</div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'situation',
  props: ['sizes', 'status'],
  data () {
    return {
      sitSize: {
        eqInputH: 104
      }
    }
  },
  methods: {
    login () {
      this.$bus.$emit('setToken', '1')
    }
  }
}
</script>


<style lang="scss" scoped>
  @import '../../../assets/scss/panel/situation/situation.scss';
</style>