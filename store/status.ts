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
  return toRefs(reactive<State>({
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
  async fetchServerInfo({ commit }): Promise<void> {
    await axios.get(backendURL + 'status').then((response) => {
      commit(SET_STATUS, response.data.status);
      commit(SET_VERSION, response.data.version);
    }).catch((err) => {
      commit(SET_STATUS, 'error');
      commit(SET_VERSION, 'error');
    })
  },
};

export const getters = {
  getStatus(state): string{
    if (state.status.value === '') {
      return '';
    }else{
      return state.status;
    }

  },
  getVersion(state): string{
    if (state.version.value === '') {
      return '';
    }else{
      return state.version;
    }
  }
};
