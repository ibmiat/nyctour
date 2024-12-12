const menuButton = document.getElementById('menu-button');
const closeButton = document.getElementById('close-button');
const fullScreenMenu = document.getElementById('full-screen-menu');

// Open the menu
menuButton.addEventListener('click', () => {
  fullScreenMenu.classList.remove('hidden');
  fullScreenMenu.classList.add('visible');
});

// Close the menu
closeButton.addEventListener('click', () => {
  fullScreenMenu.classList.remove('visible');
  fullScreenMenu.classList.add('hidden');
});

// Add fade-in effect on page load
document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    
    // Set up a fallback for users who land after 1.5 seconds.
    setTimeout(() => {
        if (!body.classList.contains('fade-in')) { 
            body.classList.add('fade-in'); // Add fade-in after 1.5 seconds if not already done
        }
    }, 1500); // Timeout for automatic fade-in after 1.5 seconds

    // Trigger the fade-in when DOM content is loaded
    body.classList.add('fade-in'); // Trigger fade-in effect immediately
    
    const links = document.querySelectorAll('a'); // Select all links
  
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            const target = link.getAttribute('target');
            if (!target || target !== '_blank') { // Ensure links opening in a new tab are excluded
                event.preventDefault(); // Prevent default navigation
                const href = link.getAttribute('href'); // Get the link's destination
                body.classList.remove('fade-in'); // Remove fade-in class
                body.classList.add('fade-out'); // Add fade-out class
                setTimeout(() => {
                    window.location = href; // Navigate after fade-out completes
                }, 600); // Match the duration of your CSS transition
            }
        });
    });
});
