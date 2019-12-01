<template>
  <section class="section">
    <div class="container">
      <hello  propHello="HelloComposition"/>
    </div>
  </section>
</template>

<script lang="ts">
  import {
    createComponent,
    reactive,
    onMounted,
    computed,
    ref
  } from '@vue/composition-api';
  import Hello from '@/components/Hello.vue';

  export default createComponent({
    layout: 'default',
    components: {
      Hello
    },
    setup() {
    }
  })

</script>
