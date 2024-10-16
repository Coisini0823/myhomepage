<template>
    <div id="mymessage">
      <img src="../assets/mess-pic.jpg" id="mess-pic">
      <div id="mymess-cont1">
        姓名：曾丽瑶<br>
        年龄：20<br>
        星座：处女座
      </div>
      <div id="mymess-cont2">
        性别：女<br>
        生日：08-23<br>
        MBTI：ESTP
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
    #mymessage {
      position: relative;
      width: 100%;
      height: 25vw;
      font-size: 2.5vw;
      img {
        position: absolute;
        left: 1vw;
        top: 2.5vw;
        width: 10vw;
      }
      #mymess-cont1 {
        position: absolute;
        left: 21vw;
        top: 2.5vw;
        line-height: 5vw;
      }
      #mymess-cont2 {
        position: absolute;
        left: 46vw;
        top: 2.5vw;
        line-height: 5vw;
      }
    }
</style>
