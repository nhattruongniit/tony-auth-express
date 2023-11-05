const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// controllers
const UserController = require("../controllers/users.controller");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + '-' + uniqueSuffix);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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
router.post("/upload-image", upload.single('avatar'), async (req, res) => {
    const link = 'public/uploads/' + req.file.filename;
    const name = req.file.filename.split('.')[0];

    cloudinary.uploader.upload(link,
      { public_id: name }, 
      function(error, result) {console.log(result); });

});

module.exports = router;