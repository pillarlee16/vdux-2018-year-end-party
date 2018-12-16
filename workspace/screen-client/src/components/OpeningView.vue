<template>
  <div class="opening-view" :style="viewStyle">
    <div class="inner">
      <div class="layer layer3">
        <video src="/videos/the_great_gatsby.mp4"></video>
        <div class="box"></div>
      </div>
      <div class="layer layer2">
        <div class="title">2018<br/>THE GREAT<br/>VDUX</div>
      </div>
      <div class="layer layer1">
        <div class="youtube"></div>
        <div class="name">JooTube</div>
      </div>
    </div>
  </div>
</template>
<script>
import { TweenMax, Power2 } from 'gsap';

import Keyboard from 'ui-common/services/Keyboard.js';

export default {
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    viewStyle() {
      return `visibility: ${this.visible ? 'visible' : 'hidden'};`;
    },
  },
  mounted() {
    const $layer1 = this.$layer1 = this.$el.querySelector('.layer1');
    const $layer2 = this.$layer2 = this.$el.querySelector('.layer2');
    const $layer3 = this.$layer3 = this.$el.querySelector('.layer3');

    TweenMax.set([$layer1, $layer2, $layer3], { opacity: 0 });
  },
  created() {
    Keyboard.$on('keydown', this.handleKey);
  },
  destroyed() {
    Keyboard.$off('keydown', this.handleKey);
  },
  methods: {
    handleKey(key) {
      switch (key) {
        case 'ENTER':
          this.run();    
          break;
      }
    },
    run() {
      this.visible = true;
      this.step1()
        .then(this.step2)
        .then(() => { this.visible = false; });

    },
    step1() {
      return new Promise((resolve) => {
        const $layer1 = this.$layer1;
        const $youtube = $layer1.querySelector('.youtube');
        const $name = $layer1.querySelector('.name');
  
        TweenMax.set([$youtube, $name], { opacity: 0 });
        TweenMax.set($layer1, { opacity: 1 });
  
        TweenMax.fromTo($youtube, 0.6, { opacity: 0, y: 20,}, { opacity: 1, y: 0, scale: 1, ease: Power2.easeOut });
        TweenMax.fromTo($name, 0.6, { opacity: 0, y: 20 }, { opacity: 1, y: 0, scale: 1, ease: Power2.easeOut, delay: 0.3 });
        TweenMax.to($layer1, 0.5, { opacity: 0, delay: 1.5, onComplete: resolve });
      });
    },
    step2() {
      return new Promise((resolve) => {
        const $layer3 = this.$layer3;
        TweenMax.set($layer3, { opacity: 1 });
        const $video = $layer3.querySelector('video');
        $video.play();

        const $layer2 = this.$layer2;
        TweenMax.fromTo($layer2, 18, { opacity: 1, scale: 0 }, { opacity: 1, scale: 1, delay: 7 });

        TweenMax.to($layer2, 1, { opacity: 0, delay: 26, onComplete: resolve });
      });
    },
  },
}
</script>
<style scoped>
.opening-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 1920px;
  height: 1080px;
  background-color: black;
}

.opening-view .inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.opening-view .layer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.opening-view video {
  position: absolute;
  width: 1920px;
  height: 800px;
}

.opening-view .box{
  position: absolute;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background-color: rgb(1, 1, 1);
  transform: translate3d(10px, 30px, 0);
  pointer-events: none;

}

.opening-view .title {
  position: absolute;
  transform: translate3d(0, 30px, 0);
  width: 100%;
  text-align: center;
  font-size: 100px;
  color: #edcd6d;
  font-family: 'NotoSans-Bold';
  -webkit-text-stroke-width: 5px;
  -webkit-text-stroke-color: #f0d78c;
  pointer-events: none;
  line-height: 110px;

}

.opening-view .youtube {
  position: relative;
  width: 200px;
  height: 141px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url('/images/icon_youtube.png');
  margin-right: 60px;
}

.opening-view .name {
  position: relative;
  font-size: 100px;
  color: white;
  font-family: 'NotoSans-Bold';
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: rgb(200, 200, 200);
  transform: translate3d(0, -6px, 0);
}

</style>