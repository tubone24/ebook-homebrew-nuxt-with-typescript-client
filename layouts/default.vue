<template>
  <div class="app">
    <particles-bg type="circle" :bg="true" :canvas="canvasObject"/>
    <div id="nav">
      <nuxt-link to="/">Home</nuxt-link> |
      <nuxt-link to="/sample">sample</nuxt-link> |
      <nuxt-link to="/list">list</nuxt-link>
    </div>
    <nuxt/>
  </div>
</template>

<script lang='ts'>
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

  const canvasObject = {
    height: '120%'
    };

  export default createComponent({

    setup () {

      return {
        canvasObject
      };
    }
  });
</script>

<style>
  .app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: large;
    color: #2c3e50;
    text-align: center;
  }
  #nav {
    padding: 30px;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  #nav a.nuxt-link-exact-active {
    color: #42b983;
  }
</style>
