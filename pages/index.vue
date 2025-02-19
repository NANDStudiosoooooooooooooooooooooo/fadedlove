<template>
  <div>
    <!-- <a href="https://fadedcloth.de/shop/" class="drop-link top-right" onmouseover="this.style.filter=`blur(2px)`;" onmouseout="this.style.filter=`blur(0px)`;">SHOP</a>

    <CanvasScoller
      :frameCount="146"
      fileExtension=".jpg"
      imageName="NewLevelSequence.0"
    />

    <BgBlur :maxBlur="20" />

    <button-view-drops/>

    <div class="glas-wrapper">
      <div class="drop-container fade-in" id="drops-container"> -->
        <!-- Drop items will be appended here -->
      <!-- </div>
    </div> -->

    <div class="body-center">
      <div class="panel-error">
        <a id="page-error" href="https://fadedcloth.de" class="headline">BACK SOON.</a>
        <div class="headline">SUBSCRIBE FOR UPDATES</div>
        <form id="emailForm" @submit.prevent="submitForm" novalidate>
          <input
            type="email"
            id="email"
            placeholder="ENTER YOUR EMAIL"
            class="email-input"
          />
          <div class="checkbox-container">
            <input type="checkbox" id="termsCheckbox" class="custom-checkbox">
            <label for="termsCheckbox" class="checkbox-label">
              I ACCEPT THE <a class="href" href="/legal?id=terms-of-service">TERMS</a>
            </label>
          </div>
          <div class="form-buttons">
            <button id="subscribeButton" class="email-button small-button" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
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
.panel-error {
    margin-top: 120px;
    padding: 20px;
    max-width: 400px;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  #page-error {
    margin-bottom: 20px;
  }
  .body-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #emailForm {
    margin-top: 20px;
  }

@import '../static/styles/index_site.css';

</style>