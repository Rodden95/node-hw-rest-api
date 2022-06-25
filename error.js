const loginError = (status = 401, message = "Email or password is wrong") => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};
module.exports = { loginError };
