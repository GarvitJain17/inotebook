const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
var fetchuser=require('../middleware/fetchuser');
const JWT_SECRET="garvitisagoodboy";
//create a user using :post "/api/auth/" .ddosen't require Auth
router.post(
  "/Createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    //if there are return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    // check wheather the user  with this email exists already

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "sorry a user with this E-mail already exists" });
      }
      const salt=await bcrypt.genSalt(10);
      const secPass= await bcrypt.hash(req.body.password,salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data={
        user:{
            id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "some error occured" });
    }
    // .then (user => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error:'Please enter a unique value for email'})})
    // res.send(req.body);
  }
);


//authenticate a user using :post "/api/auth/login" .ddosen't require Auth
router.post(
    "/login",
    [
      body("email", "enter a valid email").isEmail(),
      body("password", "pass can'nt be blank").exists(),
    ],
    async (req, res) => {

      let success=false;
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {email,password}=req.body;
    try{
        let user= await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({ errors: "Please Try to Login with correct Credentials" });
        }
        const passwordCompare= await bcrypt.compare(password,user.password)
        if(!passwordCompare)
        {
            return res.status(400).json({ success,errors: "Please Try to Login with correct Credentials" });
        }

        const data={
            user:{
                id:user.id
            }
          }
          const authtoken=jwt.sign(data,JWT_SECRET);
          success=true;
        res.send({success,authtoken});
        }catch(error)
        {
            console.error(error.message);
      res.status(500).json({error: "some error occured" });
        }
    })

    // login a user using :post "/api/auth/getuser" .require Auth
    router.post(
        "/getuser",
        fetchuser,
        async (req, res) => {
    try{
        userId=req.user.id;
        const user=await User.findById(userId).select("-password")
        res.send(user);
    }catch(error)
    {
        console.error(error.message);
      res.status(500).json({ error: "some error occured" });
    }
})
module.exports = router;
