<template>
  <div class="camera-view">
    <video autoplay :style="videoStyle"></video>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoParam: {
        offsetX: 54,
        offsetY: 105,
        width: 1160 * 0.67,
        height: 870 * 0.67,
  
        // offsetX: (1920 - 1440 * 0.9) / 2,
        // offsetY: (1080 - 1080 * 0.9) / 2,
        // width: 1440 * 0.9,
        // height: 1080 * 0.9,
  
        // offsetX: (1920 - 1440) / 2,
        // offsetY: 0,
        // width: 1440,
        // height: 1080,
  
        // offsetX: 0,
        // offsetY: 0,
        // width: 1440,
        // height: 1080,
      },
    };
  },
  computed: {
    videoStyle() {
      const param = this.videoParam;
      const style = `left: ${param.offsetX}px; top: ${param.offsetY}px; width: ${param.width}px; height: ${param.height}px;`;

      return style;
    },
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
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.camera-view video {
  position: absolute;
  /* background-color: rgba(255, 255, 255, 0.8); */
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.8);;
  /* background-image: url('/images/icon_camera.png') */
}
</style>