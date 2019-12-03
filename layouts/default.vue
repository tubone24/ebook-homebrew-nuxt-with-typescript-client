<template>
  <div class="app">
    <particles-bg type="circle" :bg="true" />
    <div id="nav">
      <nuxt-link to="/">Home</nuxt-link> |
      <nuxt-link to="/sample">sample</nuxt-link> |
      <nuxt-link to="/list">list</nuxt-link>
    </div>
    <nuxt/>
  </div>
</template>

<style>
  .app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: large;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
