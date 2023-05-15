import { Router } from "express";
import { passport } from "./login.js";

const router = Router();

router.get("/", (req, res) => {
  if (!req.user) return res.send("Not logged in");
  const id = req.user.id;
  const username = req.user.username;
  return res.send({ id, username });
});

export default router;
