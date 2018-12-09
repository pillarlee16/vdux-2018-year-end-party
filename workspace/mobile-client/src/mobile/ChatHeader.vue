<template>
  <div class="app-header">
    <div class="title">2018 THE GREAT VDUX</div>
    <div class="back" v-on:click="onBackClick"></div>
    <div class="vote" v-on:click="onVoteClick"></div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('mobile', [
      'deactivateChatPage',
      'activateVotePage',
    ]),
    onBackClick() {
      console.log('hahah');
      this.deactivateChatPage();
    },
    onVoteClick() {
      this.activateVotePage();
    },
  },
}
</script>
<style>
.app-header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 48px;
  background-color: #201c2b;
  border-bottom: 1px solid #302941;
}

.app-header .back {
  position: absolute;
  left: 24px;
  top: 12px;
  width: 24px;
  height: 24px;
  background-color: grey;
}

.app-header .vote {
  position: absolute;
  right: 24px;
  top: 12px;
  width: 24px;
  height: 24px;
  background-color: grey;
}

.app-header .title {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-align: center;
  color: #edcd6d;
  font-family: 'NotoSans-Bold';
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #f0d78c;
}
</style>
