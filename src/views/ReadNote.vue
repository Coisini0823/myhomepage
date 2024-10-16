<template>
  <div class="noteread">
    <div class="returnnotelist" @click="toNoteList">&lt;</div>
    <div class="shownote">
        <div class="notetitle">
            {{ note.notetitle }}
        </div>
        <div class="notetime">
            {{ note.notetime }}
        </div>
        <div class="notecont">
            {{ note.notecont }}
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      note: ''
    }
  },
  methods: {
    toNoteList () {
      this.$router.push({
        path: '/MyNote/NoteAllLook'
      })
    }
  },
  mounted () {
    if (this.$route.query.note !== '[object Object]') localStorage.setItem('notecontent', JSON.stringify(this.$route.query.note))
    this.note = JSON.parse(localStorage.getItem('notecontent'))
  }
}
</script>

<style lang="less">
 .noteread {
   .returnnotelist {
       font-size: 4vw;
       color: #777;
       cursor: pointer;
   }
   .returnnotelist:hover  {
       color: rgb(16, 85, 155);
   }
   .shownote {
    padding: 1vw 2vw;
    .notetitle {
        font-size: 2.8vw;
        text-align: center;
    }
    .notetime {
        font-size: 1.6vw;
        text-align: center;
        margin: 1vw auto;
    }
    .notecont {
        font-size: 2.2vw;
        text-indent: 2em;
        height: 70vw;
        overflow-y: auto;
    }
   }
 }
</style>
