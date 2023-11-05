const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// services
const UserService = require('../services/users.service');

// helpers
const { generateAccessToken, generateRefreshToken } = require("../helpers");

module.exports = {
  signup: async (req, res) => {
    const { firstName, lastName, avatar, email, role, password } = req.body.data;

    // check email exist
    const emailExisted = await UserService.findEmail(email)
    if (emailExisted)
      return res.status(400).json({
        msg: "Email already exists",
        isSucess: false,
      });
  
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create a new user
    const payload = {
      avatar,
      firstName,
      lastName,
      email,
      role,
      password: hashPassword,
    }
    try {
      await UserService.create(payload);
      res.json({
        msg: "Register Successfully!",
        isSucess: true,
      });
    } catch (err) {
      res.status(400).json({
        msg: err,
        isSucess: false,
      });
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body.data;

    // check email exist
    const user = await UserService.findEmail(email);
    if (!user)
      return res.status(400).json({
        msg: "Email or password is wrong",
        isSucess: false,
      });

    // valid password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(400).json({
        msg: "Email or password is wrong",
        isSucess: false,
      });

    // create and assign a token
    const payload = {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        email: user.email,
        role: user.role,
      },
    };

    const access_token = generateAccessToken(payload);
    const refresh_token = generateRefreshToken(payload);

    res.header("x-auth-token", access_token).json({
      msg: "Login Successfully!",
      isSucess: true,
      data: {
        access_token,
        refresh_token,
      },
    });
  },

  findAllUser: async (req, res) => {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const startOffset = (page - 1) * limit;
    const endOffset = startOffset + limit;

    try {
      const users = await UserService.findAll();
      const total = users.length;
      const result = {
        data: users,
        page,
        limit,
        total,
        isSucess: true,
      };
      if (total === 0) return res.status(200).json(result);
  
      result.data = users.slice(startOffset, endOffset);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({
        msg: "Server Error",
        isSucess: false,
      });
    }
  },

  findUser: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await UserService.findOne(id);
      res.status(200).json({
        data: user,
        isSucess: true,
      });
    } catch (err) {
      res.status(400).json({
        msg: "User not found",
        isSucess: false,
      });
    }
  },

  updateUser: async (req, res) => {
    const id = req.params.id;
    const role = req.body.data?.role;
  
    const profile = {};
    if (role) profile.role = role;
  
    try {
      const user = await UserService.update(id, profile);
      if (!user) {
        return res.status(400).json({
          data: "User not found",
          isSucess: false,
        });
      }
      res.status(200).json({
        msg: "Update successfully!",
        isSucess: true,
      });
    } catch (err) {
      res.status(400).json({
        msg: `Can't update user`,
        isSucess: false,
      });
    }
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await UserService.delete(id);
      if (!user) {
        return res.status(400).json({
          msg: `User not found`,
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
  },

  refreshToken: async (req, res) => {
    const refreshToken = req.body.data.refresh_token;
    if (refreshToken) {
      jwt.verify(refreshToken, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
          res.status(404).json({
            msg: "No Authenticate",
            isSucess: false,
          });
          return;
        }
        // create and assign a token
        const payload = {
          user,
        };
        const newAccessToken = generateAccessToken(payload);
        res.status(200).json({
          msg: "Refresh token successfully!",
          isSucess: true,
          data: {
            access_token: newAccessToken,
          },
        });
      });

      return;
    }

    res.status(400).json({
      msg: "No Refresh Token",
      isSucess: false,
    });
  },
}