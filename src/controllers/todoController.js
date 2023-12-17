const todoModel = require("../models/todo-model");
const createError = require("../utils/create-error");

exports.createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;

    const todo = await todoModel.create({
      title: title,
    });
    res.status(201).json({ message: "Todo has been created.", todo });
  } catch (err) {
    next(err);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const allTodos = await todoModel.find().sort({ createdAt: -1 });
    res.status(200).json(allTodos);
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const existed = await todoModel.findById({
      _id: todoId,
    });

    if (!existed) {
      next(createError(404, "Todo doesn't exist."));
      return;
    }
    const deleted = await todoModel.deleteOne({
      _id: existed._id,
    });
    res.status(200).json({
      message: "todo has been deleted successfully.",
      deleted: existed,
    });
  } catch (err) {
    next(err);
  }
};

exports.editTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const { title } = req.body;
    const edited = await todoModel.findOneAndUpdate(
      {
        _id: todoId,
      },
      { title: title },
      { new: true }
    );
    res.status(200).json({
      message: "todo has been updated successfully.",
      updated: edited,
    });
  } catch (err) {
    next(err);
  }
};

exports.toggle = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const response = {};
    const found = await todoModel.findOne({ _id: todoId });

    if (!found) {
      next(createError(404, "todo doesn't exist"));
      return;
    }
    if (found.isDone === false) {
      response.output = await todoModel.findByIdAndUpdate(
        { _id: found._id },
        { isDone: true },
        { new: true }
      );
      response.message = "task is done";
    }
    if (found.isDone === true) {
      response.output = await todoModel.findByIdAndUpdate(
        { _id: found._id },
        { isDone: false },
        { new: true }
      );
      response.message = "task is not done";
    }
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
