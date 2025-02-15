<template>
    <div>
      <div id="header" class="header">
        <header-main></header-main>
      </div>
  
      <div class="fade-in">
        <div class="headline" id="content-title" style="margin-top: 140px;"></div>
        <div class="main-body">
          <div class="text" id="text-content">WAIT FOR THE CONTENT TO LOAD</div>
        </div>
      </div>

      <div class="footer" id="footer">
        <footer-buttons></footer-buttons>
      </div>
  
    </div>
  </template>
  
  <script>
  import HeaderMain from '~/components/header-main.vue';
  import FooterButtons from '~/components/footer-buttons.vue';
  
  export default {
    name: 'legalPage',
    components: {
      HeaderMain,
      FooterButtons,
    },
    mounted() {
      if (process.client) {
        import('~/static/scripts/legal.js').then(module => module.default());
        import('~/static/scripts/main.js').then(module => module.default());
        import('~/static/scripts/load-buttons.js').then(module => module.default());
      }
    },
    methods: {
    },
}
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:500|IBM+Plex+Sans:300&display=swap');
  </style>
  