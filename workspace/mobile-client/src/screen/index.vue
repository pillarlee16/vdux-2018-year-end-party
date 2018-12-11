<template>
  <div id="screen">
    <candidate-view :active="candidateActive"></candidate-view>
    <camera-view :mode="cameraMode"></camera-view>
    <chat-view></chat-view>
    <like-view></like-view>
  </div>
</template>

<script>
import CameraView from './CameraView.vue';
import ChatView from './ChatView.vue';
import LikeView from './LikeView.vue';
import CandidateView from './CandidateView.vue';

import Keyboard from '../services/Keyboard.js';

export default {
  data() {
    return {
      cameraMode: 'video',
      candidateActive: false,
    };
  },
  created() {
    Keyboard.$on('keydown', this.handleKey);
  },
  destroyed() {
    Keyboard.$off('keydown', this.handleKey);
  },
  methods: {
    handleKey(key) {
      switch (key) {
        case 'ONE':
          this.cameraMode = 'video';
          this.candidateActive = false;
          break;
        case 'TWO':
          this.cameraMode = 'image';
          this.candidateActive = true;
          break;
      }
    },
  },
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
