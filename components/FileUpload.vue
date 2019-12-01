<template>
  <div class="FileUpload" id="FileUpload">
    <div class="select">
      <b-field>
      <b-select id="format-select" v-model="state.selected">
        <option disabled value="">Please select one</option>
        <option value="image/png">image/png</option>
        <option value="image/jpeg">image/jpeg</option>
        <option value="image/gif">image/gif</option>
      </b-select>
        </b-field>
    </div>
    <span id="selected-format">Image Format: {{ state.selected }}</span>
    <div v-if="!state.image" id="select-not-yet-image">
      <h2>Select images</h2>
      <input id="file-choice" type="file" @change="onFileChange" multiple="multiple" accept="image/*">
    </div>
    <div v-else id="selected-images">
      <div v-if="state.isLoading">
        <div v-show="state.isLoading" id="post-file-loader" class="loader">Post File...</div>
      </div>
      <div v-else>
        <img :src="state.image" alt="select image"/>
      </div>
      <b-button id="remove-image" type="is-danger" @click="removeImage">Remove images</b-button>
      <div v-if="state.selected && state.image">
        <b-button id="post-image" type="is-primary" @click="postImage">Post images</b-button>
      </div>
      <div v-if="state.uploadId">
        <span id="upload-id">UploadId: {{ state.uploadId }}</span>
      </div>
      <div v-if="state.uploadId">
        <div class="row">
          <div class="col-sm-6">
            <b-button id="convert-images" type="is-info" @click="convertImages">Convert images</b-button>
          </div>
          <div v-if="state.converted" class="col-sm-6">
            <b-button id="download-pdf-200" type="is-success" @click="downloadPDF">Download PDF</b-button>
          </div>
          <div v-else class="col-sm-6">
            <b-button id="download-pdf-404" type="is-warning" @click="downloadPDF">Download PDF</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import {
    createComponent,
    reactive,
    onBeforeMount,
    onMounted,
    computed,
    ref
  } from '@vue/composition-api';
  import axios from 'axios';
  import toast from '@nuxtjs/toast';

  const backendURL = 'https://ebook-homebrew.herokuapp.com/';

  // data
  const state = reactive<{
    image: string;
    images: string[];
    selected: string;
    contentType: string;
    uploadId: string;
    converted: boolean;
    isLoading: boolean;
  }>({
    image: '',
    images: [],
    selected: '',
    contentType: '',
    uploadId: '',
    converted: false,
    isLoading: false
  });

  const onFileChange = async (e: any): Promise<void> => {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }
    await callCreateImage(files);
  };

  const callCreateImage = async (files: Blob[]): Promise<void> => {
    for (const file of files) {
      await createImage(file);
    }
  };

  const createImage = async (file: Blob): Promise<void> => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      state.image = e.target.result;
      state.images.push(e.target.result)
    };
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file);
      return resolve();
    });
  };

  const removeImage = (e: any): void => {
    state.image = '';
  };

  const postImage = async (e: any): Promise<void> => {
    state.isLoading = true;
    state.contentType = state.selected;
    const res = await axios.post(backendURL + 'data/upload', {
      contentType: state.contentType,
      images: state.images,
    });
    state.uploadId = res.data.upload_id;
    state.isLoading = false;
  };

  const convertImages = async (e: any): Promise<void> => {
    await axios.post(backendURL + 'convert/pdf', {
      contentType: state.contentType,
      uploadId: state.uploadId,
    });
    let statusCode = 404;
    while (statusCode === 200) {
      await axios.post(backendURL + 'convert/pdf/download', {
        uploadId: state.uploadId,
      }).then((response) => {
        statusCode = response.status;
      }).catch((err) => {
        statusCode = err.response.status;
      });
    }
    state.converted = true;
  };

  export default createComponent({
    setup (props, ctx) {
      const toast = ctx.root.$root.$toast;

      const downloadPDF = async (e: any): Promise<void> => {
        const options = {
          position: 'top-center',
          duration: 2000,
          fullWidth: true,
          type: 'error',
        } as any;
        try{
          const res = await axios.post(backendURL + 'convert/pdf/download', {
            uploadId: state.uploadId,
          }, {responseType: 'blob'});
          const blob = new Blob([res.data], {type: 'application/pdf'});
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'result.pdf';
          link.click();
        } catch (e) {
          if (e.response.status === 404) {
            toast.show("File Not Found!!", options)
          } else{
            toast.show("Unknown Error!!", options)
          }
        }

      };

      return {
        state,
        onFileChange,
        removeImage,
        convertImages,
        postImage,
        downloadPDF
      }
    }
  })

</script>

<style scoped>
  .loader {
    color: #381eff;
    font-size: 90px;
    text-indent: -9999em;
    overflow: hidden;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin: 72px auto;
    position: relative;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
    animation: load6 1.7s infinite ease, round 1.7s infinite ease;
  }

  @-webkit-keyframes load6 {
    0% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    5%,
    95% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    10%,
    59% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
    }
    20% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
    }
    38% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
    }
    100% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
  }

  @keyframes load6 {
    0% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    5%,
    95% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    10%,
    59% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
    }
    20% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
    }
    38% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
    }
    100% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
  }

  @-webkit-keyframes round {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes round {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  img {
    width: 30%;
    margin: auto;
    display: block;
    margin-bottom: 10px;
  }

  .select {
    margin: auto;
  }
</style>
