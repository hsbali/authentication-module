const jwt = require("jsonwebtoken");
const responseError = require("../utils/responseError");

module.exports = authJWT = (type) => {
  return (req, res, next) => {
    // Check if not token
    if (!req.header("Authorization")) {
      return responseError(res, 401, "Access Denied")
    }

    const token = req.header("Authorization").split(" ")[1];

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_JWT);

      if (decoded.data.user.type !== type) throw "Incorrect User"

      req[type] = decoded.data.user;
      
      next();
    } catch (err) {
      console.log(err);
      return responseError(res, 401, "Access Denied")
    }
  };
};
