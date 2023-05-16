import { login } from "./login.js";
import logout from "./logout.js";
import message from "./message.js";
import session from "./session.js";
import user from "./user.js";

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send(`Please specify a resource`);
});

export default {
  login,
  logout,
  message,
  router,
  session,
  user,
};
