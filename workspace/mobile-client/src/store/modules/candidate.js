import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    candidates: [],
  },
  mutations: {
    SET_CANDIDATE(state, payload) {
      Vue.set(state.candidates, payload.index, payload.value);
    },
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
        commit('SET_CANDIDATE', { index, value: updated });  
      } else {
        commit('SET_CANDIDATE', { index: candidates.length, value: updated });
      }
    },
    updateAll({ commit }, payload) {
      if (payload.candidates) {
        commit('SET_CANDIDATES', payload.candidates);
      }
    },
    delete({ state, commit }, payload) {
      const candidates = state.candidates;
      const matched = candidates.find(obj => { return obj._id === payload._id; });

      if (matched) {
        const index = candidates.indexOf(matched);
        candidates.splice(index, 1);
        commit('SET_CANDIDATES', candidates);
      }
    },
  },
}