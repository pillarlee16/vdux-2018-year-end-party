import { mapState } from 'vuex';
import axios from 'axios';

const PREFIX = '[API/mixin]';

export default {
  computed: {
    ...mapState([
      'hostname',
    ]),
    // server() { return `http://${this.hostname}/backend`; },
    server() { return `http://${this.hostname}:3006`; },
  },
  methods: {
    $$get(path = '') {
      return new Promise((resolve, reject) => {
        const url = `${this.server}/api/${path}`;
        console.log(PREFIX, 'get', url);
        axios.get(url)
          .then(res => {
            const data = res.data;
            if (data.error) {
              reject(data.error);
              return;
            }

            console.log(PREFIX, 'get', 'success', url, data);
            resolve(data);
          })
      });
    },
    $$post(path = '', payload = null, opt = null) {
      return new Promise((resolve, reject) => {
        const url = `${this.server}/api/${path}`;
        console.log(PREFIX, 'post', url, payload);
        axios.post(url, payload, opt)
          .then(res => {
            const data = res.data;
            if (data.error) {
              reject(data.error);
              return;
            }
            console.log(PREFIX, 'post', 'success', url, payload);
            resolve(data);
          })
      });
    },
    $$put(path = '', payload) {
      return new Promise((resolve, reject) => {
        const url = `${this.server}/api/${path}`;
        console.log(PREFIX, 'put', url, payload);
        axios.put(url, payload)
          .then(res => {
            const data = res.data;
            if (data.error) {
              reject(data.error);
              return;
            }
            console.log(PREFIX, 'put', 'success', url, payload);
            resolve(data);
          })
      });
    },
    $$delete(path = '') {
      return new Promise((resolve, reject) => {
        const url = `${this.server}/api/${path}`;
        console.log(PREFIX, 'delete', url);
        axios.delete(`${this.server}/api/${path}`)
          .then(res => {
            const data = res.data;
            if (data.error) {
              reject(data.error);
              return;
            }
            console.log(PREFIX, 'delete', 'success', url);
            resolve(data);
          })
      });
    },
  },
};