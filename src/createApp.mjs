import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "./strategies/local-strategy.mjs";
// import "./strategies/discord-strategy.mjs"

export function createApp() {
  const app = express();

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
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(routes);

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

  app.get("/api/auth/discord", passport.authenticate("discord"));
  app.get(
    "/api/auth/discord/redirect",
    passport.authenticate("discord"),
    (req, res) => {
      res.sendStatus(200);
    }
  );

  return app;
}
