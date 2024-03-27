const weatherReport = async (req, res) => {

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
    console.log(`Back End - weatherReport.js - Connected...`)

    const thisUser = req.params.currentUser;

    const result = await db.collection('MyWeatherData').find({ "currentUser._id": thisUser }).sort({ _id: -1 }).toArray();
    result
      ? res.status(200).json({ status: 200, data: result, message: `Weather Data retrieved.` })
      : res.status(404).json({ status: 404, message: `Weather Data not found.` });
  }

  catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: `error = ${error} - Data not found.` })
  }

  finally {
    client.close();
    console.log(`Back End - weatherReport.js - Disconnected...`);
  }
}

module.exports = { weatherReport };