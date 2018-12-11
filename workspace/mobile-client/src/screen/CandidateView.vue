<template>
<div class="candidate-view" :style="viewStyle">
  <div class="inner">
    <div class="grid">
      <div class="grid-box" v-for="(obj, idx) in candidates" :key="idx">
        <img :src="obj.imageUrl" class="grid-item" />
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex';
import API from '../services/API/index.js';

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('candidate', [
      'candidates',
    ]),
    viewStyle() {
      return `visibility: ${this.active ? 'visible' : 'hidden'};`;
    },
  },
  created() {
    API.candidate.requestGetAll();
  },
};
</script>
<style>
.candidate-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.candidate-view .inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.candidate-view .grid {
  position: absolute;
  left: 54px;
  top: 160px;
  width: 1160px;
  height: 580px;
  /* background-color: grey; */
  display: flex;
  flex-wrap: wrap;
}

.candidate-view .grid .grid-box {
  position: relative;
  padding: 12px;
  width: 290px;
  height: 290px;
  box-sizing: border-box;
}

.candidate-view .grid .grid-item {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: yellow;
}
</style>