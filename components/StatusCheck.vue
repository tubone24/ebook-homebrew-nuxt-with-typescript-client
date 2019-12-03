<template>
  <div id="status">
    <p>{{ status }}</p>
  </div>
</template>

<script lang="ts">
  import {
    createComponent,
    reactive,
    onBeforeMount,
    onMounted,
    computed,
    ref
  } from '@vue/composition-api';
  import axios from 'axios';

  const backendURL = 'https://ebook-homebrew.herokuapp.com/';

  type Props = {
    propHello: string;
  };



  export default createComponent({
    props: {
      propHello: {
        type: String
      }
    },

    async fetch({ store }) {
      const res = await axios.get(backendURL + 'status')
      store.commit('status/set', res.data.status)
    },

    setup (props: Props, { root }) {
      // props
      const propsHello = props.propHello;

      const store = root.$store;

      //methods




      //state with store
      console.log(store.state.status)

      const status = ref<string>(store.state.status);


      return {
        status,
        propsHello,
      };
    }
  });
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  #list {
    max-width: 640px;
    margin: 0 auto;
  }
  table {
    width: 110%;
    border-collapse: collapse;
  }
  thead th {
    border-bottom: 2px solid #55aa42; /*#d31c4a */
    color: #429c43;
  }
  th,
  th {
    padding: 0 8px;
    line-height: 40px;
  }
  thead th.id {
    width: 50px;
  }
  thead th.state {
    width: 100px;
  }
  thead th.button {
    width: 60px;
  }
  tbody td.button, tbody td.state {
    text-align: center;
  }
  tbody tr td,
  tbody tr th {
    border-bottom: 1px solid #ccc;
    transition: all 0.4s;
  }
  tbody tr.done td,
  tbody tr.done th {
    background: #f8f8f8;
    color: #bbb;
  }
  tbody tr:hover td,
  tbody tr:hover th {
    background: #f4fbff;
  }
  button {
    border: none;
    border-radius: 20px;
    position: relative;
    top: 7px;
    line-height: 24px;
    padding: 0 8px;
    background: #0099e4;
    color: #fff;
    cursor: pointer;
  }
</style>
