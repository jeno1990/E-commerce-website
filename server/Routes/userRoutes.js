const route = require("express").Router();
const middleware = require("./jwtMiddleware");
const User = require("./../model/userSchema");
const CryptoJs = require("crypto-js");
const userDatabase = require("../Mongo/userDatabase");

//update
route.put("/:id", middleware.VerfyUserOrAdmin, async (req, res) => {
  req.body.password = CryptoJs.AES.encrypt(
    req.body.password,
    process.env.SECRETE_PASS
  );
  try {
    const updateduser = await userDatabase.updateUser(
      req.user.id,
      req.body.username
    );
    res.status(201).json(updateduser);
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

//delete user
route.delete("/deleteuser/:id", middleware.VerfyAdmin, async (req, res) => {
  try {
    const response = await userDatabase.deleteUser(req.params["id"]);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

//get user

route.get("/getuser/:id",middleware.VerfyAdmin, async (req, res) => {
  try {
    const response = await userDatabase.getUser(req.params["id"]);
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json("Internal server error");
  }
});

//get all users
route.get("/allusers",middleware.VerfyAdmin, async (req, res) => {
    const onlynew = req.query.new
    try {
      const response = await userDatabase.getUsers(onlynew);
      res.status(200).json(response);
    } catch (error) {
      console.log(error)
      res.status(500).json("Internal server error");
    }
  });

//get user stat
route.get('/userstat' ,middleware.VerfyAdmin, async (req , res)=>{
    const date = new Date();
    const lastyear = new Date(date.setFullYear(date.getFullYear-1))
    try {
        const data = await userDatabase.UserStat(lastyear);
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : 'Internal server error'})
    }
})

module.exports = route;
