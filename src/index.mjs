import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "./strategies/local-strategy.mjs"

const app = express();
mongoose
  .connect("mongodb://localhost/express_tuts")
  .then(() => console.log("CONNECT to DATABASE....."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "the dev",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    // store : MongoStore.create({
    //   client : mongoose.connection.getClient(),
    // })
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  req.session.visited = true;
  res.cookie("hello", "world", {
    maxAge: 60000,
    signed: true,
  });
  res.status(201).send({
    msg: "HELLO",
  });
});

app.listen(PORT, () => {
  console.log(`App is Running on ${PORT} ....`);
});
