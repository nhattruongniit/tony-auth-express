const router = require('express').Router();

// middleware
const auth = require('../middlewares/auth');

// model
const Member = require('../model/Member');

// @route    POST api/member
// @desc     Add new member
// @access   Private
router.post('/', auth, async (req, res) => {
  const { avatar, firstName, lastName, email, position, dateJoin, location } = req.body;
  if(!location || location.length === 0) {
    return res.status(400).json({
      msg: 'Please fill full input',
      isSucess: false
    })
  }
  const newNember = new Member({
    avatar,
    firstName,
    lastName,
    email,
    position,
    dateJoin,
    location    
  })

  try {
    const member = await newNember.save();
    res.status(200).json({
      data: member,
      isSucess: true
    })
  } catch(err) {
    res.status(400).json({
      msg: err,
      isSucess: false
    })
  }
})

// @route    GET api/member
// @desc     Get member list
// @access   Private
router.get('/', auth, async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const startOffset = (page - 1) * limit;
  const endOffset = startOffset + limit;
  
  try {
    const members = await Member.find().sort({ data: -1 });
    const total = members.length;
    const result = {
      data: members,
      page,
      limit,
      total,
      isSucess: true
    };
    if(total === 0) return res.status(200).json(result);

    result.data = members.slice(startOffset, endOffset)
    res.status(200).json(result)
  } catch(err) {
    res.status(500).json({
      msg: 'Server Error',
      isSucess: false
    })
  }
})

module.exports = router;