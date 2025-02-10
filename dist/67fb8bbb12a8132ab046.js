/*! For license information please see 67fb8bbb12a8132ab046.js.LICENSE.txt */
function _typeof(n){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},_typeof(n)}!function(){"use strict";var n={377:function(n,t,e){e.d(t,{A:function(){return l}});var r=e(601),o=e.n(r),i=e(314),a=e.n(i)()(o());a.push([n.id,'body {\n    background-color: black;\n    margin: 0;\n    padding: 0;\n    margin-bottom: 0;\n    padding-bottom: 0;\n    align-items: left !important;\n    justify-content: flex-start;\n    overflow-y: scroll;\n    overflow-x: auto\n}\n\n.drop_section{\n    width: 100%;\n}\n\na {\n    text-decoration: none;\n    color: #84898E;\n}\n\n.glas-wrapper{\n    display: block;\n    height: 100%;\n}\n\n.drop_container {\n    padding-left: 1.38888vw;\n    font-family: monospace;\n    color: #84898E;\n    display: flex;\n    overflow-x: visible;\n    overflow-y: visible;\n    flex-direction: column;\n    align-items: flex-start;\n    width: auto;\n    text-transform: uppercase;\n    position: relative;\n    max-width: auto;\n    scrollbar-color: #84898E transparent;\n    white-space: nowrap;\n    top: 100vh;\n    \n}\n\n#blurOverlay { position: fixed; \n    top: 0; \n    left: 0; \n    width: 100%; \n    height: 100%; \n    background: rgba(0, 0, 0, 0); \n    backdrop-filter: blur(0px); \n    -webkit-backdrop-filter: blur(0px);\n    transition: backdrop-filter 0.1s, -webkit-backdrop-filter 0.1s; }\n\n.drop_container::-webkit-scrollbar {\n    height: 6px; /* Set the scrollbar height for horizontal scrolling */\n}\n.drop_container::-webkit-scrollbar-track {\n    background: transparent; /* Hide the scrollbar track */\n}\n.drop_container::-webkit-scrollbar-thumb {\n    background-color: grey; /* Make the scrollbar handle grey */\n    border-radius: 10px; /* Round the scrollbar handle */\n    border: 2px solid transparent; /* Create space around the scrollbar handle */\n}\n\n.drop_container::-webkit-scrollbar-thumb:hover {\n    background-color: darkgrey; /* Darken the scrollbar handle on hover */\n}\n\n.drop_item {\n    display: flex;\n    align-items: center;\n    width: 100%;\n    font-size: 4vw;\n}\n\n.drop_upcoming{\n    background: repeating-linear-gradient(45deg, transparent 0%, transparent 12.5%, /* Pixelgröße relativ */ #84898e 12.5%, #84898e 25%), repeating-linear-gradient(-45deg, transparent 0%, transparent 12.5%, #84898e 12.5%, #84898e 25%);\n    background-size: calc(1em / 4) calc(1em / 4);\n    background-clip: text;\n    -webkit-background-clip: text;\n    color: transparent;\n}\n\n.drop_upcoming:hover {\n    color: #84898E !important;\n}\n\n.collection_container{\n    display: flex;\n    flex-direction: row;\n}\n\n.collections_container{\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n}\n\n.drop_number_container {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start; /* Align to the left */\n    justify-content: flex-end;\n    height: calc(4.9vw* 0.8);\n    font-size: 2.0vw;\n    line-height: 0.95;\n    width: 4ch;\n}\n\n.drop_link {\n    font-family: monospace;\n    /*color: #84898E;*/\n    flex-grow: 1;\n    text-align: left;\n    white-space: nowrap;\n    font-size: 4.9vw;\n    display: block;\n    width: auto;\n    box-sizing: border-box;\n    height: auto;\n    line-height: 0.8;\n    max-width: 94vw;\n    /* overflow: hidden; */\n}\n\n.drop_link:hover {\n    color: white;\n    \n}\n\n.drop_time,\n.drop_countdown {\n    width: 25%;\n    text-align: left; /* Align to the left */\n    white-space: nowrap;\n}\n\n.active-drop {\n    color: #fcddff !important; /* Farbe für den aktiven Drop */\n}\n\n.active-drop:hover {\n    color: white; /* Farbe beim Hover über den aktiven Drop */\n}\n\n@media (min-width: 501px) {\n    .newsletter_form input[type="email"] {\n        font-size: 4.9vw !important;\n        line-height: 0.8 !important;\n        height: calc(4.9vw* 0.8) !important;\n    }\n    .newsletter_form{\n        font-size: 4.9vw;\n        line-height: 0.8;\n        flex-direction: row;\n    }\n}\n\n@media (max-width: 500px) {\n    .drop_item {\n        font-size: 7.9vw; /* Fixed larger size for screens above 500px */\n    }\n    .drop_link {\n        font-size: 7.9vw;\n    }\n   .newsletter_form{\n        font-size: 7.9vw;\n        line-height: 0.8;\n        flex-direction: column;\n    } \n    .drop_number_container {\n        font-size: 3.25vw;\n        height: calc(7.9vw* 0.8) !important;\n    }\n    .newsletter_form input[type="email"] {\n        height: calc(7.9vw* 0.8) !important;\n        font-size: 7.9vw;\n    }\n}\n\n.newsletter_form {\n    display: flex;\n    justify-content: flex-start;\n}\n\n.newsletter_form:hover{\n    color: #fcddff !important;\n}\n\n.ended:hover{\n    color: #FFFFFF;\n}\n\n.first-upcoming-drop{\n    color: #ba63dd !important;\n}\n\n.submit_button { position: relative; right: 5px; cursor: pointer; height: 100%; line-height: 0.7; margin-left: 5px;}\n\n.input_wrapper { display: flex; flex-direction: row; }\n\n/* Stil für das Eingabefeld */\n.newsletter_form input[type="email"] {\n    background: none;\n    text-overflow: ellipsis;\n    border: none;\n    color: #fcddff !important;\n    text-transform: uppercase;\n    width: 100%; /* Breite des Eingabefelds */\n    max-width: 1200px;\n    outline: none;\n    overflow-x: auto; /* Allows horizontal scrolling */\n    white-space: nowrap; /* Prevents wrapping of the text */\n    text-align: left;\n    overflow-x: visible;\n    height: 100%;\n    /*caret-color: transparent;*/\n    /*padding-right: 20px;*/\n    padding: 0 !important;\n}\n\n/* Verstecken des Eingabefelds nach erfolgreicher Eingabe */\n.newsletter_form input[type="email"].hidden {\n    display: none;\n}\n\n.scroll-text {\n    position: fixed;\n    top: 120px;\n    left: 50%;\n    transform: translateX(-50%);\n    z-index: 1000;\n    text-align: center;\n    cursor: pointer;\n}\n\n.dropname {\n    width: 7ch;\n    min-width: 7ch;\n}\n\n@media (max-width: 500px) {\n    .utc {\n        display: none;\n    }\n    .dropname {\n        display: none;\n    }\n    body {\n        overflow-x: hidden;\n    }\n    .product-image {\n        height: calc(7.9vw* 0.666666);\n        MARGIN-LEFT: 20PX;\n    }\n    .newsletter_number_container{\n        transform: translateY(-50%);\n    }\n    .drop_container{\n        padding-left: 1.6vw;\n    }\n}\n\n@media (min-width: 501px) {\n    .utc {\n        display: inline;\n    }\n    .dropname {\n        display: inline;\n    }\n    body {\n        overflow-x: scroll;\n    }\n    .product-image {\n        height: calc(4.9vw* 0.666666);\n        MARGIN-LEFT: 20PX;\n    }\n    .newsletter_number_container{\n        transform: translateY(0);\n    }\n}\n\n#news-tab {\nposition: fixed;\nbottom: 0;\nleft: 0;\nwidth: 100%;\nheight: 100vh;\nbackground-color: #000000;\nborder-top: 1px solid white;\ntransition: transform 0.4s ease-in-out;\nz-index: 2222;\n}\n\n#news-header {\nheight: 50px;\ndisplay: flex;\nalign-items: center;\njustify-content: space-between;\npadding: 0 20px;\nclip-path: polygon(0% 0%, 98% 0%, 100% 100%, 0% 100%);\ncursor: pointer;\n}\n\n#news-headline {\ntext-transform: uppercase;\n}\n\n#toggle-arrow {\nfont-size: 16px;\ntransform: rotate(0deg);\ntransition: transform 0.3s ease;\n}\n\n#news-tab.full-height #toggle-arrow {\ntransform: rotate(180deg);\n}\n\n#news-media {\nwidth: 100%;\nheight: calc(100% - 130px);\nmax-height: 100%;\ncursor: pointer;\nalign-items: flex-start;\njustify-content: center;\ndisplay: flex;\n}\n/* Zustände */\n#news-tab.collapsed {\n    transform: translateY(calc(100% - 50px));\n}\n\n#news-tab.half-height {\n    transform: translateY(calc(50vh - 50px));\n}\n\n#news-tab.full-height {\n    transform: translateY(110px);\n}\n\n.media {\n    max-width: 100%;\n    max-height: 100%;\n    object-fit: contain;\n    cursor: pointer;\n}\n\n.news-hidden {\ntransform: translateY(100%) !important;\n}\n\n.ended{\ntext-decoration: line-through;\n/*pointer-events: none;*/\n}\n\n.active{\ncolor: #ffd3fe;\n}\n\n.blur-white{\nfilter: blur(2px);\ncolor: white !important;\n}\n\n.custom-cursor { position: absolute; width: 1ch; height: 1em; background-color: rgb(230, 230, 230); animation: blink 1s step-end infinite; }\n\n    @keyframes blink { from, to { opacity: 1; } 50% { opacity: 0; }}\n\n  .marquee {\n    display: inline-block;\n    white-space: nowrap;\n    animation: marquee var(--animation-duration) steps(var(--steps)) infinite;\n  }\n\n  @keyframes marquee {\n    0% {\n      transform: translate(0); /* Keine Verschiebung am Anfang */\n    }\n    100% {\n      transform: translate(calc(var(--overflow-amount) * -1ch)); /* Verschiebung um \'overflow-amount\' mal 1ch */\n    }\n  }\n\n\n\n',""]);var l=a},314:function(n){n.exports=function(n){var t=[];return t.toString=function(){return this.map((function(t){var e="",r=void 0!==t[5];return t[4]&&(e+="@supports (".concat(t[4],") {")),t[2]&&(e+="@media ".concat(t[2]," {")),r&&(e+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),e+=n(t),r&&(e+="}"),t[2]&&(e+="}"),t[4]&&(e+="}"),e})).join("")},t.i=function(n,e,r,o,i){"string"==typeof n&&(n=[[null,n,void 0]]);var a={};if(r)for(var l=0;l<this.length;l++){var c=this[l][0];null!=c&&(a[c]=!0)}for(var s=0;s<n.length;s++){var u=[].concat(n[s]);r&&a[u[0]]||(void 0!==i&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=i),e&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=e):u[2]=e),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),t.push(u))}},t}},601:function(n){n.exports=function(n){return n[1]}},72:function(n){var t=[];function e(n){for(var e=-1,r=0;r<t.length;r++)if(t[r].identifier===n){e=r;break}return e}function r(n,r){for(var i={},a=[],l=0;l<n.length;l++){var c=n[l],s=r.base?c[0]+r.base:c[0],u=i[s]||0,d="".concat(s," ").concat(u);i[s]=u+1;var f=e(d),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==f)t[f].references++,t[f].updater(p);else{var h=o(p,r);r.byIndex=l,t.splice(l,0,{identifier:d,updater:h,references:1})}a.push(d)}return a}function o(n,t){var e=t.domAPI(t);return e.update(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap&&t.supports===n.supports&&t.layer===n.layer)return;e.update(n=t)}else e.remove()}}n.exports=function(n,o){var i=r(n=n||[],o=o||{});return function(n){n=n||[];for(var a=0;a<i.length;a++){var l=e(i[a]);t[l].references--}for(var c=r(n,o),s=0;s<i.length;s++){var u=e(i[s]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}i=c}}},659:function(n){var t={};n.exports=function(n,e){var r=function(n){if(void 0===t[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(n){e=null}t[n]=e}return t[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}},540:function(n){n.exports=function(n){var t=document.createElement("style");return n.setAttributes(t,n.attributes),n.insert(t,n.options),t}},56:function(n,t,e){n.exports=function(n){var t=e.nc;t&&n.setAttribute("nonce",t)}},825:function(n){n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=n.insertStyleElement(n);return{update:function(e){!function(n,t,e){var r="";e.supports&&(r+="@supports (".concat(e.supports,") {")),e.media&&(r+="@media ".concat(e.media," {"));var o=void 0!==e.layer;o&&(r+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),r+=e.css,o&&(r+="}"),e.media&&(r+="}"),e.supports&&(r+="}");var i=e.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(r,n,t.options)}(t,n,e)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)}}}},113:function(n){n.exports=function(n,t){if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}}},t={};function e(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,exports:{}};return n[r](i,i.exports,e),i.exports}e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,{a:t}),t},e.d=function(n,t){for(var r in t)e.o(t,r)&&!e.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:t[r]})},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.nc=void 0;var r=e(72),o=e.n(r),i=e(825),a=e.n(i),l=e(659),c=e.n(l),s=e(56),u=e.n(s),d=e(540),f=e.n(d),p=e(113),h=e.n(p),m=e(377),v={};function g(n){return g="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(n){return _typeof(n)}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":_typeof(n)},g(n)}function y(){y=function(){return t};var n,t={},e=Object.prototype,r=e.hasOwnProperty,o=Object.defineProperty||function(n,t,e){n[t]=e.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",l=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function s(n,t,e){return Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}),n[t]}try{s({},"")}catch(n){s=function(n,t,e){return n[t]=e}}function u(n,t,e,r){var i=t&&t.prototype instanceof w?t:w,a=Object.create(i.prototype),l=new z(r||[]);return o(a,"_invoke",{value:O(n,e,l)}),a}function d(n,t,e){try{return{type:"normal",arg:n.call(t,e)}}catch(n){return{type:"throw",arg:n}}}t.wrap=u;var f="suspendedStart",p="suspendedYield",h="executing",m="completed",v={};function w(){}function b(){}function x(){}var k={};s(k,a,(function(){return this}));var E=Object.getPrototypeOf,L=E&&E(E(P([])));L&&L!==e&&r.call(L,a)&&(k=L);var _=x.prototype=w.prototype=Object.create(k);function S(n){["next","throw","return"].forEach((function(t){s(n,t,(function(n){return this._invoke(t,n)}))}))}function j(n,t){function e(o,i,a,l){var c=d(n[o],n,i);if("throw"!==c.type){var s=c.arg,u=s.value;return u&&"object"==g(u)&&r.call(u,"__await")?t.resolve(u.__await).then((function(n){e("next",n,a,l)}),(function(n){e("throw",n,a,l)})):t.resolve(u).then((function(n){s.value=n,a(s)}),(function(n){return e("throw",n,a,l)}))}l(c.arg)}var i;o(this,"_invoke",{value:function(n,r){function o(){return new t((function(t,o){e(n,r,t,o)}))}return i=i?i.then(o,o):o()}})}function O(t,e,r){var o=f;return function(i,a){if(o===h)throw Error("Generator is already running");if(o===m){if("throw"===i)throw a;return{value:n,done:!0}}for(r.method=i,r.arg=a;;){var l=r.delegate;if(l){var c=T(l,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===f)throw o=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=h;var s=d(t,e,r);if("normal"===s.type){if(o=r.done?m:p,s.arg===v)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(o=m,r.method="throw",r.arg=s.arg)}}}function T(t,e){var r=e.method,o=t.iterator[r];if(o===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=n,T(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),v;var i=d(o,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,v;var a=i.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,v):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,v)}function A(n){var t={tryLoc:n[0]};1 in n&&(t.catchLoc=n[1]),2 in n&&(t.finallyLoc=n[2],t.afterLoc=n[3]),this.tryEntries.push(t)}function F(n){var t=n.completion||{};t.type="normal",delete t.arg,n.completion=t}function z(n){this.tryEntries=[{tryLoc:"root"}],n.forEach(A,this),this.reset(!0)}function P(t){if(t||""===t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function e(){for(;++o<t.length;)if(r.call(t,o))return e.value=t[o],e.done=!1,e;return e.value=n,e.done=!0,e};return i.next=i}}throw new TypeError(g(t)+" is not iterable")}return b.prototype=x,o(_,"constructor",{value:x,configurable:!0}),o(x,"constructor",{value:b,configurable:!0}),b.displayName=s(x,c,"GeneratorFunction"),t.isGeneratorFunction=function(n){var t="function"==typeof n&&n.constructor;return!!t&&(t===b||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(n){return Object.setPrototypeOf?Object.setPrototypeOf(n,x):(n.__proto__=x,s(n,c,"GeneratorFunction")),n.prototype=Object.create(_),n},t.awrap=function(n){return{__await:n}},S(j.prototype),s(j.prototype,l,(function(){return this})),t.AsyncIterator=j,t.async=function(n,e,r,o,i){void 0===i&&(i=Promise);var a=new j(u(n,e,r,o),i);return t.isGeneratorFunction(e)?a:a.next().then((function(n){return n.done?n.value:a.next()}))},S(_),s(_,c,"Generator"),s(_,a,(function(){return this})),s(_,"toString",(function(){return"[object Generator]"})),t.keys=function(n){var t=Object(n),e=[];for(var r in t)e.push(r);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=P,z.prototype={constructor:z,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(F),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var n=this.tryEntries[0].completion;if("throw"===n.type)throw n.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function o(r,o){return l.type="throw",l.arg=t,e.next=r,o&&(e.method="next",e.arg=n),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],l=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),s=r.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(n,t){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===n||"continue"===n)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=n,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(n,t){if("throw"===n.type)throw n.arg;return"break"===n.type||"continue"===n.type?this.next=n.arg:"return"===n.type?(this.rval=this.arg=n.arg,this.method="return",this.next="end"):"normal"===n.type&&t&&(this.next=t),v},finish:function(n){for(var t=this.tryEntries.length-1;t>=0;--t){var e=this.tryEntries[t];if(e.finallyLoc===n)return this.complete(e.completion,e.afterLoc),F(e),v}},catch:function(n){for(var t=this.tryEntries.length-1;t>=0;--t){var e=this.tryEntries[t];if(e.tryLoc===n){var r=e.completion;if("throw"===r.type){var o=r.arg;F(e)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:P(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),v}},t}function w(n,t,e,r,o,i,a){try{var l=n[i](a),c=l.value}catch(n){return void e(n)}l.done?t(c):Promise.resolve(c).then(r,o)}function b(n){return function(){var t=this,e=arguments;return new Promise((function(r,o){var i=n.apply(t,e);function a(n){w(i,r,o,a,l,"next",n)}function l(n){w(i,r,o,a,l,"throw",n)}a(void 0)}))}}v.styleTagTransform=h(),v.setAttributes=u(),v.insert=c().bind(null,"head"),v.domAPI=a(),v.insertStyleElement=f(),o()(m.A,v),m.A&&m.A.locals&&m.A.locals,window.addEventListener("scroll",(function(){var n=window.scrollY,t=document.querySelector(".scroll-text");n>0?(t.classList.replace("fade-in","fade-out"),t.style.userSelect="none",t.style.pointerEvents="none"):(t.classList.replace("fade-out","fade-in"),t.style.userSelect="",t.style.pointerEvents="")})),window.addEventListener("load",(function(){window.addEventListener("scroll",(function(){var n=window.scrollY,t=document.querySelector(".scroll-text");n>0?(t.classList.replace("fade-in","fade-out"),t.style.userSelect="none",t.style.pointerEvents="none"):(t.classList.replace("fade-out","fade-in"),t.style.userSelect="",t.style.pointerEvents="")}))})),document.addEventListener("DOMContentLoaded",(function(){var n=document.getElementById("blurOverlay");window.addEventListener("scroll",(function(){var t=window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*15;n.style.backdropFilter="blur(".concat(t,"px)"),n.style.webkitBackdropFilter="blur(".concat(t,"px)")}))})),document.addEventListener("DOMContentLoaded",b(y().mark((function n(){var t,e,r,o,i,a,l,c,s,u,d,f,p,h,m;return y().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return d=function(){return(d=b(y().mark((function n(){var t,e;return y().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=3,fetch(c,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":s},body:JSON.stringify({query:'\n        {\n            blog(handle: "announcement") {\n                articles(first: 1) {\n                    edges {\n                        node {\n                            title\n                            onlineStoreUrl\n                            image {\n                                originalSrc\n                                altText\n                            }\n                            metafields(identifiers: [\n                                { namespace: "announcement", key: "link" }\n                            ]) {\n                                key\n                                value\n                            }\n                        }\n                    }\n                }\n            }\n        }'})});case 3:return t=n.sent,n.next=6,t.json();case 6:if(!((e=n.sent).data.blog&&e.data.blog.articles.edges.length>0)){n.next=11;break}return n.abrupt("return",e.data.blog.articles.edges[0].node);case 11:return console.error("No articles found in the announcement blog."),n.abrupt("return",null);case 13:case"end":return n.stop()}}),n)})))).apply(this,arguments)},u=function(){return d.apply(this,arguments)},t=document.getElementById("news-tab"),e=document.getElementById("news-header"),r=document.getElementById("news-media"),o=document.getElementById("news-headline"),i="collapsed",a=window.scrollY,l=window.scrollY,c="https://checkout.fadedcloth.de/api/2023-04/graphql.json",s="ed72f09d8742f37356305b6e49310909",n.prev=11,n.next=14,u();case 14:(f=n.sent)?(o.textContent=f.title,(h=document.createElement("img")).src=f.image.originalSrc,h.alt=f.image.altText||"Blog Image",h.id="media",h.classList.add("media"),h.setAttribute("data-tilt",""),r.appendChild(h),m=(null===(p=f.metafields[0])||void 0===p?void 0:p.value)||f.onlineStoreUrl,r.addEventListener("click",(function(){window.open(m,"_blank")})),t.classList.remove("hidden")):t.classList.add("hidden"),n.next=22;break;case 18:n.prev=18,n.t0=n.catch(11),console.error("Error loading blog post:",n.t0),t.classList.add("hidden");case 22:null==e||e.addEventListener("click",(function(){"collapsed"===i?(t.classList.remove("collapsed"),t.classList.add("half-height"),i="half-height"):"half-height"===i?(t.classList.remove("half-height"),t.classList.add("full-height"),i="full-height"):"full-height"===i&&(t.classList.remove("full-height"),t.classList.add("collapsed"),i="collapsed")})),window.addEventListener("scroll",(function(){var n=window.scrollY;n>a&&"collapsed"===i?t.classList.add("news-hidden"):n<a&&n<l-30&&t.classList.remove("news-hidden"),a=n,t.classList.contains("news-hidden")&&(l=n)}));case 24:case"end":return n.stop()}}),n,null,[[11,18]])}))))}();