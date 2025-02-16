<template>
    <div class="body-center">
      <header-main/>
      
      <LoaderGallery class="gallery-comp"/>
  
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
.gallery-comp{
    margin-top: 100px;
}
.body-center {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
</style>