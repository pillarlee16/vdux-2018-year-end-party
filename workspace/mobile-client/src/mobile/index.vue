<template>
  <div id="mobile">
    <transition name="page-show">
      <login-page v-if="loginPageActive"></login-page>
    </transition>
    <transition name="page-show">
      <chat-page v-if="chatPageActive"></chat-page>
    </transition>
    <transition name="page-show">
      <vote-page v-if="votePageActive"></vote-page>
    </transition>
    <!-- <div class="test">
      <ul>
        <li>screenWidth: {{ screenWidth }}</li>
        <li>screenHeight: {{ screenHeight }}</li>
        <li>viewportWidth: {{ viewportWidth }}</li>
        <li>viewportHeight: {{ viewportHeight }}</li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import LoginPage from './LoginPage.vue';
import ChatPage from './ChatPage.vue';
import VotePage from './VotePage.vue';

import axios from 'axios';

import { mapState, mapActions } from 'vuex';
import API from '../services/API/index.js';

const PREFIX = '[mobile/index]';

export default {
  data() {
    return {
      isReady: false,
    };
  },
  computed: {
    ...mapState([
      'screenWidth',
      'screenHeight',
      'viewportWidth',
      'viewportHeight',
    ]),
    ...mapState('mobile', [
      'loginPageActive',
      'chatPageActive',
      'votePageActive',
    ]),
    ...mapState('user', {
      userId: (state) => state._id,
      nickname: (state) => state.nickname,
    }),
    isLogin() {
      return this.userId && this.nickname;
    },
    appStyle() {
      return `width: ${this.viewportWidth}px; height: ${this.viewportHeight}px;`;
    },
  },
  created() {
    console.log(PREFIX, 'created');

    const localStorage = window.localStorage;
    const id = localStorage.getItem('vdux_user_id');

    console.log(PREFIX, 'vdux_user_id at localStorage', id);

    if (!id) {
      API.user.requestCreate().then((data) => {
        console.log(PREFIX, 'data', data);
        localStorage.setItem('vdux_user_id', data._id);
      });
    } else {
      API.user.requestGetOne(id)
        .catch(() => {
          localStorage.clear();
          API.user.requestCreate().then((data) => {
            console.log(PREFIX, 'data', data);
            localStorage.setItem('vdux_user_id', data._id);
          });
        })
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
  },
  methods: {
    ...mapActions([
      'updateScreenSize',
    ]),
    ...mapActions('user', {
      updateUser: 'update',
    }),
    onResize() {
      this.updateScreenSize({
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      });
    },
  },
  components: {
    LoginPage,
    ChatPage,
    VotePage,
  }
}
</script>

<style>
body {
  position: relative;
  overflow: hidden;
}

#mobile {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #17141f;
  overflow: hidden;
}

.test {
  position: absolute;
  left: 0;
  top: 0;
  color: white;
  pointer-events: none;
}

.page-show-enter, .page-show-leave-to {
  opacity: 0;
  transform: translate3d(50vw, 0, 0);
}

.page-show-enter-to, .page-show-leave {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.page-show-enter-active, .page-show-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
</style>
