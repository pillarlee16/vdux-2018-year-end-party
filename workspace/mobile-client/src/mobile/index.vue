<template>
  <div id="mobile">
    <!-- <div class="test">
      <ul>
        <li>{{ screenWidth }}</li>
        <li>{{ screenHeight }}</li>
        <li>{{ innerWidth }}</li>
        <li>{{ innerHeight }}</li>
      </ul>
    </div> -->
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
      ApiService.requestGetUser()
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

    const ctx = this;

    ctx.screenWidth = window.screen.width;
    ctx.screenHeight = window.screen.height;
    ctx.innerWidth = window.innerWidth;
    ctx.innerHeight = window.innerHeight;

    window.addEventListener('resize', function () {
      // alert('resize');
      ctx.screenWidth = window.screen.width;
      ctx.screenHeight = window.screen.height;
      ctx.innerWidth = window.innerWidth;
      ctx.innerHeight = window.innerHeight;
    });
  },
  methods: {
    ...mapActions('user', {
      updateUser: 'update',
    }),
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
