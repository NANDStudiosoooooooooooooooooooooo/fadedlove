<template>
  <header class="main-header">
    <div class="top-left" style="top: 10px; left: 10px;">
      <button id="back-button" class="glass-button">
        <span id="back-arrow">←</span> 
        <span id="back-button-text">BACK TO FADEDCLOTH</span>
      </button>
    </div>
    <div id="cart-button-container" class="nav-link top-right">
      <a style="padding-top: 60px;" href="https://checkout.fadedcloth.de/cart">
        <div class="cart-count-bubble">!</div>
        <div style="position: relative; z-index: 2; pointer-events: none; user-select: none;">
          <img title="CART" src="https://cdn.shopify.com/s/files/1/0905/8592/3907/files/cart.png?v=1738269126" style="height: 60px; width: 60px;">
        </div>
        <div class="blurred-eclipse-background"></div>
      </a>
    </div>
    <a href="https://fadedcloth.de/" style="cursor: pointer;">
      <div class="header-logo-container top" id="load-container">
        <svg id="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.99 49.99">
          <path class=".svg-logo" d="M9.04,45.8S2.14,18.36,29.78,20.63c.32.03,1.48.5,1.68.73,10.46,11.98-11.35-1.98-9.37,11.94,2.79,19.65-12.78,15.1-13.05,12.5Z" style=" fill-rule:evenodd;"/>
          <path class="svg-logo" d="M12.75,2.49s36.99-3.52,27.37,5.41c-9.61,8.93-18.95-5.47-24.04,6.74C10.98,26.86,3.69,3.05,12.75,2.49Z" style=" fill-rule:evenodd;"/>
          <rect width="49.99" height="49.99" style="fill:none;"/>
        </svg>
      </div>
    </a>
  </header>
</template>

<script>
export default {
  name: 'HeaderMain',
  mounted() {
    this.updateBackButtonText();
    window.addEventListener('resize', this.updateBackButtonText);
    document.getElementById("back-button").addEventListener("click", () => {
      window.location.href = this.backButtonLink;
    });
  },
  methods: {
    setBackButtonLink(newLink) {
      this.backButtonLink = newLink;
    },
    setBackButtonText(newText) {
      document.getElementById("back-button-text").textContent = newText;
    },
    updateBackButtonText() {
      const backButtonText = "BACK TO FADEDCLOTH";
      const backButtonShortText = "BACK";
      if (window.innerWidth <= 880) {
        this.setBackButtonText(backButtonShortText);
      }

 else {
        this.setBackButtonText(backButtonText);
      }
    }
  },
  data() {
    return {
      backButtonLink: "https://fadedcloth.de/"
    };
  }
}
</script>

<style scoped>
</style>
  