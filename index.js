import express, { json } from "express";
import jwt from "jsonwebtoken";
import session from "express-session";
import { authenticated as customer_routes } from "./router/auth_users.js";
import { general as general_routes } from "./router/general.js";

const app = express();

app.use(json());

app.use(
  "/customer",
  session({ secret: "jwtsecret", resave: true, saveUninitialized: true })
);

app.use("/customer/auth/*", function auth(req, res, next) {
  if (req.session.authorization) {
    let token = req.session.authorization["accessToken"];
    jwt.verify(token, "verysecretkey", (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        res
          .status(403)
          .json({ message: "User not authorized to use this service" });
      }
    });
  } else {
    res.status(403).json({ message: "User not authenticated to website" });
  }
});

const PORT = 5001;

app.use("/customer", customer_routes);
app.use("/", general_routes);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
