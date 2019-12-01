<template>
  <div class="FileUpload" id="FileUpload">
    <div>
      <select id="format-select" v-model="selected">
        <option disabled value="">Please select one</option>
        <option value="image/png">image/png</option>
        <option value="image/jpeg">image/jpeg</option>
        <option value="image/gif">image/gif</option>
      </select>
      <span id="selected-format">Image Format: {{ selected }}</span>
    </div>
    <div v-if="!image" id="select-not-yet-image">
      <h2>Select images</h2>
      <input id="file-choice" type="file" @change="onFileChange" multiple="multiple" accept="image/*">
    </div>
    <div v-else id="selected-images">
      <div v-if="isLoading">
        <div v-show="isLoading" id="post-file-loader" class="loader">Post File...</div>
      </div>
      <div v-else>
        <img :src="image" alt="select image"/>
      </div>
      <button id="remove-image" class="btn btn-danger" @click="removeImage">Remove images</button>
      <div v-if="selected && image">
        <button id="post-image" class="btn btn-primary" @click="postImage">Post images</button>
      </div>
      <div v-if="this.$store.getters['fileUpload/getUploadId']">
        <span id="upload-id">UploadId: {{ this.$store.getters['fileUpload/getUploadId'] }}</span>
      </div>
      <div v-if="this.$store.getters['fileUpload/getUploadId']">
        <div class="row">
          <div class="col-sm-6">
            <button id="convert-images" class="btn btn-info" @click="convertImages">Convert images</button>
          </div>
          <div v-if="converted" class="col-sm-6">
            <button id="download-pdf-200" class="btn btn-success" @click="downloadPDF">Download PDF</button>
          </div>
          <div v-else class="col-sm-6">
            <button id="download-pdf-404" class="btn btn-warning" @click="downloadPDF">Download PDF</button>
          </div>
        </div>
      </div>
    </div>
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

  const getDataFromBitcoin = () => {
    let info: any = ref(); // OK
    // let info: any = {}; // NG
    // refがないとreactiveにならない為、dataの中身が変わっても検知されない

    // methods
    const getData = () => {
      axios
        .get("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then(response => (info.value = response));
      // refで定義された変数にはvalue.propertyでアクセスが可能
      // refのvalueにobjectが定義された場合、深い階層までリアクティブになる
    };

    // mounted
    onMounted(() => {
      getData();
    });

    // 使用するデータは全てreturn
    return {
      info,
      getData
    };
  };

  /**
   * ボタンをクリックすると数値がインクリメントし、かつ2倍にした数を表示
   */
  const countDouble = () => {
    // data
    const state: any = reactive({
      count: 0,
      // computed
      double: computed(() => state.count * 2)
    });

    // methods
    const increment = () => {
      state.count++;
    };

    // 使用するデータは全てreturn
    return {
      state,
      increment
    };
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
    setup(props: Props) {
      // props
      const propsHello = props.propHello;

      // methods
      const BitCoinData = getDataFromBitcoin();
      const CountDouble = countDouble();

      // data
      const state = reactive<{
        image: string;
        selected: string;
        converted: boolean;
        isLoading: boolean;
      }>({
        image: '',
        selected: '',
        converted: false,
        isLoading: false,
      });

      // 使用するデータは全てreturn
      return {
        BitCoinData,
        CountDouble,
        state,
        propsHello
      };
    }
  });
</script>
