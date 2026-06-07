/**
 * Mascote Interativo - Data Gecko (Portal version)
 * Adaptado para rodar no portal de entrada GoldenLens.
 */

document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('link-gecko');
  const anchor = document.getElementById('mascot-gecko-anchor');
  if (!card || !anchor) return;

  // 1. Injetar Estilos CSS do Mascote (escopados apenas no card)
  const style = document.createElement('style');
  style.textContent = `
    #link-gecko .mascot-container {
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

    #mascot-gecko {
      pointer-events: auto;
      cursor: pointer;
    }

    /* Leve flutuação do camaleão para dar sensação de respiração e vida */
    @keyframes lizardBreathing {
      0%, 100% { transform: translateY(0px) scaleY(1); }
      50% { transform: translateY(-2px) scaleY(0.98); }
    }
    
    #lizard-upper-gecko {
      animation: lizardBreathing 4s ease-in-out infinite;
      transform-origin: 130px 105px;
    }

    /* Animação sutil da cauda */
    @keyframes tailWiggle {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-3deg); }
    }
    #lizard-tail-gecko {
      animation: tailWiggle 4.5s ease-in-out infinite;
      transform-origin: 175px 90px;
    }

    /* Estilo dos insetos (Pacotes de dados neon) */
    #link-gecko .data-bug {
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
      transition: opacity 0.2s ease-out, transform 0.2s ease-out;
      animation: bugPulse 1.2s ease-in-out infinite;
    }

    #link-gecko .bug-json {
      background: rgba(6, 182, 212, 0.25);
      border: 1.5px solid #06b6d4;
      color: #06b6d4;
      box-shadow: 0 0 8px rgba(6, 182, 212, 0.5);
    }
    
    #link-gecko .bug-api {
      background: rgba(245, 158, 11, 0.25);
      border: 1.5px solid #f59e0b;
      color: #ffe259;
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
    }
    
    #link-gecko .bug-ws {
      background: rgba(16, 185, 129, 0.25);
      border: 1.5px solid #10b981;
      color: #10b981;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
    }
    
    #link-gecko .bug-err {
      background: rgba(239, 68, 68, 0.25);
      border: 1.5px solid #ef4444;
      color: #ef4444;
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
    }

    @keyframes bugPulse {
      0%, 100% { transform: scale(1); filter: brightness(1); }
      50% { transform: scale(1.18); filter: brightness(1.25); }
    }
  `;
  document.head.appendChild(style);

  // 2. Criar e injetar o SVG do Camaleão
  const mascotContainer = document.createElement('div');
  mascotContainer.className = 'mascot-container';
  mascotContainer.innerHTML = `
    <svg id="mascot-gecko" width="260" height="180" viewBox="0 0 260 180" style="overflow: visible;">
      <defs>
        <linearGradient id="bodyGradGecko" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a855f7" />
          <stop offset="50%" stop-color="#8b5cf6" />
          <stop offset="100%" stop-color="#6366f1" />
        </linearGradient>

        <linearGradient id="goldGradGecko" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffe259" />
          <stop offset="100%" stop-color="#ffa751" />
        </linearGradient>
        
        <filter id="laserGlowGecko" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g id="lizard-gecko">
        <ellipse cx="130" cy="102.5" rx="72" ry="3.5" fill="#000000" opacity="0.65" />

        <!-- Perna Traseira -->
        <g id="leg-back-gecko">
          <path d="M 100,98 L 94,110" fill="none" stroke="#4f46e5" stroke-width="5.5" stroke-linecap="round" />
          <circle cx="89" cy="110" r="3" fill="#4f46e5" />
          <circle cx="98" cy="110" r="3" fill="#4f46e5" />
        </g>

        <!-- Perna Dianteira -->
        <g id="leg-front-gecko">
          <path d="M 152,100 L 158,110" fill="none" stroke="#4f46e5" stroke-width="5.5" stroke-linecap="round" />
          <circle cx="153" cy="110" r="3" fill="#4f46e5" />
          <circle cx="162" cy="110" r="3" fill="#4f46e5" />
        </g>

        <!-- Grupo de Respiração -->
        <g id="lizard-upper-gecko">
          <!-- Cauda em Espiral -->
          <g id="lizard-tail-gecko">
             <path d="M 175,90 Q 205,80 220,105 T 200,135 T 180,115 T 195,100" fill="none" stroke="url(#bodyGradGecko)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
             <path d="M 175,90 Q 205,80 220,105 T 200,135 T 180,115 T 195,100" fill="none" stroke="url(#goldGradGecko)" stroke-width="1.8" stroke-linecap="round" opacity="0.6" />
          </g>
          
          <!-- Crista -->
          <polygon points="125,50 120,44 115,52" fill="#c084fc" />
          <polygon points="138,54 134,48 129,56" fill="#c084fc" />
          <polygon points="150,60 146,54 141,62" fill="#c084fc" />
          <polygon points="110,54 105,48 101,56" fill="#c084fc" />
          <polygon points="96,64 91,58 87,66" fill="#c084fc" />

          <!-- Corpo Principal -->
          <polygon id="lizard-body-gecko" points="85,78 125,50 170,72 175,90 160,102 115,102 90,95" fill="url(#bodyGradGecko)" stroke="#4f46e5" stroke-width="1.5" />
          <polygon points="85,78 125,50 148,68 115,82" fill="#ffffff" opacity="0.08" />
          <polygon points="115,82 148,68 170,72 160,95 130,96" fill="#000000" opacity="0.12" />

          <!-- Cabeça -->
          <g id="lizard-head-gecko">
            <polygon points="82,78 76,55 58,58 40,74 35,95 52,98 82,98" fill="url(#bodyGradGecko)" stroke="#4f46e5" stroke-width="1.5" />
            <path d="M 35,93 Q 45,92 52,96" fill="none" stroke="#1e1b4b" stroke-width="2.2" stroke-linecap="round" />

            <!-- Língua Laser -->
            <path id="lizard-tongue-glow-gecko" d="M 35,93 Q 35,93 35,93" fill="none" stroke="#ec4899" stroke-width="5" stroke-linecap="round" opacity="0" filter="url(#laserGlowGecko)" />
            <path id="lizard-tongue-gecko" d="M 35,93 Q 35,93 35,93" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0" />
            
            <circle id="lizard-tongue-tip-glow-gecko" cx="35" cy="93" r="7.5" fill="#06b6d4" opacity="0" filter="url(#laserGlowGecko)" />
            <circle id="lizard-tongue-tip-gecko" cx="35" cy="93" r="3.5" fill="#ffffff" opacity="0" />

            <!-- Olhos -->
            <ellipse cx="58" cy="82" rx="4.5" ry="7.5" fill="#ffffff" stroke="#4f46e5" stroke-width="1.2" />
            <ellipse cx="66.5" cy="81" rx="4.5" ry="7.5" fill="#ffffff" stroke="#4f46e5" stroke-width="1.2" />

            <!-- pupilas -->
            <g id="lizard-pupil-gecko" style="transition: transform 0.12s ease-out;">
              <ellipse cx="58.5" cy="82.5" rx="2" ry="3.2" fill="#000000" />
              <circle cx="57.9" cy="81.2" r="0.6" fill="#ffffff" />
              <ellipse cx="66.7" cy="81.5" rx="2" ry="3.2" fill="#000000" />
              <circle cx="66.1" cy="80.2" r="0.6" fill="#ffffff" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  `;
  anchor.appendChild(mascotContainer);

  // 3. Lógica Ocular e Caça a Insetos
  const mascot = document.getElementById('mascot-gecko');
  const pupil = document.getElementById('lizard-pupil-gecko');
  const tongueGlow = document.getElementById('lizard-tongue-glow-gecko');
  const tongue = document.getElementById('lizard-tongue-gecko');
  const tipGlow = document.getElementById('lizard-tongue-tip-glow-gecko');
  const tip = document.getElementById('lizard-tongue-tip-gecko');
  
  let isHunting = false;
  let isScanning = false;
  let lastMouseMoveTime = Date.now();
  let idleEyeTimer = null;

  function updatePupil(targetX, targetY) {
    if (!pupil || !mascot || isHunting) return;
    
    const rect = mascot.getBoundingClientRect();
    const scaleX = rect.width / 260;
    const scaleY = rect.height / 180;
    
    const eyeCenterX = rect.left + 62.5 * scaleX;
    const eyeCenterY = rect.top + 81.5 * scaleY;
    
    const dx = targetX - eyeCenterX;
    const dy = targetY - eyeCenterY;
    const distance = Math.hypot(dx, dy);
    
    const maxOffset = 2.2;
    const intensity = Math.min(distance / 200, 1);
    
    const angle = Math.atan2(dy, dx);
    const px = Math.cos(angle) * maxOffset * intensity;
    const py = Math.sin(angle) * maxOffset * intensity;
    
    pupil.style.transform = `translate(${px}px, ${py}px)`;
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
      if (Date.now() - lastMouseMoveTime < 3000 || isHunting) return;
      
      const angle = Math.random() * Math.PI * 2;
      const offset = Math.random() * 2.2;
      const px = Math.cos(angle) * offset;
      const py = Math.sin(angle) * offset;
      
      if (pupil) {
        pupil.style.transform = `translate(${px}px, ${py}px)`;
        
        if (Math.random() < 0.22) {
          pupil.style.transform += ' scaleY(0.1)';
          setTimeout(() => {
            pupil.style.transform = pupil.style.transform.replace(' scaleY(0.1)', '');
          }, 150);
        }
      }
    }, 1200 + Math.random() * 1500);
  }
  
  setInterval(() => {
    if (Date.now() - lastMouseMoveTime >= 3000) {
      startIdleEyes();
    }
  }, 1000);

  // Voo dos Insetos limitados a este Card
  const activeBugs = new Set();
  
  function createBug() {
    if (activeBugs.size >= 3) return; 
    
    const bug = document.createElement('div');
    const rand = Math.random();
    let type = 'json';
    let text = '◈';
    let color = '#06b6d4';
    
    if (rand < 0.25) {
      type = 'api';
      text = '★';
      color = '#ffe259';
    } else if (rand < 0.65) {
      type = 'json';
      text = '{}';
      color = '#06b6d4';
    } else if (rand < 0.90) {
      type = 'ws';
      text = '⚡';
      color = '#10b981';
    } else {
      type = 'err';
      text = '✖';
      color = '#ef4444';
    }
    
    bug.className = `data-bug bug-${type}`;
    bug.textContent = text;
    card.appendChild(bug);
    
    // Posições relativas ao card
    const side = Math.random() < 0.5 ? -30 : card.offsetWidth + 10;
    let x = side;
    let y = 120 + Math.random() * 120; // Ajustado para voar no centro do frame
    
    bug.style.left = `${x}px`;
    bug.style.top = `${y}px`;
    
    const bugData = {
      element: bug,
      type: type,
      color: color,
      x: x,
      y: y,
      angle: Math.random() * Math.PI * 2,
      speed: 1.0 + Math.random() * 1.5,
      wobbleSpeed: 0.04 + Math.random() * 0.04,
      createdAt: Date.now(),
      isTarget: Math.random() < 0.75,
      targetApproached: false
    };
    
    activeBugs.add(bugData);
  }

  function updateBugs() {
    const time = Date.now();
    const cardWidth = card.offsetWidth;
    
    activeBugs.forEach((bug) => {
      if (time - bug.createdAt > 15000) {
        bug.element.remove();
        activeBugs.delete(bug);
        return;
      }

      if (bug.isTarget && !bug.targetApproached && !isHunting) {
        const targetX = cardWidth / 2 - 95;
        const targetY = 30 + Math.sin(time * 0.005) * 10; // Ajustado Y da boca interna
        
        const dx = targetX - bug.x;
        const dy = targetY - bug.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < 18) {
          bug.targetApproached = true;
          triggerCapture(bug);
        } else {
          bug.x += (dx / dist) * bug.speed;
          bug.y += (dy / dist) * bug.speed;
        }
      } else {
        bug.angle += (Math.random() - 0.5) * 0.4;
        bug.x += Math.cos(bug.angle) * bug.speed;
        bug.y += Math.sin(bug.angle) * bug.speed + Math.sin(time * bug.wobbleSpeed) * 0.5;
        
        // Limites do card
        if (bug.x < -40) bug.x = cardWidth + 20;
        if (bug.x > cardWidth + 40) bug.x = -20;
        if (bug.y < 20) bug.y = 280;
        if (bug.y > 320) bug.y = 30;
      }

      bug.element.style.left = `${bug.x}px`;
      bug.element.style.top = `${bug.y}px`;
    });
    
    requestAnimationFrame(updateBugs);
  }

  function triggerCapture(bugData) {
    if (isHunting) return;
    isHunting = true;
    
    const bugEl = bugData.element;
    const mascotRect = mascot.getBoundingClientRect();
    const bugRect = bugEl.getBoundingClientRect();
    
    const scaleX = 260 / mascotRect.width;
    const scaleY = 180 / mascotRect.height;
    
    const bugLocalX = (bugRect.left + bugRect.width/2 - mascotRect.left) * scaleX;
    const bugLocalY = (bugRect.top + bugRect.height/2 - mascotRect.top) * scaleY;
    
    if (pupil) {
      const dx = bugLocalX - 62.5;
      const dy = bugLocalY - 81.5;
      const dist = Math.hypot(dx, dy);
      pupil.style.transform = `translate(${(dx / dist) * 2.2}px, ${(dy / dist) * 2.2}px)`;
    }
    
    setTimeout(() => {
      tongueGlow.setAttribute('opacity', '1');
      tongue.setAttribute('opacity', '1');
      tipGlow.setAttribute('opacity', '1');
      tip.setAttribute('opacity', '1');
      
      const pathD = `M 35,93 Q ${(35 + bugLocalX)/2},${(93 + bugLocalY)/2 - 8} ${bugLocalX},${bugLocalY}`;
      tongueGlow.setAttribute('d', pathD);
      tongue.setAttribute('d', pathD);
      tipGlow.setAttribute('cx', bugLocalX);
      tipGlow.setAttribute('cy', bugLocalY);
      tip.setAttribute('cx', bugLocalX);
      tip.setAttribute('cy', bugLocalY);
      
      setTimeout(() => {
        bugEl.style.transform = 'scale(0)';
        bugEl.style.opacity = '0';
        
        tongueGlow.setAttribute('d', 'M 35,93 Q 35,93 35,93');
        tongue.setAttribute('d', 'M 35,93 Q 35,93 35,93');
        tipGlow.setAttribute('cx', 35);
        tip.setAttribute('cy', 93);
        tip.setAttribute('cx', 35);
        tip.setAttribute('cy', 93);
        
        createSparkExplosion(bugData.x + 8, bugData.y + 8, bugData.color);
        createFloatingTag(bugData.x, bugData.y - 12, bugData.type === 'err' ? 'SKIP_ERR' : 'INGEST_OK', bugData.color);
        
        setTimeout(() => {
          tongueGlow.setAttribute('opacity', '0');
          tongue.setAttribute('opacity', '0');
          tipGlow.setAttribute('opacity', '0');
          tip.setAttribute('opacity', '0');
          bugEl.remove();
          activeBugs.delete(bugData);
          isHunting = false;
          
          if (pupil) {
            pupil.style.transform = 'scaleY(0.1)';
            setTimeout(() => pupil.style.transform = 'scaleY(1)', 300);
          }
        }, 100);
      }, 120);
    }, 100);
  }

  function createSparkExplosion(centerX, centerY, color) {
    for (let i = 0; i < 6; i++) {
      const spark = document.createElement('div');
      spark.style.position = 'absolute';
      spark.style.width = '3px';
      spark.style.height = '3px';
      spark.style.borderRadius = '50%';
      spark.style.background = color;
      spark.style.boxShadow = `0 0 5px ${color}`;
      spark.style.left = `${centerX}px`;
      spark.style.top = `${centerY}px`;
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '6';
      card.appendChild(spark);
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = 0.8 + Math.random() * 1.8;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      let x = centerX;
      let y = centerY;
      let opacity = 1;
      
      function animateSpark() {
        x += vx;
        y += vy;
        opacity -= 0.07;
        
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

  function triggerSelfScan() {
    if (isHunting || isScanning) return;
    isScanning = true;
    
    const fins = mascotContainer.querySelectorAll('polygon[fill="#c084fc"], path[stroke="url(#goldGradGecko)"]');
    let flashCount = 0;
    const interval = setInterval(() => {
      fins.forEach(f => {
        const currentOpacity = f.getAttribute('opacity') || '1';
        f.setAttribute('opacity', currentOpacity === '0.3' ? '1' : '0.3');
      });
      flashCount++;
      if (flashCount >= 6) {
        clearInterval(interval);
        fins.forEach(f => f.setAttribute('opacity', '1'));
        isScanning = false;
      }
    }, 150);
  }

  mascotContainer.addEventListener('click', triggerSelfScan);
  card.addEventListener('mouseenter', triggerSelfScan);

  requestAnimationFrame(updateBugs);
  setInterval(createBug, 5000);
  createBug();
});
