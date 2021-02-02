'use strict'

const player = document.querySelector('audio');
const star = document.querySelector('.addFavourite');
const logo = document.querySelector('.logoImage');

star.addEventListener('click', () => {
  player.pause();
})

logo.addEventListener('click', () => {
  player.play();
})

let playing = false
window.addEventListener('keyup', (e) => {
  if (e.key === ' ' && !playing) {
    console.log('Play');
    player.play();
    playing = true;
  } else {
    console.log('Pause');
    player.pause();
    playing = false;
  }
});