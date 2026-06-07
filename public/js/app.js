// Lógica principal do Portal de Acessos GoldenLens (fracta.online)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Carregar URLs Dinâmicas de Configuração
  fetch('/api/config')
    .then(res => {
      if (!res.ok) throw new Error('Falha ao obter configurações do servidor');
      return res.json();
    })
    .then(config => {
      document.getElementById('link-gecko').href = config.DATA_COLLECTOR_URL;
      document.getElementById('link-runner').href = config.DATA_BACKTEST_URL;
      document.getElementById('link-robot').href = config.DATA_ROBOT_URL;
    })
    .catch(err => {
      console.warn('Usando fallbacks locais para redirecionamentos:', err);
      document.getElementById('link-gecko').href = 'http://localhost:3000';
      document.getElementById('link-runner').href = 'http://localhost:3100';
      document.getElementById('link-robot').href = 'http://localhost:3200';
    });

  // 2. Sistema de Partículas Bokeh Suaves e Lentas (Sem linhas de constelação)
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  // Poucas partículas para manter o visual extremamente limpo
  const particleCount = 24;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
  
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.12; // Movimento ultra-lento
      this.vy = (Math.random() - 0.5) * 0.12;
      this.radius = 1.0 + Math.random() * 2.2;
      
      // Cores translúcidas elegantes
      const colors = [
        'rgba(99, 102, 241, 0.15)', // Indigo
        'rgba(168, 85, 247, 0.12)', // Roxo
        'rgba(249, 115, 22, 0.12)',  // Laranja
        'rgba(16, 185, 129, 0.12)',  // Verde
        'rgba(6, 182, 212, 0.12)'    // Ciano
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Rebater nas bordas suavemente
      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fundo escuro uniforme com gradiente radial sutil no centro
    const bgGrad = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 50, 
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
    );
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#04070f');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
});
