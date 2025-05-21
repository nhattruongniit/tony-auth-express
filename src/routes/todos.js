const router = require("express").Router();
const { check, validationResult } = require("express-validator");

// middleware
// const auth = require('../middlewares/auth');

// model
const Todo = require("../model/Todo");
const User = require("../model/user.model");

// @route    POST api/todo
// @desc     Add new todo
// @access   Private
router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("severity", "Severity is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req.body.data);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    } catch (err) {
      res.status(500).json({
        msg: `Syntax Error ${err}`,
        isSucess: false,
      });
      return;
    }

    // const email = req.header("email");
    // const user = await userService.findEmail(email);
    // if(!user) {
    //   res.status(400).json({
    //     msg: "Email not found",
    //     isSucess: false,
    //   });
    //   return
    // }

    const { title, author, severity, description } = req.body.data;
    // const user = await User.findOne({ email });

    // if (!user) {
    //   res.status(400).json({
    //     msg: "Email not found",
    //     isSucess: false,
    //   });
    //   return;
    // }
    
    try {
      const newTodo = new Todo({
        title,
        author,
        severity,
        description,
        status: "new",
      });
      const todo = await newTodo.save();
       // update user 
      //  const todo_ids = user.todo_id || [];
      //  todo_ids.push(newTodo._id);
      //  await User.findOneAndUpdate(
      //    { email },
      //    { $set: { todo_id: todo_ids } },
      //    { new: true }
      //  )
      res.status(200).json({
        data: todo,
        msg: "Add successfully!",
        isSucess: true,
      });
    } catch (err) {
      res.status(500).json({
        msg: `Server Error ${err}`,
        isSucess: false,
      });
    }
  }
);

// @route    GET api/todo
// @desc     Get todo list
// @access   Private
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 50);
  const startOffset = (page - 1) * limit;
  const endOffset = startOffset + limit;

  try {
    const todos = await Todo.find().sort({ data: -1 }).populate("user_id");
    const total = todos.length;
    const result = {
      data: todos,
      page,
      limit,
      total,
      isSucess: true,
    };
    if (total === 0) return res.status(200).json(result);

    result.data = todos.slice(startOffset, endOffset);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      msg: `Server Error  ${err}`,
      isSucess: false,
    });
  }
});

// @route    GET api/todo/:id
// @desc     GET Todo
// @access   Private
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findById(id);
    res.status(200).json({
      data: todo,
      isSucess: true,
    });
  } catch (err) {
    res.status(400).json({
      msg: `Todo not found  ${err}`,
      isSucess: false,
    });
  }
});

// @route    PUT api/todo
// @desc     Update Todo
// @access   Private
router.put(
  "/:id",
  [
    check("title", "Title is required").not().isEmpty(),
    check("severity", "Severity is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req.body.data);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { title, author, severity, description, status } = req.body.data;

    const fields = {};
    if (title) fields.title = title;
    if (author) fields.author = author;
    if (severity) fields.severity = severity;
    if (description) fields.description = description;
    if (!status) {
      return res.status(400).json({
        data: `Please choose status`,
        isSucess: false,
      });
    }
    fields.status = status;

    try {
      const todo = await Todo.findOneAndUpdate(
        { _id: id },
        { $set: fields },
        { new: true }
      );
      if (!todo) {
        return res.status(400).json({
          data: "Todo not found",
          isSucess: false,
        });
      }
      res.status(200).json({
        msg: "Update successfully!",
        isSucess: true,
      });
    } catch (err) {
      res.status(500).json({
        msg: `Server Error ${err}`,
        isSucess: false,
      });
    }
  }
);

// @route    DELETE api/todo
// @desc     Delete todo
// @access   Private
router.delete("/:id", async (req, res) => {
  const photoId = req.params.id;

  try {
    const todo = await Todo.findOneAndRemove({ _id: photoId });
    if (!todo) {
      return res.status(400).json({
        msg: `Todo not found`,
        isSucess: false,
      });
    }
    res.status(200).json({
      msg: "Delete successfully!",
      isSucess: true,
    });
  } catch (err) {
    res.status(500).json({
      msg: `Server Error ${err}`,
      isSucess: false,
    });
  }
});

module.exports = router;
