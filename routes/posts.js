const router = require('express').Router();
const verify = require('./verifyToken');


router.get('/', verify, async (req, res) => {
 res.json({
   posts: {
      title: 'truong',
      description: 'test'
   }
 })
})

module.exports = router