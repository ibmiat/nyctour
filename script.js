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
