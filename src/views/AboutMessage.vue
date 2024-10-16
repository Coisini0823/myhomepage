<template>
  <div class="aboutmessage" @click="cancellreply">
    <!-- 这里应该是整个body的click函数，因为数据后期需要全部挪到store所以先放这后面再解决 -->
    <ul class="showmessages">
      <li class="showmessage" v-for="(item,index) in $store.state.messagelist" :key="item.id">
      <!-- <li class="showmessage" v-for="(item,index) in $store.state.messagelist" :key="item.id"> -->
        <div class="showmessname">
          {{ item.messagename }}
        </div>
        <div class="showmesstime">
          {{ item.messagetime }}
        </div>
        <div class="showmesscont">
          {{ item.messagecont }}
        </div>
        <div class="showmessreply" v-if="item.isreply === 1">
          回复：
          {{ item.reply }}
        </div>
        <div class="replymessage" v-if="$store.state.islogin === 1" @click.stop="thisundefinedway">
          <i class="btn-replymessage" v-if="item.isreply === 0" @click="goreply(index)">回复留言</i>
          <div class="replybox" v-if="item.isreply === 2">
            <textarea class="replyinput" placeholder="请输入内容..." ref="replycontent" v-model="newreplycont"></textarea>
            <button class="replysubmit" @click.prevent="sendtoreply(item)">发送回复</button>
          </div>
        </div>
      </li>
    </ul>
    <div class="sendmessage" v-if="$store.state.islogin === 2">
      <u>留言：</u><br>
      <textarea class="messageadd" v-model="newmesscont" @input="inputmessage"></textarea><br>
      <div class="sendmessagebtnbox">
        <button class="addmessagebtn" @click.prevent="sendtomessge">发送留言</button>
        <i class="showwordnum">{{ wordnum }}/{{ wordmaxnum }}</i>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      messagelist: '',
      newmessage: {
        messagename: '',
        messagephone: '',
        messagecont: ''
      },
      wordnum: 0,
      wordmaxnum: 200,
      bepickreply: -1,
      newreplycont: '',
      newmesscont: ''
    }
  },
  methods: {
    ...mapActions(['addmessagelist', 'replymessagelist']),
    goreply (i) {
      this.messagelist[i].isreply = 2
      this.bepickreply = i
      this.$nextTick(() => {
        this.$refs.replycontent[0].focus()
      })
    },
    thisundefinedway () {
      console.log('阻止冒泡')
    },
    inputmessage () {
      this.newmesscont = this.newmesscont.slice(0, this.wordmaxnum)
      this.wordnum = this.newmesscont.length
    },
    cancellreply () {
      // console.log(this.bepickreply)
      if (this.bepickreply >= 0) {
        this.messagelist[this.bepickreply].isreply = 0
        this.bepickreply = -1
      }
    },
    sendtomessge () {
      // console.log('发送留言操作后重新获取留言列表')
      this.newmessage.messagename = this.$store.state.usermessage.name
      this.newmessage.messagephone = this.$store.state.usermessage.phone
      this.newmessage.messagecont = this.newmesscont
      this.addmessagelist(this.newmessage)
      setTimeout(() => {
        this.newmessage.messagename = ''
        this.newmessage.messagephone = ''
        this.newmessage.messagecont = ''
        this.newmesscont = ''
        this.getmessagelist()
      }, 100)
    },
    sendtoreply (item) {
      // console.log('发送回复留言操作后重新获取留言列表')
      this.newmessage = item
      this.newmessage.isreply = 1
      this.newmessage.reply = this.newreplycont
      this.replymessagelist(this.newmessage)
      setTimeout(() => {
        this.getmessagelist()
      }, 100)
    },
    getmessagelist () {
      this.messagelist = this.$store.state.messagelist
    }
  },
  mounted () {
    // console.log('获取数据库内容')
    setTimeout(() => {
      this.messagelist = this.$store.state.messagelist
    }, 200)
  }
}
</script>

<style lang="less">
  .aboutmessage {
    .showmessages {
      .showmessage {
        padding: 1vw 2vw;
        background-color: rgba(226, 226, 226,.7);
        margin-bottom: 2vw;
        .showmessname {
          font-size: 2vw;
          line-height: 4vw;
        }
        .showmesstime {
          font-size: 1.5vw;
          line-height: 2vw;
          color: #666;
        }
        .showmesscont {
          font-size: 2.2vw;
          line-height: 5vw;
          padding-left: 1vw;
        }
        .showmessreply {
          font-size: 2vw;
          line-height: 4vw;
          padding: 0.5vw 2vw;
          background-color: rgb(239, 239, 239);
        }
        .replymessage {
          width: 100%;
          padding: 1vw;
          .btn-replymessage {
            float: right;
            font-size: 1.5vw;
            color: #666;
            cursor: pointer;
          }
          .btn-replymessage:hover {
            color: rgba(140, 82, 217, 0.7);
          }
        }
        .replybox {
          display: flex;
          vertical-align: center;
          .replyinput {
            width: 55vw;
            height: 5vw;
            padding: 1vw;
          }
          .replysubmit {
            width: 9vw;
            height: 5vw;
          }
        }
      }
    }
    .sendmessage {
      padding: 2vw 1vw;
      u {
        font-size: 2.5vw;
        line-height: 4vw;
      }
      .messageadd {
        font-size: 2vw;
        width: 100%;
        height: 20vw;
      }
      .sendmessagebtnbox {
        width: 100%;
        height: 6vw;
        .addmessagebtn,
        .showwordnum {
          float: right;
          line-height: 5vw;
          margin: 2vw 1vw;
        }
        .addmessagebtn {
          width: 10vw;
          height: 5vw;
          font-size: 2vw;
        }
      }
    }
  }
</style>
