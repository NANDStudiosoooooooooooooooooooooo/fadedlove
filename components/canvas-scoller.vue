<template>
    <div class="logo-container" id="load-container">
      <div id="loader" class="loader-container">
        <l-zoomies :size="80" :stroke="5" :bg-opacity="0.1" :speed="1.4" color="white"></l-zoomies>
      </div>
      <div class="video-wrapper fade-in" id="videoWrapper">
        <canvas id="sequenceCanvas"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CanvasAnimationComponent',
    props: {
      frameCount: {
        type: Number,
        default: 146
      },
      fileExtension: {
        type: String,
        default: '.jpg'
      },
      imageName: {
        type: String,
        default: 'NewLevelSequence.0'
      }
    },
    mounted() {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://cdn.jsdelivr.net/npm/ldrs/dist/auto/zoomies.js';
        script.defer = true;
        document.head.appendChild(script);

      this.initCanvasAnimation();
    },
    methods: {
      initCanvasAnimation() {
        const canvas = document.getElementById("sequenceCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const frameCount = this.frameCount;
        const fileExtension = this.fileExtension;
        const imageName = this.imageName;
        const images = [];
        let loadedImages = 0;
  
        function formatNumber(num) {
          return num.toString().padStart(3, '0');
        }
  
        for (let i = 1; i <= frameCount; i++) {
          const img = new Image();
          const formattedNumber = formatNumber(i);
          img.src = `https://cdn.shopify.com/s/files/1/0905/8592/3907/files/${imageName}${formattedNumber}${fileExtension}`;
          img.onload = () => {
            loadedImages++;
            console.log(`img ${formattedNumber} done`);
  
            if (loadedImages === frameCount) {
              console.log("animation done!");
              render();
            }
          };
  
          img.onerror = () => {
            console.error(`img: ${formattedNumber} error`);
          };
          images.push(img);
        }
  
        function drawFrame(index) {
          const img = images[index];
          if (img && img.complete) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          } else {
            console.error(`img ${index + 1} not ready`);
          }
        }
  
        window.addEventListener("scroll", () => {
          if (loadedImages === frameCount) {
            const scrollPosition = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollFraction = scrollPosition / maxScroll;
            const currentFrame = Math.min(
              frameCount - 1,
              Math.floor(scrollFraction * frameCount)
            );
            drawFrame(currentFrame);
          }
        });
  
        function render() {
          drawFrame(0);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  