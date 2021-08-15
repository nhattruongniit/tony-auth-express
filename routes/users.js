const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// middleware
const auth = require('../middlewares/auth');

// model
const User = require('../model/User');

// @route    POST api/user/login
// @desc     Register user
// @access   Public
router.post('/register', async (req, res) => {
  const { firstName, lastName, avatar, email, role, password } = req.body;

  // check email exist
  const emailExist = await User.findOne({ email: email });
  if(emailExist) return res.status(400).json({
    msg: 'Email already exists',
    isSucess: false
  });

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  // create a new user
  const user = new User({
    avatar,
    firstName,
    lastName,
    email,
    role,
    password: hashPassword
  });
  try {
    await user.save();
    res.json({ 
      msg: 'Register Successfully!',
      isSucess: true
    });
  } catch(err) {
    res.status(400).json({
      msg: err,
      isSucess: false
    });
  }
})

// @route    POST api/user/login
// @desc     Login user
// @access   Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // check email exist
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({
    msg: 'Email or password is wrong',
    isSucess: false
  });

  // valid password
  const validPass = await bcrypt.compare(password, user.password);
  if(!validPass) return res.status(400).json({
    msg: 'Email or password is wrong',
    isSucess: false
  });

  // create and assign a token
  const payload = {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      email: user.email,
      role: user.role
    }
  }

  jwt.sign(
    payload, 
    process.env.TOKEN_SECRET,
    { expiresIn: 36000 },
    (err, token) => {
      if (err) throw err;
      res.header('x-auth-token', token).json({
        token,
        msg: 'Login Successfully!',
        isSucess: true
      });
    } 
  );
})

// @route    GET api/user
// @desc     Get user list
// @access   Private
router.get('/', auth, async (req, res) => {
  const page = parseInt(req.query.page || 1)
  const limit = parseInt(req.query.limit || 10)
  const startOffset = (page - 1) * limit;
  const endOffset = startOffset + limit;

  try {
    const users = await User.find().sort({ data: -1 })
    const total = users.length;
    const result = {
      data: users,
      page,
      limit,
      total,
      isSucess: true
    };
    if(total === 0) return res.status(200).json(result);

    result.data = users.slice(startOffset, endOffset)
    res.status(200).json(result)
  } catch(err) {
    res.status(500).json({
      msg: 'Server Error',
      isSucess: false
    })
  }
})

// @route    GET api/user/:id
// @desc     GET User
// @access   Private
router.get('/:id', auth, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({
      data: user,
      isSucess: true
    })
  } catch(err) {
    res.status(400).json({
      msg: 'User not found',
      isSucess: false
    })
  }
})

// @route    PUT api/user
// @desc     Update User
// @access   Private
router.put('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const role = req.body.role;

  const profile = {};
  if (role) profile.role = role;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: profile },
      { new: true }
    );
    if(!user) {
      return res.status(400).json({
        data: 'User not found',
        isSucess: false
      })
    }
    res.status(200).json({
      msg: 'Update successfully!',
      isSucess: true
    })
  } catch(err) {
    res.status(400).json({
      msg: `Can't update user`,
      isSucess: false
    })
  }
})

// @route    DELETE api/user/:id
// @desc     Delete User
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndRemove({ _id: id });
    if(!user) {
      return res.status(400).json({
        msg: `User not found`,
        isSucess: false
      })
    }
    res.status(200).json({
      msg: 'Delete successfully!',
      isSucess: true
    })
  } catch(err) {
    res.status(500).json({
      msg: `Server Error`,
      isSucess: false
    })
  }
})

module.exports = router;