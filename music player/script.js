
const songs = [
  { title: "Night Drive",   artist: "Solar Fields", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", image: "images/flower1.jpeg" },
  { title: "Amber Light",   artist: "Holovista",     src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", image:"images/flower2.jpeg" },
  { title: "Low Tide",      artist: "Reef Theory",   src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", image:"images/flower3.jpeg" },
  { title: "Static Bloom",  artist: "Reef Theory",   src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", image:"images/flower4.jpeg" },
  { title: "Glasshouse",    artist: "Mara Veil",     src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", image:"images/flower5.jpeg" }
];
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeLabel = document.getElementById("currentTime");
const durationLabel = document.getElementById("duration");
const volumeBar = document.getElementById("volumeBar");
const autoplayCheckbox = document.getElementById("autoplayCheckbox");
const songTitleEl = document.getElementById("songTitle");
const songArtistEl = document.getElementById("songArtist");
const playlistEl = document.getElementById("playlist");
const pixelCoverEl = document.getElementById("pixelCover");

let currentSongIndex = 0;
function buildPlaylist() {
  playlistEl.innerHTML = ""; 
  songs.forEach(function (song, index) {
    const row = document.createElement("div");
    row.className = "track";
    row.innerHTML = '<span class="note-icon">♪</span> ' + song.title + " — " + song.artist;
    row.addEventListener("click", function () {
      playSong(index);
    });

    playlistEl.appendChild(row);
  });
}

function highlightActiveSong() {
  const rows = playlistEl.querySelectorAll(".track");
  rows.forEach(function (row, index) {
    if (index === currentSongIndex) {
      row.classList.add("active");
    } else {
      row.classList.remove("active");
    }
  });
}

function playSong(index) {
  currentSongIndex = index;
  const song = songs[currentSongIndex];

  audio.src = song.src;
  songTitleEl.textContent = song.title;
  songArtistEl.textContent = song.artist;

  pixelCoverEl.src = song.image;

  highlightActiveSong();

  audio.play();
}

playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", function () {
  playBtn.textContent = "⏸";
});
audio.addEventListener("pause", function () {
  playBtn.textContent = "▶";
});

nextBtn.addEventListener("click", function () {
  const nextIndex = (currentSongIndex + 1) % songs.length;
  playSong(nextIndex);
});

prevBtn.addEventListener("click", function () {
  const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(prevIndex);
});

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  if (secs < 10) secs = "0" + secs; 
  return minutes + ":" + secs;
}


audio.addEventListener("timeupdate", function () {
  if (!isNaN(audio.duration)) {
    const percentPlayed = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percentPlayed;
    currentTimeLabel.textContent = formatTime(audio.currentTime);
  }
});

audio.addEventListener("loadedmetadata", function () {
  durationLabel.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input", function () {
  const newTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

volumeBar.addEventListener("input", function () {
  audio.volume = volumeBar.value / 100;
});

audio.addEventListener("ended", function () {
  if (autoplayCheckbox.checked) {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
  }
});

audio.volume = 0.7;       
buildPlaylist();          
songTitleEl.textContent = songs[0].title;
songArtistEl.textContent = songs[0].artist;
pixelCoverEl.src = songs[0].image; 
audio.src = songs[0].src; 
highlightActiveSong();