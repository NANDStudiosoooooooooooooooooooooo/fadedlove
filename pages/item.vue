<template>
    <div class="body-center">
      <header-main/>
      <footer-buttons/>

      <loader-item/>
  
    </div>
  </template>
  
  <script>
  import HeaderMain from '~/components/header-main.vue';
  import footerButtons from '~/components/footer-buttons.vue';
  import ShopList from '~/components/loader-item.vue';
import LoaderItem from '../components/loader-item.vue';
  
  export default {
    name: 'shopPage',
    components: {
        HeaderMain,
        footerButtons,
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
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
  }
  </style>