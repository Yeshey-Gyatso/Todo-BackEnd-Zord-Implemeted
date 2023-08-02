"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
console.log("middleware reached");
const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        //   console.log(req.body)
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            res.status(400).json(err.errors);
        }
        else {
            res.status(500).send('Internal Server Error');
        }
    }
};
exports.validateSchema = validateSchema;
