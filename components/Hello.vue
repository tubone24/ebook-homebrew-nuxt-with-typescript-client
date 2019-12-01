<template>
  <div id="list">
    <table>
      <thead>
      <tr>
        <th class="id">ID</th>
        <th class="filepath">File Path</th>
        <th class="lastindex">Last Index</th>
        <th class="type">File Type</th>
        <th class="updated">Updated at</th>
        <th class="download">-</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in uploadList">
        <th>{{ item.id }}</th>
        <th>{{ item.file_path }}</th>
        <th>{{ item.last_index }}</th>
        <th>{{ item.file_type }}</th>
        <th>{{ item.updated_at }}</th>
        <button v-on:click="doDownload(item.file_path)">DL</button>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import {
    createComponent,
    reactive,
    onMounted,
    computed,
    ref
  } from "@vue/composition-api";
  import axios from "axios";
  import { AxiosPromise } from "axios";

  const backendURL = 'https://ebook-homebrew.herokuapp.com/';

  const state = reactive<{
    uploadList: Array<Map<string, string>>
  }>({
    uploadList: []
  });


  type Props = {
    propHello: string;
  };

  export default createComponent({
    props: {
      propHello: {
        type: String
      }
    },
    setup (props: Props) {
      // props
      const propsHello = props.propHello;

      // methods

      // data

      // 使用するデータは全てreturn
      return {
        state,
        propsHello
      };
    }
  });
</script>
