const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.post("/create", todoController.createTodo);
router.get("/getAll", todoController.getTodos);
router.delete("/:todoId", todoController.deleteTodo);
router.patch("/:todoId", todoController.editTodo);
router.patch("/toggle/:todoId", todoController.toggle);

module.exports = router;
