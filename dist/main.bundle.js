(()=>{"use strict";var n={142:(n,e,t)=>{t.d(e,{A:()=>s});var o=t(601),a=t.n(o),i=t(314),r=t.n(i)()(a());r.push([n.id,'\n/* Reset und Grundstrukturen */\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    scroll-behavior: smooth;\n    /*cursor: none;  --ONLY FOR CUSTOM CURSOR--*/\n}\n\n:root {\n    --m: 4rem;\n  }\n\nhtml, body {\n    font-family: \'IBM Plex Sans\';\n    width: 100%;\n    height: 100%;\n    -webkit-text-size-adjust: 100%; /* Verhindert Textgröße-Anpassungen in iOS */\n    text-size-adjust: 100%; /* Verhindert Textgröße-Anpassungen in Android */\n    -ms-text-size-adjust: 100%; /* Verhindert Textgröße-Anpassungen in IE/Edge */\n    -webkit-font-smoothing: antialiased; /* Bessere Kantenglättung in iOS/Safari */\n    -moz-osx-font-smoothing: grayscale; /* Bessere Kantenglättung in macOS */\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* Entfernt Tap-Highlight in iOS */\n}\n\nbody {\n    background-color: #000;\n    color: white;\n    font-family: "IBM Plex Sans";\n    font-size: 11.5px;\n    line-height: 14px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    margin: 0;\n    position: relative;\n    -webkit-appearance: none; /* Entfernt iOS/Safari-Standardbutton-Styling */\n    appearance: none;\n    font-weight: 300;\n    color: #d5d5d5;\n}\n\nh2 {\n    font-weight: 500;\n    text-align: center;\n    font-size: var(--m);\n    margin: 0;\n  }\n  \n  h3 {\n    font-weight: 500;\n    font-size: calc(0.6 * var(--m));\n    margin: 0;\n  }\n\n  a {\n    text-decoration: none;\n    color: inherit;\n    color: #d5d5d5;\n  }\n\n  .text {\n    text-decoration: none;\n    color: #ffffff;\n    margin: 0;\n    padding: 14px; \n    line-height: 1.5;\n    white-space: pre-wrap; \n  }\n\n/* Logo Container */\n.logo-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: fixed;\n    pointer-events: none;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    /*touch-action: pan-y;*/\n    width: 60%;\n    height: auto;\n}\n\n.header-logo-container {\n    width: 60px;\n    height: 60px;\n    margin-top: 10px;\n    margin-bottom: 10px;\n    border-radius: 50%;\n    background: #ffffff1a;\n    box-shadow: -4px -4px 9px #00000040 inset, 4px 4px 10px #ffffff40 inset;\n    -webkit-backdrop-filter: blur(17px);\n    backdrop-filter: blur(17px);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1.5px solid rgba(255, 255, 255, 0.2);\n    transition: all 0.3s ease;\n    z-index: 15000;\n}\n\n.header-logo-container:hover{\n    width: 60px;\n    height: 60px;\n    margin-top: 10px;\n    margin-bottom: 10px;\n    border-radius: 50%;\n    background: #ffffff00;\n    box-shadow: -4px -4px 9px #00000000 inset, 4px 4px 10px #ffffff00 inset;\n    -webkit-backdrop-filter: blur(17px);\n    backdrop-filter: blur(17px);\n    border: 1.5px solid #ffffff;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: all 0.3s ease;\n    z-index: 15000;\n}\n\n.header-logo-container svg{\n    width: 40px;\n    height: 40px;\n    fill: #ffffff;\n}\n\n.logo {\n    max-width: 100%;\n    max-height: 100%;\n    object-fit: contain;\n}\n\n/* Navigation Link */\n.nav-link {\n    position: absolute;\n    top: 0px;\n    padding: 10px;\n    text-decoration: none;\n}\n\n.underlineonhover:hover {\n    text-decoration: underline;\n}\n\n.underlineonhover {\n    text-decoration: none;\n}\n\n.right {\n    right: 0px;\n    animation: slideInRight 0.5s forwards;\n}\n\n.top {\n    animation: slideInTop 0.5s forwards;\n    z-index: 10000;\n}\n\n.left {\n    left: 0px;\n    animation: slideInLeft 0.5s forwards;\n}\n\n.top-right {\n    position: fixed;\n    top: 0px;\n    right: 0px;\n    animation: slideInRight 0.5s forwards;\n    z-index: 10000;\n}\n\n.top-left {\n    position: fixed;\n    top: 0px;\n    left: 0px;\n    animation: slideInLeft 0.5s forwards;\n    z-index: 10000;\n}\n\n.href {\n    text-decoration: underline;\n    color: #ffffff;\n    \n}\n\n.underline {\n    text-decoration: underline;\n}\n\n/* Buttons Container - untereinander angeordnet */\n.buttons-container {\n    position: fixed;\n    display: flex;\n    flex-direction: row;\n    gap: 10px;\n    width: 100vw;\n    overflow: visible;\n    z-index: 7000;\n    justify-content: flex-start;\n    overflow-x: scroll;\n    bottom: 20px;\n    scroll-behavior: smooth;\n    scrollbar-width: none;\n    -ms-overflow-style: none;\n    padding: 10px;\n    left: 10px;\n    white-space: nowrap;\n}\n\n.buttons-container::-webkit-scrollbar {\n    display: none;\n  }\n\n.buttons-container:focus-within {\n    overflow-x: auto;\n  }\n\n.buttons-container:active, \n  .buttons-container:hover {\n    scroll-behavior: smooth;\n  }\n\n.glass-button {\n    background: rgba(0, 0, 0, 0.1);\n    box-shadow: \n        -4px -4px 9px #00000040 inset,\n        4px 4px 10px #ffffff40 inset,\n        0 0 4px 2px rgba(255, 255, 255, 0.5);\n    -webkit-backdrop-filter: blur(15px);\n    backdrop-filter: blur(15px);\n    border: none;\n    padding: 10px 20px;\n    font-size: 14.5px;\n    line-height: 12.5px;\n    color: white;\n    border-radius: 12px;\n    cursor: pointer;\n    transition: box-shadow 0.3s ease;\n    white-space: nowrap;\n    -webkit-appearance: none;\n    appearance: none;\n}\n\n.email-button {\n    background: rgba(255, 255, 255, 0);\n    border: none;\n    padding: 10px 20px;\n    font-size: 14.5px;\n    line-height: 12.5px;\n    color: white;\n    text-decoration: underline;\n    border-radius: 12px;\n    cursor: pointer;\n    transition: box-shadow 0.3s ease;\n    white-space: nowrap;\n    -webkit-appearance: none;\n    appearance: none;\n}\n.email-button:hover {\n    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5);\n    text-decoration: none;\n}\n\n.glass-button:hover {\n    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5);\n    background: rgba(0, 0, 0, 0.1);\n}\n\n.active-button {\n    text-decoration: underline;\n    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5);\n}\n\n.glass-panel {\n    position: fixed;\n    /*bottom: 20px;*/\n    left: calc(150px + 40px);\n    background: rgba(52, 52, 52, 0.5);\n    padding: 40px 20px;\n    border-radius: 15px;\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n    width: auto;/*300px;*/\n    max-width: calc(100vw - 80px);\n    -webkit-backdrop-filter: blur(15px);\n    backdrop-filter: blur(15px);\n    z-index: 10000;\n}\n\n/* HREFs in Panels */\n.glass-panel .panel-link {\n    color: white;\n    text-decoration: none;\n    margin-right: 20px;\n}\n\n.glass-panel .panel-link:hover {\n    text-decoration: underline;\n}\n\n/* Close Button (X) */\n.glass-panel .close-btn {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    background: none;\n    border: none;\n    color: white;\n    font-size: 14.5px;\n    cursor: pointer;\n}\n\n/* Copyright Text im zweiten Panel */\n#panel2 .copyright {\n    color: rgba(255, 255, 255, 0.5); /* Leicht transparent */\n    text-align: left; /* Links bündig */\n    margin-top: 20px;\n}\n\n/* Versteckte Elemente */\n.hidden {\n    display: none;\n    visibility: hidden;\n}\n\n.visible {\n    visibility: visible;\n}\n\n/* Headline für das Subscribe-Panel */\n.headline {\n    text-transform: uppercase;\n    text-align: center;\n    color: white;\n    font-size: 14.5px;\n    line-height: 12.5px;\n    text-decoration: underline;\n    font-weight: 500;\n}\n\n.small-headline {\n    text-transform: uppercase;\n    text-align: left;\n    margin-bottom: 10px;\n    color: white;\n    text-decoration: underline;\n    font-weight: 500;\n}\n\n/* Email-Input */\n.email-input {\n    width: 100%;\n    padding: 10px;\n    background: rgba(255, 255, 255, 0);\n    border: none;\n    outline: none;\n    color: #fff;\n    text-align: center;\n    text-transform: uppercase;\n    margin-bottom: 20px;\n    border-radius: 12px;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    text-decoration: none;\n}\n\n.email-input:focus{\n    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5);\n}\n\n.form-buttons {\n    display: flex;\n    justify-content: space-between;\n    gap: 10px;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    justify-content: center;\n}\n\n.small-button {\n    padding: 8px 15px;\n    border-radius: 10px;\n}\n\ninput[type="email"] {\n    -webkit-appearance: none;\n    appearance: none;\n    border-radius: 12;\n    background-color: transparent !important;\n    box-shadow: none;\n    color: #fff;\n    padding: 10px;\n    text-align: center;\n    text-transform: uppercase;\n    outline: none;\n    text-decoration: none;\n}\ninput[type="text"] {\n    -webkit-appearance: none;\n    appearance: none;\n    border-radius: 12;\n    background-color: transparent !important;\n    box-shadow: none;\n    color: #fff;\n    padding: 10px;\n    text-align: center;\n    text-transform: uppercase;\n    outline: none;\n    text-decoration: none;\n}\n/* CSS BEGIN */\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus,\ninput:-webkit-autofill:active {\n    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;\n    box-shadow: 0 0 0px 1000px transparent inset !important;\n    -webkit-text-fill-color: white !important;\n}\ninput[type="email"],\ninput[type="text"],\nbutton {\n    color: white !important;\n    -webkit-appearance: none;\n    appearance: none;\n    box-shadow: none;\n}\ninput::placeholder {\n    color: rgba(255, 255, 255, 0.3);\n    background-color: #ffffff00;\n}\nbutton:focus, input:focus {\n    outline: none;\n}\ntextarea,\ninput.text,\ninput[type="text"],\ninput[type="button"],\ninput[type="submit"],\ninput[type="email"],\n.input-checkbox {\n-webkit-appearance: none;\nappearance: none;\n}\n\n.shop-container {\n    display: grid;\n    grid-template-columns: repeat(1, 1fr);\n    gap: 10px;\n    padding: 80px 10px 10px 10px;\n    max-width: 1200px;\n    width: 100%;\n    margin: 0 auto;\n    max-height: 70vh;\n    overflow-y: auto; \n}\n  \n  .main-header{\n    position: fixed;\n    top: 0;\n    width: 100%;\n    height: 80px;\n    z-index: 10000;\n    display: flex;\n    align-items: flex-start;\n    justify-content: center;\n    background-color: rgba(0, 0, 0, 0);\n  }\n  \n  @media (min-width: 768px) {\n    .shop-container {\n        grid-template-columns: repeat(2, 1fr);\n    }\n  }\n  \n  .shop-item {\n    position: relative;\n    overflow: hidden;\n    cursor: pointer;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    max-width: 100%;\n    height: auto;\n    transition: 0.3s;\n  }\n  \n  .shop-item img {\n    width: 100%;\n    height: auto;\n    display: block;\n    max-width: 500px;\n    object-fit: cover;\n  }\n  \n  .item-info {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    color: white;\n    text-align: center;\n    opacity: 0;\n    transition: opacity 0.3s ease;\n    pointer-events: none;\n  }\n  \n  .shop-item:hover .item-info {\n    opacity: 1;\n  }\n  \n  .shop-links {\n    position: relative;\n    bottom: 0;\n    width: 100%;\n    height: 60px;\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    padding: 10px 0;\n    background-color: black;\n    z-index: 1000;\n    margin-top: 20px;\n  }\n  \n  .shop-links a {\n    display: inline-block;\n    margin-right: 20px;\n    color: #d5d5d5;\n    text-decoration: none;\n  }\n  \n  .shop-links a:hover {\n    text-decoration: underline;\n  }\n\n.header-logo {\n    z-index: 10000;\n    width: 80px;\n    height: auto;\n    display: block;\n}\n\nvideo::-webkit-media-controls {\n    display: none !important;\n  }\n  \n  video::-moz-media-controls {\n    display: none !important;\n  }\n  \n  video::-ms-media-controls {\n    display: none !important;\n  }\n  \n  video::-webkit-media-controls-picture-in-picture-button {\n    display: none !important;\n  }\n  \n  video::-webkit-media-controls-fullscreen-button {\n    display: none !important;\n  }\n  \n  video {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none; \n    user-select: none; \n    touch-action: none;\n    pointer-events: none; \n    pointer-events: none; \n    background-color: transparent;\n    user-select: none;\n  }\n\n  img {\n    pointer-events: none;\n    user-select: none; \n    touch-action: none;\n    -webkit-user-select: none;\n    -webkit-touch-callout: none; \n    -webkit-user-drag: none;\n    -moz-user-select: none; \n    -ms-user-select: none; \n    user-select: none; \n    pointer-events: none;\n  }\n\n  #content-body {\n    margin-top: 20px;\n    max-width: 300px;\n    line-height: 1.5;\n    max-height: 400px;\n    overflow-y: auto;\n    padding: 10px;\n    border: 1px solid rgba(255, 255, 255, 0.2);\n    border-radius: 12px;\n    word-wrap: break-word; \n    overflow-wrap: break-word;\n}\n\n.main-body {\n    display: flex;\n    justify-content: center;\n    align-items: normal;\n    max-width: 600px;\n    width: 100%;\n    margin: 20px auto;\n    padding: 20px;\n    -webkit-backdrop-filter: blur(15px);\n    backdrop-filter: blur(15px);\n    border-radius: 12px;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);\n}\n\n    @media (max-width: 800px) {\n        .main-body {\n            width: calc(100% - 40px);\n            margin: 20px;\n            margin-bottom: 40px;\n        }\n    }\n#content-body::-webkit-scrollbar {\n    width: 8px;\n}\n\n#content-body::-webkit-scrollbar-thumb {\n    background-color: rgba(255, 255, 255, 0.5);\n    border-radius: 10px;\n}\n\n#content-body::-webkit-scrollbar-thumb:hover {\n    background-color: rgba(255, 255, 255, 0.7);\n}\n\n.main-body::-webkit-scrollbar {\n    width: 8px;\n}\n.main-body::-webkit-scrollbar-track {\n    background: transparent;\n}\n.main-body::-webkit-scrollbar-thumb {\n    background: rgba(255, 255, 255, 0.5);\n    border-radius: 10px;\n}\n\n.main-body::-webkit-scrollbar-thumb:hover {\n    background: rgba(255, 255, 255, 0.7);\n}\n\n.main-body {\n    scrollbar-width: thin;\n    scrollbar-color: rgba(255, 255, 255, 0.5) transparent;\n}\n.main-body::-ms-scrollbar {\n    display: none;\n}\n\n.main-body {\n    scrollbar-width: thin;\n    scrollbar-color: rgba(255, 255, 255, 0.5) transparent;\n}\n\n.sms-message {\n    color: white;\n    margin-top: 10px;\n}\n\n@media (max-width: 767px) {\n  \n    .glass-button {\n      white-space: nowrap;\n      flex-shrink: 0;\n    }\n\n    .glass-panel .panel-link .glass-button {\n        font-size: 14px;\n    }\n\n    .glass-panel {\n        left: 30px;\n        padding-right: 20px;\n    }\n    \n    .mainshop-container {\n        margin-bottom: 20px;\n    }\n  }\n\n  .info-text{\n    color: rgba(255, 255, 255, 0.5);\n    text-align: center;\n  }\n\n  .custom-cursor {\n    position: fixed;\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    background-color: rgba(255, 255, 255, 0.2);\n    pointer-events: none;\n    transform: translate(-50%, -50%);\n    transition: transform 0.1s ease-out, width 0.3s ease, height 0.3s ease, background-color 0.3s ease;\n    z-index: 1000000;\n}\n.custom-cursor.hover {\n    width: 80px;\n    height: 80px;\n    background-color: rgba(255, 255, 255, 0.4);\n    transform: translate(-50%, -50%) scale(1.2);\n}\n\n.glass-switch {\n    position: relative;\n    width: 60px;\n    height: 30px;\n    background: rgba(255, 255, 255, 0.1);\n    -webkit-backdrop-filter: blur(10px);\n    backdrop-filter: blur(10px);\n    border-radius: 30px;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n}\n\n.glass-switch-circle {\n    position: absolute;\n    top: 2px;\n    left: 2px;\n    width: 24px;\n    height: 24px;\n    background: white;\n    border-radius: 50%;\n    transition: left 0.3s ease;\n}\n\n.glass-switch.active {\n    background: rgba(255, 255, 255, 0.3);\n}\n\n.glass-switch.active .glass-switch-circle {\n    left: 32px;\n}\n\n.switch-label {\n    margin-right: 10px;\n    color: white;\n    font-family: "IBM Plex Sans";\n}\n\n.switch-container {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    z-index: 100;\n    display: flex;\n    align-items: center;\n}\n\n@keyframes slideInLeft {\n    0% {\n        transform: translateX(-100%);\n        opacity: 0;\n    }\n    100% {\n        transform: translateX(0);\n        opacity: 1;\n    }\n}\n\n@keyframes slideInTop {\n    0% {\n        transform: translateY(-100%);\n        opacity: 0;\n    }\n    100% {\n        transform: translateY(0);\n        opacity: 1;\n    }\n}\n\n@keyframes slideInRight {\n    0% {\n        transform: translateX(100%);\n        opacity: 0;\n    }\n    100% {\n        transform: translateX(0);\n        opacity: 1;\n    }\n}\n\n@keyframes shake {\n    0% { transform: translateX(0); }\n    25% { transform: translateX(-5px); }\n    50% { transform: translateX(5px); }\n    75% { transform: translateX(-5px); }\n    100% { transform: translateX(0); }\n}\n\n.shake {\n    animation: shake 0.5s forwards;\n}\n\n.checkbox-container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    margin-bottom: 10px;\n    color: rgba(255, 255, 255, 0.5);\n}\n\n.custom-checkbox {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    width: 12px;\n    height: 12px;\n    border: 1px solid whitesmoke;\n    border-radius: 50%;\n    position: relative;\n    outline: none;\n    cursor: pointer;\n    margin-right: 10px;\n    transition: background 0.3s ease;\n}\n\n.custom-checkbox:checked::after {\n    content: \'\';\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 12px;\n    height: 12px;\n    border: 1px solid rgb(255, 255, 255);\n    border-radius: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.cart-button {\n    background: rgba(255, 255, 255, 0.1);\n    -webkit-backdrop-filter: blur(10px);\n    backdrop-filter: blur(10px);\n    border: none;\n    padding: 10px;\n    z-index: 2000;\n    margin: 10PX;\n    color: white;\n    border-radius: 12px;\n    cursor: pointer;\n    transition: box-shadow 0.3s ease;\n    white-space: nowrap; /* Verhindert Zeilenumbruch */\n    -webkit-appearance: none; /* Entfernt iOS/Safari-Standardbutton-Styling */\n    appearance: none;\n}\n\n.cart-button:hover {\n    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5);\n}\n/* iOS-Spezifisches Styling anpassen */\nselect::-webkit-inner-spin-button,\nselect::-webkit-outer-spin-button {\n    -webkit-appearance: none; /* Entfernt iOS Standardpfeile */\n    margin: 0;\n}\n\nselect::-webkit-search-cancel-button,\nselect::-webkit-search-decoration {\n    -webkit-appearance: none; /* Entfernt iOS Default-Styles */\n}\n\nselect::-webkit-select {\n    -webkit-appearance: none; /* Verhindert das iOS-Select-Styling */\n}\n\nselect::-ms-expand {\n    display: none;\n}\n\n/* iOS fixes for select element */\nselect:focus {\n    outline: none; /* Entfernt das Standard-iOS-Outlining */\n    border: none;\n}\n\n.link-button {\n    background: none; /* Kein Hintergrund */\n    border: none; /* Keine Umrandung */\n    color: inherit; /* Textfarbe erben */\n    cursor: pointer; /* Zeiger als Cursor */\n    font: inherit; /* Schriftart erben */\n    padding: 0; /* Kein Innenabstand */\n    text-decoration: none; /* Keine Unterstreichung */\n}\n\nselect {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n}\n\n.link-button:hover {\n    text-decoration: underline; /* Unterstreichen beim Hover */\n}\n\n  .video-wrapper {\n    position: absolute; \n    top: 50%;           \n    left: 50%;           \n    transform: translate(-50%, -50%); \n    width: 100%;         \n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    touch-action: pan-y;\n}\n\n.hover-text {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    color: white;\n    pointer-events: none;\n    transition: opacity 0.3s ease;\n}\n\n.hover-text.hidden {\n    opacity: 0;\n}\n\n.nav-button {\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    background: transparent;\n    border: none;\n    color: white;\n    font-size: 2rem;\n    cursor: pointer;\n    z-index: 10;\n    margin-left: 10px;\n    margin-right: 10px;\n}\n\n.collection-links {\n    position: absolute;\n    left: 50%; /* Horizontale Zentrierung */\n    transform: translateX(-50%); /* Zentrierungsfix */\n}\n\n@media (max-width: 800px) {\n    .collection-links {\n        top: -50px; /* Positionieren über dem Toggler */\n        display: flex; /* Flex-Layout für die Links */\n        flex-direction: row; /* Links horizontal anordnen */\n    }\n}\n\n@media (min-width: 800px) {\n    .collection-links {\n        display: flex; /* Flex-Layout für die Links */\n        flex-direction: column; /* Links untereinander anordnen */\n        bottom: 10px; /* Abstand vom unteren Rand */\n        right: 10px; /* Abstand vom rechten Rand */\n    }\n}\n\n.collection-links a {\n    padding: 5px 10px; /* Padding für jeden Link */\n    margin: 5px 0; /* Abstand zwischen den Links */\n    text-decoration: none; /* Unterstreichung entfernen */\n    color: black; /* Link-Farbe */\n    border-radius: 5px; /* Abgerundete Ecken */\n    background-color: rgba(255, 255, 255, 0.8); /* Hintergrundfarbe mit Transparenz */\n    transition: background-color 0.3s; /* Übergangseffekt */\n}\n\n.collection-links a:hover {\n    background-color: rgba(200, 200, 200, 0.8); /* Hintergrundfarbe beim Hover */\n}\n\n/* Styling für das gesamte select Element */\n#social-select {\n    appearance: none;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    background: rgba(255, 255, 255, 0.1);\n    border: none;\n    text-align: center;\n    padding: 10px 20px;\n    font-size: 14.5px;\n    line-height: 12.5px;\n    color: white;\n    border-radius: 12px;\n    cursor: pointer;\n    transition: box-shadow 0.3s ease;\n    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    outline: none;\n    text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.8); /* Weißer Schattentext */\n}\n\n/* Entfernt das Dropdown-Symbol bei WebKit-basierten Browsern (z.B. Chrome, Safari) */\n#social-select::-webkit-appearance {\n    appearance: none;\n}\n\n/* Styling für die Optionsliste */\n#social-select option {\n    background: transparent;\n    color: white;\n    padding: 10px 15px;\n    border: none;\n    text-shadow: none;\n    font-size: 14.5px;\n    white-space: nowrap;\n    cursor: pointer;\n    border-radius: 0;\n}\n\n/* Optional: Hover-Effekt für die Optionen */\n#social-select option:hover {\n    background: rgba(255, 255, 255, 0.1);\n    text-decoration: underline;\n}\n\n/* Fokus-Effekt beim Klicken */\n#social-select:focus {\n    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); /* Weißer Glanz beim Fokussieren */\n}\n\n.social-container {\n    display: flex;\n    align-items: center; /* Zentriert die Elemente vertikal */\n    gap: 20px; /* Abstand zwischen den Elementen */\n}\n\n@media screen and (-webkit-min-device-pixel-ratio:0) {\n    #social-select {\n        font-size: 14.5px;\n        padding: 10px 20px;\n    }\n    #social-select option {\n        background: rgba(0, 0, 0, 0.1);\n        color: white;\n    }\n}\n\n.jump {\n    animation: jump 0.5s ease-in-out;\n}\n\n@keyframes jump {\n    0% { transform: translateY(0); }\n    25% { transform: translateY(-5px); }\n    50% { transform: translateY(5px); }\n    75% { transform: translateY(-5px); }\n    100% { transform: translateY(0); }\n}\n\n.mainshop-container {\n    max-width: 880px;\n    margin: 0;\n    padding-bottom: 80px;\n    box-sizing: border-box;\n    position: relative;\n    top: 80px;\n    z-index: 5000;\n    overflow: visible;\n}\n\n.mainshop-container::-webkit-scrollbar {\n    display: none; /* Versteckt die Scroll-Leiste in Webkit-Browsern */\n}\n\n/* Container für die Items */\n.mainshop-items {\n    display: flex; /* Flexbox verwenden */\n    flex-wrap: wrap; /* Items in Zeilen anordnen */\n}\n\n/* Zwei Spalten für die Items */\n.mainshop-item {\n    display: flex; /* Flexbox verwenden */\n    flex-direction: column; /* Elemente innerhalb des Items untereinander anordnen */\n    width: 50%; /* Breite ohne Abzug für Zwischenraum */\n    box-sizing: border-box;\n    text-align: center;\n    background-color: black;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden; /* Bild bleibt im Rahmen */\n    vertical-align: top;\n    border: 1px solid rgba(255, 255, 255, 0.3); /* Durchgehende Grenze für jedes Item */\n}\n\n/* Bild quadratisch mit 20px margin, aber nur für das Bild */\n.mainshop-item img {\n    width: calc(100% - 80px); /* Bild innerhalb des Containers */\n    height: auto; /* Höhe automatisch */\n    margin: 115px 40px 40px 40px;\n    object-fit: contain; /* Verhindert das Zuschneiden des Bildes */\n    flex-grow: 1; /* Bild füllt den verfügbaren Platz aus */\n}\n\n.mainshop-item .info {\n    padding: 10px 0;\n    height: auto; /* Höhe anpassen */\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n}\n\n.mainshop-item .name {\n    margin: 0;\n    line-height: 13px;\n}\n\n.mainshop-item .price {\n    margin-top: 10px;\n    line-height: 13px;\n}\n\n/* Horizontale Linie über jeder Zeile */\n.mainshop-item::before {\n    content: "";\n    display: block;\n    width: 100%;\n    height: 1px;\n    background-color: rgba(255, 255, 255, 0.3);\n    position: absolute;\n    top: -20px; /* Platzierung über dem Element */\n    left: 0;\n    z-index: 6000;\n}\n\n/* Medienabfrage für kleinere Bildschirme */\n@media (max-width: 920px) {\n    .mainshop-container {\n        max-width: 100%;\n    }\n}\n\n#label-toggle-container {\n    margin-top: 10px;\n    margin-right: 10px;\n}\n\n.clickcursor {\n    cursor: pointer;\n}\n\n@keyframes fade-in{\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n\n@keyframes fade-out{\n    0% {\n        opacity: 1;\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n\n.fade-in{\n    opacity: 0;\n    animation: fade-in .5s .7s ease forwards;\n        animation-duration: 0.5s;\n        animation-timing-function: ease;\n        animation-delay: 0.7s;\n        animation-iteration-count: 1;\n        animation-direction: normal;\n        animation-fill-mode: forwards;\n        animation-play-state: running;\n        animation-name: fade-in;\n        animation-timeline: auto;\n        animation-range-start: normal;\n        animation-range-end: normal;\n}\n\n.fade-out{\n    opacity: 1;\n    animation: fade-in .5s .7s ease forwards;\n        animation-duration: 0.5s;\n        animation-timing-function: ease;\n        animation-delay: 0.7s;\n        animation-iteration-count: 1;\n        animation-direction: normal;\n        animation-fill-mode: forwards;\n        animation-play-state: running;\n        animation-name: fade-out;\n        animation-timeline: auto;\n        animation-range-start: normal;\n        animation-range-end: normal;\n}\n\n.soft-shake {\n    animation: soft-shake 13s infinite;\n    animation-duration: 13s;\n    animation-timing-function: ease;\n    animation-delay: 0s;\n    animation-iteration-count: infinite;\n    animation-direction: normal;\n    animation-fill-mode: none;\n    animation-play-state: running;\n    animation-name: soft-shake;\n    animation-timeline: auto;\n    animation-range-start: normal;\n    animation-range-end: normal;\n}\n\n@keyframes soft-shake {\n    0% {\n        transform: translateY(0px) rotate(-5deg);\n    }\n    45% {\n        transform: translateY(0px) rotate(5deg);\n    }\n    100% {\n        transform: translateY(0px) rotate(-5deg);\n    }\n}\n\n*::-webkit-scrollbar-track {\n    background: transparent; /* Transparenter Hintergrund der Scrollbar */\n  }\n  \n  /* Entfernt die Pfeiltasten von allen Scrollbars in Webkit-basierten Browsern */\n  *::-webkit-scrollbar-button {\n    display: none; /* Versteckt die Pfeile an den Scrollbalken */\n  }\n\n  @keyframes floating {\n    0% {\n        transform: translateY(0px) rotate(0deg);\n    }\n    45% {\n        transform: translateY(-8px) rotate(0deg);\n    }\n    100% {\n        transform: translateY(0px) rotate(0deg);\n    }\n  }\n\n.floating {\n    animation: floating 3s infinite;\n    animation-duration: 3s;\n    animation-timing-function: ease;\n    animation-delay: 0s;\n    animation-iteration-count: infinite;\n    animation-direction: normal;\n    animation-fill-mode: none;\n    animation-play-state: running;\n    animation-name: floating;\n    animation-timeline: auto;\n    animation-range-start: normal;\n    animation-range-end: normal;\n}\n\n.scroll-effect-bottom{\n    width: 100%;\n    height: 140px;\n    position: fixed;\n    bottom: 0px;\n    background: linear-gradient(to bottom, transparent, black);\n}\n\n.scroll-effect-top{\n    width: 100%;\n    height: 140px;\n    position: fixed;\n    top: 0px;\n    background: linear-gradient(to top, transparent, black);\n}\n\n.text-box{\n    background-color: #111111;\n    font-family: monospace;\n    color: #84898E !important;\n    width: auto;\n    padding: 2px;\n    margin: 10px;\n    display: flex;\n    flex-direction: row;\n    z-index: 20000;\n}\n\n.cart-count-bubble {\n    position: absolute;\n    top: 3px;\n    left: 10px;\n    width: 20px;\n    height: 20px;\n    background-color: #ff2500;\n    border-radius: 50%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 2;\n    box-shadow: inset -2px -2px 6px #00000026;\n    transition: transform .3s ease;\n}\n\n.blurred-eclipse-background {\n    position: absolute;\n    width: 90%;\n    aspect-ratio: 1.625;\n    background-color: #ffd3fe;\n    border-radius: 50%;\n    opacity: 0;\n    transition: all .3s ease;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    overflow: visible !important;\n    display: block !important;\n    filter: blur(15px);\n}\n\n.blurred-eclipse-background:hover {\n    opacity: 1;\n}\n\n#back-arrow {\n    display: inline-block;\n    transition: transform 0.3s ease-out;\n}\n\n#back-button:hover #back-arrow {\n    transform: translateX(-5px);\n}',""]);const s=r},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,a,i){"string"==typeof n&&(n=[[null,n,void 0]]);var r={};if(o)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(r[l]=!0)}for(var p=0;p<n.length;p++){var c=[].concat(n[p]);o&&r[c[0]]||(void 0!==i&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=i),t&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=t):c[2]=t),a&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=a):c[4]="".concat(a)),e.push(c))}},e}},601:n=>{n.exports=function(n){return n[1]}},72:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var i={},r=[],s=0;s<n.length;s++){var l=n[s],p=o.base?l[0]+o.base:l[0],c=i[p]||0,d="".concat(p," ").concat(c);i[p]=c+1;var u=t(d),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)e[u].references++,e[u].updater(f);else{var b=a(f,o);o.byIndex=s,e.splice(s,0,{identifier:d,updater:b,references:1})}r.push(d)}return r}function a(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,a){var i=o(n=n||[],a=a||{});return function(n){n=n||[];for(var r=0;r<i.length;r++){var s=t(i[r]);e[s].references--}for(var l=o(n,a),p=0;p<i.length;p++){var c=t(i[p]);0===e[c].references&&(e[c].updater(),e.splice(c,1))}i=l}}},659:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},56:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var a=void 0!==t.layer;a&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,a&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var i=t.sourceMap;i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(o){var a=e[o];if(void 0!==a)return a.exports;var i=e[o]={id:o,exports:{}};return n[o](i,i.exports,t),i.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0;var o=t(72),a=t.n(o),i=t(825),r=t.n(i),s=t(659),l=t.n(s),p=t(56),c=t.n(p),d=t(540),u=t.n(d),f=t(113),b=t.n(f),x=t(142),m={};m.styleTagTransform=b(),m.setAttributes=c(),m.insert=l().bind(null,"head"),m.domAPI=r(),m.insertStyleElement=u(),a()(x.A,m),x.A&&x.A.locals&&x.A.locals,document.addEventListener("DOMContentLoaded",(function(){function n(n,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;document.querySelectorAll(".".concat(n)).forEach((function(n,o){n.style.animation="".concat(e," 0.5s forwards"),n.style.animationDelay="".concat(t+100*o,"ms")}))}n("top-left","slideInLeft"),n("top","slideInTop"),n("top-right","slideInRight")})),document.getElementById("subscribeButton").addEventListener("click",(function(n){n.preventDefault();var e=document.getElementById("email"),t=e.value,o=document.getElementById("termsCheckbox"),a=document.querySelector(".checkbox-container");isValidEmail(t)?o.checked?fetch("https://subscribe.fadedcloth.de/sub",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})}).then((function(n){return n.json()})).then((function(n){var e=encodeURIComponent(window.location.href);window.location.href="https://subscribe.fadedcloth.de/success?SUBSCRIBED&referrer=".concat(e)})).catch((function(n){alert("An error occurred: "+n.message)})):shakeElement(a):shakeElement(e)}))})();