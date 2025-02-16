<template>
    <div class="body-center">
      <header-main/>

        <shop-list/>
  
    </div>
  </template>
  
  <script>
  import HeaderMain from '~/components/header-main.vue';
  import ShopList from '~/components/shop-list.vue';
  
  export default {
    name: 'shopPage',
    components: {
        HeaderMain,
        ShopList,
    },
    mounted() {
      this.initializeScripts();
    },
    methods: {
      async initializeScripts() {
      }}
  }
  
  
  </script>
  
  <style scoped>
  .body-center {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
  </style>