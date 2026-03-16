var express = require('express');
var router = express.Router();
const Ajv = require("ajv/dist/2020");


const schema = require("../schemas/movie.schema.json");

const ajv = new Ajv();
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
        message: "Valid movie JSON"
    });

});

module.exports = router;