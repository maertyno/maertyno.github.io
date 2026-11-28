(() => {
  const experience = document.querySelector('.experience');
  const image = document.getElementById('gorilla');
  const magic = document.getElementById('magic');
  const spinCount = document.getElementById('spinCount');
  const voiceNote = document.getElementById('voiceNote');
  const playNote = document.getElementById('playNote');
  const playLabel = document.getElementById('playLabel');
  const birthdayAudio = document.getElementById('birthdayAudio');
  const spinsNeeded = 23, rotationPerPixel = 1.45;
  let dragging = false, startX = 0, startRotation = 0, rotation = 0, revealed = false;
  const setRotation = () => {
    const turns = Math.min(Math.abs(rotation) / 360, spinsNeeded);
    experience.style.setProperty('--turn', `${rotation}deg`);
    experience.style.setProperty('--progress', `${(turns / spinsNeeded) * 100}`);
    spinCount.textContent = Math.floor(turns);
  };
  const flare = (x, y, size = 10) => {
    const star = document.createElement('i'); star.className = 'flare';
    star.style.setProperty('--x', `${x}px`); star.style.setProperty('--y', `${y}px`); star.style.setProperty('--size', `${size}px`);
    magic.appendChild(star); star.addEventListener('animationend', () => star.remove(), { once: true });
  };
  const reveal = () => {
    if (revealed) return;
    revealed = true; dragging = false; experience.classList.remove('dragging'); experience.classList.add('revealed'); spinCount.textContent = spinsNeeded;
    for (let i = 0; i < 46; i++) window.setTimeout(() => flare(innerWidth / 2 + (Math.random() - .5) * innerWidth * .72, innerHeight / 2 + (Math.random() - .5) * innerHeight * .62, 7 + Math.random() * 17), i * 18);
    window.setTimeout(() => { image.src = 'gorilla-after.png'; }, 315);
    window.setTimeout(() => { voiceNote.classList.add('visible'); voiceNote.setAttribute('aria-hidden', 'false'); }, 820);
  };
  experience.addEventListener('pointerdown', (event) => {
    if (revealed) return;
    dragging = true; startX = event.clientX; startRotation = rotation; experience.setPointerCapture(event.pointerId); experience.classList.add('dragging');
  });
  experience.addEventListener('pointermove', (event) => {
    if (!dragging || revealed) return;
    rotation = startRotation + (event.clientX - startX) * rotationPerPixel; setRotation();
    if (Math.random() > .63) flare(event.clientX, event.clientY, 6 + Math.random() * 10);
    if (Math.abs(rotation) >= spinsNeeded * 360) reveal();
  });
  const stop = () => { dragging = false; experience.classList.remove('dragging'); };
  experience.addEventListener('pointerup', stop); experience.addEventListener('pointercancel', stop); experience.addEventListener('lostpointercapture', stop); setRotation();
  playNote.addEventListener('click', async () => {
    if (birthdayAudio.paused) { try { await birthdayAudio.play(); } catch { return; } voiceNote.classList.add('playing'); playLabel.textContent = 'Pozastaviť ♡'; }
    else { birthdayAudio.pause(); }
  });
  birthdayAudio.addEventListener('pause', () => { voiceNote.classList.remove('playing'); if (!birthdayAudio.ended) playLabel.textContent = 'Prehraj si ma ♡'; });
  birthdayAudio.addEventListener('ended', () => { voiceNote.classList.remove('playing'); playLabel.textContent = 'Prehraj znova ♡'; });
})();
