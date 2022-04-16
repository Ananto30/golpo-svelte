const { checkSchema, validationResult } = require("express-validator");

const validateSchema = (schema) => {
  return async (req, res, next) => {
    const validationChain = checkSchema(schema);
    for (let validation of validationChain) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
};

module.exports = validateSchema;
