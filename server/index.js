require('dotenv').config();
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./db");

const app = express();

app.use(cors({ credentials: true, origin: ["*"] }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connectDB();

app.get('', async (req, res) => {
  res.send({ message: 'Awesome it works' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));