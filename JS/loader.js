// Wait for at least 400ms before allowing the loading screen to hide
const MINIMUM_LOADING_TIME = 1000; // in milliseconds
const startLoadingTime = new Date().getTime(); // Record when the loading starts

// When the page is completely loaded
window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const now = new Date().getTime(); // Record the current time
    const elapsedTime = now - startLoadingTime; // Time since loading started

    // Ensure the loading screen is visible for at least MINIMUM_LOADING_TIME
    const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);

    // Remove the loading screen after the minimum time has passed
    setTimeout(() => {
        loadingScreen.style.opacity = '0'; // Fade out effect
        setTimeout(() => {
            loadingScreen.style.display = 'none'; // Remove from DOM
        }, 500); // Fade-out duration (matches CSS transition time)
    }, remainingTime);
});