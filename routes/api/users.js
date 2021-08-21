const express = require("express");
const pool = require("./../../db");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// @route       POST /users
// @desc        Register new User
// @access      Public
router.post(
  "/",
  [
    body("fullName", "Name is Required").notEmpty(),
    body("email", "Please enter a valid Email").isEmail(),
    body(
      "password",
      "Please enter a Password with 6 or more characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array();
      return res.status(400).json({ status: 0, msg: err[0].msg });
    }

    const { fullName, email, password } = req.body;
    try {
      // see if user already exist
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user.rowCount !== 0) {
        return res
          .status(400)
          .json({ status: 0, msg: "User already exists. Try Logging In" });
      }

      // encrypt password
      const salt = await bcrypt.genSalt(10);

      const hashedPass = await bcrypt.hash(password, salt);

      // Saving New User's details in the DB
      const getNewUser = await pool.query(
        "INSERT INTO users (full_name, email, hashed_pass) VALUES ($1, $2, $3) RETURNING *",
        [fullName, email, hashedPass]
      );
      const newUser = getNewUser.rows[0];

      // return jsonwebtoken
      const access_payload = {
        user: {
          id: newUser.user_id,
        },
      };

      const refresh_payload = {
        userId: newUser.user_id,
      };

      let refreshToken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000 + 60 * 60 * 169),
          data: refresh_payload,
        },
        process.env.JWT_SECRET
      );

      let accessToken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000 + 60 * 20),
          data: access_payload,
        },
        process.env.JWT_SECRET
      );

      return res
        .cookie("___authenticated", true, {
          path: "/",
          expires: new Date(new Date().getTime() + 168 * 60 * 60 * 1000),
          httpOnly: false,
        })
        .cookie("___refresh_token", refreshToken, {
          path: "/",
          expires: new Date(new Date().getTime() + 168 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .json({
          status: 1,
          msg: "User create successfully",
          data: {
            token: accessToken,
            user: {
              user_id: newUser.user_id,
              full_name: newUser.full_name,
              email: newUser.email,
            },
          },
        });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ status: 0, msg: "Something went wrong!" });
    }
  }
);

module.exports = router;
