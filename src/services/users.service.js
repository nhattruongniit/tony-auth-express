const UserModel = require('../model/user.model');

module.exports = {
  create: async (data = {}) => {
    const { firstName, lastName, avatar, email, role, password } = data;
    const user = new UserModel({
      avatar,
      firstName,
      lastName,
      email,
      role,
      password,
    });
    return user.save();
  },

  findAll: async () => {
    const users = await UserModel.find().sort({ data: -1 });
    return users;
  },

  findEmail: async (email) => {
    const user = await UserModel.findOne({ email });
    return user;
  },

  findOne: async (id) => {
    const user = await UserModel.findById(id);
    return user;
  },

  update: async (id, data = {}) => {
    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );
    return user;
  },

  delete: async (id) => {
    const user = await UserModel.findOneAndRemove({ _id: id });
    return user;
  }
}