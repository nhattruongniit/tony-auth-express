const router = require("express").Router();
const cloudinary = require('cloudinary').v2;
const { uploadAvatar } = require('../middlewares/upload.middleware');

// controllers
const UserController = require("../controllers/users.controller");

// @route    GET api/user
// @desc     Get user list
// @access   Public
router.get("/", UserController.findAllUser)

// @route    GET api/user/:id
// @desc     GET User
// @access   Public
router.get("/:id", UserController.findUser)

// @route    PUT api/user
// @desc     Update User
// @access   Public
router.put("/:id", UserController.updateUser);

// @route    DELETE api/user/:id
// @desc     Delete User
// @access   Public
router.delete("/:id", UserController.deleteUser);

// @route    POST api/user/signup
// @desc     Register user
// @access   Public
router.post("/signup", UserController.signup);

// @route    POST api/user/signin
// @desc     Login user
// @access   Public
router.post("/signin", UserController.signin);

// @route    GET api/user/refresh-token
// @desc     Refresh token
// @access   Public
router.post("/refresh-token", UserController.refreshToken);

// @route    GET api/user/upload-image
router.post("/upload-image", uploadAvatar, async (req, res) => {
  const link = 'public/uploads/' + req.file.filename;
  const name = req.file.filename.split('.')[0];

  try {
    cloudinary.uploader.upload(link,
      { public_id: name }, 
      function(error, result) {console.log(result); });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;