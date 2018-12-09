import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user.js';
import candidate from './modules/candidate.js';

Vue.use(Vuex)

const $store = window.$store = new Vuex.Store({
  state: {
    // hostname: 'localhost',
    screenWidth: null,
    screenHeight: null,
    viewportWidth: null,
    viewportHeight: null,
    hostname: 'vdux.iptime.org',
    messages: [],
    message: null,
  },
  mutations: {
    addMessage(state, value) {
      const messages = state.messages;
      if (messages.length > 100000) {
        messages.splice(0, 1);
      }

      messages.push(value);

      Vue.set(state, 'messages', messages);
      // Vue.set(state.messages, state.messages.length, value);
      // state.message = value;
    },
    SET_SCREEN_WIDTH(state, value) {
      state.screenWidth = value;
    },
    SET_SCREEN_HEIGHT(state, value) {
      state.screenHeight = value;
    },
    SET_VIEWPORT_WIDTH(state, value) {
      state.viewportWidth = value;
    },
    SET_VIEWPORT_HEIGHT(state, value) {
      state.viewportHeight = value;
    },
  },
  actions: {
    updateScreenSize({ commit }, payload) {
      commit('SET_SCREEN_WIDTH', payload.screenWidth);
      commit('SET_SCREEN_HEIGHT', payload.screenHeight);
      commit('SET_VIEWPORT_WIDTH', payload.viewportWidth);
      commit('SET_VIEWPORT_HEIGHT', payload.viewportHeight);
    }
  },
  modules: {
    user,
    candidate,
  },
})

export default $store;
