<template>
    <div>
      <div id="header" class="header">
        <header-main></header-main>
      </div>

      <footer-buttons></footer-buttons>

      <LoaderContent></LoaderContent>
    </div>
    
  </template>
  
  <script>
  import HeaderMain from '~/components/header-main.vue';
  import FooterButtons from '~/components/footer-buttons.vue';
  import LoaderContent from '~/components/loader-content.vue';
  
  export default {
    name: 'legalPage',
    components: {
      HeaderMain,
      FooterButtons,
      LoaderContent,
    },
    mounted() {
      if (process.client) {
        // import('~/static/scripts/legal.js').then(module => module.default());
        import('~/static/scripts/main.js').then(module => module.default());
      }
    },
    methods: {
    },
}
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:500|IBM+Plex+Sans:300&display=swap');
  </style>
  