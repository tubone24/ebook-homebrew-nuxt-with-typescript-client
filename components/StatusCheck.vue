<template>
  <div id="status">
    <b-button id="get-status" type="is-primary" @click="fetchStatus(store)">Get Status NOW</b-button>
    <p>ServerStatus: <b>{{ state.status }}</b></p>
    <p>ServerVersion: <b>{{ state.version }}</b></p>
  </div>
</template>

<script lang="ts">
  import {
    createComponent,
    reactive,
    onBeforeMount,
    onUpdated,
    onMounted,
    computed,
    watch,
    ref
  } from '@vue/composition-api';
  import axios from 'axios';

  const backendURL = 'https://ebook-homebrew.herokuapp.com/';

  type Props = {
    propHello: string;
  };

  const fetchStatus = async (store) => {
    // Use Mutation
    //
    // try{
    //   const res = await axios.get(backendURL + 'status');
    //   console.log(res.data.status);
    //   store.commit('status/setStatus', res.data.status);
    // } catch (e) {
    //   store.commit('status/setStatus', 'error');
    // }

    //Or Action
    //
    const res = await store.dispatch('status/fetchServerInfo');

    //Action can return response, so that can receive values and set state.
    state.status = res.status;
    state.version = res.version;

  };

  // data
  const state = reactive<{
    status: string;
    version: string;
  }>({
    status: '',
    version: '',
  });

  export default createComponent({
    props: {
      propHello: {
        type: String
      }
    },

    setup (props: Props, { root }) {
      // props
      const propsHello = props.propHello;

      const store = root.$store;

      //methods
      onBeforeMount( async () => {
        await fetchStatus(store);
      });
      onUpdated( async () => {
        await fetchStatus(store);
      });

      //state with store
      // getter
      //
      // const status = ref<string>((computed( () => store.getters['status/getStatus'])).value);
      // const version = ref<string>((computed( () => store.getters['status/getVersion'])).value);


      return {
        fetchStatus,
        store,
        state,
        propsHello,
      };
    }
  });
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  #status {
    margin: 0 auto;
    font-size: 48px;
  }

  #get-status {
    width: 280px;
    border-radius: 3px;
    box-shadow: 0 3px 0 rgba(136,136,136,1);
    color: #fff;
    display: block;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    margin: 10px auto;
    padding: 10px 0;
  }
  #get-status :hover {
    box-shadow: 0 1px 0 rgba(136,136,136,1);
    margin: 12px auto 8px;
  }
</style>
