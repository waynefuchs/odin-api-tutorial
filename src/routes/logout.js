import { Router } from "express";
const logout = Router();

logout.get("", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

export default logout;
