!function(){"use strict";document.addEventListener("DOMContentLoaded",(function(){function e(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;document.querySelectorAll(".".concat(e)).forEach((function(e,o){e.style.animation="".concat(t," 0.5s forwards"),e.style.animationDelay="".concat(n+100*o,"ms")}))}e("top-left","slideInLeft"),e("top","slideInTop"),e("top-right","slideInRight")})),document.getElementById("subscribeButton").addEventListener("click",(function(e){e.preventDefault();var t=document.getElementById("email"),n=t.value,o=document.getElementById("termsCheckbox"),c=document.querySelector(".checkbox-container");isValidEmail(n)?o.checked?fetch("https://subscribe.fadedcloth.de/sub",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n})}).then((function(e){return e.json()})).then((function(e){var t=encodeURIComponent(window.location.href);window.location.href="https://subscribe.fadedcloth.de/success?SUBSCRIBED&referrer=".concat(t)})).catch((function(e){alert("An error occurred: "+e.message)})):shakeElement(c):shakeElement(t)}))}();