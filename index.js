const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'models' directory
app.use('/models', express.static(path.join(__dirname, 'models')));

app.get('/models/modelList', (req, res) => {
  try {
    const modelsDirectory = path.join(__dirname, 'models');
    const models = fs.readdirSync(modelsDirectory)
      .filter(file => file.endsWith('.ldr'))
      .map(file => file.replace('.ldr', ''));

    res.json({ models });
  } catch (error) {
    console.error('Error getting model list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve static files from the 'views' directory
app.use('/views', express.static(path.join(__dirname, 'views')));

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/bots', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'bots.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
