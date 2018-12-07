import Vue from 'vue';

import { mapActions } from 'vuex';
import store from '../../store/index.js';

const PREFIX = '[API/User]';

import ApiMixin from './mixin.js';

export default new Vue({
  store,
  mixins: [ ApiMixin ],
  methods: {
    ...mapActions('user', {
      update: 'update',
    }),
    requestCreate() {
      return this.$$put('user')
        .then(data => {
          this.update(data);
          return data;
        });
    },
    requestGetOne(id) {
      return this.$$get(`user/${id}`)
        .then(data => { 
          this.update(data);
          return data;
        });
    },
    requestUpdate(id, payload) {
      return this.$$put(`user/${id}`, payload)
        .then(data => {
          this.update(payload);
          return data;
        });
    },
  },
});
