
module.exports = (schema, message) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  error ? res.status(400).json({ message: error.message }) : next();

};
