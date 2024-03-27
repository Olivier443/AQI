const signupAccount = async (req, res) => {
  
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
    console.log(`Back End - signupAccount.js - Connected...`);

    const { userName, password, fullName } = req.body;

    if (userName.length && password.length && fullName.length) {
      const result = await db.collection('ClientAccounts').insertOne({ '_id': userName, 'userName': userName, 'password': password, 'fullName': fullName });
      result.insertedId
        ? res.status(201).json({ status: 201, data: userName, message: `User ${userName} created.` })
        : res.status(404).json({ status: 404, data: req.body, message: `Missing information.` });
    } else {
      res.status(404).json({ status: 404, data: req.body, message: 'Missing information.' });
    }
  }

  catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // Duplicate key
      res.status(404).json({ status: 404, message: `UserName already exists. Create a different one.` });
    } else {
      res.status(500).json({ status: 500, data: req.body, message: `error = ${error}` });
    }
  }

  finally {
    client.close();
    console.log(`Back End - signupAccount.js - Disconnected...`);
  }
}

module.exports = { signupAccount };