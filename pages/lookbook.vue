<template>
    <div class="body-center">
      <header-main/>
      
      <LoaderGallery/>
  
      <footer-buttons/>
    </div>
  </template>
  
  <script>
    import LoaderGallery from '~/components/loader-gallery.vue';

  export default {
    name: 'GalleryPage',
    mounted() {
    },
    methods: {
    },
  components: {
    LoaderGallery,
  },
  }
  </script>

<style scoped>
  body {
  overflow: hidden !important;
  align-items: center !important;
}
</style>