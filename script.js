let countryiso = "--";

fetch("https://ipwho.is")
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      countryiso = data.country_code3 || data.country_code || "---";
    }
  })
  .catch(() => {
    countryiso = "---";
  });

function updateLocationTime() {
  const display = document.getElementById("locationtime");
  const now = new Date();

  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUNE",
    "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  const month = months[now.getMonth()];
  const day = String(now.getDate()).padStart(2, '0');
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  display.textContent = `${countryiso}, ${month} ${day} / ${year} / ${hours}:${minutes}:${seconds}`;
}

updateLocationTime();
setInterval(updateLocationTime, 1000);


document.getElementById("videoselect").addEventListener("change", function () {
  const selectedVideo = this.value;
  const videoElement = document.querySelector(".bgvideo");
  const sourceElement = document.getElementById("bgSource");

  sourceElement.setAttribute("src", selectedVideo);
  videoElement.load(); 
  videoElement.play(); 
});

const music = document.getElementById("bgmusic");
const volumeSlider = document.getElementById("volumeSlider");

const musicTracks = [
  "https://pub-52a5f2cb73714ff0920a929286dfdd96.r2.dev/m1.mp3",
  "https://pub-52a5f2cb73714ff0920a929286dfdd96.r2.dev/m2.mp3",
  "https://pub-52a5f2cb73714ff0920a929286dfdd96.r2.dev/m3.mp3"
];
const randomIndex = Math.floor(Math.random() * musicTracks.length);
music.src = musicTracks[randomIndex];
music.volume = 0;

volumeSlider.addEventListener("input", () => {
  const volume = parseFloat(volumeSlider.value);
  music.volume = volume;

  if (volume > 0) {
    if (music.paused) {
      music.play().catch(err => console.log("Autoplay bị chặn:", err));
    }
  } else {
    music.pause();
  }
});

const btn = document.getElementById("btnsetting");
const panel = document.getElementById("settingtables");

btn.addEventListener("click", () => {
  panel.classList.toggle("visible");
});

document.addEventListener("click", (e) => {
  const clickedInside = panel.contains(e.target) || btn.contains(e.target);
  if (!clickedInside) {
    panel.classList.remove("visible");
  }
});

let timer;
let countdownSeconds = 0;

function startCountdown() {

  clearInterval(timer);

  let h = parseInt(document.getElementById("inputHours").value);
  let m = parseInt(document.getElementById("inputMinutes").value);
  let s = parseInt(document.getElementById("inputSeconds").value);

  // Nếu người dùng không nhập gì hoặc nhập sai -> NaN
  h = isNaN(h) ? 0 : Math.max(0, Math.min(h, 100));
  m = isNaN(m) ? 0 : Math.max(0, Math.min(m, 59));
  s = isNaN(s) ? 0 : Math.max(0, Math.min(s, 59));

  countdownSeconds = h * 3600 + m * 60 + s;

  if (countdownSeconds === 0) {
    alert("Thời gian đếm ngược phải lớn hơn 0!");
    return;
  }

  updateCountdown();
  timer = setInterval(() => {
    countdownSeconds--;
    if (countdownSeconds < 0) {
      clearInterval(timer);
    } else {
      updateCountdown();
    }
  }, 1000);
}

function updateCountdown() {
  const h = Math.floor(countdownSeconds / 3600);
  const m = Math.floor((countdownSeconds % 3600) / 60);
  const s = countdownSeconds % 60;

  document.getElementById("hours").textContent = String(h).padStart(2, '0');
  document.getElementById("minutes").textContent = String(m).padStart(2, '0');
  document.getElementById("seconds").textContent = String(s).padStart(2, '0');
}


function updateCountdownPosition(pos) {
  const countdown = document.querySelector(".countdowntime");

  countdown.classList.remove(
    "position-center",
    "position-top-left",
    "position-top-right",
    "position-bottom-right"
  );

  countdown.classList.add(`position-${pos}`);
}

document.querySelectorAll(".positionselect button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const pos = btn.dataset.pos;
    updateCountdownPosition(pos);
  });
});


function setupFontSizeControl() {
  const fontSizeSlider = document.getElementById("fontSizeRange");
  const fontSizeDisplay = document.getElementById("fontSizeValue");
  const timeElements = document.querySelectorAll(".time");

  function updateFontSize() {
    const size = fontSizeSlider.value;
    fontSizeDisplay.textContent = `${size}px`;

    timeElements.forEach(el => {
      el.style.fontSize = `${size}px`;
    });
  }

  updateFontSize();

  fontSizeSlider.addEventListener("input", updateFontSize);
}

window.addEventListener("DOMContentLoaded", setupFontSizeControl);

const fontSizeRange = document.getElementById("fontSizeRange");
const fontSizeValue = document.getElementById("fontSizeValue");
const timeEls = [
  document.getElementById("hours"),
  document.getElementById("minutes"),
  document.getElementById("seconds"),
];

fontSizeRange.addEventListener("input", () => {
  const size = parseInt(fontSizeRange.value);
  fontSizeValue.textContent = size + "px";

  timeEls.forEach(el => {
    el.style.fontSize = size + "px";

    el.style.width = size * 1.0 + "px";
  });
});


const fullscreenBtn = document.getElementById("fullscreenBtn");
const fullscreenIcon = fullscreenBtn.querySelector("i");

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      fullscreenIcon.classList.remove("fa-expand");
      fullscreenIcon.classList.add("fa-compress");
    });
  } else {
    document.exitFullscreen().then(() => {
      fullscreenIcon.classList.remove("fa-compress");
      fullscreenIcon.classList.add("fa-expand");
    });
  }
});

