<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
import index from './components/index.vue';

import { mapActions } from 'vuex';

export default {
  name: 'app',
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
  },
  methods: {
    ...mapActions([
      'updateScreenSize',
    ]),
    onResize() {
      this.updateScreenSize({
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      });
    },
  },
  components: {
    index,
  }
}
</script>

<style>
#app {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
}

@font-face {
  font-family: 'NotoSans-Bold';
  src: url('/fonts/NotoSans-Bold.ttf');
}

@font-face {
  font-family: 'NotoSans-BoldItalic';
  src: url('/fonts/NotoSans-BoldItalic.ttf');
}

@font-face {
  font-family: 'NotoSans-Italic';
  src: url('/fonts/NotoSans-Italic.ttf');
}

@font-face {
  font-family: 'NotoSans-Regular';
  src: url('/fonts/NotoSans-Regular.ttf');
}

.noto-bold { font-family: 'NotoSans-Bold' }
.noto-bolditalic { font-family: 'NotoSans-BoldItalic' }
.noto-italic { font-family: 'NotoSans-Italic' }
.noto-regular { font-family: 'NotoSans-Regular' }


* {
  font-family: 'NotoSans-Regular';
  padding: 0;
  margin: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
