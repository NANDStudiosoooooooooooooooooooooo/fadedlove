<template>
    <div class="scroll-text fade-in" @click="handleClick">VIEW DROPS ↓</div>
  </template>
  
  <script>
  export default {
    name: 'ButtonViewDrops',
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleClick() {
        const newsletterContainer = document.querySelector('.newsletter-form');
        const collectionButton = document.querySelector('.collection-button');
  
        if (newsletterContainer && collectionButton) {
          const newsletterRect = newsletterContainer.getBoundingClientRect();
          const collectionRect = collectionButton.getBoundingClientRect();
          const middlePosition = window.pageYOffset + ((newsletterRect.top + collectionRect.top) / 2) - (window.innerHeight / 2);
  
          window.scrollTo({
            top: middlePosition,
            behavior: 'smooth'
          });
        } else {
          console.error('no drop found to scroll to');
        }
      },
      handleScroll() {
        const scrollPosition = window.scrollY;
        const element = document.querySelector('.scroll-text');
        if (element) {
          if (scrollPosition > 0) {
            element.classList.replace('fade-in', 'fade-out');
            element.style.userSelect = 'none';
            element.style.pointerEvents = 'none';
          } else {
            element.classList.replace('fade-out', 'fade-in');
            element.style.userSelect = '';
            element.style.pointerEvents = '';
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Deine CSS-Styles hier */
  </style>
  