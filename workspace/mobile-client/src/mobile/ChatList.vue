<template>
  <div class="chat-list" :style="wrapStyle">
    <div class="viewport">
      <div class="slider">
        <p v-for="(msg, idx) in messages" :key="idx">
          <span class="nickname" :class="[ msg.nicknameColor ]">{{ msg.nickname }}</span>: <span class="msg">{{ msg.text }}</span>
        </p>
      </div>
    </div>
    <div class="noti" v-if="shownNoti" v-on:click="scrollToBottom">메시지를 더 확인하려면 여기를 탭하세요</div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

const PREFIX = '[mobile/ChatList]';

export default {
  data() {
    return {
      visibleHeight: 0,
      scrollHeight: 0,
      scrollEnd: 0,
      scrollTop: 0,
    }
  },
  computed: {
    ...mapState([
      'messages',
      'viewportHeight',
    ]),
    wrapStyle() {
      return `height: ${this.viewportHeight - 52 - 48}px;`;
    },
    shownNoti() {
      return this.scrollTop < (this.scrollEnd - 1);
    },
  },
  mounted() {
    const $viewport = this.$viewport = this.$el.querySelector('.viewport');
    const $slider = this.$slider = this.$el.querySelector('.slider');

    this.onScroll = onScroll.bind(this);
    
    $viewport.addEventListener('scroll', this.onScroll);

    this.updateSlider();
    this.scrollToBottom();
  },
  beforeDestroy() {
    this.$viewport.removeEventListener('scroll', this.onScroll);
  },
  watch: {
    viewportHeight() {
      this.$nextTick(() => {
        this.updateSlider();
        this.scrollToBottom();
      });
    },
    messages() {
      const scrollEnd = this.scrollEnd;
      const scrollTop = this.scrollTop;

      let scrollFlag = false;

      const last = this.messages[this.messages.length - 1];
      if ((last && last.from === 'me') || (scrollTop >= scrollEnd)) {
        scrollFlag = true;
      }

      this.$nextTick(() => {
        if (scrollFlag) {
          this.scrollToBottom();
        }
      });
    },
  },
  methods: {
    updateSlider() {
      this.visibleHeight = this.$el.clientHeight;
      this.scrollHeight = this.$el.querySelector('.slider').clientHeight;
      this.scrollEnd = this.scrollHeight - this.visibleHeight;

      console.log(PREFIX, 'updateSlider', 'visibleHeight', this.visibleHeight, 'scrollHeight', this.scrollHeight);
    },
    scrollToBottom() {
      console.log(PREFIX, 'scrollToBottom', this.$el.scrollTop, this.scrollHeight, this.visibleHeight);
      this.scrollHeight = this.$slider.clientHeight;
      this.scrollEnd = this.scrollHeight - this.visibleHeight;

      if (this.scrollHeight < this.visibleHeight) {
        this.$viewport.scrollTop = this.scrollTop = 0;
      } else {
        this.$viewport.scrollTop = this.scrollTop = this.scrollEnd;
      }

      console.log(PREFIX, 'scrollToBottom', 'updated', this.$viewport.scrollTop);
    },
  },
}

function onScroll(evt) {
  this.scrollTop = this.$viewport.scrollTop;  
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
  /* overflow: scroll; */
  overflow: hidden;
}

.chat-list .viewport {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
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

.chat-list .noti {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  line-height: 40px;
  text-align: center;
  color: white;
  box-sizing: border-box;
  border: 4px solid #edcd6d;
  background-color: rgba(32, 28, 43, 0.8);
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