const signupAccount = async (req, res) => {

  require('dotenv').config();
  const bcrypt = require('bcrypt');

  const { MONGO_URI } = process.env;
  console.log(`MONGO_URI = ${MONGO_URI}`);

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

    const typedPassword = password;

    // https://securinglaravel.com/p/security-tip-increase-your-bcrypt
    function hashAsync(typedPassword) {
      return new Promise(function (resolve, reject) {
        bcrypt.hash(password, 12, function (err, hash) {
          if (err) {
            console.log(`?`, 'I am here');
            reject(err);
          } else {
            console.log(`???`, 'I am actually here', hash); // true
            resolve(hash);
          }
        });
      });
    }

    if (userName.length && password.length && fullName.length) {

      const hashResult = await hashAsync(password);

      if (!hashResult) {
        res.status(404).json({ status: 404, data: _id, message: `Internal error: Could not hash password` })
      } else {
        const result = await db.collection('ClientAccounts').insertOne({ '_id': userName, 'userName': userName, 'password': hashResult, 'fullName': fullName });
        result.insertedId
          ? res.status(201).json({ status: 201, data: userName, message: `User ${userName} created.` })
          : res.status(404).json({ status: 404, data: req.body, message: `Missing information.` });
      }
    } else {
      res.status(404).json({ status: 404, data: req.body, message: 'Missing information.' });
    }
  }

  catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // Duplicate key
      // res.status(404).json({ status: 404, data: userName, message: `UserName already exists. Create a different one.` });
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