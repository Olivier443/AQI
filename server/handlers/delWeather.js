const delWeather = async (req, res) => {

  require('dotenv').config();

  const { MONGO_URI } = process.env;

  const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  };

  const { MongoClient, ObjectId } = require('mongodb');
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db('MyWeatherApp');
    console.log(`Back End - delWeather.js - Connected...`)

    const delWeatherData = req.params.weatherDataId;

    const resultDeleteWeather = await db.collection("MyWeatherData").deleteOne({ _id: new ObjectId(delWeatherData) });

    resultDeleteWeather.deletedCount
      ? res.status(200).json({ status: 200, data: resultDeleteWeather, message: `Weather Data ${delWeatherData} deleted.` })
      : res.status(404).json({ status: 404, data: req.body._id, message: `Weather Data ${delWeatherData} not deleted.` });
  }

  catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.body._id, message: `Internal error = ${error} - Data not deleted.` })
  }

  finally {
    client.close();
    console.log(`Back End - delWeather.js - Disconnected...`);
  }
}

module.exports = { delWeather };