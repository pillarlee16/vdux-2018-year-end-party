<template>
  <div id="mobile-app">
    <!-- <div class="test">
      <ul>
        <li>{{ screenWidth }}</li>
        <li>{{ screenHeight }}</li>
        <li>{{ innerWidth }}</li>
        <li>{{ innerHeight }}</li>
      </ul>
    </div> -->
    <home v-if="!isLogin"></home>
    <template v-if="isLogin">
      <app-header></app-header>
      <chat-list></chat-list>
      <chat-input></chat-input>
    </template>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue';
import ChatList from './ChatList.vue';
import ChatInput from './ChatInput.vue';
import ChatSocket from '../services/ChatSocket.js';
import Home from './Home.vue';

import axios from 'axios';

import { mapActions } from 'vuex';

export default {
  data() {
    return {
      screenWidth: null,
      screenHeight: null,
      innerWidth: null,
      innerHeight: null,
      isLogin: false,
    };
  },
  computed: {
    appStyle() {
      return `width: ${this.innerWidth}px; height: ${this.innerHeight}px`;
    },
  },
  created() {
    console.log('[Mobile/index]', 'created');

    const localStorage = window.localStorage;
    const id = localStorage.getItem('vdux_user_id');
    console.log('id', id);

    if (!id) {
      axios.get('http://localhost:3006/api/user').then((res) => {
        console.log('new user', res);
        this.updateUser(res.data);
        localStorage.setItem('vdux_user_id', res.data._id);
      });
    } else {
      axios.get(`http://localhost:3006/api/user/${id}`).then((res) => {
        console.log('get a user', res);
        this.updateUser(res.data);
        if (res.data.nickname) {
          this.isLogin = true;
        }
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
#mobile-app {
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
