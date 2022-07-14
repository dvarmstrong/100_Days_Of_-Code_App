//* Create the user controller to handle the user routes for login, register, and logout.
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');


//* Create the user controller to handle the user routes for login, register, and logout.


module.exports.register = (req, res) => {
  User.create(req.body)
    .then(user => {
        res.json({ msg: "success!", user: user });
    })
    .catch(err => res.json(err));
}

module.exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.json({ msg: "User not found" });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            res.json({ msg: "success!", user: user });
          } else {
            res.json({ msg: "Incorrect password" });
          }
        });
      }
    })
    .catch(err => res.json(err));
}

