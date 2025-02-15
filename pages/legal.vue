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
  
      <div class="buttons-container">
        <button id="button1" class="glass-button" data-target="panel1">COLLECTION</button>
        <button id="button2" class="glass-button" data-target="panel2">INFO</button>
        <button id="button3" class="glass-button" data-target="panel3">NEWSLETTER</button>
        <!--<button id="button4" class="glass-button" data-target="panel4">SMS</button>-->
      </div>
  
      <!-- Panel für Button 1 -->
      <div id="panel1" class="glass-panel hidden">
        <button class="close-btn" @click="togglePanel('panel1')">X</button>
        <a href="https://fadedcloth.de/lookbook" class="panel-link">GALLERY</a>
        <a href="https://fadedcloth.de/" class="panel-link">MAINPAGE</a>
      </div>
  
      <!-- Panel für Button 2 -->
      <div id="panel2" class="glass-panel hidden">
        <button class="close-btn" @click="togglePanel('panel2')">X</button>
        <div class="social-container">
          <select title="SOCIAL" id="social-select" @change="updateSocialLink">
            <option value="instagram">INSTAGRAM</option>
            <option value="tiktok">TIKTOK</option>
            <option value="twitter">TWITTER</option>
          </select>
          <a class="underlineonhover" id="social-select-link" href="https://instagram.com/fadedcloth.de">fadedcloth.de</a>
        </div>
        <a href="mailto:help@fadedcloth.de" class="panel-link">CONTACT</a>
        <a href="/legal?id=privacy-policy" class="panel-link">PRIVACY POLICY</a>
        <a href="/legal?id=terms-of-service" class="panel-link">TERMS OF SERVICE</a>
        <div class="copyright">&copy; FADEDCLOTH 2024</div>
      </div>
  
      <!-- Panel für Button 3 (Subscribe Panel) -->
      <div id="panel3" class="glass-panel hidden">
        <button class="close-btn" @click="togglePanel('panel3')">X</button>
        <div class="headline">SUBSCRIBE FOR UPDATES</div>
        <form id="emailForm" @submit.prevent="submitForm">
          <input 
            type="email" 
            id="email" 
            placeholder="ENTER YOUR EMAIL" 
            class="email-input"
            required 
          />
          <div class="checkbox-container">
            <input type="checkbox" id="termsCheckbox" class="custom-checkbox" required>
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
  </template>
  
  <script>
  import HeaderMain from '~/components/header-main.vue';
  
  export default {
    name: 'legalPage',
    components: {
      HeaderMain
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
  