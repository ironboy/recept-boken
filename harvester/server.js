const express = require('express');
const data = require('./narings-data.json');
const port = 4000;

const app = express();

app.get('/api/naring/:slug', async (req, res) => {
  res.json(data[req.params.slug] || null);
});

app.listen(port, () => console.log('Listening on port ' + port));