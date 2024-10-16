<template>
  <div class="top">
      <div class="loginyes" v-if="$store.state.islogin === 1 || $store.state.islogin === 2">
        <div class="showuser">Hello,{{ $store.state.usermessage.name }}</div>
        <div class="returnlogin" @click="gotologin">退出登录</div>
      </div>
      <div class="loginno" v-if="$store.state.islogin === 3">
        <div class="gologin" @click="gotologin">前往登录</div>
      </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      loginname: ''
    }
  },
  methods: {
    ...mapMutations(['gotologin'])
  }
}
</script>

<style  lang="less">
.top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6vw;
  z-index: 100;
  .loginyes {
    height: 6vw;
    width: 100%;
    line-height: 6vw;
    font-size: 18px;
    .showuser {
      float: left;
      margin-left: 8vw;
    }
    .returnlogin {
      float: right;
      margin-right: 10vw;
      cursor: pointer;
    }
  }
  .loginno {
    height: 6vw;
    width: 100%;
    line-height: 6vw;
    font-size: 18px;
    .gologin {
      float: right;
      margin-right: 10vw;
      cursor: pointer;
    }
  }
}
</style>
