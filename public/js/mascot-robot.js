/**
 * Mascote Interativo - Data Fox (Portal version)
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

    /* Respiração da Raposa */
    @keyframes foxBreathing {
      0%, 100% { transform: translateY(0px) scaleY(1); }
      50% { transform: translateY(-2.5px) scaleY(0.98); }
    }
    
    #fox-upper-robot {
      animation: foxBreathing 4.5s ease-in-out infinite;
      transform-origin: 130px 145px;
    }

    /* Cauda */
    @keyframes tailWiggleFox {
      0%, 100% { transform: rotate(0deg) translateY(0); }
      50% { transform: rotate(-3deg) translateY(-1.5px); }
    }
    #fox-tail-robot {
      animation: tailWiggleFox 5s ease-in-out infinite;
      transform-origin: 168px 125px;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Orelhas */
    @keyframes earMoveRight {
      0%, 90%, 100% { transform: rotate(0deg); }
      93%, 97% { transform: rotate(-2deg); }
    }
    @keyframes earMoveLeft {
      0%, 88%, 100% { transform: rotate(0deg); }
      91%, 95% { transform: rotate(3deg); }
    }
    #ear-right-robot {
      animation: earMoveRight 6s ease-in-out infinite;
      transform-origin: 115px 56px;
    }
    #ear-left-robot {
      animation: earMoveLeft 6s ease-in-out infinite;
      transform-origin: 98px 58px;
    }

    /* Mordida */
    @keyframes foxBite {
      0% { transform: translate(0px, 0px) rotate(0deg); }
      15% { transform: translate(-8px, -4px) rotate(-4deg); }
      30% { transform: translate(-28px, 12px) rotate(8deg); }
      45% { transform: translate(-30px, 14px) rotate(8deg) scaleY(1.02); }
      75% { transform: translate(4px, -2px) rotate(-2deg); }
      100% { transform: translate(0px, 0px) rotate(0deg); }
    }
    .fox-biting {
      animation: foxBite 0.52s cubic-bezier(0.25, 1, 0.5, 1) !important;
      animation-fill-mode: forwards;
    }

    /* Chicotada com a Cauda */
    @keyframes tailDeflect {
      0% { transform: rotate(0deg); }
      20% { transform: rotate(12deg) scale(0.95); }
      45% { transform: rotate(-28deg) translate(-15px, -8px) scale(1.05); }
      75% { transform: rotate(4deg) translate(2px, 1px); }
      100% { transform: rotate(0deg); }
    }
    .fox-deflecting #fox-tail-robot {
      animation: none !important;
      animation: tailDeflect 0.55s cubic-bezier(0.16, 1, 0.3, 1) !important;
      animation-fill-mode: forwards;
    }

    /* BOOST */
    @keyframes foxBoostAnimation {
      0% { transform: scale(1) rotate(0deg); }
      25% { transform: scale(0.92) translateY(5px) rotate(-6deg); }
      55% { transform: scale(1.1) translateY(-14px) rotate(10deg); }
      80% { transform: scale(0.97) translateY(1px) rotate(-2deg); }
      100% { transform: scale(1) rotate(0deg); }
    }
    .fox-boosting {
      animation: foxBoostAnimation 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
      animation-fill-mode: forwards;
    }

    /* Candlesticks */
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
        <linearGradient id="cobreGradRobot" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#94a3b8" />
          <stop offset="60%" stop-color="#475569" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>

        <linearGradient id="darkGradRobot" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#334155" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>

        <linearGradient id="cremeGradRobot" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f8fafc" />
          <stop offset="100%" stop-color="#cbd5e1" />
        </linearGradient>

        <linearGradient id="neonGreenRobot" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#047857" />
        </linearGradient>

        <linearGradient id="neonRedRobot" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f43f5e" />
          <stop offset="100%" stop-color="#be123c" />
        </linearGradient>

        <linearGradient id="visorGradRobot" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#facc15" />
          <stop offset="100%" stop-color="#eab308" />
        </linearGradient>

        <filter id="neonGlowRobot" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>      <g id="fox-robot" style="transform-origin: 130px 145px;">
        <!-- Sombra de contato -->
        <ellipse cx="130" cy="142" rx="48" ry="3.5" fill="#000000" opacity="0.45" />

        <!-- Pernas e Patas Estáticas -->
        <g id="legs-robot">
          <!-- Patas Traseiras (Dobrada na base) -->
          <ellipse cx="144" cy="132" rx="14" ry="10" fill="url(#cobreGradRobot)" stroke="#1e293b" stroke-width="1.2" style="transform: rotate(-10deg); transform-origin: 144px 132px;" />
          <ellipse cx="148" cy="142" rx="8" ry="2.5" fill="url(#cobreGradRobot)" stroke="#1e293b" stroke-width="1.2" />
          
          <!-- Pata Dianteira Esquerda (Atrás) -->
          <path d="M 106,120 L 102,142" fill="none" stroke="#1e293b" stroke-width="5" stroke-linecap="round" opacity="0.6" />
          <ellipse cx="102" cy="142" rx="4" ry="2" fill="#1e293b" opacity="0.6" />

          <!-- Pata Dianteira Direita (Frente) -->
          <path d="M 116,118 L 112,142" fill="none" stroke="url(#cobreGradRobot)" stroke-width="5.5" stroke-linecap="round" />
          <ellipse cx="112" cy="142" rx="4.5" ry="2.2" fill="url(#cobreGradRobot)" stroke="#1e293b" stroke-width="0.8" />
        </g>

        <!-- Grupo Superior (Sofre Respiração e Rotação) -->
        <g id="fox-upper-robot">
          
          <!-- Cauda de Raposa horizontal e peluda, com ponta branca (Sem parecer esquilo) -->
          <g id="fox-tail-robot" style="transform-origin: 154px 128px;">
            <!-- Base e meio da cauda (Prata) -->
            <path d="M 152,126 Q 190,118 212,130 L 206,142 Q 180,144 154,136 Z" fill="url(#cobreGradRobot)" stroke="#1e293b" stroke-width="1.5" stroke-linejoin="round" />
            <!-- Faceta Superior da Cauda (Elemento Neon/Creme Dinâmico) -->
            <path id="tail-facet-top-robot" d="M 190,118 Q 201,124 212,130 L 206,142 Q 195,133 190,118" fill="url(#cremeGradRobot)" opacity="0.15" stroke="#1e293b" stroke-width="0.8" />
            <!-- Ponta da cauda (Creme/Branca) -->
            <path id="tail-facet-bottom-robot" d="M 212,130 Q 228,124 240,135 Q 223,146 206,142 Z" fill="url(#cremeGradRobot)" stroke="#cbd5e1" stroke-width="1.5" stroke-linejoin="round" />
          </g>

          <!-- Corpo Principal Simples Low-Poly -->
          <polygon id="fox-body-robot" points="104,115 130,96 164,110 156,142 114,142 94,120" fill="url(#cobreGradRobot)" stroke="#1e293b" stroke-width="1.5" stroke-linejoin="round" />
          
          <!-- Facetas Geométricas do corpo para estilo premium -->
          <polygon points="104,115 130,96 148,106 122,124" fill="#ffffff" opacity="0.08" />
          <polygon points="122,124 148,106 164,110 156,142 134,142" fill="#000000" opacity="0.12" />

          <!-- Peito Creme Fofo -->
          <polygon points="104,115 130,96 126,138 114,142" fill="url(#cremeGradRobot)" stroke="#cbd5e1" stroke-width="1.2" stroke-linejoin="round" />

          <!-- Cabeça da Raposa de Perfil (Voltada para a esquerda) -->
          <g id="fox-head-robot" style="transform-origin: 124px 85px;">
            <!-- Face Superior, Focinho e Bochechas -->
            <polygon points="126,86 116,56 86,60 62,80 50,88 72,96 102,96 126,90" fill="url(#cobreGradRobot)" stroke="#1e293b" stroke-width="1.5" stroke-linejoin="round" />
            
            <!-- Facetas Geométricas da cabeça -->
            <polygon points="116,56 86,60 62,80 88,76" fill="#ffffff" opacity="0.08" />
            
            <!-- Bochecha Creme -->
            <polygon points="62,80 50,88 72,96 86,96" fill="url(#cremeGradRobot)" stroke="#cbd5e1" stroke-width="1" stroke-linejoin="round" />
            <polygon points="72,96 86,96 102,96 88,86" fill="#000000" opacity="0.1" />

            <!-- Nariz Preto Fofo -->
            <circle cx="50" cy="88" r="2.8" fill="#111827" />

            <!-- Orelha Esquerda (Traseira) -->
            <polygon id="ear-left-robot" points="94,58 76,22 88,18 100,50" fill="#1e293b" opacity="0.7" />

            <!-- Orelha Direita (Dianteira) -->
            <g id="ear-right-group-robot">
              <polygon id="ear-right-robot" points="112,56 94,14 108,8 120,46" fill="url(#cobreGradRobot)" stroke="#1e293b" stroke-width="1.5" stroke-linejoin="round" />
              <polygon points="100,20 106,15 110,32" id="ear-led-robot" fill="url(#visorGradRobot)" opacity="0.75" />
            </g>

            <!-- Olhos Normais de Cartoon (Padrão Gecko/Runner) -->
            <ellipse cx="65" cy="74" rx="4.5" ry="7.5" fill="#ffffff" stroke="#1e293b" stroke-width="1.2" />
            <ellipse cx="73.5" cy="73" rx="4.5" ry="7.5" fill="#ffffff" stroke="#1e293b" stroke-width="1.2" />
 
            <!-- Pupilas que reagem ao mouse -->
            <g id="fox-pupil-robot" style="transition: transform 0.12s ease-out;">
              <ellipse cx="65.5" cy="74.5" rx="1.8" ry="3.0" fill="#000000" />
              <circle cx="64.9" cy="73.3" r="0.6" fill="#ffffff" />
              <ellipse cx="74.0" cy="73.5" rx="1.8" ry="3.0" fill="#000000" />
              <circle cx="73.4" cy="72.3" r="0.6" fill="#ffffff" />
            </g>

            <!-- Boca Fofa -->
            <path d="M 50,90 Q 55,92 60,90" fill="none" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round" />
          </g>
        </g>
      </g>
    </svg>
  `;
  anchor.appendChild(mascotContainer);

  // 3. Lógica Ocular e Varredura
  const mascot = document.getElementById('mascot-robot');
  const foxPupil = document.getElementById('fox-pupil-robot');
  const earLed = document.getElementById('ear-led-robot');
  const tailFacetTop = document.getElementById('tail-facet-top-robot');
  const tailFacetBottom = document.getElementById('tail-facet-bottom-robot');
  
  let isHunting = false;
  let lastMouseMoveTime = Date.now();
  let idleEyeTimer = null;

  function updatePupil(targetX, targetY) {
    if (!foxPupil || !mascot || isHunting) return;
    
    const rect = mascot.getBoundingClientRect();
    const scaleX = rect.width / 260;
    const scaleY = rect.height / 180;
    
    const eyeCenterX = rect.left + 69 * scaleX;
    const eyeCenterY = rect.top + 74 * scaleY;
    
    const dx = targetX - eyeCenterX;
    const dy = targetY - eyeCenterY;
    const distance = Math.hypot(dx, dy);
    
    const maxOffset = 2.2;
    const intensity = Math.min(distance / 200, 1);
    const angle = Math.atan2(dy, dx);
    
    foxPupil.style.transform = `translate(${Math.cos(angle) * maxOffset * intensity}px, ${Math.sin(angle) * maxOffset * intensity}px)`;
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
      
      if (foxPupil) {
        foxPupil.style.transform = `translate(${Math.cos(angle) * offset}px, ${Math.sin(angle) * offset}px)`;
        if (Math.random() < 0.25) {
          tailFacetTop.setAttribute('fill', Math.random() < 0.5 ? 'url(#neonGreenRobot)' : 'url(#neonRedRobot)');
        }
      }
    }, 1200 + Math.random() * 1200);
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
        
        if (candle.x <= triggerX + 30 && candle.x >= triggerX - 30) {
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
    const upperEl = document.getElementById('fox-upper-robot');
    if (!upperEl) return;
    
    earLed.setAttribute('fill', 'url(#neonGreenRobot)');
    tailFacetTop.setAttribute('fill', 'url(#neonGreenRobot)');
    
    upperEl.classList.add('fox-biting');
    
    setTimeout(() => {
      candleEl.style.transform = 'scale(0)';
      candleEl.style.opacity = '0';
      
      createSparkExplosion(candleData.x + 6, candleData.y + 10, '#10b981');
      createFloatingTag(candleData.x, candleData.y - 12, 'BUY OK', '#10b981');
      
      setTimeout(() => {
        candleEl.remove();
        activeCandles.delete(candleData);
      }, 100);
    }, 200);
    
    setTimeout(() => {
      upperEl.classList.remove('fox-biting');
      isHunting = false;
      earLed.setAttribute('fill', 'url(#visorGradRobot)');
    }, 550);
  }

  function triggerSellDeflect(candleData) {
    if (isHunting) return;
    isHunting = true;
    
    const candleEl = candleData.element;
    const foxEl = document.getElementById('fox-robot');
    if (!foxEl) return;
    
    earLed.setAttribute('fill', 'url(#neonRedRobot)');
    tailFacetTop.setAttribute('fill', 'url(#neonRedRobot)');
    
    foxEl.classList.add('fox-deflecting');
    
    setTimeout(() => {
      createSparkExplosion(candleData.x + 6, candleData.y + 10, '#f43f5e');
      createFloatingTag(candleData.x, candleData.y - 12, 'SELL OK', '#f43f5e');
      
      candleEl.style.transform = 'translateY(-30px) scale(0)';
      candleEl.style.opacity = '0';
      
      setTimeout(() => {
        candleEl.remove();
        activeCandles.delete(candleData);
      }, 150);
    }, 240);
    
    setTimeout(() => {
      foxEl.classList.remove('fox-deflecting');
      isHunting = false;
      earLed.setAttribute('fill', 'url(#visorGradRobot)');
    }, 580);
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
    
    const foxUpperEl = document.getElementById('fox-upper-robot');
    if (!foxUpperEl) return;
    
    foxUpperEl.classList.add('fox-boosting');
    
    let count = 0;
    const interval = setInterval(() => {
      const activeColor = count % 2 === 0 ? '#10b981' : '#f43f5e';
      earLed.setAttribute('fill', activeColor);
      tailFacetTop.setAttribute('fill', activeColor);
      count++;
      if (count >= 10) {
        clearInterval(interval);
        earLed.setAttribute('fill', 'url(#visorGradRobot)');
      }
    }, 70);
    
    const rect = mascot.getBoundingClientRect();
    const scaleX = rect.width / 260;
    const scaleY = rect.height / 180;
    const centerGlobalX = rect.left - card.getBoundingClientRect().left + 130 * scaleX;
    const centerGlobalY = rect.top - card.getBoundingClientRect().top + 120 * scaleY;
    createSparkExplosion(centerGlobalX, centerGlobalY, '#facc15');
    
    setTimeout(() => {
      foxUpperEl.classList.remove('fox-boosting');
      isHunting = false;
    }, 650);
  }

  mascotContainer.addEventListener('click', triggerBoost);
  card.addEventListener('mouseenter', triggerBoost);

  requestAnimationFrame(updateCandles);
  setInterval(createCandle, 4200);
  createCandle();
});
