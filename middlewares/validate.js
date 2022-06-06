module.exports = (schema, message) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    error ? res.status(400).json({ message }) : next();
    // if (error) {
    //   res.status(400).json({ message });
    // }
    // next();
  };
};
