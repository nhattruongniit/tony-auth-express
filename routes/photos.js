const router = require('express').Router();
const { check, validationResult } = require('express-validator');

// middleware
const auth = require('../middlewares/auth');

// model
const Photo = require('../model/Photo');

// @route    POST api/photo
// @desc     Add new photo
// @access   Private
router.post('/', [auth, 
  check('image', 'Image is required').not().isEmpty(),
  check('title', 'Title is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { image, title, category, description } = req.body;
  const newPhoto = new Photo({
    image,
    title,
    category,
    description,
  })

  try {
    const photo = await newPhoto.save();
    res.status(200).json({
      data: photo,
      msg: 'Add successfully!',
      isSucess: true
    })
  } catch(err) {
    res.status(500).json({
      msg: `Server Error`,
      isSucess: false
    })
  }
})

// @route    GET api/photo
// @desc     Get photo list
// @access   Private
router.get('/', auth, async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const startOffset = (page - 1) * limit;
  const endOffset = startOffset + limit;
  
  try {
    const photos = await Photo.find().sort({ data: -1 });
    const total = photos.length;
    const result = {
      data: photos,
      page,
      limit,
      total,
      isSucess: true
    };
    if(total === 0) return res.status(200).json(result);

    result.data = photos.slice(startOffset, endOffset)
    res.status(200).json(result)
  } catch(err) {
    res.status(500).json({
      msg: 'Server Error',
      isSucess: false
    })
  }
})

// @route    GET api/photo/:id
// @desc     GET Photo
// @access   Private
router.get('/:id', auth, async (req, res) => {
  const id = req.params.id;
  try {
    const photo = await Photo.findById(id);
    res.status(200).json({
      data: photo,
      isSucess: true
    })
  } catch(err) {
    res.status(400).json({
      msg: 'Photo not found',
      isSucess: false
    })
  }
})

// @route    PUT api/photo
// @desc     Update Photo
// @access   Private
router.put('/:id', [auth, 
  check('image', 'Image is required').not().isEmpty(),
  check('title', 'Title is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const id = req.params.id;
  const { image, title, category, description } = req.body;

  const fields = {};
  if (image) fields.image = image;
  if (title) fields.title = title;
  if (category) fields.category = category;
  if (description) fields.description = description;

  try {
    const photo = await Photo.findOneAndUpdate(
      { _id: id },
      { $set: fields },
      { new: true }
    );
    if(!photo) {
      return res.status(400).json({
        data: 'Photo not found',
        isSucess: false
      })
    }
    res.status(200).json({
      msg: 'Update successfully!',
      isSucess: true
    })
  } catch(err) {
    res.status(500).json({
      msg: `Server Error`,
      isSucess: false
    })
  }
})

// @route    DELETE api/photo
// @desc     Delete photo
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  const photoId = req.params.id;
  
  try {
    const photo = await Photo.findOneAndRemove({ _id: photoId });
    if(!photo) {
      return res.status(400).json({
        msg: `Photo not found`,
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