const router = require('express').Router();

// middlewares
const auth = require('../middlewares/auth');

// api: /api/posts?page=1&limit=1
const posts = [
  {
    id: 1,
    title: 'truong',
    description: 'test'
  }
]

router.get('/', auth, async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit
  const result = {};
  if(endIndex < posts.length) {
    result.next = {
      page: page + 1,
      limit
    }
  }

  if(startIndex > 0) {
    result.previous = {
      page: page - 1,
      limit
    }
  }

  res.json({ posts })
})

module.exports = router