
// const productModel = require("../Model/ProductModel");
const jwt = require("jsonwebtoken");
const userModel = require("../Model/UserModel");



const authentication = async function (req, res, next) {

  let token = req.headers["x-Api-key"] || req.headers["x-api-key"];
  if (!token) {
    return res.status(400).send({ status: false, msg: "token must be present" });
  }
  //   console.log("token",token)
  let decodedToken = jwt.verify(token, "skyeair",

    async function (err, decodedToken) {
      // console.log(decodedToken)
      if (!decodedToken) {
        return res.send({ status: false, msg: "token is invalid" });
      } else if (err == null) {
        req["userId"] = decodedToken.userId;
        next();
      }
    });
};


module.exports.authentication = authentication;




