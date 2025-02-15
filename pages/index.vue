<template>
  <div>
    <a href="https://fadedcloth.de/shop/" class="drop-link top-right" onmouseover="this.style.filter=`blur(2px)`;" onmouseout="this.style.filter=`blur(0px)`;">SHOP</a>

    <div class="logo-container" id="load-container">
      <div id="loader" class="loader-container">
        <l-zoomies size="80" stroke="5" bg-opacity="0.1" speed="1.4" color="white"></l-zoomies>
      </div>
      <div class="video-wrapper fade-in" id="videoWrapper">
        <canvas id="sequenceCanvas"></canvas>
        <!-- 
        <video class="logo" id="load-obj" autoplay loop muted playsinline preload="auto">
          <source src="https://cdn.shopify.com/videos/c/o/v/98309ce66f8641dea5e579d4f1a8a4d9.mp4" type="video/mp4">
          <source src="https://cdn.shopify.com/videos/c/o/v/696856536feb451699e4337ac233c8a9.webm" type="video/webm">
          BAD BROWSER
        </video> 
        -->
      </div>
    </div>

    <div id="blur-overlay"></div>

    <div class="scroll-text fade-in" >VIEW DROPS ↓</div>

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

    <div class="text-box top-left"><a href="https://fadedcloth.de">fadedcloth.de</a></div>

    <div class="scroll-effect-top"></div>
  </div>
</template>

<script>
export default {
  name: 'indexPage',
  components: {},
  mounted() {
    // Konsolidiere alle Skript-Initialisierungen in der mounted-Methode
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
            
            import('../static/scripts/loaddroplist.js').then(({ default: initializeLoadDropList }) => {
              if (typeof initializeLoadDropList === 'function') {
                initializeLoadDropList();
              }
            }).catch(error => {
              console.error("Error loading loaddroplist.js:", error);
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

            import('../static/scripts/canvas.js').then(module => {
              if (typeof module.default === 'function') {
                module.default();
              }
            }).catch(error => {
              console.error("Error loading canvas.js:", error);
            })
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