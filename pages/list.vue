<template>
  <section class="section">
    <div class="container">
      <file-list  propHello="HelloComposition"/>
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
  import FileList from '@/components/FileList.vue';

  export default createComponent({
    layout: 'default',
    components: {
      FileList
    },
    setup() {
    }
  })

</script>
