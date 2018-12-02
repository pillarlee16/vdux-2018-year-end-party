<template>
  <div class="chat-input">
    <form>
      <input class="input-message" type="text" placeholder="여기에 메시지를 남기세요."/>
      <!-- <input class="btn-send" type="submit" value="SEND" /> -->
    </form>
  </div>
</template>
<script>
import ChatSocket from '../services/ChatSocket.js';

export default {
  mounted() {
    const $form = this.$el.querySelector('form');
    $form.addEventListener('submit', this.handleSubmit.bind(this));
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      // alert('submit');

      const $input = this.$el.querySelector('.input-message');
      console.log($input.value);
      ChatSocket.send($input.value);

      $input.value = '';
      // return false;
    }
  }
}
</script>
<style>
.chat-input {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 52px;
  /* background-color: blue; */
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
  width: calc(100% - 140px);
  background: transparent;
  color: rgba(255, 255, 255, 0.8)

}

.chat-input .input-message:focus {
  outline: none;
}

.chat-input .btn-send {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 80px;
  height: 40px;
  /* background-color: gold; */
}
</style>
