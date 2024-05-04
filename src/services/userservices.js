

import UserModel from '../models/user.model.js';

class UserService {
  async createUser(userData) {
    try {
      const user = new UserModel(userData);
      return await user.save();
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error to be caught by the controller
    }
  }

  async findUser(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error to be caught by the controller
    }
  }
}

export default UserService;
