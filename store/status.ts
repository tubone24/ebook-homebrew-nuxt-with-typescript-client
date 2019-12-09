import axios from 'axios';
import {SET_STATUS, SET_VERSION} from '~/store/mutationType';
import State from '@/types/index';
import {
  reactive,
  Ref,
  toRefs,
} from '@vue/composition-api';

const backendURL = 'https://ebook-homebrew.herokuapp.com/';

declare type Refs<Data> = {
  [K in keyof Data]: Data[K] extends Ref<infer V> ? Ref<V> : Ref<Data[K]>;
};


export const state = ():Refs<State> => {
  return toRefs(reactive<{
    status: string;
    version: string;
  }>({
    status: '',
    version: '',
  }))
};

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
  async fetchServerInfo({ commit }): Promise<State> {
    try{
      const res = await axios.get(backendURL + 'status');
      commit(SET_STATUS, res.data.status);
      commit(SET_VERSION, res.data.version);
      return {status: res.data.status, version: res.data.version};
    } catch (e) {
      commit(SET_STATUS, 'error');
      commit(SET_VERSION, 'error');
      return {status: 'error', version: 'error'};
    }
  },
};

export const getters = {
  getStatus(state: State): string{
    return state.status;
  },
  getVersion(state: State): string{
    return state.version;
  }
};
