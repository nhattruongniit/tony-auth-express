const router = require("express").Router();
const { check, validationResult } = require("express-validator");

// model
const Member = require("../model/Member");

// @route    POST api/member
// @desc     Add new member
router.post(
  "/",
  [
    check("avatar", "Avatar is required").not().isEmpty(),
    check("firstName", "FirstName is required").not().isEmpty(),
    check("lastName", "LastName is required").not().isEmpty(),
    check("position", "Position is required").not().isEmpty(),
    check("dateJoin", "DateJoin is required").not().isEmpty(),
    check("location", "Location is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req.body.data);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { avatar, firstName, lastName, email, position, dateJoin, location } =
      req.body.data;
    if (!location || location.length === 0) {
      return res.status(400).json({
        msg: "Please fill full input",
        isSucess: false,
      });
    }
    const newNember = new Member({
      avatar,
      firstName,
      lastName,
      email,
      position,
      dateJoin,
      location,
    });

    try {
      const member = await newNember.save();
      res.status(200).json({
        data: member,
        msg: "Add successfully!",
        isSucess: true,
      });
    } catch (err) {
      res.status(400).json({
        msg: err,
        isSucess: false,
      });
    }
  }
);

// @route    GET api/member
// @desc     Get member list
router.get("/", async (req, res) => {
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
      isSucess: true,
    };
    if (total === 0) return res.status(200).json(result);

    result.data = members.slice(startOffset, endOffset);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      msg: "Server Error",
      isSucess: false,
    });
  }
});

// @route    GET api/member/:id
// @desc     GET Member
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const member = await Member.findById(id);
    res.status(200).json({
      data: member,
      isSucess: true,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Member not found",
      isSucess: false,
    });
  }
});

// @route    PUT api/member
// @desc     Update Member
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { avatar, firstName, lastName, email, position, dateJoin, location } =
    req.body.data;

  const fields = {};
  if (avatar) fields.avatar = avatar;
  if (firstName) fields.firstName = firstName;
  if (lastName) fields.lastName = lastName;
  if (email) fields.email = email;
  if (position) fields.position = position;
  if (dateJoin) fields.dateJoin = dateJoin;
  if (!location || location.length === 0) {
    return res.status(400).json({
      msg: "Please fill full input",
      isSucess: false,
    });
  }
  fields.location = location;

  try {
    const member = await Member.findOneAndUpdate(
      { _id: id },
      { $set: fields },
      { new: true }
    );
    if (!member) {
      return res.status(400).json({
        data: "Member not found",
        isSucess: false,
      });
    }
    res.status(200).json({
      msg: "Update successfully!",
      isSucess: true,
    });
  } catch (err) {
    res.status(500).json({
      msg: `Server Error`,
      isSucess: false,
    });
  }
});

// @route    DELETE api/member
// @desc     Delete member test
router.delete("/:id", async (req, res) => {
  const memberId = req.params.id;

  try {
    const member = await Member.findOneAndRemove({ _id: memberId });
    if (!member) {
      return res.status(400).json({
        msg: `Member not found`,
        isSucess: false,
      });
    }
    res.status(200).json({
      msg: "Delete successfully!",
      isSucess: true,
    });
  } catch (err) {
    res.status(500).json({
      msg: `Server Error`,
      isSucess: false,
    });
  }
});

module.exports = router;
