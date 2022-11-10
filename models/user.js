const mongoose = require("mongoose");
const bycrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    //considering email and pass & phone are the main thing for auth thats why i defined field-name in the last..
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//hashing the password..on signing up
userSchema.pre("save", async function (next) {
  // console.log("before hasing", this.password);
  if (this.isModified("password")) {
    this.password = await bycrypt.hash(this.password, 10);
  }
  // console.log("after hashing", this.password);

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
