<template>
  <div id="mobile">
    <template v-if="isReady">
      <home v-if="!isLogin"></home>
      <template v-if="isLogin">
        <app-header></app-header>
        <chat-list></chat-list>
        <chat-input></chat-input>
      </template>
    </template>
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
import AppHeader from './AppHeader.vue';
import ChatList from './ChatList.vue';
import ChatInput from './ChatInput.vue';
import ChatService from '../services/ChatService.js';
import Home from './Home.vue';

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
        this.isReady = true;
      });
    } else {
      API.user.requestGetOne(id)
        .then(() => {
          this.isReady = true;
        })
        .catch((err) => {
          window.localStorage.clear();
          location.reload();
        });
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
    AppHeader,
    ChatList,
    ChatInput,
    Home,
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
</style>
