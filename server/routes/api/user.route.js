const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// Utils
const { getAccessToken, getRefreshToken } = require("../../utils/auth");

// Models
const User = require("../../models/User");

// @route       POST /
// @desc        User Sign up
// @access      Public
router.post(
  "/",
  [
    body("lName", "Please enter Last Name").exists({ checkFalsy: true }),
    body("fName", "Please enter Full Name").exists({ checkFalsy: true }),
    body("email").exists({ checkFalsy: true }).withMessage("Please enter an email").isEmail().withMessage("Please enter a valid email"),
    body("password").exists({ checkFalsy: true }).withMessage("Please enter a password").isLength({ min: 8, max: 20 }).withMessage("Password length must be between 8 to 20 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array();
      return responseError(res, 400, err[0].msg);
    }

    const { email, password } = req.body;
    try {
      // see if user already exist
      const user = await User.findOne({ email })

      if (user) {
          return res.status(400).json({ message: "Email already exist"})
      }

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      // Saving New User's details in the DB
      const userFields = { 
          fName: req.body.fName,
          lName: req.body.lName,
          email: req.body.email,
          password: hashedPass
      };

      const newUser = new User(userFields)

      await newUser.save();

      // return jsonwebtoken
      let refreshToken = getRefreshToken(newUser, "user")
      let accessToken = getAccessToken(newUser, "user")

      if (!refreshToken || !accessToken) throw "Cannot get Access token or Refresh token";

      const { password: pass, ...restUser } = newUser._doc;

      return res
        .cookie("___refresh_token", refreshToken, {
          path: "/",
          expires: new Date(new Date().getTime() + 168 * 60 * 60 * 1000),
          httpOnly: true,
          secure: true,
          sameSite: 'none'
        })
        .json({
          message: "Sign up successfully",
          data: {
            token: accessToken,
            user: restUser,
          },
        });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Oops! Something went wrong" });
    }
  }
);

module.exports = router;
