<template>
  <div id="status">
    <p>ServerStatus: <b>{{ status }}</b></p>
    <p>ServerVersion: <b>{{ version }}</b></p>
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
    store.dispatch('status/fetchServerInfo');
  };

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
      const status = ref<string>((computed( () => store.getters['status/getStatus'])).value);
      const version = ref<string>((computed( () => store.getters['status/getVersion'])).value);


      return {
        status,
        version,
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
    font-size: 60px;
  }
</style>
