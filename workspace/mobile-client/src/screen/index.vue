<template>
  <div id="screen">
    <camera-view></camera-view>
    <chat-list></chat-list>
    <like-view></like-view>
  </div>
</template>

<script>
import CameraView from './CameraView.vue';
import ChatList from './ChatList.vue';
import LikeView from './LikeView.vue';

export default {
  components: {
    ChatList,
    CameraView,
    LikeView,
  }
}
</script>

<style>
#screen {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #17141f;
}
</style>
