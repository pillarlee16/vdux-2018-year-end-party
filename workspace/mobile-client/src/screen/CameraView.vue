<template>
  <div class="camera-view" :style="viewStyle">
    <video autoplay></video>
  </div>
</template>
<script>
export default {
  data() {
    return {
      offsetX: 100,
      offsetY: 100,
      width: 400,
      height: 300,
    };
  },
  computed: {
    viewStyle() { return `left: ${this.offsetX}px; top: ${this.offsetY}px; width: ${this.width}px; height: ${this.height}px;` },
  },
  created() {
  },
  mounted() {
    const ctx = this;
    const $video = this.$el.querySelector('video');

    (async function () {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        $video.srcObject = stream;
      } catch(err) {
        console.log(err);
      }
    })();
  },
}
</script>
<style scoped>
.camera-view {
  position: absolute;
  /* left: 0;
  top: 0;
  width: 400px;
  height: 300px; */
  background-color: rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
  border: 3px solid white;
  background-image: url('/images/icon_camera.png')
}

.camera-view video {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>