require('./current_file').file(__filename);

/*
* [GR:0011:stable]
* Prototype Pollution vulnerability
*/

function merge(target, source) {
  for (let key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key]) target[key] = {};
      merge(target[key], source[key]);
    } else {
      // Vulnerable: No check for __proto__ or constructor.prototype
      target[key] = source[key];
    }
  }
  return target;
}

module.exports.mergeObjects = function (req, res) {
  const userInput = req.body;
  const config = {};
  
  // Attacker could send: {"__proto__": {"isAdmin": true}}
  merge(config, userInput);
  
  res.json(config);
};