const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { authMiddleware } = require("./middlewares/auth");
const { User } = require("./models/user");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", authMiddleware, async (req, res) => {
  try {
    const { fullName, password, email: inputEmail } = req.body;

    // Check if email already exist
    const email = inputEmail.toLowerCase();

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).json({
        success: false,
        error: "Account already exist",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      password: passwordHash,
      email,
      fullname: fullName,
    });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email address is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        error: "Password is required",
      });
    }

    // Check account exists
    const checkAccount = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!checkAccount) {
      return res.status(400).json({
        success: false,
        error: "Account doesn't exist",
      });
    }

    const compare = await bcrypt.compare(
      password,
      checkAccount.password
    );

    if (!compare) {
      return res.status(400).json({
        success: false,
        error: "Password is incorrect",
      });
    }

    res.json({
      success: true,
      data: {
        id: checkAccount.id,
        fullName: checkAccount.fullname,
        email,
        registeredDate: checkAccount.created_at
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

app.listen(8081, () => {
  console.log("I'm listening");
});
