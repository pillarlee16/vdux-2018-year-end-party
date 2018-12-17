<template>
  <div class="pickme-view">
    <video src="/videos/pickme.mp4"></video>
  </div>
</template>
<script>
export default {
  methods: {
    run() {
      this.$el.querySelector('video').play();
    },
  },
}
</script>
<style scoped>
.pickme-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.pickme-view video {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  visibility: hidden;
}
</style>