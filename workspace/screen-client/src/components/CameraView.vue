<template>
  <div class="camera-view">
    <video autoplay :style="videoStyle"></video>
    <img src="/images/logo_vdux.png" :style="imageStyle"/>
  </div>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'video',
    },
  },
  data() {
    return {
      videoParam: {
        offsetX: 54,
        offsetY: 105,
        width: 1160,
        height: 870,
  
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
      imageParam: {
        offsetX: 0,
        offsetY: 1080 - 225,
        width: 400,
        height: 225,
      },
    };
  },
  computed: {
    videoStyle() {
      const param = this.videoParam;
      let style = `left: ${param.offsetX}px; top: ${param.offsetY}px; width: ${param.width}px; height: ${param.height}px;`;
      style = style + ((this.mode === 'video') ? 'visibility: visible;' : 'visibility: hidden;');

      return style;
    },
    imageStyle() {
      const param = this.imageParam;
      let style = `left: ${param.offsetX}px; top: ${param.offsetY}px; width: ${param.width}px; height: ${param.height}px;`;
      style = style + ((this.mode === 'image') ? 'visibility: visible;' : 'visibility: hidden;');

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
  /* border: 3px solid white; */
  /* background-image: url('/images/icon_camera.png') */
}

.camera-view img {
  position: absolute;
  /* background-color: yellow; */
}
</style>