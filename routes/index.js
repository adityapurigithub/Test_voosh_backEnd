const express = require("express");
const {
  signUp,
  signingUp,
  signIn,
  signingIn,
  home,
  signOut,
  orders,
  addOrder,
  getOrder,
} = require("../controller");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/signup");
});

router.get("/signup", signUp);
router.get("/signin", signIn);

router.get("/sign-out", signOut);

router.get("/order", orders);

router.get("/home", home);
router.post("/signing-up", signingUp);

router.post("/signing-in", signingIn);

router.post("/order/add-order", addOrder);

router.post("/order/get-order", getOrder);

module.exports = router;
