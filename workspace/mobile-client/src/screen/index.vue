<template>
  <div id="screen-app">
    <camera-view></camera-view>
  </div>
</template>

<script>
import CameraView from './CameraView.vue';

export default {
  components: {
    CameraView,
  }
}
</script>

<style>
#screen-app {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
}
</style>
