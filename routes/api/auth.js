const express = require("express")
const auth = require("../../middlewares/auth")
const User = require("../../models/User")
const jwt = require("jsonwebtoken")
const config = require("config")
const {check, validationResult} = require("express-validator")
const router = express.Router()


//@route    GET api/auth
//@desc     test route
//@access   public

router.get("/",auth, async (req, res)=> {

  try {
      console.log(req.user.id)
      const user = await  User.findById(req.user.id).select("-password")
      res.json(user)
  } catch (error) {
      console.log(error.message)
      res.status(500).send("Server error")
  }
})


//@route    Post api/auth
//@desc      login user
//@access   public

router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Password is required"
    ).exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {  email, password } = req.body;
    try {
      //check to see if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // check if the entered password matches the one in the database
      const isMatch = await user.matchPassword(password)
      if(!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

     

      const payload = {
          user: {
              id: user.id
          }
      }

      jwt.sign(payload, config.get("jwtSecret"), {expiresIn: 36000}, (err, token)=> {
          if(err) throw err
          res.json({token})
      })

    
    } catch (error) {
      console.error(error.message);

      res.status(500).send("Server error");
    }

    // see if user exists

    //get users gravatar

    //encrypt password

    //return jsonwebtoken

  }
);

module.exports = router