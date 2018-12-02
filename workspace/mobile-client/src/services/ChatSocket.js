import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import io from 'socket.io-client';

import store from '../store/index.js';

// const colors = [ 'red', 'pink', 'purple', 'deeppurple', 'indigo', 'blue', 'lightblue', 'cyan', 'teal', 'green', 'lightgreen', 'lime', 'yellow', 'amber', 'orange', 'deeporange' ];

export default new Vue({
  store,
  computed: {
    ...mapState('user', [
      'nickname',
      'nicknameColor',
    ])
  },
  created() {
    const socket = this.socket = io('http://localhost:3005');

    socket.on('connect', function () { console.log('connect') });
    socket.on('message-to-client', this.handleMessage.bind(this));
  },
  methods: {
    handleMessage(data) {
      console.log(data);
      this.addMessage(data);
    },
    send(text) {
      if (!text) return;

      const socket = this.socket;
      if (socket && socket.connected) {
        const message = {
          nickname: this.nickname,
          nicknameColor: this.nicknameColor,
          // nickname: Math.random(),
          // nicknameColor: colors[Math.floor(Math.random() * colors.length)],
          text };
        this.addMessage({ ...message, from: 'me' });
        socket.emit('message-to-server', message);
      }
    },
    ...mapMutations([
      'addMessage',
    ]),
  },
});