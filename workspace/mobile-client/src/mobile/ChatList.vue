<template>
  <div class="chat-list" :style="wrapStyle">
    <div class="slider" :style="sliderStyle">
      <p v-for="(msg, idx) in messages" :key="idx">
        <span class="nickname" :class="[ msg.nicknameColor ]">{{ msg.nickname }}</span>: <span class="msg">{{ msg.text }}</span>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { styler, listen, pointer, decay, value } from 'popmotion';

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

const PREFIX = '[mobile/ChatList]';

export default {
  data() {
    return {
      scrollLocked: false,
      scrollY: 0,
      cacheScrollY: null,

      visibleHeight: 0,
      scrollHeight: 0,

      touchY: null,
    }
  },
  computed: {
    ...mapState([
      'messages',
      'viewportHeight',
    ]),
    sliderStyle() {
      // const scrollY = (this.cacheScrollY !== null) ? this.cacheScrollY : this.scrollY;
      return `transform: translate3d(0, ${this.scrollY}px, 0)`;
    },
    wrapStyle() {
      return `height: ${this.viewportHeight - 52 - 48}px;`;
    },
  },
  created() {
  },
  mounted() {
    const $wrap = this.$el;

    this.onMousedown = onMousedown.bind(this);
    this.onMousemove = onMousemove.bind(this);
    this.onMouseup = onMouseup.bind(this);
    this.onTouchstart = onTouchstart.bind(this);
    this.onTouchmove = onTouchmove.bind(this);
    this.onTouchend = onTouchend.bind(this);

    if (!hasTouchSupport()) {
      $wrap.addEventListener('mousedown', this.onMousedown);
      document.addEventListener('mousemove', this.onMousemove);
      document.addEventListener('mouseup', this.onMouseup);
    }

    $wrap.addEventListener('touchstart', this.onTouchstart);
    document.addEventListener('touchmove', this.onTouchmove);
    document.addEventListener('touchend', this.onTouchend);

    this.updateSlider();
  },
  beforeDestroy() {
    const $wrap = this.$el;

    if (!hasTouchSupport()) {
      $wrap.removeEventListener('mousedown', this.onMousedown);
      document.removeEventListener('mousemove', this.onMousemove);
      document.removeEventListener('mouseup', this.onMouseup);
    }
      

    $wrap.removeEventListener('touchstart', this.onTouchstart);
    document.removeEventListener('touchmove', this.onTouchmove);
    document.removeEventListener('touchend', this.onTouchend);
  },
  watch: {
    viewportHeight() {
      this.$nextTick(() => {
        this.updateSlider();
        this.scrollToBottom();
      });
    },
    messages() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
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
    },
  },
  methods: {
    touchStart(y) {
      console.log(PREFIX, 'touchStart', y);

      this.cacheScrollY = this.scrollY;
      this.touchY = y;

      console.log(this.cacheScrollY, this.touchY);
    },
    touchMove(y) {
      if (this.touchY === null) return;

      const delta = y - this.touchY;

      if (this.scrollHeight < this.visibleHeight) {
        this.scrollY = 0;
      } else {
        this.scrollY = this.cacheScrollY + delta;
        this.scrollY = Math.min(this.scrollY, 0);
        this.scrollY = Math.max(this.scrollY, this.visibleHeight - this.scrollHeight);
      }

      // this.scrollY = this.cacheScrollY + delta;
      // if (this.scrollY > 0) {
      //   this.scrollY = 0;
      // } else {
      //   if (this.scrollHeight > this.visibleHeight) {
      //     this.scrollY = Math.max(this.scrollY, this.visibleHeight - this.scrollHeight);
      //   }
      // }
      // this.scrollY = Math.min(this.scrollY, 0);
      // this.scrollY = Math.max(this.scrollY, this.visibleHeight - this.scrollHeight);
      console.log(this.cacheScrollY, y, this.touchY, delta);
      console.log(PREFIX, 'touchMove', y, delta, this.scrollY);
    },
    touchEnd() {
      console.log(PREFIX, 'touchEnd');

      this.cacheScrollY = null;
      this.touchY = null;
    },
    updateSlider() {
      this.visibleHeight = this.$el.clientHeight;
      this.scrollHeight = this.$el.querySelector('.slider').clientHeight;

      console.log(PREFIX, 'updateSlider', 'visibleHeight', this.visibleHeight, 'scrollHeight', this.scrollHeight);
    },
    handleScroll(evt) {
      console.log(evt);
      const $el = this.$el;
      // $el.scrollTop = $el.scrollHeight - $el.clientHeight;

      // this.scrollLocked = ($el.scrollHeight - $el.clientHeight !== $el.scrollTop);
    },
    scrollToBottom() {
      this.scrollHeight = this.$el.querySelector('.slider').clientHeight;
      if (this.scrollHeight < this.visibleHeight) {
        this.scrollY = 0;
      } else {
        this.scrollY = this.visibleHeight - this.scrollHeight;
      }

      // const y = Math.max(this.scrollHeight - this.visibleHeight, 0);
      // const y = Math.min(this.visibleHeight - this.scrollHeight, 0);
      // // this.sliderY.set(y);

      // this.sliderY = value(y, this.sliderStyler.set('y'))
      // this.sliderStyler.set({ y });
      // this.sliderStyler.render();
    },
  },
}

function onMousedown(evt) {
  this.touchStart(evt.clientY);
}

function onMousemove(evt) {
  this.touchMove(evt.clientY);
}

function onMouseup(evt) {
  this.touchEnd();
}

function onTouchstart(evt) {
  this.touchStart(evt.touches[0].clientY);
}

function onTouchmove(evt) {
  this.touchMove(evt.touches[0].clientY);
}

function onTouchend(evt) {
  this.touchEnd();
}

function hasTouchSupport() {
  return ("ontouchstart" in window) || // touch events
          (window.Modernizr && window.Modernizr.touch) || // modernizr
          (navigator.msMaxTouchPoints || navigator.maxTouchPoints) > 2; // pointer events
}


</script>
<style scoped>
.chat-list {
  position: absolute;
  left: 0;
  top: 48px;
  width: 100%;
  /* height: calc(100% - 52px - 48px); */
  box-sizing: border-box;
  /* background-color: grey; */
  overflow: hidden;
}

.chat-list .slider {
  position: absolute;
  left: 0;
  top: 0;
  user-select: none; 
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