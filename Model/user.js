const mongoose = require("mongoose");

const SchemaUser = mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
      minlenght: [8, "min is 8 caracter"],
    },
    isadmin: { type: Boolean, default: false },
    isActived: { type: Boolean, default: true },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Users", SchemaUser);
