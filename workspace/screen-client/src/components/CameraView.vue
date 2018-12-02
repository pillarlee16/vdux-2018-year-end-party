<template>
  <div class="camera-view">
    <video autoplay></video>
  </div>
</template>
<script>
export default {
  created() {
  },
  mounted() {
    const ctx = this;
    const $video = this.$el.querySelector('video');

    (async function () {

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      $video.srcObject = stream;
    })();
  },
}
</script>
<style>
.camera-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 400px;
  height: 300px;
}
</style>