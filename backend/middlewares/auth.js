const authMiddleware = (req, res, next) => {
  const { fullName, password, email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: "Email address is required",
    });
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Email address is invalid",
    });
  }

  if (!fullName) {
    return res.status(400).json({
      success: false,
      error: "Full name is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      error: "Password is required",
    });
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      error:
        "Password should at least have 6 characters, 1 Uppercase, 1 lowercase and a number",
    });
  }

  next();
};

module.exports = { authMiddleware };
