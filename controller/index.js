const User = require("../models/user");
const bycrypt = require("bcrypt");
const Order = require("../models/order");

module.exports.signUp = function (req, res) {
  res.render("signup");
};

module.exports.signIn = function (req, res) {
  res.render("signin");
};

module.exports.signingUp = function (req, res) {
  console.log("signingup...");

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("err in finding the user", err);
      return;
    }
    if (!user) {
      let user = new User(req.body);
      //pre save works here so password will be hashed before saving in db~bycrypt
      user.save();
      console.log("user registered successfully", user);
      return res.redirect("/signin");
      // return res.status(200).json({
      //   message: "User created SuccessFUlly",
      //   user,
      // });
    } else {
      console.log("user/email alredy exist...Please Sign in");
      return res.redirect("/signin");
    }
  });
};

module.exports.signingIn = function (req, res) {
  console.log("signingin...");
  User.findOne({ email: req.body.email }, async function (err, user) {
    if (!user) {
      console.log("no User Found");
      return;
    }
    const password = await bycrypt.compare(req.body.password, user.password);
    //compare pass entered with the stored in db return T or F
    console.log(password);
    if (password) {
      console.log("Signed In!!");
      // return res.json(200, {
      //   message: "Success",
      // });
      res.cookie("user_id", user._id);
      return res.redirect("/home");
    }
    console.log("wrong Pass");
    return res.redirect("back");
  });
};

module.exports.home = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (err) {
        console.log(err);
      }
      if (user) {
        res.render("home", {
          user,
        });
        return;
      }
      return res.redirect("/signin");
    });
    return;
  }
  return res.redirect("/signin");
};

module.exports.signOut = function (req, res) {
  res.redirect("/signin");
};

module.exports.signOut = function (req, res) {
  res.clearCookie("user_id");
  res.redirect("/signin");
};

module.exports.orders = function (req, res) {
  res.render("order");
};

module.exports.addOrder = function (req, res) {
  console.log(req.body);
  Order.findOne({ order_name: req.body.order_name }, function (err, order) {
    if (err) {
      console.log(err);
    }
    if (!order) {
      console.log();
      Order.create(req.body, function (err, order) {
        if (err) {
          console.log(err);
        }
        console.log(order);
        res.status(200).json({
          message: "Ordered..",
          order,
        });
      });
    }
  });
};
module.exports.getOrder = function (req, res) {
  console.log(req.query);
  User.findById(req.query.user_id, function (err, user) {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(user);
    Order.find({ user_id: req.query.user_id }, function (err, order) {
      if (err) console.log(err);
      console.log(order);
      if (order) {
        console.log(order);
        res.status(200).json({
          message: "get-order",
          order,
        });
      }
    });
  });
};
