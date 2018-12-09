import Vue from "vue";

export default {
  namespaced: true,
  state: {
    _id: null,
    nickname: null,
    nicknameColor: null,
    dressVote: null,
    donation: null,
    votes: null,
  },
  mutations: {
    SET_ID(state, value) {
      state._id = value;
    },
    SET_NICKNAME(state, value) {
      state.nickname = value;
    },
    SET_NICKNAME_COLOR(state, value) {
      state.nicknameColor = value;
    },
    SET_DRESS_VOTE(state, value) {
      state.dressVote = value;
    },
    SET_DONATION(state, value) {
      state.donation = value;
    },
    SET_VOTES(state, value) {
      Vue.set(state, 'votes', value);
      // state.votes = value;
    },
  },
  getters: {

  },
  actions: {
    update({ commit }, payload) {
      if (!payload) return;
      if (payload._id) commit('SET_ID', payload._id);
      if (payload.nickname) commit('SET_NICKNAME', payload.nickname);
      if (payload.nicknameColor) commit('SET_NICKNAME_COLOR', payload.nicknameColor);
      if (payload.dressVote) commit('SET_DRESS_VOTE', payload.dressVote);
      if (payload.donation) commit('SET_DONATION', payload.donation);
      if (payload.votes) commit('SET_VOTES', payload.votes);
    },
  },
};
