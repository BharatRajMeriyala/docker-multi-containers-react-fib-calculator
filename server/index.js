const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
//
const { Pool } = require('pg');
//
const keys = require('./keys');
//

// Express App Setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgress Client Setup
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

// Make table
pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)').catch(err => {
  console.log('err: ', err);
});

// Redis Client Setup
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const redisPublisher = redisClient.duplicate();

// Express route handlers
app.get('/', (req, res) => {
  res.send('Working?');
});

app.get('/values/all', async (req, res) => {
  // get data from postgres
  const values = await pgClient.query('SELECT * from values');

  res.send(values.rows);
});

app.get('/values/current', (req, res) => {
  // get data from redis
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
  });
});

app.post('/values', async (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    // Takes too long time to calculate if it is more than 40
    return res.status(422).send('Index too high');
  }

  redisClient.hset('values', index, 'Nothing yet!');
  redisPublisher.publish('insert', index);
  pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

  res.send({ working: true });
});

const PORT = 5000;
app.listen(PORT, err => {
  console.log(`Listening to PORT:${PORT}`);
});
