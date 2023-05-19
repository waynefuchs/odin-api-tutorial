import { Router } from "express";
import { Op } from "sequelize";
import models, { sequelize } from "../models/postgres/index.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import { generateHash, validateHash } from "../util/hash.js";
const login = Router();

// ROUTE
login.post(
  "",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/session");
  }
);

// Validation Middleware
passport.use(
  new LocalStrategy(function (username, password, next) {
    models.User.findOne({ where: { username: username } })
      .then((user) => {
        if (!user) return next(null, false);
        if (!validateHash(password, user.hash, user.salt))
          return next(null, false);
        return next(null, user);
      })
      .catch((err) => {
        next(err);
      });
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, done) {
  try {
    models.User.findOne({ where: { id: id } }).then((user) => {
      done(null, user);
    });
  } catch (err) {
    return done(err);
  }
});

function requireUserLogin(req, res, next) {
  if (req.user) return next();
  res.status(401);
  return res.send("Not logged in");
}

export { login, passport, requireUserLogin };
