import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("user has been created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "user not found"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "wrong password or username"));

    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;

    // أهم جزء: إرسال الـ cookie صح لـ localhost
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,          // لازم false عشان localhost
      })
      .status(200)
      .send(info);

  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "lax",
      secure: false,            // نفس إعدادات login
    })
    .status(200)
    .send("User logged out.");
};
