/**
 * Mascote Interativo - Data Runner (Portal version)
 * Adaptado para rodar no portal de entrada GoldenLens.
 */

document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('link-runner');
  const anchor = document.getElementById('mascot-runner-anchor');
  if (!card || !anchor) return;

  // 1. Injetar Estilos CSS do Mascote (escopados no card)
  const style = document.createElement('style');
  style.textContent = `
    #link-runner .mascot-container {
      width: 260px;
      height: 180px;
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      user-select: none;
      z-index: 10;
    }

    #mascot-runner {
      pointer-events: auto;
      cursor: pointer;
    }

    /* Leve flutuação do Papa-léguas */
    @keyframes runnerBreathing {
      0%, 100% { transform: translateY(0px) scaleY(1); }
      50% { transform: translateY(-2px) scaleY(0.98); }
    }
    
    #lizard-upper-runner {
      animation: runnerBreathing 4s ease-in-out infinite;
      transform-origin: 116px 125px;
    }

    /* Animação de cauda */
    @keyframes tailWiggleRunner {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-3deg); }
    }
    #lizard-tail-runner {
      animation: tailWiggleRunner 4s ease-in-out infinite;
      transform-origin: 90px 115px;
    }

    /* Dash Linear */
    @keyframes runnerDash {
      0% { transform: translateX(0px) skewX(0deg); }
      15% { transform: translateX(-12px) skewX(-8deg); }
      35% { transform: translateX(110px) skewX(12deg); }
      65% { transform: translateX(15px) skewX(-4deg); }
      100% { transform: translateX(0px) skewX(0deg); }
    }
    .runner-dashing {
      animation: runnerDash 0.5s cubic-bezier(0.22, 1, 0.36, 1) !important;
      animation-fill-mode: forwards;
    }

    /* Pulo / Esquiva Vertical */
    @keyframes runnerEvade {
      0% { transform: translateY(0px) scale(1); opacity: 1; }
      15% { transform: translateY(-24px) scaleY(1.05) skewX(-5deg); opacity: 0.9; }
      35% { transform: translateY(-28px) scaleY(1.05); opacity: 0.85; }
      70% { transform: translateY(2px) scaleY(0.98); opacity: 0.95; }
      100% { transform: translateY(0px) scale(1); opacity: 1; }
    }
    .runner-jumping {
      animation: runnerEvade 0.45s cubic-bezier(0.16, 1, 0.3, 1) !important;
      animation-fill-mode: forwards;
    }

    /* Beep Beep */
    @keyframes runnerBeep {
      0%, 100% { transform: scale(1); }
      30% { transform: scale(1.03) translateY(-1px); }
      60% { transform: scale(1.03) translateY(1px); }
    }
    .runner-beeping {
      animation: runnerBeep 0.6s ease-in-out !important;
      animation-fill-mode: forwards;
    }

    /* Rastro pernas */
    @keyframes spinRastro {
      0%, 100% { transform: translateY(0px) scaleY(1); opacity: 0.6; }
      50% { transform: translateY(1px) scaleY(0.9); opacity: 0.95; }
    }

    .runner-dashing #legs-static-runner, .runner-jumping #legs-static-runner {
      display: none !important;
    }
    .runner-dashing #legs-running-runner, .runner-jumping #legs-running-runner {
      display: block !important;
      animation: spinRastro 0.1s linear infinite !important;
    }

    /* Partículas de Ticks do Backtest */
    #link-runner .data-bug {
      width: 16px;
      height: 16px;
      position: absolute;
      pointer-events: none;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      font-weight: 800;
      font-family: monospace;
      border-radius: 4px;
      transition: opacity 0.2s, transform 0.2s;
    }
  `;
  document.head.appendChild(style);

  // 2. Criar e injetar o SVG
  const mascotContainer = document.createElement('div');
  mascotContainer.className = 'mascot-container';
  mascotContainer.innerHTML = `
    <svg id="mascot-runner" width="260" height="180" viewBox="0 0 260 180" style="overflow: visible;">
      <defs>
        <linearGradient id="bodyGradRunner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e3a8a" />
          <stop offset="50%" stop-color="#1e40af" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>

        <linearGradient id="beakGradRunner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f97316" />
          <stop offset="100%" stop-color="#ea580c" />
        </linearGradient>
      </defs>

      <g id="lizard-runner" style="transform-origin: 116px 115px;">
        <!-- Pernas Estáticas -->
        <g id="legs-static-runner">
          <ellipse cx="98" cy="161.5" rx="14" ry="2" fill="#000000" opacity="0.65" />
          <ellipse cx="114" cy="161.5" rx="14" ry="2" fill="#000000" opacity="0.65" />

          <path d="M 106,128 L 98,158 L 88,162 M 98,158 L 108,162" fill="none" stroke="#475569" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 120,128 L 114,158 L 104,162 M 114,158 L 124,162" fill="none" stroke="url(#beakGradRunner)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </g>

        <!-- Pernas Correndo -->
        <g id="legs-running-runner" style="display: none; transform-origin: 116px 145px;">
          <line x1="80" y1="140" x2="150" y2="140" stroke="#f97316" stroke-width="3" opacity="0.8" stroke-dasharray="15 8" />
          <line x1="90" y1="146" x2="135" y2="146" stroke="#ea580c" stroke-width="2.5" opacity="0.6" stroke-dasharray="8 6" />
          <line x1="75" y1="152" x2="145" y2="152" stroke="#06b6d4" stroke-width="2" opacity="0.75" stroke-dasharray="20 10" />
        </g>

        <!-- Grupo de Respiração -->
        <g id="lizard-upper-runner">
          <!-- Cauda -->
          <g id="lizard-tail-runner">
            <polygon points="90,112 55,95 38,70 65,90" fill="#1e40af" opacity="0.85" />
            <polygon points="90,116 48,108 30,90 58,104" fill="#2563eb" opacity="0.9" />
            <polygon points="90,120 40,122 24,110 52,118" fill="url(#beakGradRunner)" opacity="0.95" />
          </g>

          <!-- Corpo -->
          <polygon points="86,118 104,102 134,106 142,122 126,132 98,128" fill="url(#bodyGradRunner)" stroke="#1e40af" stroke-width="1" />
          <polygon points="106,108 126,110 134,120 120,124" fill="#06b6d4" opacity="0.2" />

          <!-- Asa Traseira -->
          <polygon points="98,112 76,116 62,132 88,124 116,118" fill="#1e3a8a" stroke="#2563eb" stroke-width="0.8" />
          <polygon points="90,116 80,120 74,128 86,124" fill="url(#beakGradRunner)" opacity="0.85" />

          <!-- Pescoço -->
          <polygon points="118,104 136,52 142,54 126,106" fill="url(#bodyGradRunner)" />

          <!-- Cabeça -->
          <polygon points="130,52 138,40 152,42 150,56 138,56" fill="url(#bodyGradRunner)" />

          <!-- Crista -->
          <polygon points="134,42 114,30 102,18 122,32" fill="#1e40af" />
          <polygon points="136,41 122,26 112,14 128,29" fill="#06b6d4" />
          <polygon points="138,40 128,22 120,10 134,26" fill="url(#beakGradRunner)" />

          <!-- Olhos -->
          <ellipse cx="137" cy="42" rx="4.5" ry="7.5" fill="#ffffff" stroke="#1e3a8a" stroke-width="1.2" />
          <ellipse cx="145.5" cy="41" rx="4.5" ry="7.5" fill="#ffffff" stroke="#1e3a8a" stroke-width="1.2" />

          <!-- pupilas -->
          <g id="lizard-pupil-runner" style="transition: transform 0.12s ease-out;">
            <ellipse cx="138.5" cy="42.5" rx="2" ry="3.2" fill="#000000" />
            <circle cx="137.9" cy="41.2" r="0.6" fill="#ffffff" />
            <ellipse cx="146.7" cy="41.5" rx="2" ry="3.2" fill="#000000" />
            <circle cx="146.1" cy="40.2" r="0.6" fill="#ffffff" />
          </g>

          <!-- Bico -->
          <polygon points="144,48 168,48 164,54 142,54" fill="url(#beakGradRunner)" stroke="#c2410c" stroke-width="0.8" />
          <line x1="144" y1="51" x2="164" y2="51" stroke="#7c2d12" stroke-width="1" />
        </g>
      </g>
    </svg>
  `;
  anchor.appendChild(mascotContainer);

  // 3. Lógica Ocular e Caça a Ticks
  const mascot = document.getElementById('mascot-runner');
  const pupil = document.getElementById('lizard-pupil-runner');
  
  let isHunting = false;
  let isJumping = false;
  let lastMouseMoveTime = Date.now();
  let idleEyeTimer = null;

  function updatePupil(targetX, targetY) {
    if (!pupil || !mascot || isHunting || isJumping) return;
    
    const rect = mascot.getBoundingClientRect();
    const scaleX = rect.width / 260;
    const scaleY = rect.height / 180;
    
    const eyeCenterX = rect.left + 142.5 * scaleX;
    const eyeCenterY = rect.top + 41.5 * scaleY;
    
    const dx = targetX - eyeCenterX;
    const dy = targetY - eyeCenterY;
    const distance = Math.hypot(dx, dy);
    
    const maxOffset = 2.2;
    const intensity = Math.min(distance / 200, 1);
    const angle = Math.atan2(dy, dx);
    
    pupil.style.transform = `translate(${Math.cos(angle) * maxOffset * intensity}px, ${Math.sin(angle) * maxOffset * intensity}px)`;
  }

  document.addEventListener('mousemove', (event) => {
    lastMouseMoveTime = Date.now();
    if (idleEyeTimer) {
      clearInterval(idleEyeTimer);
      idleEyeTimer = null;
    }
    updatePupil(event.clientX, event.clientY);
  });

  function startIdleEyes() {
    if (idleEyeTimer) return;
    idleEyeTimer = setInterval(() => {
      if (Date.now() - lastMouseMoveTime < 3000 || isHunting || isJumping) return;
      const angle = Math.random() * Math.PI * 2;
      const offset = Math.random() * 2.0;
      
      if (pupil) {
        pupil.style.transform = `translate(${Math.cos(angle) * offset}px, ${Math.sin(angle) * offset}px)`;
        if (Math.random() < 0.22) {
          pupil.style.transform += ' scaleY(0.1)';
          setTimeout(() => {
            pupil.style.transform = pupil.style.transform.replace(' scaleY(0.1)', '');
          }, 150);
        }
      }
    }, 1000 + Math.random() * 1200);
  }
  
  setInterval(() => {
    if (Date.now() - lastMouseMoveTime >= 3000) startIdleEyes();
  }, 1000);

  // Ticks contidos no Card do Runner
  const activeBugs = new Set();
  
  function createBug() {
    if (activeBugs.size >= 3) return;
    
    const isGold = Math.random() < 0.3;
    const isUp = Math.random() < 0.45;
    const tick = document.createElement('div');
    tick.className = 'data-bug';
    card.appendChild(tick);
    
    tick.style.width = '14px';
    tick.style.height = '14px';
    tick.style.borderRadius = '4px';
    tick.style.position = 'absolute';
    tick.style.display = 'flex';
    tick.style.alignItems = 'center';
    tick.style.justifyContent = 'center';
    tick.style.fontFamily = 'monospace';
    tick.style.fontSize = '8px';
    tick.style.fontWeight = '800';
    tick.style.transition = 'opacity 0.2s, transform 0.2s';
    tick.style.zIndex = '5';
    
    if (isGold) {
      tick.style.background = 'rgba(255, 122, 0, 0.25)';
      tick.style.border = '1.5px solid #ff7a00';
      tick.style.color = '#ffe259';
      tick.style.boxShadow = '0 0 8px #ff7a00';
      tick.textContent = '★';
    } else if (isUp) {
      tick.style.background = 'rgba(16, 185, 129, 0.2)';
      tick.style.border = '1.2px solid #10b981';
      tick.style.color = '#10b981';
      tick.style.boxShadow = '0 0 5px rgba(16, 185, 129, 0.4)';
      tick.textContent = '▲';
    } else {
      tick.style.background = 'rgba(239, 68, 68, 0.2)';
      tick.style.border = '1.2px solid #ef4444';
      tick.style.color = '#ef4444';
      tick.style.boxShadow = '0 0 5px rgba(239, 68, 68, 0.4)';
      tick.textContent = '▼';
    }
    
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight || 480;
    const x = cardWidth + 10;
    const y = (cardHeight * 0.25) + Math.random() * (cardHeight * 0.2); // Voa no centro do frame dinamicamente
    
    tick.style.left = `${x}px`;
    tick.style.top = `${y}px`;
    
    const bugData = {
      element: tick,
      x: x,
      y: y,
      speed: 2.2 + Math.random() * 2.0,
      isGold: isGold,
      isUp: isUp,
      isGood: isGold || isUp,
      targetApproached: false
    };
    
    activeBugs.add(bugData);
  }

  function updateBugs() {
    const cardWidth = card.offsetWidth;
    
    activeBugs.forEach((bug) => {
      if (bug.x < -30) {
        bug.element.remove();
        activeBugs.delete(bug);
        return;
      }

      if (!bug.targetApproached && !isHunting && !isJumping) {
        const mascotRect = mascot.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const triggerX = (mascotRect.left - cardRect.left) + (mascotRect.width * 0.5);
        
        if (bug.x <= triggerX + 30 && bug.x >= triggerX - 30) {
          bug.targetApproached = true;
          if (bug.isGood) {
            triggerCapture(bug);
          } else {
            triggerEvade(bug);
          }
        } else {
          bug.x -= bug.speed;
        }
      } else {
        bug.x -= bug.speed;
      }

      bug.element.style.left = `${bug.x}px`;
      bug.element.style.top = `${bug.y}px`;
    });
    
    requestAnimationFrame(updateBugs);
  }

  function triggerCapture(bugData) {
    if (isHunting || isJumping) return;
    isHunting = true;
    
    const bugEl = bugData.element;
    const lizardEl = document.getElementById('lizard-runner');
    if (!lizardEl) return;
    
    lizardEl.classList.add('runner-dashing');
    
    setTimeout(() => {
      bugEl.style.transform = 'scale(0)';
      bugEl.style.opacity = '0';
      createSparkExplosion(bugData.x + 6, bugData.y + 6, '#10b981');
      createFloatingTag(bugData.x, bugData.y - 12, 'PROFIT!', '#10b981');
      
      setTimeout(() => {
        bugEl.remove();
        activeBugs.delete(bugData);
      }, 100);
    }, 200);
    
    setTimeout(() => {
      lizardEl.classList.remove('runner-dashing');
      isHunting = false;
    }, 500);
  }

  function triggerEvade(bugData) {
    if (isJumping || isHunting) return;
    isJumping = true;
    
    const lizardEl = document.getElementById('lizard-runner');
    if (!lizardEl) return;
    
    lizardEl.classList.add('runner-jumping');
    
    setTimeout(() => {
      createFloatingTag(bugData.x, bugData.y - 12, 'SKIP TICK', '#ef4444');
    }, 180);
    
    setTimeout(() => {
      lizardEl.classList.remove('runner-jumping');
      isJumping = false;
    }, 450);
  }

  function createSparkExplosion(centerX, centerY, color) {
    for (let i = 0; i < 6; i++) {
      const spark = document.createElement('div');
      spark.style.position = 'absolute';
      spark.style.width = '3px';
      spark.style.height = '3px';
      spark.style.borderRadius = '50%';
      spark.style.background = color;
      spark.style.left = `${centerX}px`;
      spark.style.top = `${centerY}px`;
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '6';
      card.appendChild(spark);
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = 1.0 + Math.random() * 2.0;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      let x = centerX;
      let y = centerY;
      let opacity = 1;
      
      function animateSpark() {
        x += vx;
        y += vy;
        opacity -= 0.08;
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.opacity = opacity;
        
        if (opacity > 0) {
          requestAnimationFrame(animateSpark);
        } else {
          spark.remove();
        }
      }
      requestAnimationFrame(animateSpark);
    }
  }

  function createFloatingTag(x, y, text, color) {
    const tag = document.createElement('div');
    tag.style.position = 'absolute';
    tag.style.left = `${x - 20}px`;
    tag.style.top = `${y}px`;
    tag.style.color = color;
    tag.style.fontFamily = 'monospace';
    tag.style.fontSize = '8.5px';
    tag.style.fontWeight = '800';
    tag.style.textShadow = `0 0 5px ${color}`;
    tag.style.pointerEvents = 'none';
    tag.style.zIndex = '6';
    tag.style.transition = 'transform 0.8s, opacity 0.8s';
    tag.textContent = text;
    card.appendChild(tag);
    
    setTimeout(() => {
      tag.style.transform = 'translateY(-20px) scale(1.08)';
      tag.style.opacity = '0';
    }, 20);
    
    setTimeout(() => tag.remove(), 850);
  }

  function triggerBeepBeep() {
    if (isHunting || isJumping) return;
    isHunting = true;
    
    const lizardEl = document.getElementById('lizard-runner');
    if (!lizardEl) return;
    
    lizardEl.classList.add('runner-beeping');
    setTimeout(() => {
      lizardEl.classList.remove('runner-beeping');
      isHunting = false;
    }, 600);
  }

  mascotContainer.addEventListener('click', triggerBeepBeep);
  card.addEventListener('mouseenter', triggerBeepBeep);

  requestAnimationFrame(updateBugs);
  setInterval(createBug, 4500);
  createBug();
});
