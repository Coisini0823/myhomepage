<template>
  <div class="aboutme">
    <MyMessage></MyMessage>
    <MyIntroduce></MyIntroduce>
    <MyHobby></MyHobby>
    <MyPicture></MyPicture>
  </div>
</template>

<script>

import MyMessage from '../components/MyMessage.vue'
import MyIntroduce from '../components/MyIntroduce.vue'
import MyHobby from '../components/MyHobby.vue'
import MyPicture from '../components/MyPicture.vue'

export default {
  components: {
    MyMessage,
    MyIntroduce,
    MyHobby,
    MyPicture
  }
}
</script>

<style lang="less">
</style>
