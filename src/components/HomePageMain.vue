<template>
  <div class="maincont">
    <div class="mainnav">
        <router-link to="/AboutMe">关于我</router-link>
        <router-link to="/MyPicture">我的图集</router-link>
        <router-link to="/MyNote">我的笔记</router-link>
        <router-link to="/AboutMessage">给我留言</router-link>
    </div>
    <div class="mainmiddle">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
    .maincont {
        position: absolute;
        left: 50%;
        top: 32vw;
        transform: translate(-50%,0);
        width: 80vw;
        // border: 1px solid black;
        .mainnav {
          display: flex;
          height: 5vw;
          a {
            display: block;
            flex: 4;
            line-height: 5vw;
            text-align: center;
            font-size: 2vw;
          }
          .router-link-active {
            background-color: rgba(150, 113, 185, 0.3)!important;
            border-radius: 100% 100% 0 0 !important;
          }
        }
        .mainmiddle {
          width: 100%;
          margin: 5vw 0 10vw;
          padding: 2vw 5vw;
          // border: 1px solid black;
          background-color: rgba(255, 255, 255, 0.75);
        }
    }
</style>
