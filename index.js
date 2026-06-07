require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3050;

// Configuração das URLs dos sistemas com fallbacks locais coerentes
const config = {
  DATA_COLLECTOR_URL: process.env.DATA_COLLECTOR_URL || 'http://localhost:3000',
  DATA_BACKTEST_URL: process.env.DATA_BACKTEST_URL || 'http://localhost:3100',
  DATA_ROBOT_URL: process.env.DATA_ROBOT_URL || 'http://localhost:3200'
};

// Servir a pasta estática "public"
app.use(express.static(path.join(__dirname, 'public')));

app.get('/healthz', (req, res) => {
  res.status(200).json({ ok: true, service: 'data-index' });
});

// API Endpoint para que o front-end descubra as URLs corretas de redirecionamento
app.get('/api/config', (req, res) => {
  res.json(config);
});

// Qualquer outra rota serve o index.html da pasta public
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`GoldenLens Portal (data-index) iniciado!`);
  console.log(`Rodando em: http://localhost:${PORT}`);
  console.log(`Redirecionamentos configurados:`);
  console.log(`- Coletor: ${config.DATA_COLLECTOR_URL}`);
  console.log(`- Backtest: ${config.DATA_BACKTEST_URL}`);
  console.log(`- Robot: ${config.DATA_ROBOT_URL}`);
  console.log(`=========================================`);
});
