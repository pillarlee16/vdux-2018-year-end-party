<template>
<div class="chat-page" :style="pageStyle">
  <div class="chat-page-inner">
    <chat-header></chat-header>
    <chat-list></chat-list>
    <chat-input></chat-input>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex';


import ChatHeader from './ChatHeader.vue';
import ChatList from './ChatList.vue';
import ChatInput from './ChatInput.vue';

import ChatService from 'ui-common/services/ChatService.js';

export default {
  computed: {
    ...mapState([
      'viewportWidth',
      'viewportHeight',
    ]),
    pageStyle() {
      return `width: ${this.viewportWidth}px; height: ${this.viewportHeight}px`;
    },
  },
  components: {
    ChatHeader,
    ChatList,
    ChatInput,
  }
};
</script>
<style>
.chat-page {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #17141f;
  overflow: hidden;
}

.chat-page-inner {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>