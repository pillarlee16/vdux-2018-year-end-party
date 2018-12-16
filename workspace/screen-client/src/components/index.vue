<template>
  <div id="screen">
    <candidate-view v-show="candidateActive"></candidate-view>
    <camera-view v-show="cameraActive"></camera-view>
    <logo-view v-show="logoActive"></logo-view>
    <site-view v-show="siteActive"></site-view>
    <quiz-view v-show="quizActive"></quiz-view>
    <chat-view v-show="chatActive"></chat-view>
    <like-view></like-view>
    <opening-view ref="opening"></opening-view>
  </div>
</template>

<script>
import CameraView from './CameraView.vue';
import LogoView from './LogoView.vue';
import SiteView from './SiteView.vue';
import QuizView from './QuizView.vue';
import ChatView from './ChatView.vue';
import LikeView from './LikeView.vue';
import CandidateView from './CandidateView.vue';
import OpeningView from './OpeningView.vue';

import Keyboard from 'ui-common/services/Keyboard.js';

export default {
  data() {
    return {
      candidateActive: false,
      cameraActive: false,
      logoActive: false,
      siteActive: false,
      quizActive: false,
      chatActive: true,
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
          this.$refs.opening.run();
          break;
        case 'TWO':
          this.cameraActive = !this.cameraActive;
          break;
        case 'THREE':
          this.logoActive = !this.logoActive;
          break;
        case 'FOUR':
          this.siteActive = !this.siteActive;
          break;
        case 'FIVE':
          this.quizActive = !this.quizActive;
          break;
        case 'SIX':
          this.candidateActive = !this.candidateActive;
          break;
        case 'SEVEN':
          this.chatActive = !this.chatActive;
          break;
      }
    },
  },
  components: {
    CandidateView,
    ChatView,
    CameraView,
    LikeView,
    OpeningView,
    LogoView,
    SiteView,
    QuizView,
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