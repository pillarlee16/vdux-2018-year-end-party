<template>
  <div class="chat-list">
    <div class="slider" :style="sliderStyle">
      <p v-for="(msg, idx) in messages" :key="idx">
        <span class="nickname" :class="[ msg.nicknameColor ]">{{ msg.nickname }}</span>: <span class="msg">{{ msg.text }}</span>
      </p>
    </div>
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
      scrollY: 0,
      visibleHeight: 0,
      scrollHeight: 0,
    }
  },
  computed: {
    ...mapState([
      'messages',
    ]),
    sliderStyle() {
      // const scrollY = (this.cacheScrollY !== null) ? this.cacheScrollY : this.scrollY;
      return `transform: translate3d(0, ${this.scrollY}px, 0)`;
    },
  },
  created() {
  },
  mounted() {
    // this.$el.addEventListener('scroll', this.handleScroll.bind(this));
    this.updateSlider();
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        this.scrollToBottom();
      })
    },
  },
  methods: {
    handleScroll(evt) {
      console.log(evt);
      const $el = this.$el;
      // $el.scrollTop = $el.scrollHeight - $el.clientHeight;

      // this.scrollLocked = ($el.scrollHeight - $el.clientHeight !== $el.scrollTop);
    },
    updateSlider() {
      this.visibleHeight = this.$el.clientHeight;
      this.scrollHeight = this.$el.querySelector('.slider').clientHeight;
    },
    scrollToBottom() {
      this.scrollHeight = this.$el.querySelector('.slider').clientHeight;
      if (this.scrollHeight < this.visibleHeight) {
        this.$el.scrollTop = 0;
        // this.scrollY = 0;
      } else {
        this.$el.scrollTop = this.scrollHeight - this.visibleHeight;
        // this.scrollY = this.visibleHeight - this.scrollHeight;
      }
    },
  },
}
</script>
<style scoped>
.chat-list {
  position: absolute;
  right: 100px;
  top: 48px;
  width: 600px;
  height: 800px;
  box-sizing: border-box;
  padding-top: 8px;
  /* background-color: grey; */
  overflow: scroll;
  background-color: rgba(255, 255, 255, 0.1);
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
  line-height: 60px;
  font-size: 36px;
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