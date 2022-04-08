const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Utils
const { getRefreshToken, getAccessToken } = require("../../utils/auth");

// Middleware
const auth = require("../../middleware/auth");

// Models
const User = require("../../models/User");

// @route       GET /user/auth
// @desc        Get customer by access_token
// @access      Private
router.get("/", auth("user"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(400).json({ message: "Invalid request"});

    return res.json({ message: "User loaded successfully", data: { user } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Oops! Something went wrong"});
  }
});

// @route       POST /user/auth
// @desc        login with email and password
// @access      Public
router.post(
  "/",
  [
    body("email").exists({ checkFalsy: true }).withMessage("Please enter an email").isEmail().withMessage("Please enter a valid email"),
    body("password", "Please enter your password").exists({ checkFalsy: true }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array();
      return responseError(res, 400, err[0].msg);
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      // see if user exist

      if (!user) return res.status(400).json({ message: "Incorrect email or password"});

      // Matching User password and email
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Incorrect email or password"});
      

      // return jsonwebtoken
      let refreshToken = getRefreshToken(user, "user");
      let accessToken = getAccessToken(user, "user");

      if (!refreshToken || !accessToken) throw "Cannot get Access token or Refresh token";

      const { password: pass, ...restUser } = user._doc;
      return res
        .cookie("___refresh_token", refreshToken, {
          path: "/",
          expires: new Date(new Date().getTime() + 168 * 60 * 60 * 1000),
          httpOnly: true,
          secure: true,
          sameSite: 'none'
        })
        .json({
          message: "Logged in successfully",
          data: {
            token: accessToken,
            user: restUser,
          },
        });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Oops! Something went wrong"});
    }
  }
);

// @route       POST /user/auth/refresh
// @desc        Refresh Access Token
// @access      Private(refresh_token)
router.get("/refresh", (req, res) => {
  try {
    const token = req.cookies.___refresh_token;

    if (!token || token === "") {
      return res.status(401).json({ message: "Access Denied"});
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_JWT);

    if (decoded.data.user.type !== "user") {
        return res.status(401).json({ message: "Access Denied"});
    };

    // return jsonwebtoken
    let refreshToken = getRefreshToken(decoded.data.user, "user")
    let accessToken = getAccessToken(decoded.data.user, "user")

    if (!refreshToken || !accessToken) throw "Cannot get Access token or Refresh token";

    return res
      .cookie("___refresh_token", refreshToken, {
        path: "/",
        expires: new Date(new Date().getTime() + 168 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })
      .json({
        message: "Access token refreshed successfully",
        data: {
          token: accessToken,
        },
      });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .cookie("___refresh_token", "", {
        path: "/",
        expires: new Date(new Date().getTime() + 1000),
        httpOnly: false,
        secure: true,
        sameSite: 'none'
      })
      .json({ message: "Oops! Something went wrong" });
  }
});

// @route       POST /auth/logout
// @desc        Logout user
// @access      Private
router.get("/logout", auth("user"), async (req, res) => {
  try {
    return res
      .cookie("___refresh_token", "", {
        path: "/",
        expires: new Date(new Date().getTime() + 1000),
        httpOnly: false,
        secure: true,
        sameSite: "none"
      })
      .json({
        message: "Logged out",
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Oops! Something went wrong"});
  }
});

module.exports = router;
