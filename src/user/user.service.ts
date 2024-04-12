import CustomHttpError from "../exceptions/CustomHttpError";
import User from "./user.model";
import bcrypt from "bcryptjs";

class userService {
  async getUserByUsername(username) {
    const user = await User.findById(username);
    if (!user) {
      throw new CustomHttpError(
        `User with username (${username}) not found`,
        401
      );
    }
    return user;
  }

  async createUser({ username, password, userRole = "employee" }) {
    const candidateByusername = await User.findOne({ username });
    if (candidateByusername) {
      throw new CustomHttpError(`This username (${username}) already exist`, 409);
    }
    const hashpassword = await bcrypt.hash(password, 7);

    const user = await User.create({
      username,
      userRole,
      password,
    });
    await user.save();

    return {
      userId: user._id,
    };
  }
}

export default new userService();
