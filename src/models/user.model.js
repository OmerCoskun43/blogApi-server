const { mongoose } = require("../configs/dbConnection.js");
const passwordEncrypt = require("../helpers/passwordEncrypt.js");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email must be required !!!"],
      validate: [
        (email) => {
          if (email.includes("@") && email.includes(".") && email.length >= 7) {
            return true;
          }
          return false;
        },
        "Email type is incorrect",
      ],
    },

    password: {
      type: String,
      required: true,
      trim: true,
      set: (password) => passwordEncrypt(password),
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
