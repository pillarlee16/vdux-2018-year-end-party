<template>
  <div class="chat-input">
    <form>
      <input class="input-message" type="text" placeholder="여기에 메시지를 남기세요."/>
      <div class="btn-thumb" v-on:click="handleThumb"></div>
      <div class="btn-send" v-on:click="handleSubmit">보내기</div>
      <!-- <input class="btn-send" type="submit" value="SEND" /> -->
    </form>
  </div>
</template>
<script>
import ChatService from 'ui-common/services/ChatService.js';

import { TweenMax } from 'gsap';

export default {
  mounted() {
    const $form = this.$el.querySelector('form');
    $form.addEventListener('submit', this.handleSubmit.bind(this));
  },
  methods: {
    handleThumb(event) {
      const $thumb = event.target;
      TweenMax.to($thumb, 0.1, { scale: 0.8, onComplete: function () {
        TweenMax.to($thumb, 0.1, { scale: 1, onComplete: function () {
          ChatService.sendThumb();
        }});
      }});
    },
    handleSubmit(event) {
      event.preventDefault();

      const $input = this.$el.querySelector('.input-message');

      const value = $input.value;

      if (value.startsWith('!')) {
        const tokens = value.split(' ');
        console.log(tokens);

        const cmd = tokens[0];
        switch (cmd) {
          case '!vote':
          case '!투표':
            break;
          case '!nickname':
          case '!닉네임':
            break;
          case '!clear':
            window.localStorage.clear();
            break;
        }
      } else {
        ChatService.send($input.value);
      }



      $input.value = '';
      $input.focus();
    }
  }
}
</script>
<style>
.chat-input {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 52px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
}

.chat-input .input-message {
  position: absolute;
  left: 16px;
  /* bottom: 20px; */
  height: 52px;
  padding: 0;
  margin: 0;
  border: none;
  /* border: 1px solid white; */
  width: calc(100% - 134px);
  background: transparent;
  color: rgba(255, 255, 255, 0.8)

}

.chat-input .input-message:focus {
  outline: none;
}

.chat-input .btn-thumb {
  position: absolute;
  top: 3px;
  right: 68px;
  width: 48px;
  height: 48px;
  background-image: url('/images/icon_thumb.png');
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: 12px 12px;
  /* background-color: red; */
  filter: invert(1);
  opacity: 0.7;
}

.chat-input .btn-send {
  position: absolute;
  right: 24px;
  height: 52px;
  line-height: 52px;
  font-family: 'NotoSans-Bold';
  color: rgb(231, 172, 255);
  /* background-color: gold; */
}
</style>
