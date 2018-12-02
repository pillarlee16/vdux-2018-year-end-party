import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const $store = window.$store = new Vuex.Store({
  state: {
    messages: [],
    message: null,
  },
  mutations: {
    addMessage(state, value) {
      const messages = state.messages;
      messages.push(value);

      Vue.set(state, 'messages', messages);
      // Vue.set(state.messages, state.messages.length, value);
      // state.message = value;
    },
  },
  actions: {

  }
})

export default $store;
