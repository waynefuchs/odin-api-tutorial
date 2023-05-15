import { Router } from "express";
import { Op } from "sequelize";
import models, { sequelize } from "../models/postgres/index.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import { generateHash, validateHash } from "../util/hash.js";
const router = Router();

// ROUTE
router.post(
  "",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

// Validation Middleware
passport.use(
  new LocalStrategy(function (username, password, done) {
    models.User.findOne({ where: { username: username } })
      .then((user) => {
        console.log("USER", user);
        if (!user) return done(null, false);
        if (!validateHash(password, user.hash, user.salt))
          return done(null, false);
        return done(null, user);
      })
      .catch((err) => {
        done(err);
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

export { router, passport };
