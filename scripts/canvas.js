import '../styles/canvas.scss'

//RENDER CANVAS --BEGIN--
const canvas = document.getElementById("sequenceCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const frameCount = 146; //setting // 126 //76 
        const fileExtension = ".jpg"; //setting
        const images = [];
        let loadedImages = 0;
        function formatNumber(num) {
          return num.toString().padStart(3, '0');
        }
        for (let i = 1; i <= frameCount; i++) {
          const img = new Image();
          const formattedNumber = formatNumber(i);
          const imageName = 'NewLevelSequence.0'; //setting
          img.src = `https://cdn.shopify.com/s/files/1/0892/0445/7817/files/${imageName}${formattedNumber}${fileExtension}`;
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
//RENDER CANVAS --END--