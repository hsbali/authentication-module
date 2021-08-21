require("dotenv").config();
const express = require("express");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

// CORS middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// cookies-parser
app.use(cookieParser());

// express req.body
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ status: 1, msg: "API Running :)" });
});

app.get("/test", (req, res) => {
  try {
    console.log(Date.now() / 1000 + 60 * 60 * 4);

    const payload = {};

    // jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET,
    //   { expiresIn: 1200 },
    //   (err, token) => {
    //     if (err) {
    //       console.log(err);
    //       throw err;
    //     } else {
    //       return res.json({
    //         status: 1,
    //         msg: "Token generated successfully",
    //         data: { token: token },
    //       });
    //     }
    //   }
    // );

    return res
      .cookie("___refresh_token", "harmeet", {
        path: "/",
        expires: new Date(new Date().getTime() + 180 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({ status: 1, msg: "User Authenticated Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 0, msg: "Something went wrong!" });
  }
});

app.use("/api/v1/users", require("./routes/api/users"));
app.use("/api/v1/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
