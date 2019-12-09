<template>
  <div id="status">
    <b-button id="get-status" type="is-primary" @click="fetchStatus(store)">Get Status NOW</b-button>
    <p>ServerStatus: <b>{{ store.getters['status/getStatus'] }}</b></p>
    <p>ServerVersion: <b>{{ store.getters['status/getVersion']  }}</b></p>
  </div>
</template>

<script lang="ts">
  import {
    createComponent,
    reactive,
    onBeforeMount,
    onUpdated,
    SetupContext,
    onMounted,
    computed,
    watch,
    ref
  } from '@vue/composition-api';

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
    await store.dispatch('status/fetchServerInfo');

  };

  // dat

  export default createComponent({
    props: {
      propHello: {
        type: String
      }
    },

    setup (props: Props, { root }:SetupContext) {
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


      return {
        fetchStatus,
        store,
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
    display: block;
    width: 280px;
    margin: 10px auto;
    padding: 10px 0;
    border-radius: 3px;
    box-shadow: 0 3px 0 rgba(136,136,136,1);
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    text-decoration: none;
  }
  #get-status :hover {
    background-color:#79acdf;
    -webkit-box-shadow:inset 0px 0px 3px #fff;
    -moz-box-shadow:inset 0px 0px 3px #fff;
    box-shadow:inset 0px 0px 3px #fff;
  }
  #get-status :active{
    padding-top: 6px;
    padding-bottom: 4px;
    border: 1px solid #334c66;
    background-color: #69c;
    color: #e0ebf5;
    -webkit-box-shadow: inset 0px 0px 8px #334c66;
    -moz-box-shadow:inset 0px 0px 2px #3a6da0;
    box-shadow:inset 0px 0px 2px #3a6da0;
  }
</style>
