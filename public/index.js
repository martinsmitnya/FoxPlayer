'use strict'

//All tracks, favourites
let defaultplaylists = document.querySelector('.defaultplaylists');
fetch('http://localhost:3000/playlists')
.then(result => result.json())
.then(function (data) {
  for (let i = 0; i< data.length; i++) {
    let item = document.createElement('p');
    item.innerText = data[i].title;
    addedPlaylistsWrapper.appendChild(item);
  };
})
.catch(err => console.log(err))