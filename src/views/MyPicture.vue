<template>
  <div class="pictures">
    <div class="showpicture" ref="showmypicture"></div>
    <div class="turnlast" @click="topiclast">&lt;</div>
    <div class="turnnext" @click="topicnext">></div>
    <div class="showpictures">
      <div class="picturesposition" ref="picturesposition">
        <img class="thepicture" v-for="(item,index) in picsrc" :key="item.id" :src=item.src :class="{pickpic: index+1 === picsrcnum }">
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['picsrc', 'picsrcnum'])
  },
  methods: {
    ...mapMutations(['topicnext', 'topiclast']),
    changepicture (n) {
      this.$refs.showmypicture.style.backgroundImage = `url("${this.picsrc[n - 1].src}")`
      // console.log(n)
      // console.log(document.querySelector('.pickpic').offsetLeft)
      this.$nextTick(() => {
        this.$refs.picturesposition.style.left = `${-document.querySelector('.pickpic').offsetLeft + 50}px`
      })
    }
  },
  watch: {
    picsrcnum (newValue) {
      // console.log(newValue)
      this.changepicture(newValue)
    }
  },
  mounted () {
    this.changepicture(this.picsrcnum)
  }
}
</script>

<style lang="less">
  .pictures {
    position: relative;
    .turnlast,
    .turnnext {
      position: absolute;
      top: 26vw;
      border-radius: 50%;
      width: 8vw;
      height: 8vw;
      line-height: 8vw;
      text-align: center;
      font-size: 5vw;
      background-color: #bebaba;
      opacity: .6;
      cursor: pointer;
    }
    .turnlast {
      left: 1vw;
    }
    .turnnext {
      right: 1vw;
    }
    .showpicture {
      margin: 0 auto;
      width: 60vw;
      height: 60vw;
      // background-color: purple;
      // background-image: url(../assets/image/pic1.jpg);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 50% 50%;
    }
    .showpictures {
      position: relative;
      margin-top: 5vw;
      width: 100%;
      height: 22vw;
      overflow: hidden;
      // background-color: pink;
      .picturesposition {
        position: absolute;
        left: 0;
        height: 100%;
        width: 224vw;
        .thepicture {
          height: 100%;
          margin: 0 1vw;
        }
      }
    }
  }
  .pickpic {
    border: 3px solid rgb(82, 46, 238);
  }
</style>
