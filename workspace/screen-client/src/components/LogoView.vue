<template>
  <div class="logo-view">
    <img src="/images/logo_vdux.png" :style="imageStyle"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageParam: {
        offsetX: 0,
        offsetY: 1080 - 225,
        width: 400,
        height: 225,
      },
    };
  },
  computed: {
    imageStyle() {
      const param = this.imageParam;
      const style = `left: ${param.offsetX}px; top: ${param.offsetY}px; width: ${param.width}px; height: ${param.height}px;`;

      return style;
    },
  },
}
</script>
<style scoped>
.logo-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.logo-view img {
  position: absolute;
}
</style>