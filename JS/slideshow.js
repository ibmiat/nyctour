let slideIndex = 0;
let slides, dots;
let autoSlideInterval;

function initializeSlideshow() {
  slides = document.getElementsByClassName("slide");
  dots = document.getElementsByClassName("dot");
  showSlides();

  const slideshowContainer = document.getElementById("slideshow");

  // Add hover event to pause/resume
  slideshowContainer.addEventListener("mouseenter", pauseSlideshow);
  slideshowContainer.addEventListener("mouseleave", resumeSlideshow);

  // Swipe support for mobile
  let touchStartX = 0;

  slideshowContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  slideshowContainer.addEventListener("touchend", (e) => {
    let touchEndX = e.changedTouches[0].clientX;
    handleSwipe(touchStartX, touchEndX);
  });
}

function showSlides() {
  // Hide all slides and deactivate dots
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove("active");
  }

  // Move to next slide
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }

  // Display current slide
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].classList.add("active");

  // Set timer for automatic sliding
  autoSlideInterval = setTimeout(showSlides, 3000);
}

function currentSlide(n) {
  slideIndex = n - 1;
  clearTimeout(autoSlideInterval);
  showSlides();
}

function pauseSlideshow() {
  clearTimeout(autoSlideInterval);
}

function resumeSlideshow() {
  autoSlideInterval = setTimeout(showSlides, 3000);
}

function handleSwipe(startX, endX) {
  let diff = startX - endX;
  if (diff > 50) {
    // Swipe Left -> Next Slide
    slideIndex++;
  } else if (diff < -50) {
    // Swipe Right -> Previous Slide
    slideIndex -= 2;
  }

  // Ensure slideIndex wraps around
  if (slideIndex < 0) { slideIndex = slides.length - 1; }
  if (slideIndex >= slides.length) { slideIndex = 0; }

  clearTimeout(autoSlideInterval);
  showSlides();
}

// Initialize slideshow on page load
document.addEventListener("DOMContentLoaded", initializeSlideshow);