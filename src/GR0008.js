var aws_access_id = "AKIAIOSFODNN7EXXXPLE";
var aws_access_secret = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

module.exports.userEval = function (req, res) {
  eval(req.body.evil);
}
