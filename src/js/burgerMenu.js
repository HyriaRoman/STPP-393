const openBtnEl = document.querySelector('[data-action="open"]');
const closeBtnEl = document.querySelector('[data-action="close"]');
const toggleBtnEl = document.querySelector('[data-action="toggle"]');
const burgerMenuEl = document.querySelector('[data-visible]');

openBtnEl?.addEventListener('click', e => {
  burgerMenuEl.dataset.visible = 'open';
});

closeBtnEl?.addEventListener('click', e => {
  burgerMenuEl.dataset.visible = 'close';
});

toggleBtnEl?.addEventListener('click', e => {
  const isClosed = burgerMenuEl.dataset.visible === 'close';
  const newState = isClosed ? 'open' : 'close';
  burgerMenuEl.dataset.visible = newState;
});
