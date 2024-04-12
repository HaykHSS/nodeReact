import bcrypt from "bcryptjs";
import User from "../user/user.model";
import CustomHttpError from "../exceptions/CustomHttpError";
import tokenService from "../token/token.service";
import userService from "../user/user.service";

class authService {
  async registration({ username, password }) {
    const candidateByusername = await User.findOne({ username });
    if (candidateByusername) {
      throw new CustomHttpError(
        `This username (${username}) already exist`,
        409
      );
    }

    const hashpassword = await bcrypt.hash(password, 7);
    const user = await userService.createUser({
      username,
      password: hashpassword,
    });

    return {
      id: user.userId,
    };
  }

  async login({ username, password }) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new CustomHttpError(
        `User with username (${username}) not found`,
        401
      );
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new CustomHttpError("Invalid password", 401);
    }
    const { _id: userId, userRole } = user;
    const accessToken = tokenService.generateToken({
      payload: { username, userId, userRole },
    });

    return {
      accessToken,
      user: { id: user._id, username, userRole },
    };
  }
}

export default new authService();
