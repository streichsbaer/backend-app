module.exports.userEval = function (req, res) {
  eval(req.body.evil);
}
