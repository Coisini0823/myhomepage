<template>
  <div class="noteaddlist">
    <!-- noteadd -->
     <div class="returnnotelist" @click="toNoteList">&lt;</div>
     <form action="#" class="writenote">
        <input type="text" placeholder="标题内容" class="writenotetitle" v-model="title"><br>
        <textarea class="writenotecont" placeholder="正文内容" @input="inputnote" v-model="content"></textarea>
        <i class="writenotenum">{{ notenum }}/{{ notenummax }}</i>
        <button class="writenotebtn" @click.prevent="subumitnote">编辑完成</button>
     </form>
  </div>
</template>
+
<script>

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      ifrewrite: false,
      notenum: 0,
      notenummax: 500,
      content: '',
      title: '',
      note: {
        idnote: '',
        notetitle: '',
        notetime: '',
        notecont: ''
      }
    }
  },
  methods: {
    ...mapActions(['rewritenotelist', 'addnotelist']),
    toNoteList () {
      this.$router.push({
        path: '/MyNote/NoteAllLook'
      })
    },
    inputnote () {
      this.content = this.content.slice(0, this.notenummax)
      this.notenum = this.content.length
    },
    subumitnote () {
      this.note.notetitle = this.title
      this.note.notecont = this.content
      if (this.note.notetitle === '' || this.note.notecont === '') {
        alert('笔记内容或标题为空')
      } else {
        if (this.ifrewrite) {
          this.rewritenotelist(this.note)
        } else {
          this.addnotelist(this.note)
        }
        this.$router.push({
          path: '/MyNote/NoteAllLook'
        })
      }
    }
  },
  mounted () {
    if (this.$route.query.note.idnote !== '') {
      this.ifrewrite = true
      this.note.idnote = this.$route.query.note.idnote
      this.content = this.$route.query.note.notecont
      this.title = this.$route.query.note.notetitle
    } else this.ifrewrite = false
  }
}
</script>

<style lang="less">
  .noteaddlist {
    .returnnotelist {
        font-size: 4vw;
        color: #777;
        cursor: pointer;
    }
    .returnnotelist:hover  {
        color: rgb(16, 85, 155);
    }
    .writenote {
        padding: 2vw 1vw;
        text-align: center;
        .writenotetitle {
            width: 96%;
            height: 5vw;
            padding: 0 1vw;
            margin-bottom: 2vw;
            font-size: 2.5vw;
        }
        .writenotecont {
            width: 96%;
            height: 60vw;
            padding: 1vw;
            font-size: 2vw;
        }
        .writenotenum {
            float: right;
            margin-right: 2vw;
            font-size: 1.8vw;
        }
        .writenotebtn {
            width: 10vw;
            height: 4vw;
            font-size: 2vw;
            line-height: 4vw;
            background-color: rgb(214, 212, 222);
            border: 1px solid rgb(190, 172, 232);
            margin-top: 4vw;
        }
    }
  }
</style>
