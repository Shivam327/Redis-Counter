const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();

// Setting Up Redis Client
const client = redis.createClient({
  host: 'redis-server',
  port: 6379,
});

// Setting Initial Value
client.set('visits', 0);

// Route
app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits' + visits);

    client.set('visits', parseInt(visits) + 1);
  });
  // process.exit(0);
});

app.listen(8081, () => {
  console.log('listening on port 8081');
});
