const toggleBtnEl = document.querySelector('[data-action="toggle"]');
const burgerMenuEl = document.querySelector('[data-visible]');
const bodyEl = document.querySelector('body');

function setMenuState(open) {
  burgerMenuEl.dataset.visible = open;
  toggleBtnEl.dataset.isMenuOpen = open;
  bodyEl.classList.toggle("prevent-scroll", open);
}

function closeMenu() {
  setMenuState(false);
}

function openMenu() {
  setMenuState(true);
}

toggleBtnEl?.addEventListener('click', e => {
  const isOpen = burgerMenuEl.dataset.visible === 'true';
  setMenuState(!isOpen);
});

bodyEl.addEventListener('click', (e) => {
  if (e.target.dataset.closeMenu) {
    closeMenu();
  }
})