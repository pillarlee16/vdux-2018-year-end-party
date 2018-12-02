<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
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
