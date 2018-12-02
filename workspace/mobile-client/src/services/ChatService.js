import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import io from 'socket.io-client';

import store from '../store/index.js';

export default new Vue({
  store,
  computed: {
    ...mapState([
      'hostname',
    ]),
    ...mapState('user', [
      'nickname',
      'nicknameColor',
    ]),
    url() { return `http://${this.hostname}:3005`; },
  },
  created() {
    const socket = this.socket = io(this.url);

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