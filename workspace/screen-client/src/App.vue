<template>
  <div id="app">
    <camera-view></camera-view>
  </div>
</template>

<script>
import CameraView from './components/CameraView.vue'

export default {
  name: 'app',
  components: {
    CameraView
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
}
</style>
