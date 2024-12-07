const sliderImages = [
    'https://grimoeuvre.com/wp-content/uploads/59396BFB-1014-4098-960F-1C00A93B8232.jpeg',
    'https://grimoeuvre.com/wp-content/uploads/0019B4FE-75F9-4A97-B6DA-6C70461F8F74.jpeg',
    'https://grimoeuvre.com/wp-content/uploads/77606A8F-8706-4B15-908B-EB157AFDD07E.jpeg',
    'https://grimoeuvre.com/wp-content/uploads/05B53757-7EC8-4611-96C0-35617EFE856A.jpeg',
    'https://grimoeuvre.com/wp-content/uploads/IotY_Cover-1.jpeg'
];

let currentIndex = 0;

// DOM references
const sliderImage = document.getElementById('slider-image');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

// Ensure the DOM elements exist
if (sliderImage && prevButton && nextButton) {

    function updateSliderImage(direction) {
        const prevIndex = currentIndex;

        if (direction === 'prev') {
            currentIndex = (currentIndex === 0) ? sliderImages.length - 1 : currentIndex - 1;
        } else {
            currentIndex = (currentIndex + 1) % sliderImages.length;
        }

        // Apply the sliding transition effect smoothly using opacity and position
        sliderImage.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out'; // Transition both position and opacity
        sliderImage.style.opacity = 0;  // Fade out the current image
        
        // Wait for the opacity transition to complete before changing the image
        setTimeout(() => {
            // Change the image source and reset its position
            sliderImage.src = sliderImages[currentIndex];
            sliderImage.alt = `Gallery Image ${currentIndex + 1}`;
            sliderImage.style.transform = direction === 'prev' ? 'translateX(100%)' : 'translateX(-100%)'; // Move out
            
            // Reset position and fade in the new image
            setTimeout(() => {
                sliderImage.style.transition = 'none'; // Disable the transition for resetting
                sliderImage.style.transform = 'translateX(0)'; // Reset position to center
                sliderImage.style.opacity = 1;  // Fade in the new image
                
                // Re-enable the transition after resetting
                setTimeout(() => {
                    sliderImage.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
                }, 50); // Small delay to ensure the reset happens before re-enabling
            }, 50); // Small delay for image reset
        }, 500); // Wait for the fade-out transition (500ms)
    }

    prevButton.addEventListener('click', () => updateSliderImage('prev'));
    nextButton.addEventListener('click', () => updateSliderImage('next'));

    // Initialize slider
    updateSliderImage('next');
} else {
    console.error("Slider elements not found in the DOM.");
}
