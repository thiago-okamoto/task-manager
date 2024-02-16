const User = require("../models/User");

module.exports.signup = async (req, res) => {
  try {
    const user = req.body.user;
    console.log("Req", req.body.user);
    console.log("Data validation", user);

    User.signup(user);

    return res.status(201).json({
      code: "success",
      message: "Created User",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = req.body.user;
    console.log("Req", req.body.user);
    console.log("Data validation", user);

    const loggedUser = await User.login(user);

    return res.status(201).json({
      code: "success",
      message: "User logged in",
      loggedUser: loggedUser,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
