import { playList } from "./playlist.js";

const image = document.querySelector("img");
const title = document.getElementById("song-name");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
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

const prevSong = () => {
  songIndex === 0
    ? ((songIndex = playList.length - 1),
      loadSong(playList[playList.length - 1]))
    : (songIndex--, loadSong(playList[songIndex]));
  handleSong(false);
};

const nextSong = () => {
  songIndex === playList.length - 1
    ? ((songIndex = 0), loadSong(playList[0]))
    : (songIndex++, loadSong(playList[songIndex]));
  handleSong(false);
};

const updateProgressBar = (event) => {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    durationMinutes < 10 && (durationMinutes = `0${durationMinutes}`);
    durationSeconds < 10 && (durationSeconds = `0${durationSeconds}`);
    durationSeconds &&
      (durationEl.textContent = `${durationMinutes}:${durationSeconds}`);

    let currentSeconds = Math.floor(currentTime % 60);
    let currentMinutes = Math.floor(currentTime / 60);
    currentSeconds < 10 && (currentSeconds = `0${currentSeconds}`);
    currentMinutes < 10 && (currentMinutes = `0${currentMinutes}`);
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

function setProgressBar(event) {
  music.currentTime = (event.offsetX / this.clientWidth) * music.duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
