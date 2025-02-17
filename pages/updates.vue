<template>
  <div>
    <header-main/>

    <CanvasScoller
      :frameCount="1"
      fileExtension=".jpg"
      imageName=""
    />

    <BgBlur :maxBlur="20" />

    <div class="glas-wrapper">
      <div class="drop-container fade-in" id="drops-container">
        <!-- Drop items will be appended here -->
      </div>
    </div>

    <div id="news-tab" class="collapsed hidden">
      <div id="news-header">
        <span id="news-headline"></span>
        <span id="toggle-arrow">^</span>
      </div>
      <div id="news-media"></div>
    </div>

    <div class="scroll-effect-top"></div>
  </div>
</template>

<script>
import ButtonViewDrops from '~/components/button-viewdrops.vue';
import BgBlur from '~/components/bg-blur.vue';
import CanvasScoller from '~/components/canvas-scoller.vue';

export default {
  name: 'indexPage',
  components: {
    ButtonViewDrops,
    BgBlur,
    CanvasScoller,
  },
  mounted() {
    this.initializeScripts();
  },
  methods: {
    async initializeScripts() {
      if (process.client) {
        try {
          // Lade alle Skripte parallel
          await Promise.all([
            import('../static/scripts/index_scripts.js').then(({ default: initializeScripts }) => {
              if (typeof initializeScripts === 'function') {
                initializeScripts();
              }
            }).catch(error => {
              console.error("Error loading index_scripts.js:", error);
            }),
            
            import('../static/scripts/loadupdates.js').then(({ initializeLoadDropList, checkMarquee }) => {
              if (typeof initializeLoadDropList === 'function') {
                initializeLoadDropList();
              }
              if (typeof checkMarquee === 'function') {
                checkMarquee();
              }
            }).catch(error => {
              console.error("Error loading loadupdates.js:", error);
            }),

            import('../static/scripts/index_scripts.js').then(({ default: initializeScripts }) => {
              if (typeof initializeScripts === 'function') {
                initializeScripts();
              }
            }).catch(error => {
              console.error("Error loading index_scripts.js:", error);
            }),

            import('../static/scripts/main.js').then(module => {
              if (typeof module.default === 'function') {
                module.default();
              }
            }).catch(error => {
              console.error("Error loading main.js:", error);
            }),

          ]);

          console.log("{initializeScripts}: All scripts loaded successfully");

        } catch (error) {
          console.error("Error during script initialization:", error);
        }
      }
    }
  }
}


</script>

<style scoped>
@import '../static/styles/index_site.css';
</style>