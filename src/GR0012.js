require('./current_file').file(__filename);

/*
* [GR:0012:stable]
* LDAP Injection vulnerability
*/

const ldap = require('ldapjs');

module.exports.ldapSearch = function (req, res) {
  const client = ldap.createClient({
    url: 'ldap://localhost:389'
  });
  
  const username = req.body.username;
  
  // Vulnerable: Direct concatenation allows LDAP injection
  const filter = `(&(objectClass=user)(uid=${username}))`;
  
  // Attacker could inject: admin)(&(objectClass=*)(|(uid=*
  client.search('ou=users,dc=example,dc=com', {
    filter: filter,
    scope: 'sub'
  }, (err, searchRes) => {
    if (err) {
      res.status(500).send('LDAP error');
      return;
    }
    
    const entries = [];
    searchRes.on('searchEntry', (entry) => {
      entries.push(entry.object);
    });
    
    searchRes.on('end', () => {
      res.json(entries);
    });
  });
};