<template>
  <transition name="show">
    <div class="home">
      <div class="inner">
        <div class="title">
          <p class="small">WELCOME TO</p>
          <p>2018</p>
          <p>THE GREAT VDUX</p>
        </div>
        <div class="ui-nickname">
          <input type="text" placeholder="닉네임을 입력하세요" :value="nickname" />
        </div>
        <div class="ui-enter">
          <div class="btn" v-on:click="handleEnter">입장하기</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import API from 'ui-common/services/API/index.js';
import ChatService from 'ui-common/services/ChatService';

export default {
  computed: {
    ...mapState('user', {
      userId: '_id',
      nickname: 'nickname',
    }),
  },
  methods: {
    ...mapActions('mobile', [
      'activateChatPage',
    ]),
    ...mapActions('user', {
      updateUser: 'update',
    }),
    handleEnter() {
      const $input = this.$el.querySelector('input');
      const value = $input.value;
      if (!value) {
        alert('원하는 닉네임을 입력해주세요.');
      } else if (value.length > 20) {
        alert('닉네임은 최대 20자까지 입력할 수 있습니다.');
      } else {
        API.user.requestUpdate(this.userId, { nickname: value })
          .then(() => { this.afterLogin(value); });
      }
      console.log(value, value.length);
    },
    afterLogin(nickname) {
      const localStorage = window.localStorage;
      const visited = localStorage.getItem('vdux_visited');

      if (!visited) {
        ChatService.sendSystem(`${nickname}님이 입장하였습니다.`);
        localStorage.setItem('vdux_visited', '1');
      }

      this.activateChatPage();
    },
  },
}
</script>
<style>
.home {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #17141f;
  display: flex;
  align-items: center;
}

.home .inner {
  position: relative;
  top: -42px;
  width: 100%;
}

.home .title {
  position: relative;
  width: 100%;
}

.home .title p {
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 40px;
  height: 52px;
  line-height: 52px;
  color: #edcd6d;
  font-family: 'NotoSans-Bold';
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #f0d78c;
}

.home .title p.small {
  font-size: 24px;
  height: 30px;
  line-height: 30px;
}

.home .ui-nickname {
  position: relative;
  width: 100%;
  margin-top: 32px;
  display: flex;
  justify-content: center;

}

.home .ui-nickname input {
  font-size: 16px;
  background: transparent;
  /* border: 3px solid rgba(255, 255, 255, 0.5); */
  border-radius: 4px;
  border: none;
  padding: 8px;
  box-sizing: border-box;
  width: 260px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  background-color: #3f4447;
}

.home .ui-nickname input:focus {
  outline: none;
}

.home .ui-enter {
  position: relative;
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.home .ui-enter .btn {
  font-size: 16px;
  /* background: violet; */
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid rgba(255, 255, 255, 0.8);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  /* border: none; */
  width: 260px;
  height: 40px;
  box-sizing: border-box;
  line-height: 34px;
  text-align: center;
}


.show-enter, .show-leave-to {
  opacity: 0;
}
.show-enter-to, .show-leave {
  opacity: 1;
}
.show-leave-active {
  transition: opacity 0.7s ease-in-out;
}

</style>