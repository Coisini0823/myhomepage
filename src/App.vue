<template>
  <div id="app">
    <HomePageTop/>
    <div class="main">
      <div class="welcome">
        <div class="welcomeword"></div>
      </div>
      <HomePageMain v-if="$store.state.islogin !== 0"></HomePageMain>
      <LoginOrRegister v-if="$store.state.islogin === 0"></LoginOrRegister>
    </div>
  </div>
</template>

<script>

import HomePageTop from './components/HomePageTop.vue'

import HomePageMain from './components/HomePageMain.vue'

import LoginOrRegister from './components/LoginOrRegister.vue'

import { mapActions, mapMutations } from 'vuex'

export default {
  components: {
    HomePageTop,
    HomePageMain,
    LoginOrRegister
  },
  data () {
    return {
      logintoken: ''
    }
  },
  methods: {
    ...mapActions(['getnotelist', 'getmessagelist']),
    ...mapMutations(['gettoken'])
  },
  mounted () {
    this.getnotelist()
    this.getmessagelist()
    if (this.logintoken !== null) {
      const logintoken = JSON.parse(localStorage.getItem('logintoken'))
      this.gettoken(logintoken)
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a,u {
  text-decoration: none;
}
li {
  list-style: none;
}
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  width: 100vw;
  height: 1000px;
  color: #2c3e50;
  background-image: linear-gradient(#5e4084, #775fa5, #a48fca, white);
  .main {
    position: relative;
    width: 100%;
    .welcome {
      position: absolute;
      width: 100%;
      height: 60vw;
      background-image: url(./assets/homepage1.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      .welcomeword {
        position: absolute;
        left: 50%;
        top: 3vw;
        transform: translate(-50%,0);
        width: 60vw;
        height: 43.2vw;
        background-image: url(./assets/title.png);
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }
}

</style>
