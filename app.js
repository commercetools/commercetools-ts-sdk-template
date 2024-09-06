const path = require('path');
const express = require('express');
const RateLimit = require('express-rate-limit');

const app = express();
const limiter = RateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 50, // max 100 requests per windowMs
});

app.use(limiter);
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

module.exports = app;
