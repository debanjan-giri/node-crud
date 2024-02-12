// database control
import authModel from "../model/authModel.js";

// password hashing
import bcrypt from "bcrypt";

// token
import Jwt from "jsonwebtoken";

// user register middleware controller
export const registerController = async (req, res, next) => {
  try {
    // getting data from client
    const { username, password } = req.body;

    // data validation empty or not
    if (!username || !password) {
      throw new Error("Details are required.");
    }

    // password validation
    if (password.length <= 5) {
      throw new Error("Password not secure");
    }

    // check db find first one obj {username : username}
    const existingUser = await authModel.findOne({ username }).select("_id");
    if (existingUser) {
      throw new Error("User already exists");
    }

    // token generate
    // { username : username } , secret key , expire time
    const token = Jwt.sign({ tokenId: username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // password hashing
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user obj {username : username , password : hash}
    await authModel.create({
      username,
      password: hashedPassword,
    });

    // final response
    return res.status(200).json({
      success: true,
      data: {
        token,
      },
      message: "Registration successful.",
    });
  } catch (error) {
    return next(error);
  }
};

// user login middleware controller
export const loginController = async (req, res, next) => {
  try {
    // getting data from browser
    const { username, password } = req.body;

    // validation empty or not
    if (!username || !password) {
      throw new Error("Details required");
    }

    // check existing user
    const existingUser = await authModel
      .findOne({ username })
      .select("password");
    if (!existingUser) {
      throw new Error("User not exist");
    }

    // password compare
    const compare = await bcrypt.compare(password, existingUser.password);
    if (!compare) {
      throw new Error("incorrect password");
    }

    // token generate
    const token = Jwt.sign({ tokenId: username }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // final response
    return res.status(200).json({
      success: true,
      data: {
        token,
      },
      message: "login successful",
    });
  } catch (error) {
    next(error);
  }
};
