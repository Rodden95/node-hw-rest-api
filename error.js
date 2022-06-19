// class ValidationError extends Error {
//   constructor(status, message) {
//     super(message);
//     this.status = status;
//   }
// }

// module.exports = { ValidationError };

const loginError = (status = 401, message = "Email or password is wrong") => {
  const err = new Error();
  err.status = status;
  err.message = message;
  // res.status(401).json({ message: "Email or password is wrong" });
  return err;
};
module.exports = { loginError };
//   (status = 400, message = "Bad Request") => {
//   const error = new Error();
//   error.status = status;
//   error.message = message;
//   return error;
// };
