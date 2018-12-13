import Vue from 'vue';

const KEYNAME = {
  37: 'LEFT',
  38: 'UP',
  39: 'RIGHT',
  40: 'DOWN',
  49: 'ONE',
  50: 'TWO',
  51: 'THREE',
  52: 'FOUR',
  53: 'FIVE',
  54: 'SIX',
  55: 'SEVEN',
  56: 'EIGHT',
  57: 'NINE',
  48: 'ZERO',
  13: 'ENTER',
}

export default new Vue({
  created() {
    this.onKeydown = this.handleKeydown.bind(this);

    window.addEventListener('keydown', this.onKeydown);
  },
  destroyed() {
    window.removeEventListener('keydown', this.onKeydown);
  },
  methods: {
    handleKeydown(evt) {
      const keyname = KEYNAME[evt.keyCode];
      if (keyname) {
        this.$emit('keydown', keyname);
      }
    },
  },
});