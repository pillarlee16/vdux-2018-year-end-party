<template>
  <div id="screen">
    <candidate-view></candidate-view>
    <camera-view></camera-view>
    <chat-view></chat-view>
    <!-- <like-view></like-view> -->
  </div>
</template>

<script>
import CameraView from './CameraView.vue';
import ChatView from './ChatView.vue';
import LikeView from './LikeView.vue';
import CandidateView from './CandidateView.vue';

export default {
  components: {
    CandidateView,
    ChatView,
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
