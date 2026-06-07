/**
 * Mascote Interativo - Cyber Monkey (Portal version)
 * Adaptado para rodar no portal de entrada GoldenLens.
 */

document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('link-robot');
  const anchor = document.getElementById('mascot-robot-anchor');
  if (!card || !anchor) return;

  // 1. Injetar Estilos CSS do Mascote (escopados no card)
  const style = document.createElement('style');
  style.textContent = `
    #link-robot .mascot-container {
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

    #mascot-robot {
      pointer-events: auto;
      cursor: pointer;
    }

    /* Respiração do Macaco (balanço sutil pendurado pelas mãos) */
    @keyframes monkeyBreathingPortal {
      0%, 100% { transform: translateY(0px) scaleY(1); }
      50% { transform: translateY(-3px) scaleY(0.97) rotate(0.5deg); }
    }
    
    #monkey-upper {
      animation: monkeyBreathingPortal 4.8s ease-in-out infinite;
      transform-origin: 130px 142px;
    }

    /* Cauda balançando suavemente */
    @keyframes tailWiggleMonkeyPortal {
      0%, 100% { transform: rotate(0deg) translateY(0); }
      50% { transform: rotate(-5deg) translateY(-2px); }
    }
    #monkey-tail {
      animation: tailWiggleMonkeyPortal 4.5s ease-in-out infinite;
      transform-origin: 138px 125px;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Orelhas mexendo sutilmente */
    @keyframes earMoveRightMonkeyPortal {
      0%, 90%, 100% { transform: rotate(0deg); }
      93%, 97% { transform: rotate(-3deg); }
    }
    @keyframes earMoveLeftMonkeyPortal {
      0%, 88%, 100% { transform: rotate(0deg); }
      91%, 95% { transform: rotate(3deg); }
    }
    #ear-right-group {
      animation: earMoveRightMonkeyPortal 6.5s ease-in-out infinite;
      transform-origin: 168px 68px;
    }
    #ear-left-group {
      animation: earMoveLeftMonkeyPortal 6.5s ease-in-out infinite;
      transform-origin: 92px 68px;
    }

    /* Captura com a cauda (BUY) */
    @keyframes tailCatchMonkeyPortal {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(35deg) scale(1.1); }
      50% { transform: rotate(-55deg) translate(25px, -20px) scale(1.2); }
      75% { transform: rotate(10deg); }
      100% { transform: rotate(0deg); }
    }
    .monkey-catching #monkey-tail {
      animation: none !important;
      animation: tailCatchMonkeyPortal 0.58s cubic-bezier(0.16, 1, 0.3, 1) !important;
      animation-fill-mode: forwards;
    }

    /* Defesa / Chicotada com a cauda (SELL) */
    @keyframes tailDeflectMonkeyPortal {
      0% { transform: rotate(0deg); }
      30% { transform: rotate(-25deg) scale(0.9); }
      50% { transform: rotate(45deg) translate(-10px, 15px) scale(1.1); }
      75% { transform: rotate(-10deg); }
      100% { transform: rotate(0deg); }
    }
    .monkey-deflecting #monkey-tail {
      animation: none !important;
      animation: tailDeflectMonkeyPortal 0.55s cubic-bezier(0.16, 1, 0.3, 1) !important;
      animation-fill-mode: forwards;
    }

    /* Animação de Escalada Acrobática / BOOST */
    @keyframes monkeyClimbPortal {
      0% { transform: scale(1) translateY(0) rotate(0deg); }
      20% { transform: scale(0.95) translateY(10px) rotate(-5deg); }
      50% { transform: scale(1.08) translateY(-90px) rotate(360deg); }
      80% { transform: scale(0.97) translateY(5px) rotate(-2deg); }
      100% { transform: scale(1) translateY(0) rotate(0deg); }
    }
    .monkey-climbing {
      animation: monkeyClimbPortal 0.72s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
      animation-fill-mode: forwards;
    }

    /* Candlesticks contidos no Card do Robot */
    #link-robot .data-candle {
      position: absolute;
      pointer-events: none;
      z-index: 5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s, transform 0.2s;
    }

    #link-robot .candle-wick {
      width: 2px;
      height: 20px;
      position: absolute;
      z-index: 1;
    }

    #link-robot .candle-body {
      width: 10px;
      height: 10px;
      border-radius: 2px;
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8px;
      font-weight: 800;
      color: #ffffff;
      font-family: monospace;
    }

    #link-robot .candle-green .candle-wick { background: #10b981; }
    #link-robot .candle-green .candle-body {
      background: rgba(16, 185, 129, 0.25);
      border: 1.5px solid #10b981;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
    }

    #link-robot .candle-red .candle-wick { background: #ef4444; }
    #link-robot .candle-red .candle-body {
      background: rgba(239, 68, 68, 0.25);
      border: 1.5px solid #ef4444;
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
    }
  `;
  document.head.appendChild(style);

  // 2. Criar e injetar o SVG
  const mascotContainer = document.createElement('div');
  mascotContainer.className = 'mascot-container';
  mascotContainer.innerHTML = `
    <svg id="mascot-robot" width="260" height="180" viewBox="0 0 260 180" style="overflow: visible;">
      <defs>
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#cbd5e1" />
          <stop offset="50%" stop-color="#64748b" />
          <stop offset="100%" stop-color="#334155" />
        </linearGradient>

        <linearGradient id="darkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#475569" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>

        <linearGradient id="cremeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f8fafc" />
          <stop offset="100%" stop-color="#cbd5e1" />
        </linearGradient>

        <!-- Gradiente Neon Verde de Lucro -->
        <linearGradient id="neonProfit" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#34d399" />
          <stop offset="100%" stop-color="#059669" />
        </linearGradient>

        <!-- Gradiente Verde Padrão do Visor -->
        <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#34d399" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>

        <!-- Gradiente Neon Verde para Colisão BUY -->
        <linearGradient id="neonGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#047857" />
        </linearGradient>

        <!-- Gradiente Neon Vermelho para Colisão SELL -->
        <linearGradient id="neonRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f43f5e" />
          <stop offset="100%" stop-color="#be123c" />
        </linearGradient>

        <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Grupo Principal do Macaco -->
      <g id="monkey" style="transform-origin: 130px 142px;">
        <ellipse cx="130" cy="142" rx="42" ry="3" fill="#000000" opacity="0.5" />

        <!-- Grupo Superior (Respiração e Ações) -->
        <g id="monkey-upper">
          
          <!-- Cauda Preênsil Longa (Lado Direito) -->
          <g id="monkey-tail">
            <path d="M 138,124 Q 165,135 185,115 T 210,85 T 225,100" fill="none" stroke="url(#metalGrad)" stroke-width="6.2" stroke-linecap="round" />
            <circle id="tail-led" cx="225" cy="100" r="5.5" fill="url(#visorGrad)" stroke="#047857" stroke-width="1" filter="url(#neonGlow)" />
          </g>

          <!-- Pernas Mecânicas Dobradas -->
          <g id="monkey-legs">
            <path d="M 118,126 L 108,142 Q 102,148 112,148" fill="none" stroke="url(#metalGrad)" stroke-width="5.5" stroke-linecap="round" />
            <path d="M 142,126 L 152,142 Q 158,148 148,148" fill="none" stroke="url(#metalGrad)" stroke-width="5.5" stroke-linecap="round" />
          </g>

          <!-- Corpo/Tronco Geométrico -->
          <polygon id="monkey-body" points="112,94 148,94 140,128 120,128" fill="url(#metalGrad)" stroke="#1e293b" stroke-width="1.5" stroke-linejoin="round" />
          <polygon points="118,98 142,98 136,122 124,122" fill="url(#cremeGrad)" opacity="0.18" stroke="#cbd5e1" stroke-width="0.8" />

          <!-- Cabeça do Macaco -->
          <g id="monkey-head" style="transform-origin: 130px 72px;">
            <g id="ear-left-group">
              <circle cx="92" cy="68" r="16" fill="url(#metalGrad)" stroke="#1e293b" stroke-width="1.5" />
              <circle cx="92" cy="68" r="10" fill="url(#darkGrad)" />
              <circle cx="92" cy="68" r="4.5" fill="url(#visorGrad)" filter="url(#neonGlow)" id="ear-led-left" />
            </g>
            <g id="ear-right-group">
              <circle cx="168" cy="68" r="16" fill="url(#metalGrad)" stroke="#1e293b" stroke-width="1.5" />
              <circle cx="168" cy="68" r="10" fill="url(#darkGrad)" />
              <circle cx="168" cy="68" r="4.5" fill="url(#visorGrad)" filter="url(#neonGlow)" id="ear-led-right" />
            </g>

            <ellipse cx="130" cy="72" rx="28" ry="24" fill="url(#metalGrad)" stroke="#1e293b" stroke-width="1.5" />
            <path d="M 112,78 Q 130,68 148,78 Q 152,90 130,94 Q 108,90 112,78 Z" fill="url(#cremeGrad)" stroke="#cbd5e1" stroke-width="1" />
            <ellipse cx="130" cy="79" rx="3.5" ry="2.2" fill="#1e293b" />
            <path d="M 124,84 Q 130,88 136,84" fill="none" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round" />

            <path id="monkey-visor-back" d="M 108,62 L 152,62 Q 156,76 150,78 L 110,78 Q 104,76 108,62 Z" fill="url(#visorGrad)" stroke="#047857" stroke-width="1.2" filter="url(#neonGlow)" />
            <ellipse cx="120" cy="70" rx="4.5" ry="6.2" fill="#ffffff" />
            <ellipse cx="140" cy="70" rx="4.5" ry="6.2" fill="#ffffff" />

            <g id="monkey-pupil" style="transition: transform 0.12s ease-out;">
              <circle cx="120" cy="70" r="2.2" fill="#000000" />
              <circle cx="119.2" cy="69" r="0.7" fill="#ffffff" />
              <circle cx="140" cy="70" r="2.2" fill="#000000" />
              <circle cx="139.2" cy="69" r="0.7" fill="#ffffff" />
            </g>
          </g>

          <!-- Braços Escaladores Longos (Apoiados no card) -->
          <g id="monkey-arm-left" style="transform-origin: 112px 98px; transition: transform 0.32s ease;">
            <line x1="112" y1="98" x2="88" y2="116" stroke="url(#metalGrad)" stroke-width="6.5" stroke-linecap="round" />
            <line x1="88" y1="116" x2="92" y2="142" stroke="url(#metalGrad)" stroke-width="5.5" stroke-linecap="round" />
            <ellipse cx="92" cy="142" rx="7.5" ry="4.5" fill="#1e293b" stroke="url(#visorGrad)" stroke-width="1" />
          </g>
          
          <g id="monkey-arm-right" style="transform-origin: 148px 98px; transition: transform 0.32s ease;">
            <line x1="148" y1="98" x2="172" y2="116" stroke="url(#metalGrad)" stroke-width="6.5" stroke-linecap="round" />
            <line x1="172" y1="116" x2="168" y2="142" stroke="url(#metalGrad)" stroke-width="5.5" stroke-linecap="round" />
            <ellipse cx="168" cy="142" rx="7.5" ry="4.5" fill="#1e293b" stroke="url(#visorGrad)" stroke-width="1" />
          </g>

        </g>
      </g>
    </svg>
  `;
  anchor.appendChild(mascotContainer);

  // 3. Lógica Ocular e Varredura
  const mascot = document.getElementById('mascot-robot');
  const monkeyPupil = document.getElementById('monkey-pupil');
  const earLedLeft = document.getElementById('ear-led-left');
  const earLedRight = document.getElementById('ear-led-right');
  const tailLed = document.getElementById('tail-led');
  
  let isHunting = false;
  let lastMouseMoveTime = Date.now();
  let idleEyeTimer = null;

  function updatePupil(targetX, targetY) {
    if (!monkeyPupil || !mascot || isHunting) return;
    
    const rect = mascot.getBoundingClientRect();
    const scaleX = rect.width / 260;
    const scaleY = rect.height / 180;
    
    const eyeCenterX = rect.left + 130 * scaleX;
    const eyeCenterY = rect.top + 70 * scaleY;
    
    const dx = targetX - eyeCenterX;
    const dy = targetY - eyeCenterY;
    const distance = Math.hypot(dx, dy);
    
    const maxOffset = 2.4;
    const intensity = Math.min(distance / 200, 1);
    const angle = Math.atan2(dy, dx);
    
    monkeyPupil.style.transform = `translate(${Math.cos(angle) * maxOffset * intensity}px, ${Math.sin(angle) * maxOffset * intensity}px)`;
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
      const offset = Math.random() * 2.4;
      
      if (monkeyPupil) {
        monkeyPupil.style.transform = `translate(${Math.cos(angle) * offset}px, ${Math.sin(angle) * offset}px)`;
        if (Math.random() < 0.25) {
          const randColor = Math.random() < 0.5 ? 'url(#neonGreen)' : 'url(#neonRed)';
          tailLed.setAttribute('fill', randColor);
        }
      }
    }, 1300 + Math.random() * 1200);
  }
  
  setInterval(() => {
    if (Date.now() - lastMouseMoveTime >= 3000) startIdleEyes();
  }, 1000);

  // Candlesticks no Card do Robot
  const activeCandles = new Set();
  
  function createCandle() {
    if (activeCandles.size >= 3) return;
    
    const isGreen = Math.random() < 0.55;
    const candle = document.createElement('div');
    candle.className = `data-candle ${isGreen ? 'candle-green' : 'candle-red'}`;
    
    const wick = document.createElement('div');
    wick.className = 'candle-wick';
    
    const cBody = document.createElement('div');
    cBody.className = 'candle-body';
    cBody.textContent = isGreen ? '▲' : '▼';
    
    candle.appendChild(wick);
    candle.appendChild(cBody);
    card.appendChild(candle);
    
    const cardWidth = card.offsetWidth;
    const x = cardWidth + 10;
    const y = 100 + Math.random() * 80; // Voa no centro do frame
    
    candle.style.left = `${x}px`;
    candle.style.top = `${y}px`;
    
    const speed = 1.8 + Math.random() * 1.6;
    
    const candleData = {
      element: candle,
      x: x,
      y: y,
      speed: speed,
      isGreen: isGreen,
      createdAt: Date.now(),
      targetApproached: false
    };
    
    activeCandles.add(candleData);
  }

  function updateCandles() {
    const cardWidth = card.offsetWidth;
    
    activeCandles.forEach((candle) => {
      if (candle.x < -30) {
        candle.element.remove();
        activeCandles.delete(candle);
        return;
      }

      if (!candle.targetApproached && !isHunting) {
        const triggerX = cardWidth / 2 - 40;
        
        if (candle.x <= triggerX + 40 && candle.x >= triggerX - 20) {
          candle.targetApproached = true;
          if (candle.isGreen) {
            triggerBuyCapture(candle);
          } else {
            triggerSellDeflect(candle);
          }
        } else {
          candle.x -= candle.speed;
        }
      } else {
        candle.x -= candle.speed;
      }

      candle.element.style.left = `${candle.x}px`;
      candle.element.style.top = `${candle.y}px`;
    });
    
    requestAnimationFrame(updateCandles);
  }

  function triggerBuyCapture(candleData) {
    if (isHunting) return;
    isHunting = true;
    
    const candleEl = candleData.element;
    const monkeyEl = document.getElementById('monkey');
    if (!monkeyEl) return;
    
    earLedLeft.setAttribute('fill', 'url(#neonGreen)');
    earLedRight.setAttribute('fill', 'url(#neonGreen)');
    tailLed.setAttribute('fill', 'url(#neonGreen)');
    
    monkeyEl.classList.add('monkey-catching');
    
    setTimeout(() => {
      candleEl.style.transform = 'scale(0)';
      candleEl.style.opacity = '0';
      
      createSparkExplosion(candleData.x + 6, candleData.y + 10, '#10b981');
      createFloatingTag(candleData.x, candleData.y - 12, 'BUY OK', '#10b981');
      
      setTimeout(() => {
        candleEl.remove();
        activeCandles.delete(candleData);
      }, 100);
    }, 240);
    
    setTimeout(() => {
      monkeyEl.classList.remove('monkey-catching');
      isHunting = false;
      earLedLeft.setAttribute('fill', 'url(#visorGrad)');
      earLedRight.setAttribute('fill', 'url(#visorGrad)');
      tailLed.setAttribute('fill', 'url(#visorGrad)');
    }, 580);
  }

  function triggerSellDeflect(candleData) {
    if (isHunting) return;
    isHunting = true;
    
    const candleEl = candleData.element;
    const monkeyEl = document.getElementById('monkey');
    if (!monkeyEl) return;
    
    earLedLeft.setAttribute('fill', 'url(#neonRed)');
    earLedRight.setAttribute('fill', 'url(#neonRed)');
    tailLed.setAttribute('fill', 'url(#neonRed)');
    
    monkeyEl.classList.add('monkey-deflecting');
    
    setTimeout(() => {
      createSparkExplosion(candleData.x + 6, candleData.y + 10, '#f43f5e');
      createFloatingTag(candleData.x, candleData.y - 12, 'SELL OK', '#f43f5e');
      
      candleEl.style.transform = 'translateY(-30px) scale(0)';
      candleEl.style.opacity = '0';
      
      setTimeout(() => {
        candleEl.remove();
        activeCandles.delete(candleData);
      }, 150);
    }, 220);
    
    setTimeout(() => {
      monkeyEl.classList.remove('monkey-deflecting');
      isHunting = false;
      earLedLeft.setAttribute('fill', 'url(#visorGrad)');
      earLedRight.setAttribute('fill', 'url(#visorGrad)');
      tailLed.setAttribute('fill', 'url(#visorGrad)');
    }, 550);
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
      const velocity = 1.0 + Math.random() * 1.8;
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

  function triggerBoost() {
    if (isHunting) return;
    isHunting = true;
    
    const monkeyUpperEl = document.getElementById('monkey-upper');
    if (!monkeyUpperEl) return;
    
    monkeyUpperEl.classList.add('monkey-climbing');
    
    let count = 0;
    const interval = setInterval(() => {
      const activeColor = count % 2 === 0 ? '#34d399' : '#059669';
      earLedLeft.setAttribute('fill', activeColor);
      earLedRight.setAttribute('fill', activeColor);
      tailLed.setAttribute('fill', activeColor);
      count++;
      if (count >= 10) {
        clearInterval(interval);
        earLedLeft.setAttribute('fill', 'url(#visorGrad)');
        earLedRight.setAttribute('fill', 'url(#visorGrad)');
        tailLed.setAttribute('fill', 'url(#visorGrad)');
      }
    }, 70);
    
    const rect = mascot.getBoundingClientRect();
    const scaleX = rect.width / 260;
    const scaleY = rect.height / 180;
    const centerGlobalX = rect.left - card.getBoundingClientRect().left + 130 * scaleX;
    const centerGlobalY = rect.top - card.getBoundingClientRect().top + 72 * scaleY;
    createSparkExplosion(centerGlobalX, centerGlobalY, '#10b981');
    
    setTimeout(() => {
      monkeyUpperEl.classList.remove('monkey-climbing');
      isHunting = false;
    }, 720);
  }

  mascotContainer.addEventListener('click', triggerBoost);
  card.addEventListener('mouseenter', triggerBoost);

  requestAnimationFrame(updateCandles);
  setInterval(createCandle, 4200);
  createCandle();
});
