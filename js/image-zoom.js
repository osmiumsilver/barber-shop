// Define the imageZoom class to handle zooming functionality for images
class imageZoom {
    // Constructor initializes the class with an image element
    constructor(image) {
        // Store the image element for future reference
        this.image = image;

        // Attempt to find an existing backdrop element for the zoom effect
        this.backdrop = document.querySelector('[data-zoom-backdrop]');
        // If no backdrop exists, create one and append it to the body
        if (this.backdrop === null) {
            this.backdrop = document.createElement('div');
            this.backdrop.setAttribute('data-zoom-backdrop', '');
            document.body.appendChild(this.backdrop);
        }

        // Bind the context of `this` to the methods to ensure they can access class properties
        // This is necessary because event handlers are called with a different context
        this.zoomImage = this.zoomImage.bind(this);
        this.resetImage = this.resetImage.bind(this);
        this.resetImageComplete = this.resetImageComplete.bind(this);

        // Add a click event listener to the image to trigger the zoom effect
        // This allows the user to click on the image to zoom in
        this.image.addEventListener('click', this.zoomImage);
    }

    // Method to zoom the image
    zoomImage() {
        // Check if another image is already zoomed, if so, exit the function
        // This prevents multiple images from being zoomed at the same time
        if (this.backdrop.getAttribute('data-zoom-active') === 'true') return;

        // Set the backdrop to active, indicating that an image is currently zoomed
        this.backdrop.setAttribute('data-zoom-active', 'true');

        // Update event listeners to handle zooming out
        // This includes removing the zoom-in listener and adding zoom-out listeners
        this.image.removeEventListener('click', this.zoomImage);
        this.image.addEventListener('click', this.resetImage);
        this.backdrop.addEventListener('click', this.resetImage);
        document.addEventListener('keyup', this.resetImage);
        window.addEventListener('scroll', this.resetImage);
        window.addEventListener('resize', this.resetImage);

        // Fade in the backdrop to create a dimmed background effect
        this.backdrop.setAttribute('data-zoom-backdrop', 'active');

        // Set the image to active, indicating that it is currently being zoomed
        this.image.setAttribute('data-zoom-image', 'active');

        // Calculate the scale and translation needed to zoom the image
        // This ensures the image fits within the viewport while maintaining its aspect ratio
        this.imageBCR = this.image.getBoundingClientRect();
        var scale = Math.min(window.innerWidth / this.imageBCR.width, window.innerHeight / this.imageBCR.height);
        var translateX = ((window.innerWidth - this.imageBCR.width) / 2) - this.imageBCR.left;
        var translateY = ((window.innerHeight - this.imageBCR.height) / 2) - this.imageBCR.top;
        // Apply the calculated transform to the image
        this.image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
    }

    // Method to reset the image to its original state
    resetImage() {
        // Remove event listeners to stop handling zoom-out actions
        window.removeEventListener('resize', this.resetImage);
        window.removeEventListener('scroll', this.resetImage);
        document.removeEventListener('keyup', this.resetImage);
        this.backdrop.removeEventListener('click', this.resetImage);
        this.image.removeEventListener('click', this.resetImage);
        // Add the zoom-in listener back to the image
        this.image.addEventListener('click', this.zoomImage);

        // Fade out the backdrop to remove the dimmed background effect
        this.backdrop.setAttribute('data-zoom-backdrop', '');

        // Add a transitionend event listener to handle the completion of the reset animation
        // This is necessary to ensure the image is fully reset before any further actions are taken
        this.image.addEventListener('transitionend', this.resetImageComplete);

        // Reset the image transform to its original state
        this.image.style.transform = null;
    }

    // Method to handle the completion of the reset animation
    resetImageComplete() {
        // Remove the transitionend event listener
        this.image.removeEventListener('transitionend', this.resetImageComplete);

        // Set the backdrop to not active, indicating that no image is currently zoomed
        this.backdrop.setAttribute('data-zoom-active', 'false');

        // Reset the image style to its original state
        this.image.setAttribute('data-zoom-image', '');
    }
}

// Initialize the imageZoom class for each image with the data-zoom-image attribute
// This allows multiple images on the page to have the zoom functionality independently
document.querySelectorAll('[data-zoom-image]').forEach(function(img) {
    new imageZoom(img);
});
