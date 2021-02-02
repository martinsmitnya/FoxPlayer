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

  if (e.key === 'ArrowRight' || e.key === 'd') {
    console.log('Fastforward');
    player.currentTime += 3;
  }
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    console.log('Rewind');
    player.currentTime -= 3;
  }

});