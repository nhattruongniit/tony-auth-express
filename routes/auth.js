const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../model/User');


router.post('/register', async (req, res) => {
  // check email exist
  const emailExist = await User.findOne({ email: req.body.email });
  if(emailExist) return res.status(400).send({
    error: 'Email already exists'
  });

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    await user.save();
    res.send({ 
      user: user._id,
      name: user.name,
      email: user.email
    });
  } catch(err) {
    res.status(400).send(err);
  }
})

router.post('/login', async (req, res) => {

  // check email exist
  const user = await User.findOne({ email: req.body.email });
  if(!user) return res.status(400).send({
    error: 'Email or password is wrong'
  });

  // valid password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send({
    error: 'Email or password is wrong'
  });

  // create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send({
    token
  });
})

module.exports = router;