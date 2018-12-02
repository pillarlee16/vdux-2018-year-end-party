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
import ApiService from '../services/ApiService.js';

const PREFIX = '[mobile/index]';


export default {
  data() {
    return {
      isReady: false,
    };
  },
  computed: {
    ...mapState('user', {
      userId: (state) => state._id,
      nickname: (state) => state.nickname,
    }),
    isLogin() {
      return this.userId && this.nickname;
    },
  },
  created() {
    console.log(PREFIX, 'created');

    const localStorage = window.localStorage;
    const id = localStorage.getItem('vdux_user_id');

    console.log(PREFIX, 'vdux_user_id at localStorage', id);

    if (!id) {
      ApiService.requestCreateUser().then((data) => {
        localStorage.setItem('vdux_user_id', data._id);
        this.isReady = true;
      });
    } else {
      ApiService.requestGetUser(id)
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
}
</style>
