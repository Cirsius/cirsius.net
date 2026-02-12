(function() {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-toggle');
  const shuffleBtn = document.getElementById('music-shuffle');
  const iconOff = document.getElementById('music-icon-off');
  const iconOn = document.getElementById('music-icon-on');
  if (!audio || !btn || !shuffleBtn) return;

  let tracks = [];
  let lastTrack = null;
  let isPlaying = false;
  audio.volume = 0.3;

  function pickRandom() {
    if (tracks.length === 0) return null;
    if (tracks.length === 1) return tracks[0];
    let next;
    do {
      next = tracks[Math.floor(Math.random() * tracks.length)];
    } while (next === lastTrack);
    return next;
  }

  function playNext() {
    const track = pickRandom();
    if (!track) return;
    lastTrack = track;
    audio.src = track;
    audio.play().then(() => updateIcon(true)).catch(() => {});
  }

  function updateIcon(playing) {
    iconOff.style.display = playing ? 'none' : 'block';
    iconOn.style.display = playing ? 'block' : 'none';
    btn.classList.toggle('playing', playing);
  }

  audio.addEventListener('ended', () => {
    if (isPlaying) playNext();
  });

  btn.addEventListener('click', () => {
    if (!isPlaying) {
      isPlaying = true;
      if (audio.src && !audio.ended) {
        audio.play().then(() => updateIcon(true)).catch(() => {});
      } else {
        playNext();
      }
    } else {
      isPlaying = false;
      audio.pause();
      updateIcon(false);
    }
  });

  shuffleBtn.addEventListener('click', () => {
    if (tracks.length === 0) return;
    playNext();
    if (!isPlaying) {
      isPlaying = true;
    }
    if (window.refreshAscii) window.refreshAscii();
  });

  fetch('/api/music').then(r => r.json()).then(t => { tracks = t; }).catch(() => {});
})()
