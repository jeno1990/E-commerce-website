const Route = require("express").Router();
const UserModel = require("./../model/userSchema");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')



Route.post("/register", async (req, res) => {
  let body = req.body;

  if (body.username === "" || body.email === "") {
    res.status(401).json({ msg: "BAD REQUEST" });
    return;
  }
  try {
    const newuser = new UserModel({
      email: body.email,
      isAdmin: false,
      username: body.username,
      password: CryptoJS.AES.encrypt(body.password, process.env.SECRETE_PASS),
    });

    const addeduser = await newuser.save();
    res.status(200).json({ user: addeduser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
});

Route.post("/Login", async (req, res) => {
  let body = req.body;

  try {
    const user = UserModel.findOne({ username: body.username }).exec();
    if (!user) {
      return res.status(401).json({ msg: "credentials doesnt match" });
    }

    user.then(function (doc) {
      console.log(doc);
      const hashpass = CryptoJS.AES.decrypt(
        doc.password,
        process.env.SECRETE_PASS
      );

      const pass = hashpass.toString(CryptoJS.enc.Utf8);
      console.log("decrypted password: " + pass);
      if (body.password != pass)
        return res.status(401).json({ msg: "credentials doesn't match" });
        
      const { password, ...others } = doc._doc;
      const token = jwt.sign(
        {
          id : doc._id,
          isAdmin : doc.isAdmin
        },
        process.env.JWT_SECRETEKEY
      )  
      res.status(200).json({ user: others , token: token});
    });

    // res.send()
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = Route;
