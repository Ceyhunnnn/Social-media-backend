const user = require("../models/userModel");
const APIError = require("../utils/error");
const Response = require("../utils/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../middlewares/auth");
const { sendMail } = require("./../utils/sendMail");
const register = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await user.findOne({ email });
  if (checkUser) {
    throw new APIError("E-mail already in use", 400);
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const createdUser = new user(req.body);
  await createdUser
    .save()
    .then((data) => new Response(null, "Account created").created(res))
    .catch(() => new APIError("Account could not be created", 400));
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const loginUser = await user.findOne({ email });
  if (!loginUser) {
    throw new APIError("Email or password wrong, please Please try again", 401);
  }
  if (!loginUser.isActive) {
    throw new APIError("user account is deactive", 400);
  }
  const comparePassword = await bcrypt.compare(password, loginUser.password);
  if (!comparePassword) {
    await detectWrongPassword(email, loginUser.firstName);
    throw new APIError("Email or password wrong, please Please try again", 401);
  }
  createToken(loginUser, res);
};

const userInformations = async (req, res) => {
  return new Response(req.user, "success").success(res);
};

const userProfileUpdate = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await user.findByIdAndUpdate(id, req.body, {
    new: false,
  });
  if (updatedUser) {
    new Response(null, "profile updated!").created(res);
  } else {
    throw new APIError("profile didn't updated, please try again.", 400);
  }
};

const detectWrongPassword = async (email, userName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Wrong Password!! From Social Media Application",
    html: `<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Wrong Password</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  padding: 0;
  margin: 0;
}
.container-sec {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
}
.otp-code {
  font-size: 24px;
  font-weight: bold;
  background-color: #f8f9fa;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  border: 1px dashed #007bff;
  color: #007bff;
}
.btn-verify {
  display: inline-block;
  padding: 10px 20px;
  color: #ffffff;
  background-color: #007bff;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
}
.footer-text {
  color: #6c757d;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}
.footer-text a {
  color: #007bff;
  text-decoration: none;
}
.otp-lock {
  color: #333;
  font-size: 80px;
}
.welcome-section {
  background: #144fa9db;
  padding: 30px;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  margin: 20px 0px;
}
.welcome-text {
  font-family: monospace;
}
.app-name {
  font-size: 30px;
  font-weight: 800;
  margin: 7px 0px;
}
.verify-text {
  margin-top: 25px;
  font-size: 25px;
  letter-spacing: 3px;
}
i.fas.fa-envelope-open {
  font-size: 35px !important;
  color: #ffffff;
}

</style>
</head>

<body>

  <div class="container-sec">
    <div class="text-center">
      <div><i class="fas fa-lock otp-lock"></i></div>
      <div class="welcome-section">
        <div class="app-name">
         Social Media Application
        </div>
        <div class="verify-text">
          Please Check Your account!
        </div>
        <div class="email-icon">
          <i class="fas fa-envelope-open"></i>
        </div>
      </div>
      <h2>Hello, ${userName}</h2>
      <p>An incorrect password was entered when logging into your account. If not you, please contact us!</p>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>`,
  };
  const mailResult = await sendMail(mailOptions);
  if (!mailResult) {
    console.log("not send");
  } else {
    console.log("send!");
  }
};

module.exports = {
  login,
  register,
  userInformations,
  userProfileUpdate,
};
