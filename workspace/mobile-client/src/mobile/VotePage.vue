<template>
<div class="vote-popup">
  <div class="wrapper">
    <div class="v-header">
      <div class="title">BEST DRESSED AWARD</div>
      <div class="back" v-on:click="onBackClick"></div>
    </div>
    <div class="v-content">
      <div class="card-row" v-for="(candidate, idx) in candidates" :key="idx">
        <div class="photo" :style="photoStyle">
        </div>
        <div class="bar">
          <div class="name">{{ candidate.name }}</div>
          <div class="btn-heart" v-on:click="onHeartClick(candidate._id)"></div>
          <div class="btn-ballon" :class="{ 'checked': votes.indexOf(candidate._id) >= 0 }" v-on:click="onBallonClick(candidate._id)"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import API from '../services/API/index.js';
import candidate from '../store/modules/candidate.js';

export default {
  data() {
    return {
      heartEnabled: true,
    };
  },
  computed: {
    ...mapState([
      'viewportWidth',
    ]),
    ...mapState('user', {
      userId: (state) => state._id,
      votes: (state) => state.votes,
    }),
    ...mapState('candidate', [
      'candidates',
    ]),
    photoStyle() {
      return `width: ${this.viewportWidth}px; height: ${this.viewportWidth}px;`;
    },
  },
  watch: {
    candidates() {
      this.$nextTick(() => {
        const vw = this.viewportWidth;
        const candidates = this.candidates;
        const $photos = this.$el.querySelectorAll('.photo');

        (async () => {
          for (let i = 0; i < candidates.length; i++) {
            const img = await loadImage(candidates[i].imageUrl);
            const scale = (img.width >= img.height) ? vw / img.height : vw / img.width;
            console.log(scale);
            img.$el.style.position = 'absolute';
            img.$el.style.left = '50%';
            img.$el.style.top = '50%';
            img.$el.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`;

            $photos[i].appendChild(img.$el);
          }
        })();

      });
    },
  },
  created() {
    API.candidate.requestGetAll();
  },
  methods: {
    ...mapActions('mobile', [
      'deactivateVotePage',
    ]),
    onHeartClick(_id) {
      if (this.heartEnabled) {
        this.heartEnabled = false;

        API.candidate.requestLike(_id)
          .then(() => { this.heartEnabled = true; })
          .catch(() => { this.heartEnabled = true; });
      }
    },
    onBallonClick(candidateId) {
      API.user.requestVote(this.userId, { candidateId })
        .then((result) => {
          console.log(result);
        })
    },
    onBackClick() {
      this.deactivateVotePage();
    },
  },
};

function loadImage(url) {
  return new Promise(resolve => {
    const $img = new Image();
    $img.src = url;
    $img.addEventListener('load', () => {
      const nw = $img.naturalWidth;
      const nh = $img.naturalHeight;

      resolve({ $el: $img, width: $img.naturalWidth, height: $img.naturalHeight });
    });
  });
}
</script>
<style scoped>
.vote-popup {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #17141f;
}

.vote-popup .inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.vote-popup .wrapper .v-header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 48px;
  background-color: #201c2b;
  border-bottom: 1px solid #302941;
}

.vote-popup .wrapper .v-header .title {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-align: center;
  color: #edcd6d;
  font-family: 'NotoSans-Bold';
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #f0d78c;
}

.vote-popup .wrapper .v-header .back {
  position: absolute;
  left: 24px;
  top: 12px;
  width: 24px;
  height: 24px;
  background-color: grey;
}

.vote-popup .wrapper .v-content {
  position: absolute;
  left: 0;
  top: 49px;
  width: 100%;
  height: calc(100% - 49px);
  overflow: scroll;
}

.vote-popup .card-row {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);

}

.vote-popup .card-row .photo {
  position: relative;
  overflow: hidden;
  background-color: grey;
}

.vote-popup .card-row .bar {
  position: relative;
  width: 100%;
  height: 64px;
  margin-bottom: 24px;
}

.vote-popup .card-row .name {
  position: absolute;
  top: 16px;
  left: 24px;
  color: rgba(255, 255, 255, 0.8);
}


.vote-popup .card-row .btn-heart {
  position: absolute;
  top: 16px;
  right: 72px;
  background-color: red;
  width: 32px;
  height: 32px;
}

.vote-popup .card-row .btn-ballon {
  position: absolute;
  top: 16px;
  right: 24px;
  background-color: blue;
  width: 32px;
  height: 32px;
  box-sizing: border-box;
}

.vote-popup .card-row .btn-ballon.checked {
  border: 2px solid white;
}
</style>