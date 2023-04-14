const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
  },

  email: {
    type: String,
    unique: [true, "Email is already in use"],
    required: true,
    validate: {
      // Validate the email format using a regular expression
      validator: function (email) {
        return /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gm.test(
          email
        );
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false, // Do not include the password field by default when querying the database
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
