<template>
    <div id="blurOverlay" class="blur-overlay"></div>
  </template>
  
  <script>
  export default {
    name: 'BgBlur',
    props: {
      maxBlur: {
        type: Number,
        default: 15,
      },
    },
    mounted() {
      const blurOverlay = document.getElementById('blurOverlay');
  
      if (blurOverlay) {
        window.addEventListener('scroll', () => {
          console.log('scrolling');
          const scrollPosition = window.scrollY;
          const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
          const blurValue = (scrollPosition / documentHeight) * this.maxBlur;
  
          blurOverlay.style.setProperty('--blur-value', `${blurValue}px`);
        });
      } else {
        console.error('Element with ID "blurOverlay" not found.');
      }
    }
  }
  </script>
  
  <style scoped>
  .blur-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 0%);
    transition: backdrop-filter 0.1s, -webkit-backdrop-filter 0.1s;
    backdrop-filter: blur(var(--blur-value, 0px));
    -webkit-backdrop-filter: blur(var(--blur-value, 0px));
  }
  </style>
  