<template>
    <div class="body-center">
      <header-main></header-main>
  
      <PanelNewsletter :headlineText="headlineText" :href="href" />

    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorPage',
    components: {
      PanelNewsletter,
  },
    data() {
    return {
      headlineText: '404 NOT FOUND.',
      href: 'https://fadedcloth.de/'
    };
  },
    methods: {
    },
  }
  </script>
  
  <style scoped>
  </style>
  