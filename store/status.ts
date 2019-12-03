import axios from 'axios';
import {SET_STATUS} from '~/store/mutationType';

export const state = () => ({
  status: 'test',
});

export const mutations = {
  [SET_STATUS](state, status) {
    console.log('setstatus')
    state.status = status;
  },
};

export const actions = {
  saveStatus({ commit, status }) {
    commit(SET_STATUS, status);
  }
};

export const getters = {
  getStatus(state){
    return state.status
  }
}
