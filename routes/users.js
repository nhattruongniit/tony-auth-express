const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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
        isSucess: true
      });
    } 
  );
})

module.exports = router;