const themeToggle = document.getElementById('themeToggle');
const browseBtn = document.getElementById('browseBtn');
const modal = document.getElementById('gameModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const gameArea = document.getElementById('gameArea');
const modalTitle = document.getElementById('modalTitle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

browseBtn.addEventListener('click', () => {
  document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  gameArea.innerHTML = '';
  if (window.activeGameLoop) clearInterval(window.activeGameLoop);
  document.onkeydown = null;
});

document.querySelectorAll('.btn-play').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const gameKey = e.target.getAttribute('data-game');
    modalTitle.innerText = gameKey.toUpperCase();
    gameArea.innerHTML = '';
    if (window.activeGameLoop) clearInterval(window.activeGameLoop);
    modal.style.display = 'flex';
    
    if (typeof loadGameEngine === 'function') {
      loadGameEngine(gameKey, gameArea);
    }
  });
});

