const express = require("express");
const Todo = require("../mongo/models/Todo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis");

const todoCount = async () => {
  const count = await getAsync("count");
  return count ? setAsync("count", parseInt(count) + 1) : setAsync("count", 1);
};

/* GET todos listing. */
router.get("/", async (_, res) => {
  try {
    const todos = await Todo.find().exec();
    res.send(todos);
  } catch (error) {
    console.log(error);
  }
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  try {
    await todoCount();
    const todo = await Todo.create({
      text: req.body.text,
      done: false,
    });
    res.send(todo);
  } catch (error) {
    console.log(error);
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    req.todo = await Todo.findById(id);
    if (!req.todo) return res.sendStatus(404);
    next();
  } catch (error) {
    console.log(error);
  }
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  try {
    await req.todo.delete();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  const todo = req.todo;
  if (todo) {
    res.json(todo);
  }
  res.sendStatus(405);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  try {
    const newTodo = await Todo.findOneAndUpdate(req.params.id, req.body);
    res.send(newTodo);
  } catch (error) {
    res.send(error);
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
