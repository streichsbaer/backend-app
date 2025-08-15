require('./current_file').file(__filename);

/*
* [GR:0010:stable]
* Path Traversal - Directory traversal vulnerability
*/

const fs = require('fs');
const path = require('path');

module.exports.readFile = function (req, res) {
  // Vulnerable: Direct concatenation allows path traversal
  const filename = req.query.file;
  const filepath = path.join(__dirname, filename);
  
  // Attacker could use: ?file=../../../etc/passwd
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
    } else {
      res.send(data);
    }
  });
};