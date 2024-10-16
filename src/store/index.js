import Vue from 'vue'
import Vuex from 'vuex'
import { getuser, adduser, getnote, addnote, rewritenote, deletenote, getmessage, addmessage, replymessage } from '@/axios/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      islogin: 3,
      picsrc: [
        { id: 1, src: require('../assets/image/pic1.jpg') },
        { id: 2, src: require('../assets/image/pic2.jpg') },
        { id: 3, src: require('../assets/image/pic3.jpg') },
        { id: 4, src: require('../assets/image/pic4.jpg') },
        { id: 5, src: require('../assets/image/pic5.jpg') },
        { id: 6, src: require('../assets/image/pic6.jpg') },
        { id: 7, src: require('../assets/image/pic7.jpg') },
        { id: 8, src: require('../assets/image/pic8.jpg') },
        { id: 9, src: require('../assets/image/pic9.jpg') },
        { id: 10, src: require('../assets/image/pic10.jpg') }
      ],
      usermessage: {
        name: '',
        phone: ''
      },
      picsrcnum: 1,
      notelist: '',
      messagelist: '',
      // token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
      token: ''
    }
  },
  getters: {
    // getstate: (state) => {
    //   if (!state.token) {
    //     state.token = JSON.parse(localStorage.getItem('token'))
    //   }
    //   return state.token
    // }
  },
  mutations: {
    // 图片左右切换和点击跳转
    topicnext (state) {
      if (state.picsrcnum < state.picsrc.length) {
        state.picsrcnum++
      } else state.picsrcnum = state.picsrc.length
    },
    topiclast (state) {
      if (state.picsrcnum > 1) {
        state.picsrcnum--
      } else state.picsrcnum = 1
    },
    setpicnum (state, newnum) {
      state.picsrcnum = newnum
    },
    // 解析和移除本地token
    gettoken (state, value) {
      const decodedPayload = JSON.parse(atob(value))
      state.usermessage.name = decodedPayload.name
      state.usermessage.phone = decodedPayload.telephone
      localStorage.removeItem('usermessage')
      if (state.usermessage.name === 'Coisini') {
        state.islogin = 1
      } else state.islogin = 2
    },
    gotologin (state) {
      state.token = null
      state.usermessage.name = null
      state.usermessage.phone = null
      state.islogin = 0
      localStorage.removeItem('logintoken')
    },
    // 改变登录状态
    betarvaler (state) {
      state.islogin = 3
    },
    storegetnotelist (state, items) {
      state.notelist = items
    },
    storegetmessagelist (state, items) {
      state.messagelist = items
    }
  },
  actions: {
    // 数据库操作
    // 获取用户信息列表
    async getuserlist (context, user) {
      await getuser(user)
      setTimeout(() => {
        // console.log(JSON.parse(localStorage.getItem('usermessage')))
        const messagevalue = JSON.parse(localStorage.getItem('usermessage'))
        // console.log(messagevalue)
        if (messagevalue.success) {
          const payload = messagevalue.token.split('.')[1]
          localStorage.setItem('logintoken', JSON.stringify(payload))
          context.commit('gettoken', payload)
        } else context.commit('gotologin')
      }, 400)
    },
    // 提交用户信息
    async adduserlist (context, newmessage) {
      await adduser(newmessage)
    },
    // 获取笔记列表
    async getnotelist (context) {
      const res = await getnote()
      // console.log(res)
      context.commit('storegetnotelist', res)
    },
    // 提交笔记信息
    async addnotelist (context, newnote) {
      await addnote(newnote)
      setTimeout(() => {
        this.dispatch('getnotelist')
      }, 100)
    },
    // 修改笔记信息
    async rewritenotelist (context, rewnote) {
      await rewritenote(rewnote)
      setTimeout(() => {
        this.dispatch('getnotelist')
      }, 100)
    },
    // 删除笔记信息
    async deletenotelist (context, delnote) {
      await deletenote(delnote)
      setTimeout(() => {
        this.dispatch('getnotelist')
      }, 100)
    },
    // 获取留言列表
    async getmessagelist (context) {
      const res = await getmessage()
      // console.log(res)
      context.commit('storegetmessagelist', res)
    },
    // 提交留言信息
    async addmessagelist (context, newmessage) {
      await addmessage(newmessage)
      setTimeout(() => {
        this.dispatch('getmessagelist')
      }, 100)
    },
    // 修改留言信息
    async replymessagelist (context, remessage) {
      await replymessage(remessage)
      setTimeout(() => {
        this.dispatch('getmessagelist')
      }, 100)
    }
  },
  modules: {
  }
})
