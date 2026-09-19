const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customerRoutes = require("./router/auth_users.js").authenticated;
const generalRoutes = require("./router/general.js").general;

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "book-review-access";

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: process.env.SESSION_SECRET || "fingerprint_customer",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax" },
  })
);

app.use("/customer/auth/*", function authenticate(req, res, next) {
  const authorization = req.session.authorization;

  if (!authorization) {
    return res.status(401).json({ message: "Please login to continue" });
  }

  return jwt.verify(authorization.accessToken, JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Session is invalid or expired" });
    }

    req.user = user;
    return next();
  });
});

app.use("/customer", customerRoutes);
app.use("/", generalRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
