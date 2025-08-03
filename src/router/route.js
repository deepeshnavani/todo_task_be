const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");
const todoController = require("../controller/todoController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/todos", todoController.getTodos);
router.post("/todos", todoController.addTodo);
router.put("/todos/:todo_id", todoController.updateTodo);
router.delete("/todos/:todo_id", todoController.deleteTodo);

module.exports = router;
