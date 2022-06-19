// const err = require("../error");
const { authorizationUser } = require("../services/auth.service");

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      res.status(401).json({ message: "Not authorized" });
    }
    const user = await authorizationUser(token);
    if (!user || !user.token) {
      res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
