'use strict'

const player = document.querySelector('audio');

//arrow and Space key functionality in the player
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



//Put a track from the list to the player
function trackInserter() {
  let tracks = document.querySelectorAll('.track');
  for (let i = 0; i < tracks.length; i++) {
    tracks[i].addEventListener('click', () => {
      let path = tracks[i].getAttribute('acesspath');
        let playerSource = document.createElement('source');
        let createdSource = document.querySelector('source');
        if (player.children.length > 0) {
          player.replaceChild(playerSource, createdSource);
          console.log('replaced')
        } else {
          player.appendChild(playerSource);
          console.log('single insert')
        }

        playerSource.setAttribute('src', path);
    });
  }
}
setTimeout(() => {
  trackInserter();
  console.log('player loaded');
}, 1000);