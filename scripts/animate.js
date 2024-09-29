document.addEventListener("DOMContentLoaded", function() {
    // Function to animate elements based on class
    function animateElements(className, animationName, delay = 0) {
        const elements = document.querySelectorAll(`.${className}`);
        
        elements.forEach((element, index) => {
            // Apply animation with delay
            element.style.animation = `${animationName} 0.5s forwards`;
            element.style.animationDelay = `${delay + index * 100}ms`; // Staggered delay
        });
    }

    // Animate elements with classes
    animateElements('top-left', 'slideInLeft');
    animateElements('logo-container', 'slideInTop');
    animateElements('loader-container', 'slideInRight');
});
