// class ValidationError extends Error {
//   constructor(status, message) {
//     super(message);
//     this.status = status;
//   }
// }

// module.exports = { ValidationError };

module.exports = (status = 400, message = "Bad Request") => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};
