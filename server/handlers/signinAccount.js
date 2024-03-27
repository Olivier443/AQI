const signinAccount = async (req, res) => {

  require('dotenv').config();

  const { MONGO_URI } = process.env;

  const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  };

  const { MongoClient } = require('mongodb');

  const client = new MongoClient(MONGO_URI, options);
  const { userName, password } = req.body;

  if (userName.length && password.length) {
    try {
      await client.connect();
      const db = client.db('MyWeatherApp');
      console.log(`Back End - signinAccount.js - Connected...`);
      
      const user = await db.collection("ClientAccounts").findOne({ userName: userName });

      if (!userName) {
        res.status(404).json({ status: 404, data: userName, message: `Wrong identifiant or password` });
      } else {
        userName && delete user.password;

        user
          ? res.status(200).json({ status: 200, data: user, message: `user ${userName} logged in` })
          : res.status(404).json({ status: 400, data: userName, message: `Wrong identifiant or password` })
      }
    }

    catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, data: req.body, message: `error = ${error}` });
    }

    finally {
      client.close();
      console.log(`Back End - signinAccount.js - Disconnected...`);
    }
  }
}

module.exports = { signinAccount };