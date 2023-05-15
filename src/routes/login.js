import { Router } from "express";
import { Op } from "sequelize";
import models, { sequelize } from "../models/postgres/index.js";
const router = Router();

// var passport = require("passport-strategy");
import passport from "passport";
import LocalStrategy from "passport-local";
import { generateHash, validateHash } from "../util/hash.js";

passport.use(
  new LocalStrategy(function (username, password, done) {
    const hash = generateHash(password);
    console.log(hash.hash);
    console.log(validateHash(password, hash.hash, hash.salt));

    //   User.findOne({ username: username }, function (err, user) {
    //     if (err) {
    //       return done(err);
    //     }
    //     if (!user) {
    //       return done(null, false);
    //     }
    //     if (!user.verifyPassword(password)) {
    //       return done(null, false);
    //     }
    //     return done(null, user);
    //   });
  })
);

router.post(
  "",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

export default router;
