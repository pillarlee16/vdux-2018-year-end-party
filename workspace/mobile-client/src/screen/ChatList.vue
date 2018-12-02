<template>
  <div class="chat-list">
    <p v-for="(msg, idx) in messages" :key="idx">
      <span class="nickname" :class="[ msg.nicknameColor ]">{{ msg.nickname }}</span>: <span class="msg">{{ msg.text }}</span>
    </p>
  </div>
</template>
<script>
import { mapState } from 'vuex';

const COLOR = {
  RED: '#FF5252',
  PINK: '#FF4081',
  PURPLE: '#E040FB',
  DEEPPURPLE: '#7C4DFF',
  INDIGO: '#536DFE',
  BLUE: '#448AFF',
  LIGHTBLUE: '#40C4FF',
  CYAN: '#18FFFF',
  TEAL: '#64FFDA',
  GREEN: '#69F0AE',
  LIGHTGREEN: '#B2FF59',
  LIME: '#EEFF41',
  YELLOW: '#FFFF00',
  AMBER: '#FFD740',
  ORANGE: '#FFAB40',
  DEEPORANGE: '#FF6E40',
};

export default {
  data() {
    return {
      scrollLocked: false,
    }
  },
  computed: {
    ...mapState([
      'messages',
    ]),
  },
  created() {
  },
  mounted() {
    // this.$el.addEventListener('scroll', this.handleScroll.bind(this));
  },
  watch: {
    messages() {
      // const last = this.messages[this.messages.length - 1];
      // if (last && last.from === 'me') {
      //   this.scrollToBottom();
      // } else {
      //   const elementHeight = 32;
      //   const scrollTop = this.$el.scrollTop;
      //   const scrollHeight = this.$el.scrollHeight;
      //   const clientHeight = this.$el.clientHeight;
      //   console.log('data',scrollTop, scrollHeight, clientHeight, elementHeight);
      //   console.log('data2', scrollHeight - clientHeight - scrollTop, elementHeight);
      //   if (scrollHeight - clientHeight - scrollTop < elementHeight) {
      //     this.scrollToBottom();
      //   }
      // }
      this.scrollToBottom();
    },
  },
  methods: {
    handleScroll(evt) {
      console.log(evt);
      const $el = this.$el;
      // $el.scrollTop = $el.scrollHeight - $el.clientHeight;

      // this.scrollLocked = ($el.scrollHeight - $el.clientHeight !== $el.scrollTop);
    },
    scrollToBottom() {
      const $el = this.$el;
      $el.scrollTop = $el.scrollHeight - $el.clientHeight;
    },
  },
}
</script>
<style scoped>
.chat-list {
  position: absolute;
  right: 10px;
  top: 48px;
  width: 300px;
  height: 800px;
  box-sizing: border-box;
  padding-top: 8px;
  /* background-color: grey; */
  overflow: scroll;
  background-color: rgba(255, 255, 255, 0.5);
}
.chat-list::-webkit-scrollbar {
  display: none;
}


.chat-list p {
  width: 100%;
  padding-left: 16px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 16px;
  line-height: 24px;
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  word-break: break-all;
}

.chat-list p .nickname {
  font-family: 'NotoSans-Bold';
  opacity: 0.85;
}

.red { color: #FF5252; }
.pink { color: #FF4081; }
.purple { color: #E040FB; }
.deeppurple { color: #7C4DFF; }
.indigo { color: #536DFE; }
.blue { color: #448AFF; }
.lightblue { color: #40C4FF; }
.cyan { color: #18FFFF; }
.teal { color: #64FFDA; }
.green { color: #69F0AE; }
.lightgreen { color: #B2FF59; }
.lime { color: #EEFF41; }
.yellow { color: #FFFF00; }
.amber { color: #FFD740; }
.orange { color: #FFAB40; }
.deeporange { color: #FF6E40; }
</style>