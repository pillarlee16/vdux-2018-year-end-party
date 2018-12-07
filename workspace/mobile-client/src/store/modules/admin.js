import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    candidates: [],
  },
  mutations: {
    SET_CANDIDATES(state, value) {
      Vue.set(state, 'candidates', value);
    },
  },
  actions: {
    updateOne({ state, commit }, payload) {
      const candidates = state.candidates;
      const updated = payload.candidate;
      const matched = candidates.find(obj => {
        return obj._id === updated._id;
      });

      if (matched) {
        const index = candidates.indexOf(matched);
        candidates[index] = updated;
      } else {
        candidates.push(updated);
      }
      commit('SET_CANDIDATES', candidates);
    },
    updateAll({ commit }, payload) {
      if (payload.candidates) {
        commit('SET_CANDIDATES', payload.candidates);
      }
    },
  },
}