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

    this.onConnect = function () {
      console.log('connect');
    }
    this.onMessage = this.handleMessage.bind(this);
    this.onLike = this.handleLike.bind(this);

    socket.on('connect', this.onConnect);
    socket.on('message-to-client', this.onMessage);
    socket.on('like-to-client', this.onLike);
  },
  destroyed() {
    this.socket.off('connect', this.onConnect);
    this.socket.off('message-to-client', this.onMessage);
    this.socket.off('like-to-client', this.onLike);
  },
  methods: {
    handleMessage(data) {
      console.log(data);
      this.addMessage(data);
    },
    handleLike(data) {
      console.log('handleLike', data);
      this.$emit('like', data);
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