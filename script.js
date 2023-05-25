import { playList } from "./playlist.js";

const image = document.querySelector("img");
const title = document.getElementById("song-name");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("previous");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

let isPlaying = false;
let songIndex = 0;

const handleSong = (boolean) =>
  boolean
    ? ((isPlaying = false),
      music.pause(),
      playBtn.setAttribute("title", "Play"),
      playBtn.classList.replace("fa-pause", "fa-play"))
    : ((isPlaying = true),
      music.play(),
      playBtn.setAttribute("title", "Pause"),
      playBtn.classList.replace("fa-play", "fa-pause"));

playBtn.onclick = function () {
  handleSong(isPlaying);
};

const loadSong = (song) => {
  title.textContent = song.songName;
  artist.textContent = song.artist;
  music.src = `music/${song.title}.mp3`;
  image.src = `images/${song.title}.jpg`;
};
loadSong(playList[0]);

function prevSong() {
  songIndex === 0
    ? ((songIndex = playList.length - 1),
      loadSong(playList[playList.length - 1]))
    : (songIndex--, loadSong(playList[songIndex]));
  handleSong(false);
}

function nextSong() {
  songIndex === playList.length - 1
    ? ((songIndex = 0), loadSong(playList[0]))
    : (songIndex++, loadSong(playList[songIndex]));
  handleSong(false);
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

function updateProgressBar(event) {
    if (isPlaying) {
        const { duration, currentTime } = event.srcElement;

        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`
    }
    
}

music.addEventListener("timeupdate", updateProgressBar);
