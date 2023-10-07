const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/bots', (req, res) => {
  // Fetch data from Contentful or load models from the server
  const botsData = /* Fetch your data here */;
  res.render('bots', { bots: botsData });
});

app.get('/about', (req, res) => {
  res.render('about');
});

// Serve models from the models directory
app.use('/models', express.static(path.join(__dirname, 'models')));

// Your other routes and configurations go here...

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
