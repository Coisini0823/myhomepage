<template>
  <div class="notealllook">
    <div class="addnote" @click="toNoteAdd" v-if="$store.state.islogin === 1">
      <div class="addnotebtn"></div>
      <div class="addnotewords">添加笔记</div>
    </div>
    <ul>
      <li v-for="item in $store.state.notelist" :key="item.id" class="shownote" @click="readnote(item)">
        <div class="notetitle">
          {{ item.notetitle }}
        </div>
        <div class="notetime">
          {{ item.notetime }}
        </div>
        <div class="notecont">
          {{ item.notecont }}
        </div>
        <div class="notebtn" v-if="$store.state.islogin === 1">
            <div class="notebtn-delete" @click.stop="deletenote(item)">删除</div>
            <div class="notebtn-rewrite" @click="rewritenote(item)">修改</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  methods: {
    // ...mapMutations(['getnotelist', 'deletenotelist']),
    ...mapActions(['deletenotelist']),
    // 添加笔记
    toNoteAdd () {
      this.$router.push({
        path: '/MyNote/NoteAdd',
        query: {
          note: {
            idnote: '',
            notetitle: '',
            notetime: '',
            notecont: ''
          }
        }
      })
    },
    // 删除笔记
    deletenote (note) {
      this.deletenotelist(note)
    },
    // 修改笔记
    rewritenote (note) {
      // localStorage.setItem('notecontent', JSON.stringify(note))
      this.$router.push({
        path: '/MyNote/NoteAdd',
        query: {
          note: note
        }
      })
    },
    // 查看笔记内容
    readnote (note) {
      this.$router.push({
        path: '/MyNote/ReadNote',
        query: {
          note: note
        }
      })
    }
  }
}
</script>

<style lang="less">
.notealllook {
 .addnote {
   width: 100%;
   padding: 1vw 2vw;
   height: 7vw;
   cursor: pointer;
   .addnotewords {
     float: right;
     line-height: 5vw;
     margin-right: 2vw;
   }
   .addnotebtn {
     float: right;
     width: 5vw;
     height: 5vw;
     background-image: url(../assets/addbtn.png);
     background-repeat: no-repeat;
     background-size: contain;
   }
 }
 .shownote {
   padding: 1vw 2vw;
   margin: 2vw;
   background-color: #e5e4e4;
   cursor: pointer;
   .notetitle {
     font-size: 2.5vw;
     line-height: 5vw;
     font-weight: 700;
   }
   .notetime {
     font-size: 1.5vw;
     line-height: 2vw;
     color: #666;
   }
   .notecont {
     padding: 1vw;
     font-size: 2vw;
     line-height: 4vw;
     height: 4vw;
     overflow: hidden;
   }
   .notebtn {
     width: 100%;
     height: 2.5vw;
     .notebtn-rewrite,
     .notebtn-delete {
        float: right;
        font-size: 1.5vw;
        line-height: 2rem;
        padding-left: 1vw;
        cursor: pointer;
        color: #666;
     }
     .notebtn-rewrite:hover,
     .notebtn-delete:hover {
        color: rgb(230, 40, 15);
     }
   }
 }
}
</style>
