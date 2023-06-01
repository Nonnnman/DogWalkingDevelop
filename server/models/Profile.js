const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const OwnerProfile = require("./OwnerProfile");

const ProfileSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
});

// static signup method
ProfileSchema.statics.signup = async function (username, password, userType) {
  //validation
  if (!username || !password || !userType) {
    throw Error("All fields must be filled");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ username }) 
              || await OwnerProfile.findOne({ username }) ;

  if (exists) {
    throw Error("Username already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  var user;
  if (userType === "walker") {
     user = await this.create({ username, password: hash, userType });
  }
  else if (userType === "owner") {
     user = await OwnerProfile.create({ username, password: hash, userType });
  }
  else {
    throw Error("User type must be either owner or walker");
  }

  return user;
};

ProfileSchema.statics.login = async function (username, password) {
  //validation
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username })
            || await OwnerProfile.findOne({ username }) ;

  if (!user) {
    throw Error("User does not exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("Profile", ProfileSchema);
