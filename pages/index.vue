<template>
  <div class="home">
    <h1>Ebook Homebrew Home</h1>
    <br><br>
    <img alt="ebook logo" src="../assets/image/logo.png">
    <br><br>
    <h2>How to use it?</h2>
    <a href="https://ebook-homebrew.readthedocs.io/en/latest/">ebook-homebrew Docs</a><br>
    <a href="https://ebook-homebrew.herokuapp.com/docs">ebook-homebrew API Ref</a><br>
    Or try to click "Sample" at Top Nav bar, Use <b>ebook-homebrew Nuxt.js</b> client.
    <status-check  propHello="HelloComposition"/>
  </div>
</template>

<script lang="ts">
  import {
    createComponent,
    reactive,
    onMounted,
    computed,
    ref
  } from '@vue/composition-api';
  import StatusCheck from '@/components/StatusCheck.vue';

  export default createComponent({
    layout: 'default',
    components: {
      StatusCheck
    },
    setup() {
    }
  })

</script>
