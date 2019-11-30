<template>
  <div>
    <button
      @click="CountDouble.increment"
    >Count is: {{ CountDouble.state.count }}, double is: {{ CountDouble.state.double }}</button>
    <h2>{{ propsHello }}</h2>
    <h3>{{ state.reactiveMessage }}</h3>
    <p>{{ BitCoinData.info }}</p>
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

  /**
   * bitcoinのデータを取得して非同期に表示
   */
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

      // 各機能を定義
      const BitCoinData = getDataFromBitcoin();
      const CountDouble = countDouble();

      // data
      const state = reactive<{
        reactiveMessage: string;
      }>({
        reactiveMessage: "Hello"
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
