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

  // data
  const state = reactive<{
    uploadList: Array<Map<string, string>>
  }>({
    uploadList: []
  });

  const updateFileList = async (): Promise<void> => {
    const res = await axios.get(backendURL + 'data/upload/list');
    if (res.status === 200) {
      state.uploadList = res.data.fileList;
    }
    console.log(JSON.stringify(state.uploadList));
  };

  const doDownload = async (filePath: string): Promise<void> => {
    const blob = await downloadPDF(filePath);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'result.pdf';
    link.click();
  };

  const downloadPDF = async (filePath: string): Promise<Blob> => {
    const options = {
      position: 'top-center',
      duration: 2000,
      fullWidth: true,
      type: 'error',
    } as any;
    const res = await axios.post(backendURL + 'convert/pdf/download', { uploadId: filePath, },
      {responseType: 'blob'}).catch((err) => {
      if (err.response.status === 404) {
        this.$toasted.show('No File!!', options);
        throw new Error('PdfFileNotFound');
      } else {
        this.$toasted.show('Error!!');
        throw err;
      }
    },
    );
    return new Blob([res.data], {type: 'application/pdf'});
  };

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



      // 使用するデータは全てreturn
      return {
        state,
        propsHello
      };
    }
  });
</script>
