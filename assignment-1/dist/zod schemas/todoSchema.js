"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoSchema = void 0;
const zod_1 = require("zod");
const isNonBlankString = (value) => value.trim().length > 0;
exports.TodoSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .min(1, "Title must not be blank")
            .max(15, "Max length must be 15")
            .refine(isNonBlankString, "Title must not be filled with spacebar"),
        description: zod_1.z
            .string()
            .min(1, "Description must not be blank")
            .max(30, "Max length must be 30")
            .refine(isNonBlankString, "Description must not be filled with spacebar")
    }),
});
