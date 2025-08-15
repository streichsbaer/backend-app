require('./current_file').file(__filename);

/*
* [GR:0013:stable]
* NoSQL Injection vulnerability (MongoDB)
*/

const { MongoClient } = require('mongodb');

module.exports.findUser = function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
      res.status(500).send('Database connection error');
      return;
    }
    
    const db = client.db('userdb');
    const users = db.collection('users');
    
    // Vulnerable: Direct object injection allows NoSQL injection
    // Attacker could send: {"username": {"$ne": null}, "password": {"$ne": null}}
    const query = {
      username: username,
      password: password
    };
    
    users.findOne(query, (err, user) => {
      client.close();
      
      if (err) {
        res.status(500).send('Query error');
      } else if (user) {
        res.json({ success: true, user: user });
      } else {
        res.status(401).send('Invalid credentials');
      }
    });
  });
};