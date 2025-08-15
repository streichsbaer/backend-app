require('./current_file').file(__filename);

/*
* [GR:0014:stable]
* Insecure Deserialization vulnerability
*/

const serialize = require('node-serialize');

module.exports.deserializeData = function (req, res) {
  const serializedData = req.body.data;
  
  try {
    // Vulnerable: Deserializing untrusted data can lead to RCE
    // Attacker could send malicious serialized object with IIFE:
    // {"rce":"_$$ND_FUNC$$_function(){require('child_process').exec('rm -rf /', function(err, stdout, stderr) { console.log(stdout) })}()"}
    const userData = serialize.unserialize(serializedData);
    
    res.json({
      message: 'Data processed successfully',
      data: userData
    });
  } catch (error) {
    res.status(400).json({
      error: 'Invalid serialized data'
    });
  }
};

module.exports.processUserPreferences = function (req, res) {
  const preferences = req.cookies.userPrefs;
  
  if (preferences) {
    // Vulnerable: Deserializing cookie data without validation
    const userPrefs = serialize.unserialize(preferences);
    res.json(userPrefs);
  } else {
    res.status(400).send('No preferences found');
  }
};