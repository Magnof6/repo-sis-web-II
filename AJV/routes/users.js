var express = require('express');
var router = express.Router();
const Ajv = require("ajv/dist/2020");
const addFormats = require("ajv-formats");

const schema = require("../schemas/user.schema.json");

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(schema);

router.post('/', (req, res) => {

  const valid = validate(req.body);

  if (!valid) {
    return res.status(400).json({
      error: "Invalid JSON",
      details: validate.errors
    });
  }

  res.status(200).json({
    message: "Valid user JSON"
  });

});

module.exports = router;