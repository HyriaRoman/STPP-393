const openBtnEl = document.querySelector('[data-action="open"]');
const closeBtnEl = document.querySelector('[data-action="close"]');
const toggleBtnEl = document.querySelector('[data-action="toggle"]');
const burgerMenuEl = document.querySelector('[data-visible]');

openBtnEl?.addEventListener('click', e => {
  burgerMenuEl.dataset.visible = 'true';
});

closeBtnEl?.addEventListener('click', e => {
  burgerMenuEl.dataset.visible = 'false';
});

toggleBtnEl?.addEventListener('click', e => {
  const isOpen = burgerMenuEl.dataset.visible === 'true';
  const newState = isOpen ? 'false' : 'true';
  burgerMenuEl.dataset.visible = newState;
  toggleBtnEl.dataset.isMenuOpen = newState;
});
