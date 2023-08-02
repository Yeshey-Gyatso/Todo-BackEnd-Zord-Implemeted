"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../middleware/index");
const db_1 = require("../db");
const zod_1 = require("../middleware/zod");
const todoSchema_1 = require("../zod schemas/todoSchema");
const router = express_1.default.Router();
router.post('/todos', index_1.authenticateJwt, (0, zod_1.validateSchema)(todoSchema_1.TodoSchema), (req, res) => {
    console.log(req.body);
    const { title, description } = req.body; //this req.body is the validated data !! form the middleware
    const done = false;
    const userId = req.headers["userId"];
    const newTodo = new db_1.Todo({ title, description, done, userId });
    newTodo.save()
        .then((savedTodo) => {
        res.status(201).json(savedTodo);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to create a new todo' });
    });
});
router.get('/todos', index_1.authenticateJwt, (req, res) => {
    const userId = req.headers["userId"];
    db_1.Todo.find({ userId })
        .then((todos) => {
        res.json(todos);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});
router.patch('/todos/:todoId/done', index_1.authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.headers["userId"];
    db_1.Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
        .then((updatedTodo) => {
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to update todo' });
    });
});
exports.default = router;
