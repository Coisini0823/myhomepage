<template>
  <div class="loginandregister">
    <div class="changetap">
        <div class="turnlogin" :class="{picktap: iflogin}" @click="turnlogin">登录</div>
        <div class="turnregister" :class="{picktap: !iflogin}" @click="turnregister">注册</div>
    </div>
    <form action="#" class="loginmess" v-show="iflogin">
        账号：<input class="loginname" type="text" placeholder="请输入您的账号" v-model="loginmess.name"><br>
        密码：<input class="loginpsw" type="password" placeholder="请输入您的密码" v-model="loginmess.psw"><br>
        <button class="loginbtn" @click.prevent="gologin">登录</button><br>
        <i class="goregister" @click="turnregister">没有账号？去注册</i><br>
        <i class="gotravel" @click="gotravel">不需要登录？游客浏览</i>
    </form>
    <div class="registermess" v-show="!iflogin">
        手机号：<input class="registerphone" type="text" placeholder="请输入您的手机号码" v-model="registermess.phone"><br>
        账号：<input class="registername" type="text" placeholder="请输入您的账号名（3-16位仅限字母大小写数字）" v-model="registermess.name"><br>
        密码：<input class="registerpsw" type="password" placeholder="请输入您的密码（6-18位仅限字母大小写数字）"  v-model="registermess.psw"><br>
        再次密码：<input class="registeragainpsw" type="password" placeholder="请再次输入您的密码" v-model="pswagain"><br>
        <button class="registerbtn" @click.prevent="goregister">注册</button><br>
        <i class="gologin" @click="turnlogin">已有账号？去登录</i><br>
        <i class="gotravel" @click="gotravel">不需要登录？游客浏览</i>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      iflogin: true,
      loginmess: {
        name: '',
        psw: ''
      },
      registermess: {
        phone: '',
        name: '',
        psw: ''
      },
      pswagain: '',
      registerok: false
    }
  },
  methods: {
    ...mapMutations(['betarvaler']),
    ...mapActions(['getuserlist', 'adduserlist']),
    turnlogin () {
      this.registermess = {
        phone: '',
        name: '',
        psw: ''
      }
      this.pswagain = ''
      this.iflogin = true
    },
    turnregister () {
      this.loginmess = {
        name: '',
        psw: ''
      }
      this.iflogin = false
    },
    gologin () {
      if (this.loginmess.name === '' || this.loginmess.psw === '') {
        alert('账号或密码不为空')
      } else {
        this.getuserlist(this.loginmess)
      }
      // console.log('验证登录')
    },
    goregister () {
      // console.log('验证注册')
      if (this.registermess.name === '' || this.registermess.phone === '' || this.registermess.psw === '' || this.pswagain === '') {
        alert('请完善注册信息')
      } else {
        const phonetest = /^\d{11}$/
        const nametest = /^[a-zA-Z0-9]{3,16}$/
        const pswtest = /^[a-zA-Z0-9]{6,18}$/
        if (!phonetest.test(this.registermess.phone)) {
          alert('手机号码格式不正确')
          this.registerok = false
        } else this.registerok = true
        if (!nametest.test(this.registermess.name)) {
          alert('账号格式不正确')
          this.registerok = false
        } else this.registerok = true
        if (!pswtest.test(this.registermess.psw)) {
          alert('密码格式不正确')
          this.registerok = false
        } else this.registerok = true
        if (this.registermess.psw !== this.pswagain) {
          alert('两次密码输入不一致')
          this.registerok = false
        } else this.registerok = true
        if (this.registerok) {
          this.adduserlist(this.registermess)
        }
        setTimeout(() => {
          const regi = JSON.parse(localStorage.getItem('register'))
          if (regi === 'fail') {
            alert('用户名已被使用')
          } else {
            this.turnlogin()
          }
          localStorage.removeItem('register')
        }, 200)
      }
    },
    gotravel () {
      // console.log('游客')
      this.betarvaler()
    }
  }
}
</script>

<style lang="less">
  .loginandregister {
      position: absolute;
      left: 50%;
      top: 36vw;
      transform: translate(-50%,0);
      width: 80vw;
    //   background-color: rgba(255, 255, 255, 0.5);
      .changetap {
        display: flex;
        flex: 2;
        width: 100%;
        height: 6vw;
        font-size: 2.5vw;
        line-height: 6vw;
        text-align: center;
        .turnlogin,
        .turnregister {
            width: 50%;
            cursor: pointer;
        }
        .picktap {
            background-image: linear-gradient(
                rgba(90, 51, 129, 0.3),
                rgba(90, 51, 129, 0.2),
                rgba(90, 51, 129, 0.1),
                rgba(255, 255, 255, 0.2),
                rgba(255, 255, 255, 0.6)
            );
            border-radius: 50% 50% 0 0;
        }
      }
      .loginmess,
      .registermess {
        width: 100%;
        height: 50vw;
        background-image: linear-gradient(
            rgba(255, 255, 255, 0.6),
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.2)
        );
        text-align: center;
        font-size: 2vw;
      }
      .loginmess {
        padding: 6vw;
        .loginname,
        .loginpsw {
            width: 40vw;
            height: 4vw;
            font-size: 1.8vw;
            padding-left: 1vw;
            margin: 2vw 0 1vw;
        }
        .loginbtn {
            width: 10vw;
            height: 4vw;
            line-height: 4vw;
            text-align: center;
            font-size: 2vw;
            margin: 2vw 0;
        }
        i {
            font-size: 1.5vw;
            line-height: 3vw;
            text-decoration: underline;
            cursor: pointer;
        }
      }
      .registermess {
        padding: 4vw;
        .registerphone,
        .registername,
        .registerpsw,
        .registeragainpsw {
            width: 40vw;
            height: 4vw;
            font-size: 1.8vw;
            padding-left: 1vw;
            margin: 2vw 0 1vw;
        }
        .registerbtn {
            width: 10vw;
            height: 4vw;
            line-height: 4vw;
            text-align: center;
            font-size: 2vw;
            margin: 2vw 0;
        }
        i {
            font-size: 1.5vw;
            line-height: 3vw;
            text-decoration: underline;
            cursor: pointer;
        }
      }
  }
</style>
