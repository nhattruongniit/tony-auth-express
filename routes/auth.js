const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../model/User');

// @route    POST api/auth
// @desc     Authenicate user & token
// @access   Public
router.post('/', async (req, res) => {
  const token = req.header('x-auth-token');
  if(!token) return res.status(400).json({
    msg: 'Access Denied'
  });

  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    res.json({
      user,
      isSuccess: true
    })
  } catch(err) {
    res.status(400).json({
      msg: 'Invalid Token',
      isSuccess: false
    })
  }


})

module.exports = router;