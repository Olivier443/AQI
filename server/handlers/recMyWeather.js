const recMyWeather = async (req, res) => {

  require('dotenv').config();

  const { MONGO_URI } = process.env;

  const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  };

  const { MongoClient } = require('mongodb');
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db('MyWeatherApp');
    console.log(`Back End - recMyWeather.js - Connected...`)

    const result = await db.collection('MyWeatherData').insertOne(req.body);
    result.insertedId
      ? res.status(201).json({ status: 201, data: req.body, message: `Weather Data saved.` })
      : res.status(404).json({ status: 404, data: req.body, message: `Weather Data not saved.` });
  }

  catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.body, message: `error = ${error} - Data not saved.` })
  }

  finally {
    client.close();
    console.log(`Back End - recMyWeather.js - Disconnected...`);
  }
}

module.exports = { recMyWeather };