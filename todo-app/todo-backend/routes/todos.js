const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync , setAsync } = require("../redis");


const todoCount = async ()=>{
  const count = await getAsync("count");
  return count ? setAsync("count", parseInt(count) + 1): setAsync("count", 1)
}

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  todoCount()
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);
  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
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
    const newTodo = await Todo.findOneAndUpdate(
      req.params.id,
      req.body
    );
    res.send(newTodo);
  } catch (error) {
    res.send(error);
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
