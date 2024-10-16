<template>
    <div id="mypicture">
        <p>个人图集：<i @click="tomypicture(1)">查看更多</i></p>
        <div class="pics">
            <img  v-for="(item,index) in $store.state.picsrc" :key="item.id" :src=item.src @click="tomypicture(index+1)">
        </div>
    </div>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['setpicnum']),
    tomypicture (n) {
      this.setpicnum(n)
      this.$router.push({
        path: '/Mypicture'
      })
    }
  }
}
</script>

<style lang="less">
    #mypicture {
      width: 100%;
      height: 25vw;
      overflow: hidden;
      p {
        font-size: 2.2vw;
        font-weight: 700;
        i {
            font-size: 1.5vw;
            font-weight: 300;
            float: right;
            cursor: pointer;
        }
      }
      .pics {
        width: 205vw;
        height: 20vw;
        margin-top: 2vw;
        // background-color: pink;
        img {
            height: 100%;
            margin: 0 1vw;
            cursor: pointer;
        }
      }
    }
</style>
