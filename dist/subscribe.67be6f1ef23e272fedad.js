(()=>{function e(e){e.classList.add("shake"),setTimeout((function(){e.classList.remove("shake")}),500)}document.getElementById("subscribeButton").addEventListener("click",(function(t){t.preventDefault();var n=document.getElementById("email"),c=n.value,o=document.getElementById("termsCheckbox"),s=document.querySelector(".checkbox-container");!function(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}(c)?e(n):o.checked?fetch("https://subscribe.fadedcloth.de/sub",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:c})}).then((function(e){return e.json()})).then((function(e){var t=encodeURIComponent(window.location.href);window.location.href="https://subscribe.fadedcloth.de/success?SUBSCRIBED&referrer=".concat(t)})).catch((function(e){alert("An error occurred: "+e.message)})):e(s)}))})();