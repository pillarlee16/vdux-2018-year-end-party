import Vue from 'vue';

import { mapActions } from 'vuex';
import store from '../../store/index.js';

const PREFIX = '[API/Candidate]';

import ApiMixin from './mixin.js';

export default new Vue({
  store,
  mixins: [ ApiMixin ],
  methods: {
    ...mapActions('admin', [
      'updateOne',
      'updateAll',
      'delete',
    ]),
    requestCreate() {
      return this.$$put('candidate')
        .then(data => {
          this.updateOne({ candidate: data });
          return data;
        });
    },
    requestGetAll() {
      return this.$$get(`candidate`)
        .then(data => { 
          this.updateAll({ candidates: data });
          return data;
        });
    },
    requestUpdate(id, payload) {
      return this.$$put(`candidate/${id}`, payload)
        .then(data => {
          // this.update(payload);
          return data;
        });
    },
    requestDelete(id) {
      return this.$$delete(`candidate/${id}`)
        .then(data => {
          console.log(data);
          this.delete({ _id: data._id });
          return data;
        });
    },
  },
});
