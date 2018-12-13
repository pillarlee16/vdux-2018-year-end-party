import Vue from "vue";

export default {
  namespaced: true,
  state: {
    loginPageActive: true,
    chatPageActive: false,
    votePageActive: false,
  },
  mutations: {
    SET_LOGIN_PAGE_ACTIVE(state, value) {
      state.loginPageActive = value;
    },
    SET_CHAT_PAGE_ACTIVE(state, value) {
      state.chatPageActive = value;
    },
    SET_VOTE_PAGE_ACTIVE(state, value) {
      state.votePageActive = value;
    },
  },
  getters: {

  },
  actions: {
    activateChatPage({ commit }) {
      commit('SET_CHAT_PAGE_ACTIVE', true);
    },
    deactivateChatPage({ commit }) {
      commit('SET_CHAT_PAGE_ACTIVE', false);
    },
    activateVotePage({ commit }) {
      commit('SET_VOTE_PAGE_ACTIVE', true);
    },
    deactivateVotePage({ commit }) {
      commit('SET_VOTE_PAGE_ACTIVE', false);
    },
  },
};
