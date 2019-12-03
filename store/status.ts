import axios from 'axios';
import {SET_STATUS, SET_VERSION} from '~/store/mutationType';

const backendURL = 'https://ebook-homebrew.herokuapp.com/';

type State = {
  status: string;
  version: string;
}

export const state = (): State => ({
  status: 'unknown',
  version: 'unknown',
});

export const mutations = {
  [SET_STATUS](state: State, status: string) {
    console.log('setStatus: ' + status);
    state.status = status;
  },
  [SET_VERSION](state: State, version: string) {
    console.log('setVersion: ' + version);
    state.version = version;
  },
};

export const actions = {
  async fetchServerInfo({ commit }) {
    try{
      const res = await axios.get(backendURL + 'status');
      commit(SET_STATUS, res.data.status);
      commit(SET_VERSION, res.data.version);
    } catch (e) {
      commit(SET_STATUS, 'error');
      commit(SET_VERSION, 'error');
    }
  },
};

export const getters = {
  getStatus (state: State): string{
    return state.status
  },
  getVersion (state: State): string{
    return state.version
  }
};
