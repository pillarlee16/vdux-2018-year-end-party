<template>
<div class="like-view">
</div>
</template>
<script>
import ChatService from 'ui-common/services/ChatService.js';
import Keyboard from 'ui-common/services/Keyboard.js';

import { TweenMax } from 'gsap';

export default {
  created() {
    ChatService.$on('like', this.onLike);
    ChatService.$on('vote', this.onVote);
    ChatService.$on('thumb', this.onThumb);
    Keyboard.$on('keydown', this.onKeydown);
  },
  destroyed() {
    ChatService.$off('like', this.onLike);
    ChatService.$off('vote', this.onVote);
    ChatService.$off('thumb', this.onThumb);
    Keyboard.$off('keydown', this.onKeydown);
  },
  methods: {
    onLike(data) {

      const $el = this.$el;
      const boundary = $el.getBoundingClientRect();
      console.log(boundary);

      const $heart = document.createElement('div');
      const offsetX = boundary.left + (boundary.left + boundary.width) * Math.random();
      const offsetY = boundary.top + (boundary.top + boundary.height) * Math.random();

      $heart.style.cssText = `
        position: absolute;
        left: ${offsetX}px;
        top: ${offsetY}px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.8);
        box-sizing: border-box;
        overflow: hidden;
        border: 2px solid rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform-origin: top;
      `;
      const $img = document.createElement('img');
      $img.src = '/images/heart-56-76703.png';
      $img.style.cssText = `
        position: relative;
        width: 100%;
        height: 100%;
      `
      $heart.appendChild($img);

      $el.appendChild($heart);

      TweenMax.fromTo(
        $heart,
        0.6,
        { y: 30, opacity: 0, scale: 0.5 },
        { y: -30, opacity: 1, scale: 1, ease: Power2.easeOut, onComplete: () => {
          TweenMax.to($heart, 0.3, { opacity: 0, scale: 0, delay: 0.1, onComplete: () => {
            $heart.remove();
          }});
        }}
      );
      console.log('LikeView', data);
    },
    onVote(data) {
      console.log('onVote', data);

      const $el = this.$el;
      const boundary = $el.getBoundingClientRect();

      const $ballon = document.createElement('div');
      const offsetX = boundary.left + (boundary.left + boundary.width) * Math.random();
      const offsetY = boundary.top + (boundary.top + boundary.height) * Math.random();

      $ballon.style.cssText = `
        position: absolute;
        left: ${offsetX}px;
        top: ${offsetY}px;
        width: 240px;
        height: 200px;
        box-sizing: border-box;
        overflow: hidden;
        opacity: 0;
        transform-origin: top;
      `;

      const images = ['one_ballon.png', 'two_ballons.png', 'three_ballons.png'];
      const imageName = images[Math.floor(Math.random() * 3)];
      const $img = document.createElement('img');
      $img.src = `/images/${imageName}`;
      $img.style.cssText = `
        position: relative;
        width: 100%;
        height: 100%;
      `
      $ballon.appendChild($img);
      $el.appendChild($ballon);

      TweenMax.fromTo(
        $ballon,
        0.6,
        { y: 30, opacity: 0, scale: 0.5 },
        { y: -30, opacity: 1, scale: 1, ease: Power2.easeOut, onComplete: () => {
          TweenMax.to($ballon, 0.3, { opacity: 0, scale: 0, delay: 0.1, onComplete: () => {
            $ballon.remove();
          }});
        }}
      );
    },
    onThumb() {
      console.log('onThumb');

      const $el = this.$el;
      const boundary = $el.getBoundingClientRect();

      const $thumb = document.createElement('div');
      const offsetX = boundary.left + (boundary.left + boundary.width) * Math.random();
      const offsetY = boundary.top + (boundary.top + boundary.height) * Math.random();

      $thumb.style.cssText = `
        position: absolute;
        left: ${offsetX}px;
        top: ${offsetY}px;
        width: 84px;
        height: 80px;
        box-sizing: border-box;
        overflow: hidden;
        opacity: 0;
        transform-origin: top;
      `;

      const $img = document.createElement('img');
      $img.src = `/images/icon_thumb.png`;
      $img.style.cssText = `
        position: relative;
        width: 100%;
        height: 100%;
      `
      $thumb.appendChild($img);
      $el.appendChild($thumb);

      TweenMax.fromTo(
        $thumb,
        0.6,
        { y: 30, opacity: 0, scale: 0.5 },
        { y: -30, opacity: 0.8, scale: 1, ease: Power2.easeOut, onComplete: () => {
          TweenMax.to($thumb, 0.3, { opacity: 0, scale: 0, delay: 0.1, onComplete: () => {
            $thumb.remove();
          }});
        }}
      );
    },
    onKeydown(key) {
      console.log(key);
      switch (key) {
        case 'EIGHT':
          this.onThumb();
          break;
        case 'NINE':
          this.onLike();
          break;
        case 'ZERO':
          this.onVote();
          break;
      }
    }
  },
};
</script>
<style>
.like-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>