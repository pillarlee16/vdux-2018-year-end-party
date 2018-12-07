import Vue from 'vue';
import axios from 'axios';

import { mapState, mapActions } from 'vuex';
import store from '../store/index.js';

const PREFIX = '[API]';

export default new Vue({
  store,
  computed: {
    ...mapState([
      'hostname',
    ]),
    url() { return `http://${this.hostname}:3006`; },
  },
  created() {
  },
  methods: {
    ...mapActions('user', {
      updateUser: 'update',
    }),
    ...mapActions('admin', {
      updateAllAdmin: 'updateAll',
      updateOneAdmin: 'updateOne',
    }),
    get(url = '') {
      return new Promise((resolve, reject) => {
        axios.get(`${this.url}/api/${url}`)
          .then(res => {
            const data = res.data;
            if (data.error) {
              reject(data.error);
              return;
            }
            resolve(data);
          })
      });
    },
    put(url = '', payload) {
      return new Promise((resolve, reject) => {
        axios.put(`${this.url}/api/${url}`, payload)
          .then(res => {
            const data = res.data;
            if (data.error) {
              reject(data.error);
              return;
            }
            resolve(data);
          })
      });
    },
    delete(url = '') {
      return new Promise((resolve, reject) => {
        axios.delete(`${this.url}/api/${url}`)
          .then(res => {
            const data = res.data;
            if (data.error) {
              reject(data.error);
              return;
            }
            resolve(data);
          })
      });
    },
    requestCreateUser() {
      return new Promise((resolve, reject) => {
        const url = `${this.url}/api/user`;
        console.log(PREFIX, 'requestCreateUser', url);

        axios.get(url)
          .then(res => {
            const data = res.data;
            console.log(PREFIX, 'requestCreateUser', 'data', data);

            if (data.error) {
              console.error(PREFIX, 'requestCreateUser', 'error', data.error);
              reject(data.error);
              return;
            }

            this.updateUser(data);
            resolve(data);
          });
      });
    },
    requestGetUser(id) {
      return new Promise((resolve, reject) => {
        const url = `${this.url}/api/user/${id}`;
        console.log(PREFIX, 'requestGetUser', url);
        
        axios.get(url)
          .then(res => {
            const data = res.data;
            console.log(PREFIX, 'requestGetUser', 'data', data);

            if (data.error) {
              console.error(PREFIX, 'requestGetUser', 'error', data.error);
              reject(data.error);
              return;
            }

            this.updateUser(data);
            resolve(data);
          })
      });
    },
    requestUpdateUser(payload) {
      return new Promise((resolve, reject) => {
        const url = `${this.url}/api/user`;
        console.log(PREFIX, 'requestUpdateUser', url, payload);

        axios.put(url, payload)
          .then(res => {
            const data = res.data;
            console.log(PREFIX, 'requestUpdateUser', data);

            if (data.error) {
              console.error(PREFIX, 'requestUpdateUser', 'error', data.error);
              reject(data.error);
              return;
            }

            this.updateUser(payload);
            resolve(payload);
          });
      });
    },
    requestCreateCandidate() {
      return this.get('candidate/create')
        .then(data => {
          this.updateOneAdmin({ candidate: data });
        });
    },
    requestGetAllCandidate() {
      return this.get('candidate')
        .then(data => {
          console.log('requestGetAllCandidate', data);
          this.updateAllAdmin({ candidates: data });
        });
    },
    requestDeleteCandidate(_id) {
      return this.delete(`candidate/${_id}`)
        .then(data => {
          console.log('!!!!!!!!');
        });
    },
  },
});