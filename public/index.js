'use strict'

//All tracks, favourites just static playlists
let defaultplaylists = document.querySelector('.defaultplaylists');
fetch('http://localhost:3000/playlists')
.then(result => result.json())
.then(function (data) {
  for (let i = 0; i< data.length; i++) {
    let item = document.createElement('p');
    item.innerText = data[i].title;
    defaultplaylists.appendChild(item);
  };
})
.catch(err => console.log(err));

//Load tracks from the given playlist
fetch('http://localhost:3000/playlist-tracks')
.then(result => result.json())
.then(function (data) {
  for (let i = 0; i< data.length; i++) {
    let addedTracksWrapper = document.querySelector('.addedTracksWrapper');
    //Create track and add to .addedTracksWrapper
    let track = document.createElement('div');
    track.setAttribute('class', 'track');
    addedTracksWrapper.appendChild(track);
    //Track title
    let title = document.createElement('p');
    title.setAttribute('class', 'title');
    title.innerText = `${i+1}: ${data[i].title}`;
    track.appendChild(title);
    //Track duration
    let duration = document.createElement('p');
    duration.setAttribute('class', 'duration');
    duration.innerText = `${data[i].duration}`;
    track.appendChild(duration);
  };
})
.catch(err => console.log(err));


//Current track playing
let playlistID = 3;
let trackID = 1;
fetch(`http://localhost:3000/playlist-tracks/${playlistID}/${trackID}`)
.then(response => response.json())
.then((data) => {
  console.log(data[0]);
  let currentlyPlayingTitle = document.querySelector('.currentlyPlayingTitle');
  let currentlyPlayingArtist = document.querySelector('.currentlyPlayingArtist');
  currentlyPlayingTitle.innerHTML = data[0].title;
  currentlyPlayingArtist.innerHTML = data[0].artist;
})
.catch(err => console.log(err));