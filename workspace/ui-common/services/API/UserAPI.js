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
      updateUser: 'update',
    }),
    ...mapActions('candidate', {
      updateCandidate: 'updateOne',
    }),
    requestCreate() {
      return this.$$put('user')
        .then(data => {
          this.updateUser(data);
          return data;
        });
    },
    requestGetOne(id) {
      return this.$$get(`user/${id}`)
        .then(data => { 
          this.updateUser(data);
          return data;
        });
    },
    requestUpdate(id, payload) {
      return this.$$put(`user/${id}`, payload)
        .then(data => {
          this.updateUser(data);
          return data;
        });
    },
    requestVote(id, payload) {
      return this.$$put(`user/vote/${id}`, payload)
        .then(data => {
          // @todo
          this.updateUser(data.user);
          this.updateCandidate({ candidate: data.candidate });
          return data;
        });
    }
  },
});
