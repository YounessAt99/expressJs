const express = require("express");
const router = express.Router();
const Users = require("../Model/user");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {verify,verifyIsAdmin} = require("../verifyToken");
dotenv.config();

const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string()
});
// npm i bcryptjs
//npm jio => virefy is email
// npm i jsonwebtoken
//npm i dotenv //.env globel bax t3aytliha

// create user
router.post("/register", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  let { email, password } = req.body;
  if (email && password ) {
    checkUser = await Users.findOne({ email });
    if (checkUser) {
      res.status(400).json({ message: "user is already exist" });
    } else {
      let hash = await bcrypt.hash(password, 10);
      const user = new Users({
        email: email,
        password: hash,
      });
      usersave = await user.save();
      const token = jwt.sign(
        { id: usersave._id, isadmin: usersave.isadmin },
        process.env.JWT_CLE,
        { expiresIn: "4d" }
      ); //expiresIn => MODAT SALAHIYA 4 ayam
      res.status(201).json({ message: "Bien enregister", data: usersave, token });
    }
  } else {
    res.status(400).json({ message: "champps is required" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const checkUser = await Users.findOne({ email });
    if (!checkUser) res.status(404).json({ message: "not found" });
    else {
      if (await bcrypt.compare(password, checkUser.password)) {
        const token = jwt.sign({ id: checkUser._id }, process.env.JWT_CLE);
        res.status(200).json(token);
      } else {
        res.status(400).json({ message: "email or password is false" });
      }
    }
  } catch (error) {}
});

router.delete("/:email", verifyIsAdmin, async (req, res) => {
  const email = req.params.email;
  const isAdmin = req.isAdmin;
  console.log("isAdmin",isAdmin);
  checkUser = await Users.findOne({ email });
  if (checkUser) {
    if (isAdmin) {
      checkUser.isActived = false;
      userUpdate = await Users.findOneAndUpdate({ email }, checkUser);
      res.status(200).json({ message: "user is updated" });
    } else {
        res.status(401).json({ message: "no autorusatoin" });
    }
  } else {
    res.status(404).json({ message: "user is not exist" });
  }
});

router.put("/:email/edit", verify, async (req, res) => {
  const id = req.id;
  const email = req.params.email;
  const { password, isadmin } = req.body;
  const checkUser = await Users.findOne({ email });
  if (checkUser) {
    if (id == checkUser.id) {
      const hash = await bcrypt.hash(password, 10);
      checkUser.password = hash;
      checkUser.isadmin = isadmin;
      const userUpdate = await Users.findOneAndUpdate({ email }, checkUser, {new: true}); //{new:true} => bax treturni les data jdida ltmodifyat
      res.status(200).json({ message: "bien modifie", data: userUpdate });
    } else {
      {
        res.status(401).json({ message: "no autorusatoin" });
      }
    }
  } else {
    res.status(404).json({ message: "not found" });
  }
});

router.get("/", async (re, res) => {
  const usersActive = await Users.find({ isActived: true }).select({
    email: 1,
    _id: 0,
  });
  if (usersActive.length > 0) {
    res.status(200).json({ users: usersActive });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
