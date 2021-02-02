'use strict'

const player = document.querySelector('audio');

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