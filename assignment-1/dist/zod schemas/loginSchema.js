"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
const isNonBlankString = (value) => value.trim().length > 0;
// Define the schema for validating authentication data
exports.loginSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(5, 'Username must be at least 5 characters').max(50, "Max length must be 15")
        .refine(isNonBlankString, 'Username must not be blank'),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .refine(isNonBlankString, 'Password must not be blank'),
});
