const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const colors = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7', '#00FF7F', '#FF69B4'];
  const confettiCount = 200;
  const gravity = 0.6;
  const drag = 0.02;
  const terminalVelocity = 8;

  let confetti = [];

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createConfettiParticle() {
    return {
      x: canvas.width / 2 + randomRange(-100, 100),
      y: canvas.height - 10,
      dx: randomRange(-9, 9),
      dy: randomRange(-18, -30),
      width: randomRange(10, 18),
      height: randomRange(14, 28),
      rotation: randomRange(0, 2 * Math.PI),
      dRotation: randomRange(-0.3, 0.3),
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }

  function initConfetti() {
    confetti = [];
    for (let i = 0; i < confettiCount; i++) {
      confetti.push(createConfettiParticle());
    }
  }

  function updateConfetti() {
    // Update each particle and filter out the ones that hit the ground
    confetti = confetti.filter(p => (p.y + p.height / 2) < canvas.height);

    for (let p of confetti) {
      p.dx *= (1 - drag);
      p.dy += gravity;
      p.dy = Math.min(p.dy, terminalVelocity);

      p.x += p.dx;
      p.y += p.dy;
      p.rotation += p.dRotation;
    }
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of confetti) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
      ctx.restore();
    }
  }

  function render() {
    updateConfetti();
    drawConfetti();
    if (confetti.length > 0) {
      requestAnimationFrame(render);
    }
  }

  // Start confetti explosion on load
  initConfetti();
  render();