const err = require("../error");
const { authorizationUser } = require("../services/auth.service");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  // console.log(req.headers);
  const [bearer, token] = authorization.split(" ");
  // console.log("token------", token, "bearer ----", bearer);
  if (bearer !== "Bearer" || !token) {
    res.status(401).json({ message: "Not authorized" });
  }
  // console.log(token);

  const user = await authorizationUser(token);
  // console.log(user);
  if (!user || !user.token) {
    res.status(401).json({ message: "Not authorized" });
  }
  req.user = user;
  res.status(204);
  next();
};
const author = (role) => (req, res, next) => {
  // console.log(req.user);
  return req.user.role !== role
    ? next({ status: 403, message: "Forbidden" })
    : next();
};
module.exports = { auth, author };
