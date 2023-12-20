const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.home = async (req, res) => {
  try {
    await res.status(200).send("hi you are under get route");
  } catch (error) {
    console.log(error);
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userexist = await User.User.findOne({ email });
    if (userexist) {
      return res.status(400).json({ msg: "user already exist" });
    }

    //hashing password

    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password,saltRound);

    const usercreated = await User.User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(200).send({
      msg: "registration successful",
      token: await usercreated.generateToken(),
      userId: usercreated._id.toString(),
    });
  } catch (error) {
    res.status(40).send({ msg: "page not found" });
  }
}

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userexist = await User.User.findOne({ email });
      if (!userexist) {
        return res.status(400).json({ msg: "invalid cardentials" });
      }

      const isPasswordvalid = await bcrypt.compare(
        password,
        userexist.password
      );
      if (isPasswordvalid) {
        res.status(200).send({
          msg: "login successful",
          token: await userexist.generateToken(),
          userId: userexist._id.toString(),
        });
      } else {
        res.status(401).json({ msg: "invalid user or password" });
      }
    } catch (error) {
      res.status(500).json("internal server error");
    }
  };

  exports.user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };
