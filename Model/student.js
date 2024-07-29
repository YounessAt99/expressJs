const mongoose = require("mongoose");

const schemaStudent = mongoose.Schema(
  {
    code: { 
      unique:true,
      type: Number,
      min:1000000,
      max:9999999
    },
    nom: { type: String },
    prenom: { type: String },
    sexe: { type: String, enum: ["F", "M"] },
    date_naissance: { type: Date },
    image: { type: String },
    classe: { type: String, default: "DSI" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", schemaStudent);