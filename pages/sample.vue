<template>
  <section class="section">
    <div class="container">
      <file-upload  propHello="HelloComposition"/>
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
  import FileUpload from '@/components/FileUpload.vue';

  export default createComponent({
    layout: 'default',
    components: {
      FileUpload
    },
    setup() {
    }
  })

</script>
