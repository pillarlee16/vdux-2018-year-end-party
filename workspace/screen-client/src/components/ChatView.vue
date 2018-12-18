<template>
  <div class="chat-view">
    <div class="chat-list">
      <div class="slider" :style="sliderStyle">
        <transition-group name="show">
          <div class="chat-box" v-for="(msg, idx) in messages" :key="idx">
            <div class="chat-box-inner">
              <span class="nickname" :class="[ msg.nicknameColor ]">{{ msg.nickname }}</span>: <span class="msg">{{ msg.text }}</span>
            </div>
          </div>
        </transition-group>
      </div>
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
    this.$list = this.$el.querySelector('.chat-list');
    this.$slider = this.$el.querySelector('.slider');

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
    updateSlider() {
      this.visibleHeight = this.$list.clientHeight;
      this.scrollHeight = this.$slider.clientHeight;
    },
    scrollToBottom() {
      this.scrollHeight = this.$slider.clientHeight;
      if (this.scrollHeight < this.visibleHeight) {
        this.$list.scrollTop = 0;
      } else {
        this.$list.scrollTop = this.scrollHeight - this.visibleHeight;
      }
    },
  },
}
</script>
<style scoped>
.chat-view {
  position: absolute;
  right: 54px;
  top: 48px;
  width: 402px;
  height: 536px;
  /* overflow: scroll; */
  overflow: hidden;
}

.chat-view .chat-list {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.chat-view .chat-list::-webkit-scrollbar {
  display: none;
}


.chat-view .chat-box {
  position: relative;
  width: 100%;
  margin-top: 12px;
}

.chat-view .chat-box:first-child {
  margin-top: 0;
}

.chat-view .chat-box-inner {
  position: relative;
  width: 100%;
  padding-left: 16px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 16px;
  line-height: 60px;
  font-size: 36px;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(60, 60, 60, 0.7);
  border-radius: 12px;
  box-sizing: border-box;
  word-break: break-all;
}

.chat-view .chat-box .nickname {
  font-family: 'NotoSans-Bold';
  opacity: 0.85;
}

.show-enter {
  opacity: 0;
}
.show-enter-to {
  opacity: 1;
}
.show-enter-active {
  transition: opacity 0.3s ease-out;
}


.show-enter .chat-box-inner {
  transform: translateY(30px);
}

.show-enter-to .chat-box-inner {
  transform: translateY(0px);
}

.show-enter-active .chat-box-inner {
  transition: transform 0.3s ease-out;
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
.bluegrey { color: #455A64; }
</style>